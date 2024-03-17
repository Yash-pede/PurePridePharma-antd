CREATE OR REPLACE FUNCTION update_stock()
RETURNS TRIGGER AS $$
DECLARE
  remaining_quantity INT;
  current_batch RECORD;
BEGIN
  -- Debugging: Log initial values
  RAISE NOTICE 'Product ID: %, Quantity: %, Order ID: %, Old Status: %, New Status: %', NEW.product_id, NEW.quantity, NEW.id, OLD.status, NEW.status;

  -- Check if the order status is 'Fulfilled'
  IF NEW.status = 'Fulfilled' AND OLD.status <> 'Fulfilled' THEN
    -- Debugging: Log order details
    RAISE NOTICE 'Order Fulfilled: Order ID: %, Product ID: %, Quantity: %', NEW.id, NEW.product_id, NEW.quantity;

    -- Calculate the remaining quantity after deducting from available batches
    remaining_quantity := NEW.quantity;

    -- Loop through batches with the nearest expiry date first
    FOR current_batch IN (
      SELECT *
      FROM "STOCKS"
      WHERE product_id = NEW.product_id
      AND avalable_quantity > 0
      ORDER BY expiry_date ASC
    ) LOOP
      -- Debugging: Log current batch and remaining quantity
      RAISE NOTICE 'Checking batch %, Available Quantity: %, Remaining Quantity: %', current_batch.batch_no, current_batch.avalable_quantity, remaining_quantity;

      -- Calculate the actual quantity to update in the current batch
      DECLARE
        actual_quantity INT := LEAST(remaining_quantity, current_batch.avalable_quantity);
      BEGIN
        -- Debugging: Log actual quantity
        RAISE NOTICE 'Actual Quantity for batch %: %', current_batch.batch_no, actual_quantity;

        -- Update the stock in the current batch
        UPDATE "STOCKS"
        SET avalable_quantity = avalable_quantity - actual_quantity,
            orderd_quantity = orderd_quantity + actual_quantity  -- Update orderd_quantity
        WHERE product_id = NEW.product_id AND batch_no = current_batch.batch_no;

        -- Insert into D_INVENTORY with default distributor_id and NULL salesperson_id for each batch
        INSERT INTO "D_INVENTORY" (created_at, distributor_id, product_id, quantity, batch_no, salesperson_id)
        VALUES (NOW(), NEW.user_id, NEW.product_id, actual_quantity, current_batch.batch_no, NULL);

        -- Log a message for debugging
        RAISE NOTICE 'Order fulfilled for product %, quantity %, batch_no %', NEW.product_id, actual_quantity, current_batch.batch_no;

        -- Update the remaining quantity
        remaining_quantity := remaining_quantity - actual_quantity;
        
        -- Exit the loop if the order is fulfilled
        EXIT WHEN remaining_quantity <= 0;
      END;
    END LOOP;

    -- Update the order with the batch numbers outside of the loop
    UPDATE "ORDERS"
    SET batch_no = array_cat(NEW.batch_no, ARRAY(SELECT DISTINCT batch_no FROM "D_INVENTORY" WHERE distributor_id = NEW.user_id AND product_id = NEW.product_id))
    WHERE id = NEW.id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
