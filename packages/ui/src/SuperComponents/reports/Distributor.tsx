import React from "react";
import { Show, useTable } from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { Database } from "@repo/graphql";
import { UserRoleTypes } from "@repo/utility";
import { Table } from "antd";

export const DistributorReport = () => {
  const go = useGo();
  const { tableProps } = useTable<
    Database["public"]["Tables"]["profiles"]["Row"]
  >({
    resource: "profiles",
    filters: {
      permanent: [
        {
          field: "userrole",
          operator: "eq",
          value: UserRoleTypes.DISTRIBUTORS,
        },
      ],
    },
  });
  return (
    <Show>
      <Table
        {...tableProps}
        rowKey={"id"}
        onRow={(record) => ({
          style: {
            cursor: "pointer",
          },
          onClick: () => {
            go({ to: `${record.id}` });
          },
        })}
        columns={[
          { hidden: true, title: "id", dataIndex: "id", key: "id" },
          {
            title: "Name",
            dataIndex: "full_name",
            key: "full_name",
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
          },
        ]}
      />
    </Show>
  );
};
