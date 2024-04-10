import React from "react";
import { useDrawerForm, useSelect } from "@refinedev/antd";
import { UserRoleTypes } from "@repo/utility";
import { Button, DatePicker, Drawer, Form, Input, InputNumber, Select } from "antd";
import { useGo } from "@refinedev/core";

export const CreateTarget = () => {
  const go = useGo();
  const { formProps, saveButtonProps, drawerProps } = useDrawerForm({
    defaultVisible: true,
    action: "create",
    resource: "targets",
    redirect: "list",
  });
  const { selectProps: selectUsernameProps } = useSelect({
    resource: "profiles",
    optionLabel: "full_name",
    optionValue: "id",
    filters: [
      {
        field: "userrole",
        operator: "eq",
        value: UserRoleTypes.DISTRIBUTORS,
      },
    ],
  });
  return (
    <Drawer
      {...drawerProps}
      onClose={() => {
        go({
          to: { action: "list", resource: "targets" },
        });
      }}
      footer={
        <Button {...saveButtonProps} type="primary" htmlType="submit">
          Create
        </Button>
      }
    >
      <Form
        {...formProps}
        layout="vertical"
        style={{ width: "100%", gap: "10px" }} 
      >
        <Form.Item style={{ width: "100%" }} name="user_id" label="Distributor">
          <Select {...selectUsernameProps} placeholder="Select Distributor" />
        </Form.Item>

        <Form.Item label="Total" initialValue={0} name="total" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Target" name="target" rules={[{ required: true }]}>
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Month" name="month" rules={[{ required: true }]}>
          <Input style={{ width: "100%" }}  placeholder="MM/YYYY"/>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
