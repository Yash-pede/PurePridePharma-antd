import React from "react";
import { Show } from "@refinedev/antd";
import { HttpError, useOne } from "@refinedev/core";
import { Database, GET_ALL_D_INVENTORY_QUERY } from "@repo/graphql";
import { ProductCardPublic } from "@repo/ui";
import { Button, Divider, Flex, Skeleton, Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/lib/typography/Title";
import { useLocation } from "react-router-dom";

export const ShowInventoryD = () => {
  const inventoryId = useLocation().pathname.split("/").pop();
  const { data: inventory, isLoading } = useOne<
    Database["public"]["Tables"]["D_INVENTORY"]["Row"],
    HttpError
  >({
    resource: "D_INVENTORY",
    meta: {
      gqlQuery: GET_ALL_D_INVENTORY_QUERY,
    },
    id: inventoryId,
  });
  const { data: products, isLoading: isLoadingProducts } = useOne<
    Database["public"]["Tables"]["PRODUCTS"]["Row"],
    HttpError
  >({
    resource: "PRODUCTS",
    id: inventory?.data?.product_id,
  });
  return (
    <Show>
      <Flex
        wrap="wrap"
        gap="16px"
        justify="space-between"
        align="center"
        style={{ padding: "16px", width: "100%" }}
      >
        <Title level={3}>order Id: {inventory?.data?.id}</Title>
        <Flex gap="16px" justify="space-around" wrap="wrap" align="center">
          <Paragraph>Total quantity: {inventory?.data?.quantity}</Paragraph>
          <Paragraph>Product: {products?.data?.name}</Paragraph>
        </Flex>
      </Flex>
      <Divider />
      <Title level={4}>Product Details</Title>
      <Flex wrap="wrap" justify="space-around" align="start">
        {isLoading ? (
          <Skeleton active style={{ width: "40%" }} />
        ) : (
          <Table
            size="large"
            style={{ width: "50%" }}
            dataSource={
              (inventory?.data?.batch_info as readonly AnyObject[]) || []
            }
            pagination={false}
            bordered
            showHeader
            columns={[
              {
                title: "Batch ID",
                dataIndex: "batch_id",
                key: "batch_id",
              },
              {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity",
              },
            ]}
          />
        )}

        {isLoadingProducts ? (
          <Skeleton.Image active />
        ) : (
          <ProductCardPublic
            isLoading={isLoadingProducts}
            product={products?.data as any}
            RenderButton={() => (
              <Button style={{ width: "100%" }}>View Product</Button>
            )}
          />
        )}
      </Flex>
    </Show>
  );
};
