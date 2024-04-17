import {
  DateField,
  EditButton,
  List,
  SaveButton,
  useEditableTable,
  useTable,
} from "@refinedev/antd";
import { useGetIdentity, useGo, useList } from "@refinedev/core";
import { Database } from "@repo/graphql";
import { transactionStatusColor } from "@repo/ui";
import {
  Button,
  Empty,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Skeleton,
  Space,
  Table,
  Typography,
} from "antd";
import React from "react";

export const MoneyHome = () => {
  const go = useGo();
  const { data: User } = useGetIdentity<any>();
  const {
    tableProps,
    tableQueryResult,
    formProps,
    isEditing,
    setId: setEditId,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
    filters,
  } = useEditableTable<Database["public"]["Tables"]["transfers"]["Row"]>({
    resource: "transfers",
    hasPagination: false,
    filters: {
      permanent: [
        {
          operator: "or",
          value: [
            {
              field: "user_id",
              operator: "eq",
              value: User?.id,
            },
            // {
            //   field: "to_user_id",
            //   operator: "eq",
            //   value: User.id,
            // },
          ],
        },
      ],
    },
    sorters: {
      permanent: [
        {
          field: "id",
          order: "desc",
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
  if (tableProps.loading) return <Skeleton.Node active></Skeleton.Node>;
  return (
    <List
      headerButtons={
        <Flex gap={5}>
          <Button onClick={() => go({ to: "/money/all-transactions" })}>
            All Transactions
          </Button>
          <Button onClick={() => go({ to: "/money/requests" })}>
            Requests
          </Button>
        </Flex>
      }
    >
      {tableQueryResult.data?.data?.length || 0 > 0 ? (
        <>
          <Flex justify="space-between" align="center">
            <Typography.Title level={3}>
              Total Funds {tableQueryResult?.data?.data[0].total_money}
            </Typography.Title>
          </Flex>
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
                  title: "id",
                  dataIndex: "id",
                  key: "id",
                },
                {
                  title: "From User",
                  dataIndex: "from_user_id",
                  key: "from_user_id",
                  render: (value) => {
                    if (!Users || isLoadingUsers)
                      return <Skeleton.Input active />;
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
                  title: "To User",
                  dataIndex: "to_user_id",
                  key: "to_user_id",
                  render: (value) => {
                    if (!Users || isLoadingUsers)
                      return <Skeleton.Input active />;
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
                  key: "amount",
                  render: (value, record) => {
                    if (isEditing(record.id)) {
                      return (
                        <Form.Item name="amount" style={{ margin: 0 }}>
                          <InputNumber />
                        </Form.Item>
                      );
                    }
                    return value;
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
                // {
                //   title: "Customer",
                //   dataIndex: "customer_id",
                //   key: "customer_id",
                //   render: (value) => {
                //     if (!Customers || isLoadingCustomers)
                //       return <Skeleton.Input active />;
                //     return (
                //       <>
                //         <Typography.Text>
                //           {Customers.data?.find(
                //             (customer) => customer.id === value
                //           )?.full_name ?? "-"}
                //         </Typography.Text>
                //       </>
                //     );
                //   },
                // },
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
                  title: "Total Money",
                  dataIndex: "total_money",
                  key: "total_money",
                  render: (value) => <Typography.Text>{value}</Typography.Text>,
                },
                {
                  title: "Date",
                  dataIndex: "created_at",
                  key: "created_at",
                  render: (value) => (
                    <DateField value={value} format="DD/MM/YYYY" />
                  ),
                },
                {
                  title: "Actions",
                  dataIndex: "actions",
                  render: (_, record: any) => {
                    if (isEditing(record.id)) {
                      return (
                        <Space>
                          <SaveButton
                            {...saveButtonProps}
                            hideText
                            size="small"
                          />
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
        </>
      ) : (
        <Empty />
      )}
    </List>
  );
};
