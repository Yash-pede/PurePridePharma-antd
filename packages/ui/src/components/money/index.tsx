import { CreateButton, DateField, List, useTable } from "@refinedev/antd";
import { useGetIdentity, useGo, useList } from "@refinedev/core";
import { Database } from "@repo/graphql";
import { Button, Empty, Flex, Skeleton, Table, Typography } from "antd";
import React from "react";
import { transactionStatusColor } from "../../utility";

export const FundsHome = ({ sales }: { sales?: boolean }) => {
  const { data: User } = useGetIdentity<any>();
  const go = useGo();
  const { tableProps, tableQueryResult } = useTable<
    Database["public"]["Tables"]["transfers"]["Row"]
  >({
    resource: "transfers",
    hasPagination: false,
    filters: {
      permanent: [
        {
          field: "user_id",
          operator: "eq",
          value: User?.id,
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
  const { data: Customers, isLoading: isLoadingCustomers } = useList<
    Database["public"]["Tables"]["CUSTOMERS"]["Row"]
  >({
    resource: "CUSTOMERS",
    filters: [
      {
        field: "id",
        operator: "in",
        value: tableQueryResult?.data?.data
          .filter((item) => item.customer_id)
          .map((item) => item.customer_id),
      },
    ],
    queryOptions: {
      enabled: !!User && !!tableQueryResult?.data?.data,
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
  if (tableProps.loading) return <Skeleton active></Skeleton>;
  return (
    <List
      headerButtons={
        <Flex gap={5}>
          <Button
            hidden={
              !!tableQueryResult.data?.data.find(
                (item) => item.status === "Requested"
              ) || sales
            }
            onClick={() => go({ to: "/money/requests" })}
          >
            Requests
          </Button>
          <CreateButton />
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
          <Table
            {...tableProps}
            rowKey={(row) => row.id}
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
              },
              {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render: (value) => (
                  <Button
                    type="primary"
                    size="small"
                    style={{ backgroundColor: transactionStatusColor(value) }}
                  >
                    {value}
                  </Button>
                ),
              },
              {
                title: "Customer",
                dataIndex: "customer_id",
                key: "customer_id",
                render: (value) => {
                  if (!Customers || isLoadingCustomers)
                    return <Skeleton.Input active />;
                  return (
                    <>
                      <Typography.Text>
                        {Customers.data?.find(
                          (customer) => customer.id === value
                        )?.full_name ?? "-"}
                      </Typography.Text>
                    </>
                  );
                },
              },
              {
                title: "Description",
                dataIndex: "description",
                key: "description",
                render: (value) => <Typography.Text>{value}</Typography.Text>,
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
            ]}
          />
        </>
      ) : (
        <Empty />
      )}
    </List>
  );
};
