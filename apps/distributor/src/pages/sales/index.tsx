import { SearchOutlined } from "@ant-design/icons";
import {
  CreateButton,
  DateField,
  EditButton,
  ExportButton,
  FilterDropdown,
  List,
  SaveButton,
  TextField,
  getDefaultSortOrder,
  useEditableTable,
  useSelect,
} from "@refinedev/antd";
import { getDefaultFilter, useExport, useGetIdentity, useGo } from "@refinedev/core";
import {
  Database,
  GET_ALL_PROFILES_QUERY,
  PROFILES_QUERY,
  Profiles,
} from "@repo/graphql";
import { UserRoleTypes } from "@repo/utility";
import { Button, Flex, Form, Input, InputNumber, Select, Space, Table } from "antd";
import dayjs from "dayjs";

export const SalesHome = ({ children }: { children?: React.ReactNode }) => {
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
  } = useEditableTable<Database["public"]["Tables"]["profiles"]["Row"]>({
    resource: "profiles",
    pagination: {
      pageSize: 10,
    },
    meta: {
      gqlQuery: PROFILES_QUERY,
    },
    filters: {
      permanent: [
        {
          field: "userrole",
          operator: "eq",
          value: UserRoleTypes.SALES,
        },
      ],
    },
    sorters: {
      initial: [
        {
          field: "updated_at",
          order: "asc",
        },
      ],
    },
  });

  const { isLoading, triggerExport } = useExport({
    resource: "profiles",
    filters: [{
      field: "userrole",
      operator: "eq",
      value: UserRoleTypes.SALES,
    },],
    sorters: [
      {
        field: "updated_at",
        order: "asc",
      },
    ],
    download: true,
    onError(error) {
      console.error(error);
    },
    mapData: (record) => {
      return {
        username: record.username,
        email: record.email || "-",
        userrole: record.userrole,
        phone: record.phone || "-",
        updated_at: dayjs(record.updated_at).format("DD/MM/YYYY"),
      }
    },
    exportOptions: {
      filename: "Sales Details",
    },
  })

  const { selectProps } = useSelect({
    resource: "profiles",
    optionLabel: "username",
    optionValue: "username",
    filters: [{
      field: "userrole",
      operator: "eq",
      value: UserRoleTypes.SALES,
    },],
    defaultValue: getDefaultFilter("profiles.username", filters, "in"),
  });

  const { selectProps: selectEmailProps } = useSelect({
    resource: "profiles",
    optionLabel: "email",
    optionValue: "email",
    filters: [{
      field: "userrole",
      operator: "eq",
      value: UserRoleTypes.SALES,
    },],
    defaultValue: getDefaultFilter("profiles.email", filters, "in"),
  });

  const { selectProps: selectPhoneProps } = useSelect({
    resource: "profiles",
    optionLabel: "phone",
    optionValue: "phone",
    filters: [{
      field: "userrole",
      operator: "eq",
      value: UserRoleTypes.SALES,
    },],
    defaultValue: getDefaultFilter("profiles.phone", filters, "in"),
  });

  return (
    <>
      <List
        headerButtons={
          <Flex gap={16}>
            <ExportButton loading={isLoading} onClick={triggerExport} />
            <CreateButton />
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
            <Table.Column<Database["public"]["Tables"]["profiles"]["Row"]>
              dataIndex={"username"}
              title="Username"
              defaultFilteredValue={getDefaultFilter(
                "username",
                tableQueryResult?.data?.filters
              )}
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
              render={(value, record) => {
                if (isEditing(record.id)) {
                  return (
                    <Form.Item name="username" style={{ margin: 0 }}>
                      <Input />
                    </Form.Item>
                  );
                }
                return <TextField value={value} />;
              }}
            />
            <Table.Column<Database["public"]["Tables"]["profiles"]["Row"]>
              dataIndex={"email"}
              title="email"
              defaultFilteredValue={getDefaultFilter(
                "email",
                tableQueryResult?.data?.filters
              )}
              filterIcon={<SearchOutlined />}
              filterDropdown={(props) => (
                <FilterDropdown {...props} mapValue={(value) => value}>
                  <Select
                    style={{ minWidth: 200 }}
                    mode="multiple"
                    {...selectEmailProps}
                  />
                </FilterDropdown>
              )}
              render={(value, record) => {
                if (isEditing(record.id)) {
                  return (
                    <Form.Item name="email" style={{ margin: 0 }}>
                      <Input />
                    </Form.Item>
                  );
                }
                return <TextField value={value} />;
              }}
            />

            <Table.Column<Database["public"]["Tables"]["profiles"]["Row"]>
              dataIndex={"phone"}
              title="phone"
              filterIcon={<SearchOutlined />}
              filterDropdown={(props) => (
                <FilterDropdown {...props} mapValue={(value) => value}>
                  <Select
                    style={{ minWidth: 200 }}
                    mode="multiple"
                    {...selectPhoneProps}
                  />
                </FilterDropdown>
              )}
              render={(value, record) => {
                if (isEditing(record.id)) {
                  return (
                    <Form.Item name="phone" style={{ margin: 0 }}>
                      <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                  );
                }
                return <TextField value={value} />;
              }}
            />

            <Table.Column<Database["public"]["Tables"]["profiles"]["Row"]>
              dataIndex={"updated_at"}
              title="Updated At"
              sorter={{ multiple: 2 }}
              defaultSortOrder={getDefaultSortOrder("updated_at", sorter)}
              render={(value, record) => {
                return <DateField value={value} format="DD/MM/YYYY" />;
              }}
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
                    {/* <DeleteButton hideText size="small" /> */}
                  </Space>
                );
              }}
            />
          </Table>
        </Form>
      </List>
      {children}
    </>
  );
};
