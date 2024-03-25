import { Database, PROFILES_QUERY } from "@repo/graphql";
import {
  CreateButton,
  EditButton,
  FilterDropdown,
  List,
  SaveButton,
  Show,
  TextField,
  useEditableTable,
} from "@refinedev/antd";
import { Button, Form, Input, Select, Space, Table } from "antd";
import { getDefaultFilter } from "@refinedev/core";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import { UserRoleTypes } from "@repo/utility";

export const Users = ({ children }: { children?: React.ReactNode }) => {
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
          key: "userrole",
          operator: "or",
          value: [
            {
              field: "userrole",
              operator: "eq",
              value: UserRoleTypes.DISTRIBUTORS,
            },
            {
              field: "userrole",
              operator: "eq",
              value: UserRoleTypes.SALES,
            },
            {
              field: "userrole",
              operator: "eq",
              value: UserRoleTypes.UNDEFINED,
            },
          ],
        },
      ],
    },
    sorters: {
      initial: [
        {
          field: "username",
          order: "asc",
        },
      ],
    },
  });
  return (
    <List canCreate>
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
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown
                {...props}
                filters={tableQueryResult?.data?.filters}
              >
                <Select style={{ width: "10rem" }}
                  placeholder="Select a role"
                  options={[
                    {
                      label: UserRoleTypes.CUSTOMERS,
                      value: UserRoleTypes.CUSTOMERS,
                    },
                    {
                      label: UserRoleTypes.SALES,
                      value: UserRoleTypes.SALES,
                    },
                    {
                      label: UserRoleTypes.DISTRIBUTORS,
                      value: UserRoleTypes.DISTRIBUTORS,
                    },
                  ]}
                />
              </FilterDropdown>
            )}
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <Form.Item name="status" style={{ margin: 0 }}>
                    <Select
                      defaultValue={value}
                      placeholder="Select a status"
                      options={[
                        {
                          label: UserRoleTypes.CUSTOMERS,
                          value: UserRoleTypes.CUSTOMERS,
                        },
                        {
                          label: UserRoleTypes.SALES,
                          value: UserRoleTypes.SALES,
                        },
                        {
                          label: UserRoleTypes.DISTRIBUTORS,
                          value: UserRoleTypes.DISTRIBUTORS,
                        },
                      ]}
                    />
                  </Form.Item>
                );
              }
              return (
                <Select
                  status="warning"
                  style={{ width: "100%" }}
                  value={value}
                  onDropdownVisibleChange={() => {
                    setEditId && setEditId(record.id);
                  }}
                />
              );
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
      {children}
      {/* <pre>{JSON.stringify(tableQueryResult?.data, null, 2)}</pre> */}
    </List>
  );
};
