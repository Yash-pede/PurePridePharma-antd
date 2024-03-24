import { DateField, List, Show, TextField, useTable } from "@refinedev/antd";
import { HttpError, useGo } from "@refinedev/core";
import { GET_ALL_ORDERS_QUERY, Orders } from "@repo/graphql";
import { OrderStatus } from "@repo/utility";
import { Button, Select, Table } from "antd";
import React from "react";

export const AllOrders_D = () => {
  const go = useGo();
  const { tableProps } = useTable<Orders, HttpError>({
    resource: "ORDERS",
    meta: {
      gqlQuery: GET_ALL_ORDERS_QUERY,
    },
    filters: {
      permanent: [
        {
          field: "distributor_id",
          operator: "eq",
          value: JSON.parse(localStorage.getItem("USER") || "{}").id,
        },
      ],
    },
  });

  return (
    <List
      createButtonProps={{
        onClick: () =>
          go({
            to: { action: "list", resource: "products" },
          }),
      }}
    >
      <Table {...tableProps}>
        <Table.Column<Orders> dataIndex="id" title="ID" />
        <Table.Column<Orders>
          dataIndex={"status"}
          title="Status"
          render={(_, record) => {
            if (record.status === OrderStatus.INPROCESS) {
              return (
                <Select
                  value={record.status}
                  style={{ width: "10rem" }}
                  status="warning"
                >
                  <Select.Option value={OrderStatus.FULFILLED}>
                    Fulfilled
                  </Select.Option>
                  <Select.Option value={OrderStatus.DEFECTED}>
                    Defected
                  </Select.Option>
                </Select>
              );
            }
            return (
              <Select
                value={record.status}
                style={{ width: "10rem" }}
                dropdownStyle={{ display: "none" }}
              >
                <Select.Option value={OrderStatus.FULFILLED}>
                  Fulfilled
                </Select.Option>
              </Select>
            );
          }}
        />
        <Table.Column<Orders>
          dataIndex="created_at"
          title="Created At"
          render={(_, record) => <DateField value={record.created_at} />}
        />
        <Table.Column<Orders>
          title="Action"
          render={(_, record) => (
            <Button
              onClick={() => go({ to: record.id })}
              type="dashed"
              size="small"
            >
              View Detail
            </Button>
          )}
        />
      </Table>
    </List>
  );
};
