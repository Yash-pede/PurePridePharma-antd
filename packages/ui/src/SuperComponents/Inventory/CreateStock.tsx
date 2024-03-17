import { useDrawerForm } from "@refinedev/antd";
import { INSERT_INTO_STOCKS_MUTATION } from "@repo/graphql";
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Modal,
  Skeleton,
} from "antd";
import { useLocation } from "react-router-dom";
import { useBack, useOne } from "@refinedev/core";

export const CreateStock = () => {
  const back = useBack();
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
  const productIdFromUrl = useLocation().search.split("=")[1];

  const { data: productById, isLoading: isLoadingProductById } = useOne({
    resource: "PRODUCTS",
    id: productIdFromUrl,
    queryOptions: {
      enabled: !!productIdFromUrl,
    },
  });
  return (
    <>
      <Drawer
        {...drawerProps}
        onClose={() => back()}
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
            initialValue={productIdFromUrl}
          >
            <Input style={{ width: "100%" }} readOnly />
          </Form.Item>
          <Form.Item
            style={{ width: "100%" }}
            name="Product Name"
            label="Product"
          >
            {isLoadingProductById ? (
              <Skeleton.Input style={{ width: "100%" }} />
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
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
