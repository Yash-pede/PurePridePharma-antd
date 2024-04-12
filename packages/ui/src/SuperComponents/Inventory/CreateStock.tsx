import { ErrorComponent, useDrawerForm } from "@refinedev/antd";
import { INSERT_INTO_STOCKS_MUTATION } from "@repo/graphql";
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Skeleton,
} from "antd";
import { useLocation } from "react-router-dom";
import { useGo, useOne } from "@refinedev/core";
import { AllInventory } from "./AllInventory";

export const CreateStock = () => {
  const go = useGo();
  const { formProps, drawerProps, saveButtonProps } = useDrawerForm({
    defaultVisible: true,
    action: "create",
    resource: "STOCKS",
    redirect: "show",
    meta: {
      mutationMode: "pessimistic",
      gqlQuery: INSERT_INTO_STOCKS_MUTATION,
    },
  });
  // const productIdFromUrl = useLocation().search.split("=")[1];
  const queryParams = useLocation().search;
  const productIdFromUrl = queryParams.match(
    /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
  );

  const { data: productById, isLoading: isLoadingProductById } = useOne({
    resource: "PRODUCTS",
    id: productIdFromUrl ? productIdFromUrl[0] : "",
    queryOptions: {
      enabled: !!productIdFromUrl,
    },
  });
  return (
    <AllInventory>
      <Drawer
        {...drawerProps}
        onClose={() =>
          go({
            to: { action: "list", resource: "inventory" },
          })
        }
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
          <Form.Item
            style={{ width: "100%" }}
            name="product_id"
            hidden
            label="Product"
            initialValue={productIdFromUrl?.[0]}
          >
            <Input style={{ width: "100%" }} readOnly />
          </Form.Item>
          <Form.Item
            style={{ width: "100%" }}
            name="Product Name"
            label="Product"
          >
            {isLoadingProductById ? (
              <Skeleton.Input active style={{ width: "100%" }} />
            ) : (
              <Input
                style={{ width: "100%" }}
                readOnly
                defaultValue={productById?.data?.name}
              />
            )}
          </Form.Item>
          <Form.Item
            style={{ width: "100%" }}
            name="avalable_quantity"
            label="Quantity"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          {/* 
          <Form.Item
            style={{ width: "100%" }}
            name="selling_price"
            label="Selling Price"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item> */}
          <Form.Item
            style={{ width: "100%" }}
            name="id"
            label="Batch No"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: "100%" }}
            name="expiry_date"
            label="Expiry Date"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
          </Form.Item>
        </Form>
      </Drawer>
    </AllInventory>
  );
};
