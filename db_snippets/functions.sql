-- Order fulfil fn
CREATE OR REPLACE FUNCTION add_batch_info_to_order(
    order_id BIGINT,
    product_id UUID,
    key_value INT,
    batch_id TEXT,
    quantity_value INT
)
RETURNS VOID AS $$
DECLARE
    batch_info_obj JSONB;
    updated_order JSONB[];
BEGIN
    batch_info_obj := jsonb_build_object('batch_id', batch_id, 'quantity', quantity_value);

    updated_order := ARRAY(
        SELECT CASE 
                   WHEN (order_item->>'key')::INT = key_value THEN 
                       jsonb_set(order_item, '{batch_info}', 
                                 COALESCE(order_item->'batch_info', '[]'::JSONB) || batch_info_obj, 
                                 true)
                   ELSE order_item 
               END
        FROM (SELECT jsonb_array_elements("order") AS order_item FROM "ORDERS" WHERE id = order_id) AS order_items
        WHERE order_item->>'product_id' = product_id::TEXT
    );

    UPDATE "ORDERS"
    SET "order" = (SELECT jsonb_agg(elem) FROM unnest(updated_order) AS elem)
    WHERE id = order_id;

END;
$$ LANGUAGE plpgsql;




-- Distributor inventory fn
CREATE
OR REPLACE FUNCTION add_to_d_inventory (
  distributor_id UUID,
  product_id UUID,
  batch_id TEXT,
  batch_quantity INT
) RETURNS VOID AS $$
BEGIN
    -- Update quantity if the record already exists
    UPDATE "D_INVENTORY"
    SET "quantity" = "quantity" + batch_quantity,
        "batch_info" = COALESCE("batch_info", '[]'::JSONB) || jsonb_build_array(jsonb_build_object('batch_id', batch_id, 'quantity', batch_quantity, 'updated_at', CURRENT_TIMESTAMP))
    WHERE "D_INVENTORY"."distributor_id" = add_to_d_inventory.distributor_id
    AND "D_INVENTORY"."product_id" = add_to_d_inventory.product_id
    AND "D_INVENTORY"."batch_info" @> jsonb_build_array(jsonb_build_object('batch_id', batch_id));

    -- Insert new record if the batch doesn't exist
    IF NOT FOUND THEN
        INSERT INTO "D_INVENTORY" (
            "distributor_id",
            "product_id",
            "quantity",
            "batch_info",
              "updated_at"
        )
        VALUES (
            add_to_d_inventory.distributor_id,
            add_to_d_inventory.product_id,
            batch_quantity,
            jsonb_build_array(jsonb_build_object('batch_id', batch_id, 'quantity', batch_quantity, 'updated_at', CURRENT_TIMESTAMP)),
            CURRENT_TIMESTAMP
        );
    END IF;
END;
$$ LANGUAGE plpgsql;
