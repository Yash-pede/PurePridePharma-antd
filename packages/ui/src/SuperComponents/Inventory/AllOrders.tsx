import {
  DateField,
  EditButton,
  List,
  useTable,
  ExportButton,
  getDefaultSortOrder,
  FilterDropdown,
  useSelect,
} from "@refinedev/antd";
import { HttpError, useList, useExport, getDefaultFilter } from "@refinedev/core";
import {
  Database,
  GET_ALL_ORDERS_QUERY,
  GET_ALL_PROFILES_QUERY,
} from "@repo/graphql";
import { OrderStatus, UserRoleTypes } from "@repo/utility";
import { Form, Select, Space, Table, Button } from "antd";
import React from "react";
import dayjs from "dayjs";
import { SearchOutlined } from "@ant-design/icons";

export const AllOrders = () => {
  const { tableProps, sorter, filters, } = useTable<
    Database["public"]["Tables"]["ORDERS"]["Row"],
    HttpError
  >({
    resource: "ORDERS",
    meta: {
      gqlQuery: GET_ALL_ORDERS_QUERY,
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
  const { data: profiles } = useList({
    resource: "profiles",
    meta: {
      gqlQuery: GET_ALL_PROFILES_QUERY,
    },
    filters: [
      {
        field: "userrole",
        operator: "eq",
        value: UserRoleTypes.DISTRIBUTORS,
      },
    ],
  });

  const { selectProps } = useSelect({
    resource: "profiles",
    optionLabel: "username",
    optionValue: "username",
    filters: [
      {
        field: "userrole",
        operator: "eq",
        value: UserRoleTypes.DISTRIBUTORS,
      },
    ],
    defaultValue: getDefaultFilter("profiles.username", filters, "in"),
  });

  const { selectProps: selectFullnameProps } = useSelect({
    resource: "profiles",
    optionLabel: "full_name",
    optionValue: "full_name",
    filters: [
      {
        field: "userrole",
        operator: "eq",
        value: UserRoleTypes.DISTRIBUTORS,
      },
    ],
    defaultValue: getDefaultFilter("profiles.full_name", filters, "in"),
  });

  const { isLoading: exportLoading, triggerExport } = useExport({
    resource: "ORDERS",
    meta: {
      gqlQuery: GET_ALL_ORDERS_QUERY,
    },
    download: true,
    onError(error) {
      console.error(error);
    },
    mapData: (record) => {
      return {
        distributor_name:
          profiles?.data.find((profile) => profile.id === record.distributor_id)
            ?.username ||
          record.distributor_id.full_name ||
          record.distributor_id,
        id: record.id,
        status: record.status,
        created_at: dayjs(record.created_at).format("DD-MM-YYYY"),
      };
    },
    exportOptions: {
      filename: "orders",
    },
  });

  return (
    <List
      headerButtons={
        <ExportButton onClick={triggerExport} loading={exportLoading} />
      }
    >
      <Table {...tableProps}>
        <Table.Column<Database["public"]["Tables"]["ORDERS"]["Row"]>
          dataIndex="id"
          title="ID"
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
        />
        <Table.Column<Database["public"]["Tables"]["ORDERS"]["Row"]>
          dataIndex="distributor_id"
          title="username"
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props} mapValue={(value) => value}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                {...selectProps}
              />
            </FilterDropdown>
          )}
          render={(_, record) => {
            return (
              profiles?.data.find(
                (profile) => profile.id === record.distributor_id
              )?.username || "Unknown - " + record.distributor_id
            );
          }}
        />
        <Table.Column<Database["public"]["Tables"]["ORDERS"]["Row"]>
          dataIndex="distributor_id"
          title="Full name"
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props} mapValue={(value) => value}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                {...selectFullnameProps}
              />
            </FilterDropdown>
          )}
          render={(_, record) => {
            return (
              profiles?.data.find(
                (profile) => profile.id === record.distributor_id
              )?.full_name || "Unknown - " + record.distributor_id
            );
          }}
        />
        <Table.Column<Database["public"]["Tables"]["ORDERS"]["Row"]>
          dataIndex={"status"}
          title="Status"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ width: "10rem" }}
                defaultValue={OrderStatus.PENDING}
              >
                <Select.Option value={OrderStatus.PENDING}>
                  Pending
                </Select.Option>
                <Select.Option value={OrderStatus.INPROCESS}>
                  In Process
                </Select.Option>
                <Select.Option value={OrderStatus.FULFILLED}>
                  Fulfilled
                </Select.Option>
                <Select.Option value={OrderStatus.CANCELLED}>
                  Cancelled
                </Select.Option>
                <Select.Option value={OrderStatus.DEFECTED}>
                  Defected
                </Select.Option>
              </Select>
            </FilterDropdown>
          )}
          render={(_, record) => {
            if (record.status === OrderStatus.PENDING) {
              return (
                <Select
                  value={record.status}
                  style={{ width: "10rem" }}
                  aria-readonly
                  dropdownStyle={{ display: "none" }}
                  status="error"
                >
                  <Select.Option value={OrderStatus.PENDING}>
                    Pending
                  </Select.Option>
                  <Select.Option value={OrderStatus.INPROCESS}>
                    In Process
                  </Select.Option>
                  <Select.Option value={OrderStatus.FULFILLED}>
                    Fulfilled
                  </Select.Option>
                  <Select.Option value={OrderStatus.CANCELLED}>
                    Cancelled
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
                aria-readonly
                dropdownStyle={{ display: "none" }}
              >
                <Select.Option value={OrderStatus.PENDING}>
                  Pending
                </Select.Option>
                <Select.Option value={OrderStatus.INPROCESS}>
                  In Process
                </Select.Option>
                <Select.Option value={OrderStatus.FULFILLED}>
                  Fulfilled
                </Select.Option>
                <Select.Option value={OrderStatus.CANCELLED}>
                  Cancelled
                </Select.Option>
                <Select.Option value={OrderStatus.DEFECTED}>
                  Defected
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
          render={(_, record) => <DateField value={record.created_at} format="DD/MM//YYYY" />}
        />
        <Table.Column<Database["public"]["Tables"]["ORDERS"]["Row"]>
          title="Action"
          dataIndex="id"
          render={(_, record) => (
            <Space>
              <EditButton recordItemId={record.id} size="small" title="Edit" />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
