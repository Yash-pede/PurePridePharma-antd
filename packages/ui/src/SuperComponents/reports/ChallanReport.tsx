import React, { useEffect } from "react";
import { Show } from "@refinedev/antd";
import { useGo, useList } from "@refinedev/core";
import { Database } from "@repo/graphql";
import { Button, Flex, Select, Table } from "antd";
import ChallanReportDetails from "./ChallanReportDetails";

export const ChallanReport = () => {
  const go = useGo();
  const [dataAccGrouped, setDataAccGrouped] = React.useState<any[]>([]);
  const [groupDataBy, setGroupDataBy] = React.useState<string>("month");
  const { data: Challan, isLoading: isLoadingChallan } = useList<
    Database["public"]["Tables"]["challan"]["Row"]
  >({
    resource: "challan",
  });

  useEffect(() => {
    if (Challan?.data) {
      // Group data based on the selected option
      const groupedData: { date: string; challans: any[] }[] = [];
      Challan.data.forEach((item: any, idx: number) => {
        let date = "";
        switch (groupDataBy) {
          case "month":
            date = item.created_at.split("T")[0].slice(0, 7);
            break;
          case "year":
            date = item.created_at.split("T")[0].slice(0, 4);
            break;
          case "quarter":
            const month = new Date(item.created_at).getMonth();
            const quarter = Math.floor(month / 3) + 1;
            date = `${new Date(item.created_at).getFullYear()} Q${quarter}`;
            break;
          case "date":
            date = item.created_at.split("T")[0];
            break;
          default:
            date = item.created_at.split("T")[0].slice(0, 7);
        }

        const index = groupedData.findIndex((data) => data.date === date);
        if (index === -1) {
          groupedData.push({
            date,
            challans: [{ ...item, key: `row_${idx}` }],
          });
        } else {
          groupedData[index].challans.push({ ...item, key: `row_${idx}` });
        }
      });

      setDataAccGrouped(groupedData);
    }
  }, [Challan, groupDataBy]);

  return (
    <Show
      headerButtons={
        <Flex>
          <Select
            style={{ minWidth: "100px" }}
            options={[
              { title: "Month", value: "month" },
              { title: "Year", value: "year" },
              { title: "Quarter", value: "quarter" },
              { title: "Date", value: "date" },
            ]}
            defaultValue={"month"}
            onChange={(value) => setGroupDataBy(value)}
          />
        </Flex>
      }
    >
      <Table
        rowKey={"date"}
        dataSource={dataAccGrouped}
        expandable={{
          expandedRowRender: (record) => (
            <ChallanReportDetails challans={record.challans} />
          ),
          rowExpandable: (record) => record.challans.length > 0,
        }}
        loading={isLoadingChallan || !dataAccGrouped}
        columns={[
          {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (value: any, record: any) => {
              return <>{value}</>;
            },
          },
          {
            title: "Total",
            dataIndex: "total",
            key: "total",
            render: (value: any, record: any) => {
              const total = record.challans.reduce(
                (acc: number, curr: any) => acc + curr.total_amt,
                0
              );
              return <>{total}</>;
            },
          },
          {
            title: "Received",
            dataIndex: "received",
            key: "received",
            render: (value: any, record: any) => {
              const received = record.challans.reduce(
                (acc: number, curr: any) => acc + curr.received_amt,
                0
              );
              return <>{received}</>;
            },
          },
          {
            title: "Pending",
            dataIndex: "pending",
            key: "pending",
            render: (value: any, record: any) => {
              const pending = record.challans.reduce(
                (acc: number, curr: any) => acc + curr.pending_amt,
                0
              );
              return <>{pending}</>;
            },
          },
          {
            title: "bill_amt",
            dataIndex: "bill_amt",
            key: "bill_amt",
            render: (value: any, record: any) => {
              const bill_amt = record.challans.reduce(
                (acc: number, curr: any) => acc + curr.bill_amt,
                0
              );
              return <>{bill_amt}</>;
            },
          },
        ]}
      />
    </Show>
  );
};
