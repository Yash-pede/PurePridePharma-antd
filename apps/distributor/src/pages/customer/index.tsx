import {
  EditButton,
  List,
  SaveButton,
  TextField,
  useEditableTable,
} from "@refinedev/antd";
import { Database, GET_ALL_PROFILES_QUERY } from "@repo/graphql";
import { UserRoleTypes } from "@repo/utility";
import { Button, Form, Input, Space, Table } from "antd";

export const CustomerHome = ({ children }: { children?: React.ReactNode }) => {
  const {
    tableProps,
    formProps,
    isEditing,
    setId: setEditId,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
  } = useEditableTable<Database["public"]["Tables"]["profiles"]["Row"]>({
    resource: "profiles",
    meta: {
      gqlQuery: GET_ALL_PROFILES_QUERY,
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
          field: "username",
          order: "asc",
        },
      ],
    },
    pagination: {
      pageSize: 12,
    },
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

              <Table.Column<Database["public"]["Tables"]["profiles"]["Row"]>
                dataIndex="username"
                title="Username"
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

              <Table.Column<Database["public"]["Tables"]["profiles"]["Row"]>
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

              <Table.Column<Database["public"]["Tables"]["profiles"]["Row"]>
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
