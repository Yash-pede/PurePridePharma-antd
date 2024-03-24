import { Show, TextField, useTable } from "@refinedev/antd";
import { useList } from "@refinedev/core";
import { GET_ALL_D_INVENTORY_QUERY } from "@repo/graphql";
import { Table } from "antd";
import React from "react";

export const InventoryD = () => {
  const { tableProps, tableQueryResult } = useTable({
    resource: "D_INVENTORY",
    meta: {
      gqlQuery: GET_ALL_D_INVENTORY_QUERY,
    },
    filters: {
      permanent: [
        {
          field: "distributor_id",
          operator: "eq",
          value: JSON.parse(localStorage.getItem("USER") || "{}").id as string,
        },
      ],
    },
  });
  const { data: products, isLoading: isLoadingProducts } = useList({
    resource: "PRODUCTS",
    meta: {
      gqlQuery: GET_ALL_D_INVENTORY_QUERY,
    },
    filters: [
      {
        field: "id",
        operator: "eq",
        value: tableQueryResult.data?.data?.map(
          (stock: any) => stock.product_id
        ),
      },
    ],
  });
  return (
    <Show>
      <pre>{JSON.stringify(tableQueryResult.data, null, 2)}</pre>
      <Table {...tableProps}>
        <Table.Column
          dataIndex="product_id"
          title="Product Id"
          render={(value) => (
            <TextField
              value={
                products?.data?.find((product) => product.id === value)?.name
              }
            />
          )}
        />
        <Table.Column
          dataIndex="batch_no"
          title="Batch No"
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="quantity"
          title="Quantity"
          render={(value) => <TextField value={value} />}
        />
      </Table>
    </Show>
  );
};
