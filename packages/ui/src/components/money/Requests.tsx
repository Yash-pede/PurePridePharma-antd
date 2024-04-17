import {
  EditButton,
  SaveButton,
  useEditableTable,
  useTable,
} from "@refinedev/antd";
import { useGetIdentity, useList } from "@refinedev/core";
import { Database } from "@repo/graphql";
import {
  Button,
  Form,
  Input,
  List,
  Select,
  Skeleton,
  Space,
  Table,
  Typography,
} from "antd";
import React from "react";
import { transactionStatusColor } from "../../utility";

export const RequestsMoney = () => {
  const { data: User } = useGetIdentity<any>();
  const {
    tableProps,
    formProps,
    isEditing,
    setId: setEditId,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
    filters,
    tableQueryResult,
  } = useEditableTable<Database["public"]["Tables"]["transfers"]["Row"]>({
    resource: "transfers",
    meta: {
      fields: ["id", "amount", "status", "from_user_id", "to_user_id"],
    },
    filters: {
      permanent: [
        {
          field: "to_user_id",
          operator: "eq",
          value: User?.id,
        },
        {
          field: "status",
          operator: "eq",
          value: "Requested",
        },
      ],
    },
  });

  const { data: Users, isLoading: isLoadingUsers } = useList<
    Database["public"]["Tables"]["profiles"]["Row"]
  >({
    resource: "profiles",
    filters: [
      {
        field: "id",
        operator: "in",
        value: [
          tableQueryResult?.data?.data
            .filter((item) => item.from_user_id)
            .map((item) => item.from_user_id),
          tableQueryResult?.data?.data
            .filter((item) => item.to_user_id)
            .map((item) => item.to_user_id),
        ],
      },
    ],
    queryOptions: {
      enabled: !!User && !!tableQueryResult?.data?.data.length,
    },
  });

  return (
    <List header={<Typography.Title>Requests</Typography.Title>}>
      <Form {...formProps}>
        <Table
          {...tableProps}
          key={"id"}
          bordered
          rowKey="id"
          onRow={(record) => ({
            // eslint-disable-next-line
            onClick: (event: any) => {
              if (event.target.nodeName === "TD") {
                setEditId && setEditId(record.id);
              }
            },
          })}
          columns={[
            {
              title: "ID",
              dataIndex: "id",
            },
            {
              title: "From User",
              dataIndex: "from_user_id",
              key: "from_user_id",
              render: (value) => {
                if (!Users || isLoadingUsers) return <Skeleton.Input active />;
                return (
                  <>
                    <Typography.Text>
                      {Users.data?.find((user) => user.id == value)
                        ?.full_name ?? "-"}
                    </Typography.Text>
                  </>
                );
              },
            },
            {
              title: "Amount",
              dataIndex: "amount",
              render: (value, record) => {
                if (isEditing(record.id) && record.status === "Requested") {
                  return (
                    <Form.Item name="amount" style={{ margin: 0 }}>
                      <Input />
                    </Form.Item>
                  );
                }
                return value;
              },
            },
            {
              title: "To User",
              dataIndex: "to_user_id",
              key: "to_user_id",
              render: (value) => {
                if (!Users || isLoadingUsers) return <Skeleton.Input active />;
                return (
                  <>
                    <Typography.Text>
                      {Users.data?.find((user) => user.id == value)
                        ?.full_name ?? "-"}
                    </Typography.Text>
                  </>
                );
              },
            },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              render: (value, record) => {
                if (isEditing(record.id)) {
                  return (
                    <Form.Item name="status" style={{ margin: 0 }}>
                      <Select
                        style={{ width: "100%" }}
                        options={[
                          {
                            title: "Approved",
                            value: "Approved",
                          },
                          {
                            title: "Requested",
                            value: "Requested",
                          },
                        ]}
                      />
                    </Form.Item>
                  );
                }
                return (
                  <Button
                    type="primary"
                    size="small"
                    style={{
                      backgroundColor: transactionStatusColor(value),
                    }}
                  >
                    {value}
                  </Button>
                );
              },
            },
            {
              title: "Description",
              dataIndex: "description",
              key: "description",

              render: (value, record) => {
                if (isEditing(record.id)) {
                  return (
                    <Form.Item name="description" style={{ margin: 0 }}>
                      <Input.TextArea />
                    </Form.Item>
                  );
                }
                return value;
              },
            },
            {
              title: "Actions",
              dataIndex: "actions",
              render: (_, record: any) => {
                if (isEditing(record.id)) {
                  return (
                    <Space>
                      <SaveButton {...saveButtonProps} hideText size="small" />
                      <Button {...cancelButtonProps} size="small">
                        Cancel
                      </Button>
                    </Space>
                  );
                }
                return (
                  <Space size="small">
                    <EditButton
                      {...editButtonProps(record.id)}
                      hideText
                      size="small"
                    />
                  </Space>
                );
              },
            },
          ]}
        />
      </Form>
    </List>
  );
};

