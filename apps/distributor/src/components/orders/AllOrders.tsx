import { DateField, List, useTable } from "@refinedev/antd";
import { HttpError, useGetIdentity, useGo, useUpdate } from "@refinedev/core";
import { Database, GET_ALL_ORDERS_QUERY } from "@repo/graphql";
import { OrderStatus } from "@repo/utility";
import { Button, Modal, Select, Table } from "antd";
import React from "react";

export const AllOrders_D = () => {
  const { data: User } = useGetIdentity<any>();
  const go = useGo();
  const { tableProps } = useTable<
    Database["public"]["Tables"]["ORDERS"]["Row"],
    HttpError
  >({
    resource: "ORDERS",
    meta: {
      gqlQuery: GET_ALL_ORDERS_QUERY,
    },
    filters: {
      permanent: [
        {
          field: "distributor_id",
          operator: "eq",
          value: User?.id,
        },
      ],
    },
    sorters: {
      initial: [
        {
          field: "id",
          order: "desc",
        },
      ],
    },
  });
  const { mutate, isLoading: updateLoading } = useUpdate();

  const handleStatusChange = (value: string, orderId: string) => {
    console.log(value,orderId);
    mutate({
      resource: "ORDERS",
      id: orderId,
      values: {
        status: value,
      },
    });
  };

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
        <Table.Column<Database["public"]["Tables"]["ORDERS"]["Row"]>
          dataIndex="id"
          title="ID"
        />
        <Table.Column<Database["public"]["Tables"]["ORDERS"]["Row"]>
          dataIndex={"status"}
          title="Status"
          render={(_, record) => {
            if (record.status === OrderStatus.INPROCESS) {
              return (
                <Select
                  value={record.status}
                  style={{ width: "10rem" }}
                  status="warning"
                  onChange={(value) => {
                    Modal.confirm({
                      title: "Are you sure you want to change status?",
                      onOk: () => {
                        handleStatusChange(value, record.id.toString());
                      },
                      type: "confirm",
                    });
                  }}
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
        <Table.Column<Database["public"]["Tables"]["ORDERS"]["Row"]>
          dataIndex="created_at"
          title="Created At"
          render={(_, record) => <DateField value={record.created_at} format="DD/MM/YYYY"/>}
        />
        <Table.Column<Database["public"]["Tables"]["ORDERS"]["Row"]>
          title="Action"
          render={(_, record) => (
            <Button
              onClick={() =>
                go({
                  to: { action: "show", resource: "orders", id: record.id },
                })
              }
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
