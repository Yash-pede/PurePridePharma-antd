import { Create, useDrawerForm, useSelect } from "@refinedev/antd";
import { useGetIdentity, useGo } from "@refinedev/core";
import { Database } from "@repo/graphql";
import { UserRoleTypes } from "@repo/utility";
import { Drawer, Form, Input, InputNumber, Select } from "antd";
import React from "react";

export const CreateFundTransfer = () => {
  const { data: User } = useGetIdentity<any>();
  const go = useGo();
  const { drawerProps, saveButtonProps, formProps } = useDrawerForm<
    Database["public"]["Tables"]["transfers"]["Row"]
  >({
    action: "create",
    resource: "transfers",
    redirect: "list",
    defaultVisible: true,
  });

  const { selectProps: selectUsernameProps } = useSelect({
    resource: "profiles",
    optionLabel: "full_name",
    optionValue: "id",
    filters: [
      {
        field: "userrole",
        operator: "eq",
        value: UserRoleTypes.ADMIN,
      },
    ],
  });

  return (
    <Drawer {...drawerProps}>
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps}>
          <Form.Item
            label="To"
            name="to_user_id"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select {...selectUsernameProps} />
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
    </Drawer>
  );
};
