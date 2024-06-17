CREATE OR REPLACE FUNCTION deduct_from_batches(
    batch_info JSONB,
    ordered_quantity INTEGER
) RETURNS JSONB AS $$
DECLARE
    updated_batches JSONB := '[]'::JSONB;
    remaining_batches JSONB := batch_info;
    batch JSONB;
    batch_quantity INTEGER;
    remaining_quantity INTEGER := ordered_quantity;
BEGIN
    -- Loop through each batch in reverse order (newest first)
    FOR batch IN
        SELECT * FROM jsonb_array_elements(remaining_batches)
    LOOP
        batch_quantity := (batch->>'quantity')::INTEGER;

        IF remaining_quantity <= 0 THEN
            updated_batches := updated_batches || batch;
        ELSIF batch_quantity <= remaining_quantity THEN
            remaining_quantity := remaining_quantity - batch_quantity;
        ELSE
            batch := jsonb_set(batch, '{quantity}', to_jsonb(batch_quantity - remaining_quantity));
            remaining_quantity := 0;
            updated_batches := updated_batches || batch;
        END IF;
    END LOOP;

    IF remaining_quantity > 0 THEN
        RAISE EXCEPTION 'Not enough quantity available in batches';
    END IF;

    RETURN updated_batches;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION deduct_quantity_from_inventory()
RETURNS TRIGGER AS $$
DECLARE
    product JSONB;
    local_product_id UUID;
    local_ordered_quantity INTEGER;
    local_current_quantity INTEGER;
    updated_batch_info JSONB;
BEGIN
    FOR product IN SELECT * FROM jsonb_array_elements(NEW.product_info)
    LOOP
        SELECT (product->>'product_id')::UUID INTO local_product_id;
        local_ordered_quantity := (product->>'quantity')::INTEGER;

        SELECT quantity INTO local_current_quantity
        FROM "D_INVENTORY"
        WHERE distributor_id = NEW.distributor_id
        AND product_id = local_product_id;

        IF local_current_quantity < local_ordered_quantity THEN
            RAISE EXCEPTION 'Not enough quantity available for product_id %', local_product_id;
        END IF;

        SELECT batch_info INTO updated_batch_info
        FROM "D_INVENTORY"
        WHERE distributor_id = NEW.distributor_id
        AND product_id = local_product_id;

        updated_batch_info := deduct_from_batches(updated_batch_info, local_ordered_quantity);

        UPDATE "D_INVENTORY"
        SET quantity = quantity - local_ordered_quantity,
            batch_info = updated_batch_info
        WHERE distributor_id = NEW.distributor_id
        AND product_id = local_product_id;
    END LOOP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 3: Create or Replace the Trigger

CREATE OR REPLACE TRIGGER after_challan_insert
AFTER INSERT ON "challan"
FOR EACH ROW
EXECUTE FUNCTION deduct_quantity_from_inventory();
