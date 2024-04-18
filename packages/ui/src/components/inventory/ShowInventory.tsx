import React from "react";
import { DateField, Show } from "@refinedev/antd";
import { HttpError, useOne } from "@refinedev/core";
import { Database, GET_ALL_D_INVENTORY_QUERY } from "@repo/graphql";
import { Divider, Flex, Skeleton, Table, Typography } from "antd";
import { AnyObject } from "antd/es/_util/type";
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
        <Typography.Title level={3}>
          order Id: {inventory?.data?.id}
        </Typography.Title>
        <Flex gap="16px" justify="space-around" wrap="wrap" align="center">
          <Typography.Title level={4}>
            Total quantity: {inventory?.data?.quantity}
          </Typography.Title>
          <Typography.Paragraph>
            Product: {products?.data?.name}
          </Typography.Paragraph>
        </Flex>
      </Flex>
      <Divider />
      <Typography.Title level={4}>Product Details</Typography.Title>

      {isLoading ? (
        <Skeleton active style={{ width: "40%" }} />
      ) : (
        <Table
          size="large"
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
            {
              title: "Updated at",
              dataIndex: "updated_at",
              key: "updated_at",
              render: (value) => (
                <DateField value={value} format="DD/MM/YYYY" />
              ),
            },
          ]}
        />
      )}
    </Show>
  );
};
