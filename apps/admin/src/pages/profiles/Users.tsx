import {
  Database,
  GET_ALL_PROFILES_QUERY,
  PROFILES_QUERY,
} from "@repo/graphql";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  ExportButton,
  FilterDropdown,
  List,
  SaveButton,
  TextField,
  useEditableTable,
  useSelect,
} from "@refinedev/antd";
import { Button, Flex, Form, Input, Select, Space, Table } from "antd";
import { getDefaultFilter, useExport } from "@refinedev/core";
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
    filters,
  } = useEditableTable<Database["public"]["Tables"]["profiles"]["Row"]>({
    resource: "profiles",
    pagination: {
      pageSize: 10,
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

  const { selectProps } = useSelect({
    resource: "profiles",
    optionLabel: "email",
    optionValue: "email",
    defaultValue: getDefaultFilter("profiles.email", filters, "in"),
  });

  const { selectProps: selectUsernameProps } = useSelect({
    resource: "profiles",
    optionLabel: "username",
    optionValue: "username",
    defaultValue: getDefaultFilter("profiles.username", filters, "in"),
  });

  const { triggerExport, isLoading: exportLoading } = useExport({
    resource: "profiles",
    metaData: {
      gqlQuery: GET_ALL_PROFILES_QUERY,
    },
    download: true,
    onError(error) {
      console.error(error);
    },
    mapData: (record) => {
      return {
        username: record.username || "-",
        email: record.email,
        role: record.userrole,
      };
    },
    exportOptions: {
      filename: "Profiles",
    },
  });

  return (
    <List
      headerButtons={
        <Flex gap={15}>
          <CreateButton />
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
          <Table.Column<Database["public"]["Tables"]["profiles"]["Row"]>
            dataIndex={"username"}
            title="Username"
            defaultFilteredValue={getDefaultFilter(
              "username",
              tableQueryResult?.data?.filters,
            )}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props} mapValue={(value) => value}>
                <Select
                  style={{ minWidth: 200 }}
                  mode="multiple"
                  {...selectUsernameProps}
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
              tableQueryResult?.data?.filters,
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
              tableQueryResult?.data?.filters,
            )}
            // filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown
                {...props}
                filters={tableQueryResult?.data?.filters}
              >
                <Select
                  style={{ width: "10rem" }}
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
              return (
                <Input readOnly value={value} />
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
                  <Button
                    style={{
                      borderColor: "#F4C430",
                      color: " #F4C430",
                    }}
                    type="dashed"
                    size="small"
                  >
                    Ban
                  </Button>
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
