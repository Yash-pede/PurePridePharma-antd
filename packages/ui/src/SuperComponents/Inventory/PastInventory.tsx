import { SearchOutlined } from "@ant-design/icons";
import {
  DateField,
  DeleteButton,
  EditButton,
  ExportButton,
  FilterDropdown,
  SaveButton,
  Show,
  TextField,
  getDefaultSortOrder,
  useEditableTable,
  useSelect,
} from "@refinedev/antd";
import { getDefaultFilter, useExport, useGo, useList } from "@refinedev/core";
import { Database } from "@repo/graphql";
import {
  Button,
  Flex,
  Form,
  InputNumber,
  Select,
  Skeleton,
  Space,
  Table,
} from "antd";
import dayjs from "dayjs";

export const PastInventory = ({ children }: { children?: React.ReactNode }) => {
  const go = useGo();
  const {
    tableProps,
    formProps,
    isEditing,
    setId: setEditId,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
    tableQueryResult,
    filters,
    sorter,
  } = useEditableTable<Database["public"]["Tables"]["STOCKS"]["Row"]>({
    resource: "STOCKS",
    pagination: {
      pageSize: 12,
    },
    filters: {
      permanent: [
        {
          field: "avalable_quantity",
          operator: "eq",
          value: 0,
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
  const { data: products, isLoading: isLoadingProducts } = useList({
    resource: "PRODUCTS",
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
    filters: [
      {
        field: "product_id",
        operator: "in",
        value: tableQueryResult?.data?.data?.map((item) => item.product_id),
      },
      {
        field: "avalable_quantity",
        operator: "eq",
        value: 0,
      },
    ],
    download: true,
    onError(error) {
      console.error(error);
    },
    mapData: (record) => {
      return {
        product_id: record.product_id,
        id: record.id,
        avalable_quantity: record.avalable_quantity,
        orderd_quantity: record.orderd_quantity,
        expiry_date: dayjs(record.expiry_date).format("DD-MM-YYYY"),
        created_at: dayjs(record.created_at).format("DD-MM-YYYY"),
      };
    },
    exportOptions: {
      filename: "inventory-past",
    },
  });
  const { selectProps } = useSelect({
    resource: "STOCKS",
    optionLabel: "id",
    optionValue: "id",
    defaultValue: getDefaultFilter("STOCKS.id", filters, "in"),
  });
  const { selectProps: ProductSelectProps } = useSelect({
    resource: "PRODUCTS",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: getDefaultFilter("PRODUCTS.id", filters, "in"),
  });

  return (
    <>
      <Show title="Past Inventory"
        headerButtons={
          <Flex gap={10}>
            <Button
              type="primary"
              onClick={() => go({ to: "/inventory/product-wise" })}
            >
              Product wise
            </Button>
            <ExportButton onClick={triggerExport} loading={exportLoading} />
          </Flex>
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
            <Table.Column<Database["public"]["Tables"]["STOCKS"]["Row"]>
              dataIndex={"id"}
              title="Batch No"
              filterIcon={<SearchOutlined />}
              filterDropdown={(props) => (
                <FilterDropdown {...props} mapValue={(value) => value}>
                  <Select
                    style={{ minWidth: 200 }}
                    mode="multiple"
                    {...selectProps}
                  />
                </FilterDropdown>
              )}
            />

            <Table.Column<Database["public"]["Tables"]["STOCKS"]["Row"]>
              dataIndex={"product_id"}
              title="product"
              filterIcon={<SearchOutlined />}
              filterDropdown={(props) => (
                <FilterDropdown {...props} mapValue={(value) => value}>
                  <Select
                    style={{ minWidth: 200 }}
                    mode="multiple"
                    {...ProductSelectProps}
                  />
                </FilterDropdown>
              )}
              render={(_value, record) => {
                if (isLoadingProducts) {
                  return <Skeleton.Input active />;
                }
                return (
                  <Button
                    type="dashed"
                    onClick={() => {
                      go({
                        to: {
                          action: "show",
                          resource: "products",
                          id: _value,
                        },
                        options: { keepQuery: false },
                        type: "replace",
                      });
                    }}
                  >
                    {
                      products?.data.find(
                        (item) => item.id === record.product_id
                      )?.name
                    }
                  </Button>
                );
              }}
            />

            <Table.Column<Database["public"]["Tables"]["STOCKS"]["Row"]>
              dataIndex={"avalable_quantity"}
              title="Avalable Quantity"
              sorter={{ multiple: 2 }}
              defaultSortOrder={getDefaultSortOrder("id", sorter)}
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
              sorter={{ multiple: 2 }}
              defaultSortOrder={getDefaultSortOrder("id", sorter)}
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
              sorter={{ multiple: 2 }}
              defaultSortOrder={getDefaultSortOrder("id", sorter)}
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
              sorter={{ multiple: 2 }}
              defaultSortOrder={getDefaultSortOrder("id", sorter)}
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
      {children}
    </>
  );
};
