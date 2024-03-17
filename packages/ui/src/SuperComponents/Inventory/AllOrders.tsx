import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  useTable,
  ExportButton,
} from "@refinedev/antd";
import { HttpError, useList, useExport } from "@refinedev/core";
import {
  GET_ALL_ORDERS_QUERY,
  GET_ALL_PROFILES_QUERY,
  Orders,
} from "@repo/graphql";
import { OrderStatus, UserRoleTypes } from "@repo/utility";
import { Form, Select, Space, Table,Button } from "antd";
import React from "react";
import dayjs from "dayjs";

export const AllOrders = () => {
  const { tableProps } = useTable<Orders, HttpError>({
    resource: "ORDERS",
    meta: {
      gqlQuery: GET_ALL_ORDERS_QUERY,
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
  const {isLoading:exportLoading,triggerExport} = useExport({
    resource: "ORDERS",
    meta: {
      gqlQuery: GET_ALL_ORDERS_QUERY,
    },
    download : true,
    onError(error) {
      console.error(error);
    },
    mapData: (record) => {
      return {
        distributor_name :  profiles?.data.find(
          (profile) => profile.id === record.distributor_id
        )?.username ||
        record.distributor_id.full_name ||
         record.distributor_id,
        id: record.id,
        status:record.status,
        created_at: dayjs(record.created_at).format("DD-MM-YYYY"),
      };
    },
    exportOptions: {
      filename: "orders",
    },

  })
  return (
    <List
    headerButtons={
      <ExportButton onClick={triggerExport} loading={exportLoading} />
    }
    >
      <Table {...tableProps}>
        <Table.Column<Orders> dataIndex="id" title="ID" />
        <Table.Column<Orders>
          dataIndex="distributor_id"
          title="username"
          render={(_, record) => {
            return (
              profiles?.data.find(
                (profile) => profile.id === record.distributor_id
              )?.username ||
              record.distributor_id.full_name ||
              "Unknown - " + record.distributor_id
            );
          }}
        />
        <Table.Column<Orders>
          dataIndex="distributor_id"
          title="Full name"
          render={(_, record) => {
            return (
              profiles?.data.find(
                (profile) => profile.id === record.distributor_id
              )?.full_name || "Unknown - " + record.distributor_id
            );
          }}
        />
        <Table.Column<Orders>
          dataIndex={"status"}
          title="Status"
          render={(_, record) => {
            return (
              <Select value={record.status} style={{ width: "10rem" }}>
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
        <Table.Column<Orders>
          dataIndex="created_at"
          title="Created At"
          render={(_, record) => <DateField value={record.created_at} />}
        />
        <Table.Column<Orders>
          title="Action"
          dataIndex="id"
          render={(_, record) => (
            <Space>
              <EditButton
                recordItemId={record.id}
                size="small"
                title="Edit"
              />
              <DeleteButton
                recordItemId={record.id}
                hideText
                resource="ORDERS"
                title="Delete"
                size="small"
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
