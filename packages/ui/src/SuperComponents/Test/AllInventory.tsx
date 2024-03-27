import {
  DateField,
  DeleteButton,
  EditButton,
  ExportButton,
  SaveButton,
  Show,
  TextField,
  useEditableTable,
} from "@refinedev/antd";
import { useExport, useList } from "@refinedev/core";
import {
  Database,
  GET_ALL_STOCKS_QUERY,
  GET_ALL_pRODUCTS_QUERY,
} from "@repo/graphql";
import { Button, Form, InputNumber, Skeleton, Space, Table } from "antd";
import dayjs from "dayjs";

export const AllInventory = () => {
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
    resource: "STOCKS",
    meta: {
      gqlQuery: GET_ALL_STOCKS_QUERY,
    },
    pagination: {
      pageSize: 12,
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

  const { triggerExport, isLoading: exportLoading } = useExport({
    resource: "STOCKS",
    metaData: {
      gqlQuery: GET_ALL_STOCKS_QUERY,
    },
    filters: [
      {
        field: "product_id",
        operator: "in",
        value: tableQueryResult?.data?.data?.map((item) => item.product_id),
      },
    ],
    download: true,
    onError(error) {
      console.log(error);
    },
    mapData: (record) => {
      return {
        product_id: record.product_id,
        id: record.id,
        selling_price: record.selling_price,
        avalable_quantity: record.avalable_quantity,
        orderd_quantity: record.orderd_quantity,
        expiry_date: dayjs(record.expiry_date).format("DD-MM-YYYY"),
        created_at: dayjs(record.created_at).format("DD-MM-YYYY"),
      };
    },
    exportOptions: {
      filename: "inventory",
    },
  });

  return (
    <Show
      headerButtons={
        <ExportButton onClick={triggerExport} loading={exportLoading} />
      }
    >
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
        >
          <Table.Column<Database["public"]["Tables"]["STOCKS"]["Row"]> dataIndex={"id"} title="Batch No" />

          <Table.Column<Database["public"]["Tables"]["STOCKS"]["Row"]>
            dataIndex={"product_id"}
            title="product"
            render={(_value, record) => {
              if (isLoadingProducts) {
                return <Skeleton.Input active />;
              }
              return (
                <Space>
                  {
                    products?.data.find((item) => item.id === record.product_id)
                      ?.name
                  }
                </Space>
              );
            }}
          />

          <Table.Column<Database["public"]["Tables"]["STOCKS"]["Row"]>
            dataIndex={"selling_price"}
            title="Selling Price"
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <Form.Item name="selling_price" style={{ margin: 0 }}>
                    <InputNumber />
                  </Form.Item>
                );
              }
              return <TextField value={value} />;
            }}
          />
          <Table.Column<Database["public"]["Tables"]["STOCKS"]["Row"]>
            dataIndex={"avalable_quantity"}
            title="Avalable Quantity"
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <Form.Item name="avalable_quantity" style={{ margin: 0 }}>
                    <InputNumber />
                  </Form.Item>
                );
              }
              return <TextField value={value} />;
            }}
          />
          <Table.Column<Database["public"]["Tables"]["STOCKS"]["Row"]>
            dataIndex={"orderd_quantity"}
            title="Ordered Quantity"
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <Form.Item name="orderd_quantity" style={{ margin: 0 }}>
                    <InputNumber />
                  </Form.Item>
                );
              }
              return <TextField value={value} />;
            }}
          />
          <Table.Column
            dataIndex={"created_at"}
            title="Created At"
            render={(value) => {
              return (
                <Space>
                  {/* <DatePicker defaultValue={dayjs(value)} /> */}
                  <DateField value={value} format="DD/MM/YYYY" />
                </Space>
              );
            }}
          />
          <Table.Column
            dataIndex={"expiry_date"}
            title="Expiry At"
            render={(value) => {
              return (
                <Space>
                  {/* <DatePicker defaultValue={dayjs(value)} /> */}
                  <DateField value={value} format="DD/MM/YYYY" />
                </Space>
              );
            }}
          />
          {/* <Table.Column
            dataIndex={"id"}
            title="Action"
            fixed="right"
            render={(value) => (
              <Space>
                <EditButton size="small" recordItemId={value} />
                <DeleteButton size="small" recordItemId={value} />
              </Space>
            )}
          /> */}
          <Table.Column<Database["public"]["Tables"]["STOCKS"]["Row"]>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => {
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
