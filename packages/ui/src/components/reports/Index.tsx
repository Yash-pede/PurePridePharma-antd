import React, { useEffect } from "react";
import { DateField, Show } from "@refinedev/antd";
import { useGetIdentity, useList } from "@refinedev/core";
import { Database } from "@repo/graphql";
import { Table } from "antd";

export const ReportsHome = () => {
  const { data: User } = useGetIdentity<any>();
  const [dataAccMonth, setDataAccMonth] = React.useState<any>();
  const { data: Challan, isLoading: isLoadingChallan } = useList<
    Database["public"]["Tables"]["challan"]["Row"]
  >({
    resource: "challan",
    filters: [
      {
        field: "distributor_id",
        operator: "eq",
        value: User?.id,
      },
    ],
  });

  useEffect(() => {
    if (Challan?.data) {
      const groupedData = Challan.data.reduce((acc: any, challan: any) => {
        const date = new Date(challan.created_at);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Month is zero-indexed

        const key = `${month.toString().padStart(2, "0")} / ${year}`;
        if (!acc[key]) {
          acc[key] = {
            monthYear: key,
            totalAmount: 0,
            receivedAmount: 0,
            pendingAmount: 0,
            billAmount: 0,
          };
        }
        acc[key].totalAmount += challan.total_amt;
        acc[key].receivedAmount += challan.received_amt;
        acc[key].pendingAmount += challan.pending_amt;
        acc[key].billAmount += challan.bill_amt;
        return acc;
      }, {});

      // Convert groupedData object back to an array
      const result = Object.values(groupedData);

      setDataAccMonth(result);
    }
  }, [Challan]);

  return (
    <Show>
      <Table
        dataSource={dataAccMonth}
        loading={isLoadingChallan}
        columns={[
          {
            title: "Month / Year",
            dataIndex: "monthYear",
            key: "monthYear",
          },
          {
            title: "Total Amount",
            dataIndex: "totalAmount",
            key: "totalAmount",
          },
          {
            title: "Received Amount",
            dataIndex: "receivedAmount",
            key: "receivedAmount",
          },
          {
            title: "Pending Amount",
            dataIndex: "pendingAmount",
            key: "pendingAmount",
          },
          {
            title: "Bill Amount",
            dataIndex: "billAmount",
            key: "billAmount",
          },
        ]}
      />
    </Show>
  );
};
