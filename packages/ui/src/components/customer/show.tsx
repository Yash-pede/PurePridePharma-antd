import { DateField, Show, useTable } from "@refinedev/antd";
import { useList } from "@refinedev/core";
import { Database } from "@repo/graphql";
import { Flex, Skeleton, Table, Typography } from "antd";
import { useLocation } from "react-router-dom";

export const CustomerShow = ({ sales }: { sales?: boolean }) => {
  const customerId = useLocation().pathname.split("/").pop();

  const { tableProps, tableQueryResult: challan } = useTable<
    Database["public"]["Tables"]["challan"]["Row"]
  >({
    resource: "challan",
    filters: {
      permanent: [
        {
          field: "customer_id",
          operator: "eq",
          value: customerId,
        },
      ],
    },
  });

  const { data: products, isLoading: isLoadingProducts } = useList<
    Database["public"]["Tables"]["PRODUCTS"]["Row"]
  >({
    resource: "PRODUCTS",
  });
  const expandedRowRender = (record: any) => {
    const columns = [
      {
        title: "Discount",
        dataIndex: "discount",
        key: "discount",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Product",
        dataIndex: "product_id",
        key: "product_id",
        render: (value: any) => {
          if (!products || isLoadingProducts) return <Skeleton.Input active />;
          return (
            <>
              <Typography.Text>
                {products.data?.find((product) => product.id === value)?.name}
              </Typography.Text>
            </>
          );
        },
      },
    ];

    return (
      <Table
        rowKey={"product_id"}
        columns={columns}
        dataSource={record.product_info}
        pagination={false}
        bordered
        showHeader
      />
    );
  };
  return (
    <Show title="Customer Details" canEdit={false}>
      <Typography.Title level={3}>Customer Id: {customerId}</Typography.Title>
      <Flex gap={"16px"} style={{ padding: "16px" }}>
        <Typography.Paragraph>
          Total: {challan?.data?.data.reduce((a, b) => a + b.total_amt, 0)}
        </Typography.Paragraph>
        <Typography.Paragraph>
          Pending amount:{" "}
          {challan?.data?.data.reduce((a, b) => a + b.pending_amt, 0)}
        </Typography.Paragraph>
        <Typography.Paragraph>
          Received amount:{" "}
          {challan?.data?.data.reduce((a, b) => a + b.received_amt, 0)}
        </Typography.Paragraph>
      </Flex>
      <Table
        {...tableProps}
        rowKey={"id"}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
        columns={[
          {
            title: "Id",
            dataIndex: "id",
            key: "id",
          },
          {
            title: "Total amount",
            dataIndex: "total_amt",
          },
          {
            title: "Pending amount",
            dataIndex: "pending_amt",
          },
          {
            title: "Received amount",
            dataIndex: "received_amt",
          },
          {
            title: "Bill amount",
            dataIndex: "bill_amt",
          },
          {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            width: 200,
            render: (value) => (
              <DateField
                style={{ width: "100px" }}
                value={value}
                format="DD/MM/YYYY"
              />
            ),
          },
        ]}
      />
    </Show>
  );
};
