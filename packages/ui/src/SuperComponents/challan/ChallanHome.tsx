import React from "react";
import { Modal, Table } from "antd";
import {
  List,
  ShowButton,
  useEditableTable,
  useModal,
  useTable,
} from "@refinedev/antd";
import { Database } from "@repo/graphql";
import { useGetIdentity } from "@refinedev/core";

export const ChallanHome = () => {
  const { data: User } = useGetIdentity<any>();
  const { tableProps, tableQueryResult, filters, sorter } = useTable<
    Database["public"]["Tables"]["challan"]["Row"]
  >({
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
  const { close, modalProps, show } = useModal();
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="total_amt" title="Total" />
        <Table.Column dataIndex="pending_amt" title="Pending" />
        <Table.Column dataIndex="received_amt" title="Received" />
        <Table.Column
          render={(row) => (
            <>
              <ShowButton recordItemId={row.id} />
            </>
          )}
        />
      </Table>
      <Modal {...modalProps} title="Challan" footer={null}>

      </Modal>
    </List>
  );
};
