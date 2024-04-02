import {
  usePDF,
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";
import { useList, useOne } from "@refinedev/core";
import { useLocation } from "react-router-dom";
import {
  PurePrideInvoiceLogo,
  PurePrideSignature,
} from "../../../../../packages/Shared";
import dayjs from "dayjs";
import { Database } from "@repo/graphql";

const ShowChallan = () => {
  const challanId = useLocation().pathname.split("/").pop();
  const { data: challan, isLoading } = useOne<
    Database["public"]["Tables"]["challan"]["Row"]
  >({
    resource: "challan",
    id: challanId,
  });
  const { data: customer, isLoading: customerLoading } = useOne({
    resource: "CUSTOMERS",
    id: challan?.data?.customer_id || "",
  });
  const billInfo = challan?.data?.product_info || [];
  const { data: products, isLoading: productLoading } = useList<
    Database["public"]["Tables"]["PRODUCTS"]["Row"]
  >({
    resource: "PRODUCTS",
    filters: [
      {
        field: "id",
        operator: "in",
        value: billInfo.map((bill: any) => bill.product_id),
      },
    ],
  });
  const totalAmount = billInfo.reduce((total, item) => {
    const product = products?.data.find(
      (product: any) => product.id === item.product_id
    );
    if (product) {
      const subtotal = item.quantity * (product.selling_price || 0);
      const discountAmount = subtotal * (item.discount * 0.01 || 0);
      return total + subtotal - discountAmount;
    }
    return total;
  }, 0);

  const MyDoc = (
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.billTo}>
            <Text style={{ fontStyle: "italic", fontSize: 14 }}>Bill To:</Text>
            <Text style={{ fontSize: 14 }}>{customer?.data?.full_name}</Text>
            <Text style={{ fontSize: 14 }}>+91 {customer?.data.phone}</Text>
            <Text style={{ fontSize: 14 }}>{customer?.data.address}</Text>
          </View>
          <View style={styles.billTo}>
            <Text style={{ textAlign: "right", margin: "auto" }}>
              Invoice No.: {challanId ?? "-"}
            </Text>
            <Text style={{ textAlign: "right" }}>
              {dayjs(challan?.data?.created_at).format("DD/MM/YYYY")}
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
          {billInfo.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCol}>{index + 1}</Text>
              <Text style={styles.tableCol}>
                {
                  products?.data.find(
                    (product: any) => product.id === item.product_id
                  )?.name
                }
              </Text>
              <Text style={styles.tableCol}>{item.quantity}</Text>
              <Text style={styles.tableCol}>
                {
                  products?.data.find(
                    (product: any) => product.id === item.product_id
                  )?.selling_price
                }
              </Text>
              <Text style={styles.tableCol}>
                {item.quantity *
                  (products?.data.find(
                    (product: any) => product.id === item.product_id
                  )?.selling_price || 0)}
              </Text>
              <Text style={styles.tableCol}>{item.discount}%</Text>
              <Text style={styles.tableCol}>
                {(
                  item.quantity *
                    (products?.data.find(
                      (product: any) => product.id === item.product_id
                    )?.selling_price || 0) -
                  item.quantity *
                    (products?.data.find(
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
              {totalAmount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.subtotalTableRow}>
            <Text style={styles.subtotalTableCol}>RECEIVED:</Text>
            <Text style={styles.subtotalTableCol}>0</Text>
          </View>
          <View style={styles.subtotalTableRow}>
            <Text style={styles.subtotalTableCol}>BALANCE:</Text>
            <Text style={styles.subtotalTableCol}>0</Text>
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
  const [instance, updateInstance] = usePDF({ document: MyDoc });

  if (instance.loading||isLoading||productLoading||customerLoading) return <div>Loading ...</div>;

  return (
    <a href={instance.url || ""} target="_blank">
      Download
    </a>
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

export default ShowChallan;
