import { HttpError, useGo, useList } from "@refinedev/core";
import {
  Database,
  GET_ALL_pRODUCTS_QUERY,
  INSERT_INTO_PRODUCTS_MUTATION,
} from "@repo/graphql";
import {
  Button,
  Card,
  Drawer,
  Flex,
  Form,
  GetProp,
  Input,
  InputNumber,
  Upload,
  UploadProps,
  message,
} from "antd";
import { IconShoppingCart } from "@tabler/icons-react";
import {
  InboxOutlined,
  PlusCircleOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import { Create, useDrawerForm } from "@refinedev/antd";
import { supabaseClient } from "../../utility";
import { ProductCardPublic } from "./ProductCard";

export const AllProducts = () => {
  const { data, isLoading } = useList<
    Database["public"]["Tables"]["PRODUCTS"],
    HttpError
  >({
    resource: "PRODUCTS",
    meta: {
      gqlQuery: GET_ALL_pRODUCTS_QUERY,
    },
  });
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
  const { formProps, drawerProps, show, saveButtonProps } = useDrawerForm<
    Database["public"]["Tables"]["PRODUCTS"]["Insert"],
    HttpError
  >({
    action: "create",
    resource: "PRODUCTS",
  });
  const { Dragger } = Upload;
  const go = useGo();
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {Array(7).map((_, index) => (
          <Card
            key={index}
            loading
            style={{ flexBasis: "calc(25% - 16px)", marginBottom: "16px" }}
          />
        ))}
      </div>
    );
  }

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      message.error("Image must smaller than 3MB!");
    }
    return isJpgOrPng && isLt3M;
  };
  const props: UploadProps = {
    name: "file",
    multiple: false,
    customRequest: async ({ file, onSuccess, filename, onError }) => {
      try {
        const timestamp = Date.now();
        const fileName = `images/${timestamp}-${filename}`;

        const { data, error } = await supabaseClient.storage
          .from("Products")
          .upload(fileName, file);

        if (error) {
          throw error;
        }

        onSuccess && onSuccess("product Image");

        // Access the uploaded file URL from data.url
        console.log("File uploaded successfully:", data.url);
        formProps.form.setFieldValue("imageURL", fileName);
        // Access the uploaded file URL from data.url
        console.log("File uploaded successfully:", data.url);
      } catch (error: any) {
        console.error("Error uploading file:", error.message);
        onError && onError(error);
      }
    },

    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <div style={{ gap: "15px", width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: "0.7rem",
        }}
      >
        <Button
          type="primary"
          size="large"
          style={{
            gap: "15px",
            marginTop: "15px",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => show()}
        >
          <PlusCircleOutlined /> Add Products
        </Button>
        <Button
          type="primary"
          size="large"
          style={{
            gap: "15px",
            marginTop: "15px",
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() =>
            go({
              to: { resource: "inventory", action: "list" },
              type: "push",
              options: {
                keepQuery: true,
              },
            })
          }
        >
          <IconShoppingCart /> Stock
        </Button>
      </div>
      <Flex
        wrap="wrap"
        gap="small"
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data?.data.map((product: any) => (
          <ProductCardPublic
            product={product}
            isLoading={isLoading}
            key={product.id}
            RenderButton={() => (
              <Button
                style={{ width: "100%" }}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  go({
                    to: { resource: "inventory", action: "create" },
                    type: "push",
                    options: { keepQuery: true },
                    query: { product: product.id },
                  });
                }}
                type="primary"
              >
                Add to Stock
              </Button>
            )}
          />
        ))}
      </Flex>
      <Drawer {...drawerProps}>
        <Create saveButtonProps={saveButtonProps}>
          <Form {...formProps} layout="vertical">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="mrp"
              name="mrp"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="selling_price"
              name="selling_price"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
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
              label="Base Quantity"
              name="base_q"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Free Quantity"
              name="free_q"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Image"
              name="imageURL"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Dragger {...props} beforeUpload={beforeUpload} maxCount={1}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support only for a single upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
            </Form.Item>
          </Form>
        </Create>
      </Drawer>
    </div>
  );
};
