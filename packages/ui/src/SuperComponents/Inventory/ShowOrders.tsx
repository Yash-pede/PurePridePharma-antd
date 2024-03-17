import {
  DateField,
  DeleteButton,
  EditButton,
  NumberField,
  SaveButton,
  Show,
  useEditableTable,
} from "@refinedev/antd";
import { useList } from "@refinedev/core";
import {
  GET_ALL_ORDERS_QUERY,
  GET_ALL_pRODUCTS_QUERY,
  Orders,
} from "@repo/graphql";
import { OrderStatus } from "@repo/utility";
import { Button, Form, InputNumber, Select, Space, Table } from "antd";
import { useLocation } from "react-router-dom";

export const ShowOrders = () => {
  const userId = useLocation().pathname.split("/").pop();

  const {
    tableProps,
    formProps,
    isEditing,
    setId: setEditId,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
    tableQueryResult,
  } = useEditableTable({
    resource: "ORDERS",
    pagination: {
      pageSize: 12,
    },
    meta: {
      gqlQuery: GET_ALL_ORDERS_QUERY,
    },
    sorters: {
      initial: [
        {
          field: "created_at",
          order: "asc",
        },
      ],
    },
    filters: {
      initial: [
        {
          field: "user_id",
          operator: "eq",
          value: userId,
        },
      ],
    },
  });
  const { data: products, isLoading: isLoadingProducts } = useList({
    resource: "PRODUCTS",
    meta: {
      gqlQuery: GET_ALL_pRODUCTS_QUERY,
    },
    filters: [
      {
        field: "id",
        operator: "in",
        value: tableQueryResult?.data?.data?.map((item) => item.product_id),
      },
    ],
  });

  return (
    <Show canEdit={false} isLoading={isLoadingProducts}>
      {/* <pre>{JSON.stringify(tableQueryResult, null, 2)}</pre> */}
      <Form {...formProps}>
        <Table
          {...tableProps}
          bordered
          key={"id"}
          rowKey="id"
          onRow={(record) => ({
            // eslint-disable-next-line
            onClick: (event: any) => {
              if (event.target.nodeName === "TD") {
                setEditId && setEditId(record.id);
              }
            },
          })}
        >
          {/* <Table.Column<Orders>
            dataIndex={"product_id"}
            title="Product Name"
            render={(_value, record: Orders) => {
              const product = products?.data?.find(
                (item:any) => item.id === record.,
              );
              return <Space>{product?.name}</Space>;
            }}
          /> */}
          <Table.Column<Orders>
            dataIndex={"quantity"}
            title="quantity"
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <Form.Item name="quantity" style={{ margin: 0 }}>
                    <InputNumber />
                  </Form.Item>
                );
              }
              return <NumberField value={value} />;
            }}
          />
          <Table.Column<Orders>
            dataIndex={"status"}
            title="Status"
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <Form.Item name="status" style={{ margin: 0 }}>
                    <Select
                      placeholder="Select a status"
                      options={[
                        { label: "Pending", value: OrderStatus.PENDING },
                        { label: "Fulfilled", value: OrderStatus.FULFILLED },
                        { label: "Cancelled", value: OrderStatus.CANCELLED },
                        { label: "Inprocess", value: OrderStatus.INPROCESS },
                      ]}
                    />
                  </Form.Item>
                );
              }
              return (
                <Select
                  placeholder="Select a status"
                  defaultValue={value}
                  style={{ width: "100%" }}
                  onDropdownVisibleChange={() => {
                    setEditId && setEditId(record.id);
                  }}
                  options={[
                    { label: "Pending", value: OrderStatus.PENDING },
                    { label: "Fulfilled", value: OrderStatus.FULFILLED },
                    { label: "Cancelled", value: OrderStatus.CANCELLED },
                    { label: "Inprocess", value: OrderStatus.INPROCESS },
                  ]}
                />
              );
            }}
          />
          <Table.Column<Orders>
            dataIndex={"id"}
            title="id"
            hidden
            render={(_value, record) => <Space>{record.id || "-"}</Space>}
          />
          <Table.Column<Orders>
            dataIndex={"created_at"}
            title="Created At"
            render={(_value, record) => <DateField value={record.created_at} />}
          />
          <Table.Column
            title="Actions"
            dataIndex="actions"
            render={(_, record: any) => {
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
                  <DeleteButton
                    hideText
                    size="small"
                    recordItemId={record.id}
                    resource="STOCKS"
                    mutationMode="undoable"
                    errorNotification={{
                      message: "Failed to delete",
                      description:
                        "Please ensure their is no stock in the batch",
                      type: "error",
                    }}
                  />
                </Space>
              );
            }}
          />
        </Table>
      </Form>
    </Show>
  );
};
