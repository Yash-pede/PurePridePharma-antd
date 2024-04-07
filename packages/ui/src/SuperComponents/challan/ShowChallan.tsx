import React, { useEffect } from "react";
import {
  Document,
  Image,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { PurePrideInvoiceLogo, PurePrideSignature } from "@repo/shared";
import { HttpError, useOne } from "@refinedev/core";
import { Database } from "@repo/graphql";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { supabaseClient } from "../../utility";
import { challanProductAddingType } from "@repo/utility";
import dayjs from "dayjs";

export const ShowChallan = () => {
  const challanId = useLocation().pathname.split("/")[2];

  const { data: challanData, isLoading: challanLoading } = useOne<
    Database["public"]["Tables"]["challan"]["Row"],
    HttpError
  >({
    resource: "challan",
    id: challanId,
  });

  const [billInfo, setBillInfo] = React.useState<challanProductAddingType[]>();

  const [customer, setCustomer] = React.useState<any>();

  const [products, setProducts] = React.useState<any>();

  const [totalAmount, setTotalAmount] = React.useState<any>();

  useEffect(() => {
    if (challanData) {
      const fetchCustomer = async () => {
        const { data: Customer, error: CustomerError } = await supabaseClient
          .from("CUSTOMERS")
          .select("*")
          .eq("id", challanData?.data.customer_id);
        // console.log(Customer[0]);
        setCustomer(Customer[0]);
      };
      const fetchProducts = async () => {
        const { data: products, error: productsError } = await supabaseClient
          .from("PRODUCTS")
          .select("*")
          .in(
            "id",
            challanData?.data.product_info.map((item: any) => item.product_id)
          );
        setProducts(products);
      };
      fetchCustomer();
      fetchProducts();
      if (challanData) {
        setBillInfo(challanData?.data.product_info as any);
      }
    }
  }, [challanData]);

  useEffect(() => {
    if (billInfo && products) {
      const total = billInfo.reduce((total, item) => {
        const product = products.find((product: { id: string; }) => product.id === item.product_id);
        if (product) {
          const subtotal = item.quantity * (product.selling_price || 0);
          const discountAmount = subtotal * (item.discount * 0.01 || 0);
          return total + subtotal - discountAmount;
        }
        return total;
      }, 0);
      setTotalAmount(total);
    }
  }, [billInfo, products]);
  

  const MyDoc = () => {
    if (!customer || !products) {
      return <div>Loading...</div>;
    }
    return (
      <Document>
        <Page style={styles.page} size="A4">
          <View style={styles.invoiceHeader}>
            <View style={styles.companyInfo}>
              <Text style={styles.invoiceHeadingText}>Purepride</Text>
              <Text style={styles.invoiceLineSpacing}>Mob: 9876540123</Text>
              <Text style={styles.invoiceLineSpacing}>Address: Raipur</Text>
            </View>
            <Image style={styles.logo} src={PurePrideInvoiceLogo} />
          </View>
          <View style={styles.invoiceBody}>
            <Text style={styles.invoiceText}>INVOICE</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.billTo}>
              <Text style={{ fontStyle: "italic", fontSize: 14 }}>
                Bill To:
              </Text>
              <Text style={{ fontSize: 14 }}>{customer.full_name}</Text>
              <Text style={{ fontSize: 14 }}>+91 {customer.phone}</Text>
              <Text style={{ fontSize: 14 }}>{customer.address}</Text>
            </View>
            <View style={styles.billTo}>
              <Text style={{ textAlign: "right", margin: "auto" }}>
                Invoice No: {challanId}
              </Text>
              <Text style={{ textAlign: "right" }}>
                Date :{" "}
                {dayjs(challanData?.data.created_at).format("DD/MM/YYYY")}
              </Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderItem}>S NO.</Text>
              <Text style={styles.tableHeaderItem}>Item Name</Text>
              <Text style={styles.tableHeaderItem}>Quantity</Text>
              <Text style={styles.tableHeaderItem}>Price/Unit</Text>
              <Text style={styles.tableHeaderItem}>SubTotal</Text>
              <Text style={styles.tableHeaderItem}>Discount</Text>
              <Text style={styles.tableHeaderItem}>Amount</Text>
            </View>
            {billInfo?.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{index + 1}</Text>
                <Text style={styles.tableCol}>
                  {
                    products.find(
                      (product: any) => product.id === item.product_id
                    )?.name
                  }
                </Text>
                <Text style={styles.tableCol}>{item.quantity}</Text>
                <Text style={styles.tableCol}>
                  {
                    products.find(
                      (product: any) => product.id === item.product_id
                    )?.selling_price
                  }
                </Text>
                <Text style={styles.tableCol}>
                  {item.quantity *
                    (products.find(
                      (product: any) => product.id === item.product_id
                    )?.selling_price || 0)}
                </Text>
                <Text style={styles.tableCol}>{item.discount}%</Text>
                <Text style={styles.tableCol}>
                  {(
                    item.quantity *
                      (products.find(
                        (product: any) => product.id === item.product_id
                      )?.selling_price || 0) -
                    item.quantity *
                      (products.find(
                        (product: any) => product.id === item.product_id
                      )?.selling_price || 0) *
                      (item.discount * 0.01 || 0)
                  ).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.subtotalTable}>
            <View style={styles.subtotalTableRow}>
              <Text style={styles.subtotalTableCol}>TOTAL:</Text>
              <Text style={styles.subtotalTableCol}>
                {totalAmount?.toFixed(2)}
              </Text>
            </View>
            <View style={styles.subtotalTableRow}>
              <Text style={styles.subtotalTableCol}>RECEIVED:</Text>
              <Text style={styles.subtotalTableCol}>{challanData?.data.received_amt}</Text>
            </View>
            <View style={styles.subtotalTableRow}>
              <Text style={styles.subtotalTableCol}>BALANCE:</Text>
              <Text style={styles.subtotalTableCol}>{challanData?.data.pending_amt}</Text>
            </View>
          </View>
          <View>
          <Text>For, Purepride</Text>
          <Image
            src={PurePrideSignature}
            style={{ width: "150px", height: "auto", paddingLeft: "-50px" }}
          />
          <Text>Authorized Signatory</Text>
        </View>
        </Page>
      </Document>
    );
  };
  return (
    <div>
      <PDFDownloadLink document={<MyDoc />} fileName={`Challan-${challanId}.pdf`}>
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink>
    </div>
  );
};

const styles = StyleSheet.create({
  viewer: {
    paddingTop: 32,
    width: "100%",
    height: "80vh",
    border: "none",
  },
  page: {
    display: "flex",
    padding: "0.4in 0.4in",
    fontSize: 12,
    color: "#333",
    backgroundColor: "#fff",
  },
  invoiceHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  companyInfo: {
    marginRight: 20, // Adjust as needed
  },
  invoiceHeadingText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },
  invoiceLineSpacing: {
    marginVertical: 1,
  },
  logo: {
    width: 100,
    height: 100,
  },
  invoiceBody: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  invoiceText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 16,
  },
  billTo: {
    marginTop: 20, // Adjust as needed
    fontSize: 14,
  },
  invoiceDetails: {
    marginTop: 20, // Adjust as needed
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "right",
  },
  table: {
    marginTop: 32,
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#e5e5e5",
    textAlign: "center",
  },
  tableHeaderItem: {
    flex: 1,
    paddingVertical: 8,
    border: "1px solid #000",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
  },
  tableCol: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    border: "1px solid #000",
  },
  subtotalTable: {
    marginLeft: "auto",
    textAlign: "right",
    marginTop: 32,
    borderCollapse: "collapse",
  },
  subtotalTableRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid #000",
  },
  subtotalTableCol: {
    marginRight: 8,
    fontWeight: "bold",
    padding: "8px",
  },
});
