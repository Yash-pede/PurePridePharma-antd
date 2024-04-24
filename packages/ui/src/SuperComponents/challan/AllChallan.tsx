import React from "react";
import {
  Flex,
  Input,
  Table,
  Typography,
} from "antd";
import {
  FilterDropdown,
  List,
  ShowButton,
  getDefaultSortOrder,
  useTable,
} from "@refinedev/antd";
import { Database } from "@repo/graphql";
import { SearchOutlined } from "@ant-design/icons";

export const AllChallan = ({ sales }: { sales?: boolean }) => {

  const { tableProps, tableQueryResult, sorter } = useTable<
    Database["public"]["Tables"]["challan"]["Row"]
  >({
    sorters: {
      initial: [
        {
          field: "created_at",
          order: "desc",
        },
      ],
    },
  });
  return (
    <List canCreate={false}>
      <Flex justify="space-between" align="center" gap={2}>
        <Typography.Paragraph>
          Total:{" "}
          {tableQueryResult.data?.data.reduce((a, b) => a + b.total_amt, 0)}
        </Typography.Paragraph>
        <Typography.Paragraph>
          Pending:{" "}
          {tableQueryResult.data?.data.reduce((a, b) => a + b.pending_amt, 0)}
        </Typography.Paragraph>
        <Typography.Paragraph>
          Received:{" "}
          {tableQueryResult.data?.data.reduce((a, b) => a + b.received_amt, 0)}
        </Typography.Paragraph>
      </Flex>
      <Table {...tableProps} rowKey="id" bordered>
        <Table.Column
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("id", sorter)}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props} mapValue={(value) => value}>
              <Input />
            </FilterDropdown>
          )}
          dataIndex="id"
          title="ID"
        />
        <Table.Column
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("total_amt", sorter)}
          dataIndex="total_amt"
          title="Total"
        />
        <Table.Column
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("pending_amt", sorter)}
          dataIndex="pending_amt"
          title="Pending"
        />
        <Table.Column
          sorter={{ multiple: 2 }}
          defaultSortOrder={getDefaultSortOrder("received_amt", sorter)}
          dataIndex="received_amt"
          title="Received"
        />
        <Table.Column
          title="Action"
          render={(row) => <ShowButton recordItemId={row.id} />}
        />
      </Table>
    </List>
  );
};
