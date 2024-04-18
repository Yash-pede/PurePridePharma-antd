import { Create } from "@refinedev/antd";
import { Drawer, Form, Input, Select, Space } from "antd";
import { UserRoleTypes } from "@repo/utility";
import {
  useGetIdentity,
  useGo,
  useNotification,
  useUpdate,
} from "@refinedev/core";
import { Users } from "./Users";
import { supabaseServiceRoleClient } from "@repo/ui";

export const CreateUsers = () => {
  const { open, close } = useNotification();
  const [form] = Form.useForm();
  const go = useGo();
  const { status, mutate, isSuccess } = useUpdate();
  const { data: User } = useGetIdentity<any>();

  const createUser = async (
    email: string,
    name: string,
    phNo: string,
    password: string,
    full_name: string,
    userrole: UserRoleTypes,
    boss_id?: string,
  ) => {
    open &&
      open({
        key: "create-user",
        type: "progress",
        message: "Creating User...",
        description: "Please wait while we create your User.",
        undoableTimeout: 2000,
      });
    const { data, error } =
      await supabaseServiceRoleClient.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true,
        user_metadata: {
          username: name,
          phone: phNo,
          full_name: full_name,
          boss_id: boss_id || null,
        },
      });
    console.log(data, error);

    if (data.user) {
      close && close("create-user");
      await setUserRole(data.user.id, userrole);
      open &&
        open({
          key: "create-user",
          type: "success",
          message: "User Created",
          description: "User Created Successfully",
        });
      go({
        to: { action: "list", resource: "profiles" },
        type: "push",
      });
    } else {
      close && close("create-user");
      open &&
        open({
          key: "create-user-error",
          type: "error",
          message: "Try entering different credentials",
          description: "User Creation Failed",
        });
      console.log(error);
    }
  };
  const setUserRole = async (userId: string, userRole: UserRoleTypes) => {
    mutate({
      resource: "profiles",
      id: userId,
      values: {
        userrole: userRole as UserRoleTypes,
      },
    });

    if (status === "success" && isSuccess) {
      console.log("Setting user Role was successful");
    } else {
      console.error("Failed to set user role");
    }
  };
  form.submit = async () => {
    const values = form.getFieldsValue();
    createUser(
      values.email,
      values.name,
      values.phone,
      values.password,
      values.full_name,
      values.userrole as UserRoleTypes,
      User?.id,
    );
  };
  return (
    <Users>
      <Drawer
        onClose={() => {
          go({
            to: { action: "list", resource: "profiles" },
            type: "push",
          });
        }}
        open
      >
        <Create
          title="Create User"
          saveButtonProps={{ onClick: () => form.submit(), htmlType: "submit" }}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="User Name"
              name={"name"}
              rules={[
                { required: true, message: "Name is required", type: "string" },
              ]}
            >
              <Input placeholder="Name" type="text" />
            </Form.Item>
            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                { required: true, message: "Invalid Email", type: "email" },
              ]}
            >
              <Input placeholder="Email" type="email" />
            </Form.Item>
            <Form.Item label="Full Name" name={"full_name"}>
              <Input placeholder="Enter Full Name" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name={"phone"}
              rules={[
                {
                  required: true,
                  message: "Invalid Phone Number",
                  len: 10,
                  transform(value: any) {
                    return value.trim().replace(/\s/g, "");
                  },
                },
              ]}
            >
              <Space.Compact>
                <Input
                  style={{ width: "20%" }}
                  defaultValue="+91"
                  contentEditable={false}
                />
                <Input style={{ width: "80%" }} placeholder="123456789" />
              </Space.Compact>
            </Form.Item>
            <Form.Item label="User Role" name={"userrole"} required>
              <Select
                placeholder="Select a status"
                options={[
                  {
                    label: UserRoleTypes.DISTRIBUTORS,
                    value: UserRoleTypes.DISTRIBUTORS,
                  },
                  {
                    label: UserRoleTypes.CUSTOMERS,
                    value: UserRoleTypes.CUSTOMERS,
                  },
                  {
                    label: UserRoleTypes.SALES,
                    value: UserRoleTypes.SALES,
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              name={"password"}
              rules={[
                {
                  required: true,
                  max: 8,
                  min: 4,
                  type: "string",
                  message: "Password is required",
                  validator(rule, value) {
                    if (value.trim().length < 4 || value.trim().length > 8) {
                      rule.message =
                        "Password length should be between 4 and 8 Characters";
                    }
                  },
                  transform(value: any) {
                    return value.trim().replace(/\s/g, "");
                  },
                },
              ]}
            >
              <Input.Password placeholder="Password" type="password" />
            </Form.Item>
            {/* <Button
              onClick={() => form.submit()}
              type="primary"
              htmlType="submit"
            >
              Create User
            </Button> */}
          </Form>
        </Create>
      </Drawer>
    </Users>
  );
};
