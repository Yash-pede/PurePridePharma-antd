import { DateField, useTable } from "@refinedev/antd";
import { useGo, useList, useOne } from "@refinedev/core";
import { Database } from "@repo/graphql";
import { Button, Flex, List, Skeleton, Table, Typography } from "antd";
import React from "react";
import { useLocation, useParams } from "react-router-dom";

export const DistributorById = ({ sales }: { sales?: boolean }) => {
  const param = useLocation();
  const go = useGo();
  const D_ID = param.pathname.split("/").pop();
  const { data: distributor } = useOne({
    resource: "profiles",
    id: D_ID,
  });

  const { tableProps, tableQueryResult } = useTable<
    Database["public"]["Tables"]["challan"]["Row"]
  >({
    resource: "challan",
    filters: {
      permanent: [
        {
          field: sales ? "sales_id" : "distributor_id",
          operator: "eq",
          value: D_ID,
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
  const { data: products, isLoading: isLoadingProducts } = useList<
    Database["public"]["Tables"]["PRODUCTS"]["Row"]
  >({
    resource: "PRODUCTS",
    filters: [
      {
        field: "id",
        operator: "in",
        value: tableQueryResult?.data?.data.flatMap((challan: any) =>
          challan.product_info.map((item: any) => item.product_id)
        ),
      },
    ],
    queryOptions: {
      enabled: !!tableQueryResult,
    },
  });

  const { data: salesData, isLoading: isLoadingSales } = useList<
    Database["public"]["Tables"]["profiles"]["Row"]
  >({
    resource: "profiles",
    filters: [
      {
        field: "id",
        operator: "in",
        value: tableQueryResult?.data?.data
          .filter((challan) => challan.sales_id)
          .map((challan) => [challan.sales_id]),
      },
    ],
  });

  return (
    <List>
      <Typography.Title level={2}>
        {distributor?.data?.full_name}
      </Typography.Title>
      <Flex gap={2} justify="space-between">
        <Typography.Title level={4}>
          Challan Count:{tableQueryResult?.data?.data.length}{" "}
        </Typography.Title>
        <Typography.Title level={4}>
          Total:{" "}
          {tableQueryResult?.data?.data.reduce((a, b) => a + b.total_amt, 0)}
        </Typography.Title>
        <Typography.Title level={4}>
          Pending:{" "}
          {tableQueryResult?.data?.data.reduce((a, b) => a + b.pending_amt, 0)}
        </Typography.Title>
        <Typography.Title level={4}>
          Received:{" "}
          {tableQueryResult?.data?.data.reduce((a, b) => a + b.received_amt, 0)}
        </Typography.Title>
        <Typography.Title level={4}>
          Billed:{" "}
          {tableQueryResult?.data?.data.reduce((a, b) => a + b.bill_amt, 0)}
        </Typography.Title>
      </Flex>
      <Table
        {...tableProps}
        rowKey={"id"}
        expandable={{
          expandedRowRender: (record) => (
            <Table
              size="small"
              dataSource={record.product_info}
              rowKey={(record) => record.product_id}
              columns={[
                {
                  title: "Product ID",
                  dataIndex: "product_id",
                  key: "product_id",
                  render: (value: any) => {
                    if (!products || isLoadingProducts)
                      return <Skeleton.Input active />;
                    return (
                      <>
                        <Typography.Text>
                          {
                            products.data?.find(
                              (product) => product.id === value
                            )?.name
                          }
                        </Typography.Text>
                      </>
                    );
                  },
                },
                {
                  title: "Quantity",
                  dataIndex: "quantity",
                  key: "quantity",
                },
                {
                  title: "Discount",
                  dataIndex: "discount",
                  key: "discount",
                },
              ]}
              pagination={false}
            />
          ),
        }}
        columns={[
          {
            title: "No",
            dataIndex: "no",
            key: "no",
            render: (_: any, record: any, index: number) => index + 1,
          },
          {
            title: "Sales",
            dataIndex: "sales_id",
            key: "sales_id",
            render: (_: any, record: any) => (
              <Button
                type="link"
                onClick={() => go({ to: `/reports/sales/${record.sales_id}` })}
              >
                {
                  salesData?.data?.find(
                    (salesData) => salesData.id === record.sales_id
                  )?.full_name
                }
              </Button>
            ),
          },
          {
            title: "Challan ID",
            dataIndex: "challan_id",
            key: "challan_id",
            render: (_: any, record: any) => (
              <Button
                type="link"
                onClick={() =>
                  go({
                    to: { action: "show", resource: "challan", id: record.id },
                  })
                }
              >
                {record.id}
              </Button>
            ),
          },
          {
            title: "total amount",
            dataIndex: "total_amt",
            key: "total_amt",
            render: (value: any) => <Typography.Text>{value}</Typography.Text>,
          },
          {
            title: "received amount",
            dataIndex: "received_amt",
            key: "received_amt",
            render: (value: any) => <Typography.Text>{value}</Typography.Text>,
          },
          {
            title: "pending amount",
            dataIndex: "pending_amt",
            key: "pending_amt",
            render: (value: any) => <Typography.Text>{value}</Typography.Text>,
          },
          {
            title: "bill amount",
            dataIndex: "bill_amt",
            key: "bill_amt",
            render: (value: any) => <Typography.Text>{value}</Typography.Text>,
          },
          {
            title: "Date",
            dataIndex: "created_at",
            key: "created_at",
            render: (value: any) => (
              <DateField value={value} format="DD/MM/YYYY" />
            ),
          },
        ]}
      />
    </List>
  );
};
