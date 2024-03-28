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
  useEditableTable,
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
        userrole:record.userrole,
        phone: record.phone || "-",
        updated_at: dayjs(record.updated_at).format("DD/MM/YYYY"),
      }
    },
    exportOptions: {
      filename: "Sales Details",
    },
  })

  return (
    <>
      <List
        headerButtons={
          <Flex gap={16}>
            <ExportButton loading={isLoading} onClick={triggerExport} />
            <CreateButton/>
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
                <FilterDropdown
                  {...props}
                  filters={tableQueryResult?.data?.filters}
                >
                  <Input placeholder="Search username" />
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
                <FilterDropdown
                  {...props}
                  filters={tableQueryResult?.data?.filters}
                >
                  <Input placeholder="Search email" />
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
              dataIndex={"userrole"}
              title="Role"
              defaultFilteredValue={getDefaultFilter(
                "userrole",
                tableQueryResult?.data?.filters
              )}
              render={(value, record) => {
                return (
                  <Select
                    style={{ width: "100%" }}
                    value={value}
                    dropdownStyle={{ display: "none" }}
                  />
                );
              }}
            />

            <Table.Column<Database["public"]["Tables"]["profiles"]["Row"]>
              dataIndex={"phone"}
              title="phone"
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
