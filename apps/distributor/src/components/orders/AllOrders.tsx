import { DateField, FilterDropdown, List, getDefaultSortOrder, useTable } from "@refinedev/antd";
import { HttpError, useGetIdentity, useGo, useUpdate } from "@refinedev/core";
import { Database, GET_ALL_ORDERS_QUERY } from "@repo/graphql";
import { OrderStatus } from "@repo/utility";
import { Button, Modal, Select, Table } from "antd";
import React from "react";

export const AllOrders_D = () => {
  const { data: User } = useGetIdentity<any>();
  const go = useGo();
  const { tableProps, sorter,tableQueryResult, } = useTable<
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
    console.log(value, orderId);
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
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
        />
        <Table.Column<Database["public"]["Tables"]["ORDERS"]["Row"]>
          dataIndex={"status"}
          title="Status"
          filterDropdown={(props) => (
            <FilterDropdown
              {...props}
              filters={tableQueryResult?.data?.filters}
            >
              <Select style={{ width: "10rem" }}
                placeholder="Select a role"
                options={[
                  {
                    label: OrderStatus.INPROCESS,
                    value: OrderStatus.INPROCESS,
                  },
                  {
                    label: OrderStatus.FULFILLED,
                    value: OrderStatus.FULFILLED,
                  },
                  {
                    label: OrderStatus.DEFECTED,
                    value: OrderStatus.DEFECTED,
                  },
                  {
                    label: OrderStatus.PENDING,
                    value: OrderStatus.PENDING,
                  },
                  {
                    label: OrderStatus.CANCELLED,
                    value: OrderStatus.CANCELLED,
                  },
                ]}
              />
            </FilterDropdown>
          )}
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
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("created_at", sorter)}
          render={(_, record) => <DateField value={record.created_at} format="DD/MM/YYYY" />}
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
