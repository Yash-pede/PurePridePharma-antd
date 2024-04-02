import React from "react";
import { Table } from "antd";
import { List, useEditableTable } from "@refinedev/antd";
import { Database } from "@repo/graphql";
import { useGetIdentity } from "@refinedev/core";

export const ChallanHome = () => {
  const { data: User } = useGetIdentity<any>();
  const {
    tableProps,
    formProps,
    isEditing,
    setId: setEditId,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
    tableQueryResult,
    filters,
    sorter,
  } = useEditableTable<Database["public"]["Tables"]["challan"]["Row"]>({
    pagination: {
      pageSize: 10,
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
          field: "created_at",
          order: "asc",
        },
      ],
    },
  });
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="order_id" title="orderId" />
        <Table.Column dataIndex="total_amt" title="Total" />
        <Table.Column dataIndex="pending_amt" title="Pending" />
        <Table.Column dataIndex="received_amt" title="Received" />
      </Table>
    </List>
  );
};
