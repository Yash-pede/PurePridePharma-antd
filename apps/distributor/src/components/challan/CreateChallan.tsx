import React, { useEffect } from "react";
import { useCreate, useGetIdentity, useGo, useList } from "@refinedev/core";
import { Create, useForm, useModal, useSelect } from "@refinedev/antd";
import { Database } from "@repo/graphql";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Table,
  type FormProps,
  Typography,
  InputNumber,
} from "antd";
import { challanProductAddingType } from "@repo/utility";
import { PdfLayout } from "./ChallanPreview";
import { PDFDownloadLink, usePDF } from "@react-pdf/renderer";
import { Link } from "react-router-dom";

const CreateChallan = () => {
  const go = useGo();
  const [challan, setChallan] = React.useState<any>([]);
  const [avalableqty, setAvalableqty] = React.useState<any>();
  const [customer, setCustomer] = React.useState<any>();
  const [totalAmount, setTotalAmount] = React.useState<any>();
  const { show, close, modalProps } = useModal();
  const { data: User } = useGetIdentity<any>();

  const { data: inventory } = useList<
    Database["public"]["Tables"]["D_INVENTORY"]["Row"]
  >({
    resource: "D_INVENTORY",
    filters: [
      {
        field: "distributor_id",
        operator: "eq",
        value: User?.id,
      },
    ],
  });

  const { selectProps: productSelectProps, queryResult: products } = useSelect({
    resource: "PRODUCTS",
    optionLabel: "name",
    optionValue: "id",
    filters: [
      {
        field: "id",
        operator: "in",
        value: inventory?.data?.map((stock: any) => stock.product_id),
      },
    ],
    onSearch: (value) => {
      return [
        {
          field: "name",
          operator: "contains",
          value,
        },
      ];
    },
  });

  const onFinish: FormProps<challanProductAddingType>["onFinish"] = (
    values
  ) => {
    setChallan((prevChallan: any[]) => {
      close();
      if (prevChallan) {
        return [...prevChallan, values];
      }
      return [values];
    });
  };
  const {
    close: closePdfModal,
    show: showPdfModal,
    modalProps: pdfModalProps,
  } = useModal();
  const { data, isLoading, mutate, isError } =
    useCreate<Database["public"]["Tables"]["challan"]["Insert"]>();
  const { data: allProducts, isLoading: allProductsLoading } = useList<
    Database["public"]["Tables"]["PRODUCTS"]["Row"]
  >({
    resource: "PRODUCTS",
    filters: [
      {
        field: "id",
        operator: "in",
        value: challan.map((bill: challanProductAddingType) => bill.product_id),
      },
    ],
  });
  useEffect(() => {
    if (challan && allProducts?.data) {
      const newTotalAmount: number = challan.reduce(
        (total: number, item: any) => {
          const product = allProducts.data.find(
            (product: any) => product.id === item.product_id
          );
          if (product) {
            const subtotal: number =
              item.quantity * (product.selling_price || 0);
            const discountAmount: number =
              subtotal * (item.discount * 0.01 || 0);
            return total + subtotal - discountAmount;
          }
          return total;
        },
        0 as number
      );
      setTotalAmount(newTotalAmount);
    }
  }, [challan, allProducts?.data]);

  const onChallanCreate = () => {
    mutate({
      resource: "challan",
      values: {
        distributor_id: User?.id,
        product_info: challan,
        total_amt: totalAmount,
        received_amt: 0,
        pending_amt: totalAmount,
        customer_id: customer,
      },
    });
    if (!isError) {
      go({
        to: { action: "list", resource: "challan" },
        options: {
          keepQuery: true,
        },
        type: "push",
      });
    }
  };
  const { selectProps: customerSelectProps } = useSelect<
    Database["public"]["Tables"]["CUSTOMERS"]["Row"]
  >({
    resource: "CUSTOMERS",
    optionValue: "id",
    optionLabel: "full_name",
    filters: [
      {
        field: "distributor_id",
        operator: "eq",
        value: User?.id,
      },
    ],
  });

  return (
    <>
      <Create
        saveButtonProps={{ style: { display: "none" } }}
        footerButtons={
          <Button type="primary" onClick={onChallanCreate}>
            Create Challan
          </Button>
        }
        headerButtons={
          <>
            <Button style={{ margin: "10px 0" }} onClick={show}>
              Add Products
            </Button>

            <Button
              disabled={!customer || !challan.length}
              onClick={() => {
                showPdfModal();
              }}
            >
              Preview Challan
            </Button>
          </>
        }
      >
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            marginBottom: "10px",
            gap: "10px",
          }}
        >
          <label>Select Customer</label>
          <Select
            style={{ width: "100%" }}
            onSelect={(value) => setCustomer(value)}
            {...customerSelectProps}
          />
        </div>
        <Table
          dataSource={challan}
          columns={[
            {
              title: "Product",
              dataIndex: "product_id",
              render: (value) => (
                <Typography.Text>
                  {
                    products.data?.data.find((product) => product.id === value)
                      ?.name
                  }
                </Typography.Text>
              ),
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
            },
          ]}
        />
      </Create>
      <Modal {...modalProps} okButtonProps={{ style: { display: "none" } }}>
        <Form
          name="Product Challan"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          onValuesChange={(values) => {
            setAvalableqty(
              inventory?.data.find(
                (stock: any) => stock.product_id === values.product_id
              )?.quantity
            );
          }}
        >
          {avalableqty && (
            <Button type="text" style={{ width: "100%" }}>
              Avalable Quantity {avalableqty}
            </Button>
          )}
          <Form.Item<challanProductAddingType>
            label="Product"
            name="product_id"
            rules={[{ required: true, message: "Product is required" }]}
          >
            <Select {...productSelectProps} />
          </Form.Item>

          <Form.Item<challanProductAddingType>
            label="Quantity"
            name="quantity"
            rules={[
              {
                required: true,
                message: "Quantity is required",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item<challanProductAddingType>
            label="discount"
            name="discount"
            initialValue={0}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        {...pdfModalProps}
        style={{ width: "100% !important" }}
        okButtonProps={{ style: { display: "none" } }}
      >
        {/* <PDFDownloadLink
          document={<PdfLayout billInfo={challan} customerId={customer} />}
          fileName="InvoicePreview.pdf"
        >
         hii
        </PDFDownloadLink> */}
        <PdfLayout billInfo={challan} customerId={customer} />
      </Modal>
    </>
  );
};

export default CreateChallan;
