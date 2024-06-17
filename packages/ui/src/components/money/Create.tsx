import { Create, useDrawerForm } from "@refinedev/antd";
import { useGetIdentity, useGo, useList, useOne } from "@refinedev/core";
import { Database } from "@repo/graphql";
import { UserRoleTypes } from "@repo/utility";
import { Button, Drawer, Form, Input, InputNumber } from "antd";
import React from "react";

export const CreateFundTransfer = ({ sales }: { sales?: boolean }) => {
  const { data: User } = useGetIdentity<any>();
  const go = useGo();

  const { data, isLoading } = useOne<
    Database["public"]["Tables"]["profiles"]["Row"]
  >({
    resource: "profiles",
    id: User?.id,
    queryOptions: {
      enabled: !!User && sales,
    },
  });

  const { drawerProps, saveButtonProps, formProps } = useDrawerForm<
    Database["public"]["Tables"]["transfers"]["Row"]
  >({
    action: "create",
    resource: "transfers",
    redirect: "list",
    defaultVisible: true,
  });

  const { data: users, isLoading: isLoadingUsers } = useList<
    Database["public"]["Tables"]["profiles"]["Row"]
  >({
    resource: "profiles",
    filters: [
      {
        field: "userrole",
        operator: "eq",
        value: sales ? UserRoleTypes.DISTRIBUTORS : UserRoleTypes.ADMIN,
      },
    ],
    queryOptions: {
      enabled: sales ? !isLoading : !!UserRoleTypes.ADMIN,
    },
  });

  return (
    <Create
      title={`Transfer to - ${
        sales
          ? users?.data.find((user) => user.id == data?.data.boss_id)
              ?.full_name || ""
          : users?.data.find((user) => user.userrole === UserRoleTypes.ADMIN)
              ?.userrole || ""
      }`}
      saveButtonProps={{ ...saveButtonProps }}
    >
      <Form {...formProps}>
        <Form.Item
          label="To"
          name="to_user_id"
          hidden
          initialValue={
            sales
              ? users?.data.find((user) => user.id == data?.data.boss_id)?.id ||
                ""
              : users?.data.find(
                  (user) => user.userrole === UserRoleTypes.ADMIN
                )?.id || ""
          }
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          hidden
          name="user_id"
          initialValue={User?.id}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          hidden
          name="from_user_id"
          initialValue={User?.id}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input readOnly />
        </Form.Item>
      </Form>
    </Create>
  );
};
