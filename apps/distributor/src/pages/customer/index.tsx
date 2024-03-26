import {
  EditButton,
  List,
  SaveButton,
  TextField,
  useEditableTable,
} from "@refinedev/antd";
import { useGetIdentity, useList } from "@refinedev/core";
import { Database, GET_ALL_PROFILES_QUERY } from "@repo/graphql";
import { UserRoleTypes } from "@repo/utility";
import { Button, Form, Input, Select, Space, Table } from "antd";

export const CustomerHome = ({ children }: { children?: React.ReactNode }) => {
  const { data: User } = useGetIdentity<any>();
  const {
    tableProps,
    formProps,
    isEditing,
    setId: setEditId,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
  } = useEditableTable<Database["public"]["Tables"]["CUSTOMERS"]["Row"]>({
    resource: "CUSTOMERS",
    filters: {
      permanent: [
        {
          field: "distributor_id",
          operator: "eq",
          value: User?.id,
        },
      ],
    },
    sorters: {
      initial: [
        {
          field: "id",
          order: "asc",
        },
      ],
    },
  });
  const { data: SalesUserList, isLoading: SalesUserListLoading } = useList<
    Database["public"]["Tables"]["profiles"]["Row"]
  >({
    resource: "profiles",
    filters: [
      {
        field: "userrole",
        operator: "eq",
        value: UserRoleTypes.SALES,
      },
      {
        field: "boss_id",
        operator: "eq",
        value: User?.id,
      },
    ],
    sorters: [
      {
        field: "id",
        order: "asc",
      }
    ]
  });

  return (
    <>
      <div>
        <List>
          <Form {...formProps}>
            <Table
              {...tableProps}
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
              <Table.Column dataIndex="id" title="ID" hidden />

              <Table.Column<Database["public"]["Tables"]["CUSTOMERS"]["Row"]>
                dataIndex="full_name"
                title="Full Name"
                render={(value, record) => {
                  if (isEditing(record.id)) {
                    return (
                      <Form.Item name="full_name" style={{ margin: 0 }}>
                        <Input />
                      </Form.Item>
                    );
                  }
                  return <TextField value={value} />;
                }}
              />

              <Table.Column<Database["public"]["Tables"]["CUSTOMERS"]["Row"]>
                dataIndex="email"
                title="Email"
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

              <Table.Column<Database["public"]["Tables"]["CUSTOMERS"]["Row"]>
                dataIndex="phone"
                title="Phone"
                render={(value, record) => {
                  if (isEditing(record.id)) {
                    return (
                      <Form.Item name="phone" style={{ margin: 0 }}>
                        <Input />
                      </Form.Item>
                    );
                  }
                  return <TextField value={"+91  " + value} />;
                }}
              />

              <Table.Column<Database["public"]["Tables"]["CUSTOMERS"]["Row"]>
                dataIndex="sales_id"
                title="Sales Person"
                render={(value, record) => {
                  if (isEditing(record.id)) {
                    return (
                      <Form.Item name="sales_id" style={{ margin: 0 }}>
                        <Select>
                          {SalesUserList?.data.map((user) => (
                            <Select.Option key={user.id} value={user.id}>
                              {user.username}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    );
                  }
                  return  <TextField value={SalesUserList?.data.find((user) => user.id === value)?.username} />
                }}
              />

              <Table.Column<Database["public"]["Tables"]["CUSTOMERS"]["Row"]>
                title="Actions"
                dataIndex="actions"
                render={(_, record) => {
                  if (isEditing(record.id)) {
                    return (
                      <Space>
                        <SaveButton
                          {...saveButtonProps}
                          hideText
                          size="small"
                        />
                        <Button {...cancelButtonProps} size="small">
                          Cancel
                        </Button>
                      </Space>
                    );
                  }
                  return (
                    <EditButton
                      {...editButtonProps(record.id)}
                      hideText
                      size="small"
                    />
                  );
                }}
              />
            </Table>
          </Form>
        </List>
      </div>
      {children}
    </>
  );
};
