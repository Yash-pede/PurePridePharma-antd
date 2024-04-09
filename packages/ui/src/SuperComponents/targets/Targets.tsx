import {
  EditButton,
  List,
  SaveButton,
  TextField,
  useEditableTable,
} from "@refinedev/antd";
import { HttpError, useList } from "@refinedev/core";
import { Database } from "@repo/graphql";
import { UserRoleTypes } from "@repo/utility";
import { Button, Checkbox, Form, Input, InputNumber, Space, Table } from "antd";
import dayjs from "dayjs";

export const Targets = () => {
  const {
    tableProps,
    formProps,
    isEditing,
    setId: setEditId,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
    formLoading,
  } = useEditableTable<
    Database["public"]["Tables"]["targets"]["Row"],
    HttpError
  >({
    resource: "targets",
    pagination: {
      pageSize: 10,
    },
  });

  const { data: Profiles, isLoading: ProfilesLoading } = useList({
    resource: "profiles",
    filters: [
      {
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
        ],
      },
    ],
  });
  return (
    <List>
      <Form {...formProps}>
        <Table
          {...tableProps}
          key={"id"}
          loading={ProfilesLoading || formLoading}
          bordered
          rowKey="id"
          onRow={(record) => ({
            onClick: (event: any) => {
              if (event.target.nodeName === "TD") {
                setEditId && setEditId(record.id);
              }
            },
          })}
        >
          <Table.Column<Database["public"]["Tables"]["targets"]["Row"]>
            dataIndex={"user_id"}
            title="User name  "  width={100}
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <Form.Item name="user_id" style={{ margin: 0 }} initialValue={  Profiles?.data.find((p) => p.id === value)?.username}>
                    <Input width={"100%"}
                      readOnly
                     style={{ width: "100px" }}
                    />
                  </Form.Item>
                );
              }
              return (
                <TextField style={{ minWidth: "100px" }}
                  value={Profiles?.data.find((p) => p.id === value)?.username}
                />
              );
            }}
          />
          <Table.Column<Database["public"]["Tables"]["targets"]["Row"]>
            dataIndex={"total"}
            title="Total"
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <Form.Item name="total" style={{ margin: 0 }} initialValue={value}>
                    <InputNumber />
                  </Form.Item>
                );
              }
              return <TextField value={value} />;
            }}
          />

          <Table.Column<Database["public"]["Tables"]["targets"]["Row"]>
            dataIndex={"target"}
            title="Target"
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <Form.Item name="target" style={{ margin: 0 }} initialValue={value}>
                    <InputNumber />
                  </Form.Item>
                );
              }
              return <TextField value={value} />;
            }}
          />

          <Table.Column<Database["public"]["Tables"]["targets"]["Row"]>
            dataIndex={"month"}
            title="Month/Year"
            render={(value, record) => {
              if (isEditing(record.id)) {
                return (
                  <Form.Item name="month" initialValue={dayjs(value).format("MMMM / YYYY")} style={{ margin: 0 }}>
                    <Input
                      readOnly
                    />
                  </Form.Item>
                );
              }
              return <TextField value={dayjs(value).format("MMMM / YYYY")} />;
            }}
          />

          <Table.Column<Database["public"]["Tables"]["targets"]["Row"]>
            title="Achived"
            render={(_, record) => {
              return (
                <Checkbox
                  checked={record.total >= (record.target || 0)}
                  type="checkbox"
                  title="Target Achieved"
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
                </Space>
              );
            }}
          />
        </Table>
      </Form>
    </List>
  );
};
