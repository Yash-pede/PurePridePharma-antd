import { Create, ThemedTitleV2 } from "@refinedev/antd";
import { Drawer, Form, Input, Select, Skeleton, Space } from "antd";
import { UserRoleTypes } from "@repo/utility";
import { useCreate, useGetIdentity, useGo, useList } from "@refinedev/core";
import { UserSwitchOutlined } from "@ant-design/icons";
import { CustomerHome } from ".";

export const CustomerCreate = () => {
  const [form] = Form.useForm();
  const go = useGo();
  const { mutate } = useCreate();
  const { data: User } = useGetIdentity<any>();

  const { data: SalesUserList, isLoading: SalesUserListLoading } = useList({
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
      },
    ],
  });

  const CreateCustomer = async (
    email: string,
    phone: string,
    full_name: string,
    userId: string,
    sales_id: string
  ) => {
    // console.log("CreateCustomer", email, phone, full_name, userId, sales_id);
    mutate({
      resource: "CUSTOMERS",
      values: {
        full_name,
        distributor_id: userId,
        sales_id,
        phone,
        email,
      },
    });
  };
  form.submit = async () => {
    const values = form.getFieldsValue();
    CreateCustomer(
      values.email,
      values.phone,
      values.full_name,
      User?.id,
      values.sales_id
    );

    go({
      to: { action: "list", resource: "customer" },
      type: "push",
    });
  };
  return (
    <CustomerHome>
      <Drawer
        open
        onClose={() => {
          go({
            to: { action: "list", resource: "customer" },
            type: "push",
          });
        }}
      >
        <Create
          title="Create Customer"
          saveButtonProps={{ onClick: () => form.submit(), htmlType: "submit" }}
        >
          <Form form={form} layout="vertical" >
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
                  readOnly
                  contentEditable={false}
                />
                <Input style={{ width: "80%" }} placeholder="123456789" />
              </Space.Compact>
            </Form.Item>
            <Form.Item
              name="sales_id"
              label={
                <ThemedTitleV2
                  text="Assign Sales Person"
                  collapsed={false}
                  icon={<UserSwitchOutlined />}
                />
              }
            >
              {SalesUserListLoading ? (
                <Skeleton.Input style={{ width: "100%" }} active />
              ) : (
                <Select>
                  {SalesUserList?.data.map((user) => (
                    <Select.Option key={user.id} value={user.id}>
                      {user.username}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Form>
        </Create>
      </Drawer>
    </CustomerHome>
  );
};
