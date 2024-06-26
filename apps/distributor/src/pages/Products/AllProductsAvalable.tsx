import { useList } from "@refinedev/core";
import { Database, GET_ALL_STOCKS_QUERY } from "@repo/graphql";
import { Button, Card, Flex, InputNumber } from "antd";
import { IconShoppingCart } from "@tabler/icons-react";
import { ProductCardPublic } from "@repo/ui";
import { useShoppingCart } from "../../contexts/cart/ShoppingCartContext";
import { Show } from "@refinedev/antd";
export const AllAvalableProducts = () => {
  const { data: StockInventory, isLoading } = useList<
    Database["public"]["Tables"]["STOCKS"]["Row"]
  >({
    resource: "STOCKS",
    meta: {
      gqlQuery: GET_ALL_STOCKS_QUERY,
    },
  });
  const { data } = useList<Database["public"]["Tables"]["PRODUCTS"]["Row"]>({
    resource: "PRODUCTS",
    filters: [
      {
        field: "id",
        operator: "in",
        value: StockInventory?.data?.map((stock: any) => stock.product_id),
      },
    ],
  });
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
        <Card
          loading
          style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
        />
      </div>
    );
  }
  const {
    getItemsQuantity,
    decreaseCartQuantity,
    increaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  return (
    <Show resource="PRODUCTS">
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: "0.7rem",
        }}
      ></div>
      <Flex
        wrap="wrap"
        gap="small"
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data?.data.map((product) => (
          <ProductCardPublic
            product={product}
            isLoading={isLoading}
            key={product.id}
            RenderButton={() => (
              <div
                onClick={(e) => e.stopPropagation()}
                style={{ width: "100%" }}
              >
                {getItemsQuantity(product.id) === 0 ? (
                  <Button
                    type="primary"
                    size="large"
                    style={{
                      gap: "15px",
                      marginTop: "15px",
                      marginBottom: "15px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.preventDefault();
                      increaseCartQuantity(product.id, product.base_q || 1);
                    }}
                  >
                    <IconShoppingCart /> Add to Cart
                  </Button>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "0.8rem",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.8rem",
                        width: "100%",
                      }}
                    >
                      <Button
                        type="primary"
                        disabled={getItemsQuantity(product.id) <= 5}
                        onClick={() =>
                          decreaseCartQuantity(product.id, product.base_q || 1)
                        }
                      >
                        -
                      </Button>
                      <InputNumber
                        value={getItemsQuantity(product.id)}
                        defaultValue={getItemsQuantity(product.id)}
                        readOnly
                      />
                      <Button
                        type="primary"
                        onClick={() =>
                          increaseCartQuantity(product.id, product.base_q || 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        type="primary"
                        danger
                        style={{ width: "100%" }}
                        onClick={() => removeFromCart(product.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          />
        ))}
      </Flex>
    </Show>
  );
};
