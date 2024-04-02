import { useShoppingCart } from "../../contexts/cart/ShoppingCartContext";
import {
  Alert,
  Button,
  Col,
  Drawer,
  Empty,
  Flex,
  Statistic,
  notification,
} from "antd";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { useList, useCreate } from "@refinedev/core";
import { Database, GET_ALL_pRODUCTS_QUERY } from "@repo/graphql";
import { IconShoppingBagCheck } from "@tabler/icons-react";
import { authProvider } from "@repo/ui";
import { OrderStatus } from "@repo/utility";

export const ShoppingCart = ({ isOpen }: { isOpen: boolean }) => {
  const { cartItems, closeCart, clearCart } = useShoppingCart();
  const { data } = useList<Database["public"]["Tables"]["PRODUCTS"]["Row"]>({
    resource: "PRODUCTS",
  });
  const { mutate, error } = useCreate();
  const HandleCheckout = async () => {
    console.log(cartItems);
    try {
      if (!authProvider.getIdentity) {
        return;
      }
      const user = await authProvider.getIdentity();
      const userId = user as any;

      mutate({
        resource: "ORDERS",
        values: {
          order: cartItems.map((item, index) => {
            const baseQ = data?.data.find((d) => d.id === item.id)?.base_q;
            const quantity =
              baseQ !== null && baseQ !== undefined
                ? item.quantity + item.quantity / baseQ
                : item.quantity;

            return {
              key: index + 1,
              quantity: quantity,
              product_id: item.id,
            };
          }),
          status: OrderStatus.PENDING,
          distributor_id: userId.id,
        },
      });

      if (!error) {
        clearCart();
      }
    } catch (error) {
      console.error("Checkout failed:", error);
      notification.error({
        message: "Error",
        description: "Failed to checkout. Please try again.",
      });
    }
  };

  return (
    <Drawer title="Your Cart" open={isOpen} onClose={closeCart} size="large">
      <Button
        type="primary"
        size="large"
        disabled={cartItems.length === 0}
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "10px 0",
          gap: "10px",
        }}
        onClick={HandleCheckout}
      >
        <IconShoppingBagCheck /> Checkout
      </Button>
      <Alert
        style={{ margin: "10px 0" }}
        message="Quantity Scheme: 5 + 1"
        description="For every 5 products ordered, the actual quantity will be increased by 1."
        showIcon
        type="info"
      />
      {cartItems.length > 0 ? (
        <>
          <Col span={24}>
            {cartItems.map((item) => (
              <ShoppingCartItem key={item.id} products={data?.data} {...item} />
            ))}
          </Col>
          <Flex justify="end">
            <Statistic
              title="Total"
              precision={2}
              style={{ marginRight: "16px", fontWeight: "bold" }}
              value={
                "₹" +
                cartItems.reduce((total, item) => {
                  const product = data?.data?.find((p) => p.id === item.id);
                  return total + (product?.selling_price || 0) * item.quantity;
                }, 0)
              }
            />
          </Flex>
        </>
      ) : (
        <Empty description="Your cart is empty" />
      )}
    </Drawer>
  );
};
