import React from "react";
import {
  Skeleton,
  Table,
  TableColumnsType,
  Typography,
} from "antd";
import { useList } from "@refinedev/core";
import { Database } from "@repo/graphql";

const ChallanReportDetails = ({ challans }: { challans: any }) => {
  const { data: profiles, isLoading: isLoadingProfiles } = useList<
    Database["public"]["Tables"]["profiles"]["Row"]
  >({
    resource: "profiles",
    filters: [
      {
        field: "userrole",
        operator: "eq",
        value: "DISTRIBUTORS",
      },
      {
        field: "id",
        operator: "in",
        value: challans.map((challan: any) => challan.distributor_id),
      },
    ],
  });

  const columns: TableColumnsType<any> = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      render: (_: any, record: any, index: number) => index + 1,
    },
    {
      title: "Distributor ID",
      dataIndex: "distributor_id",
      key: "distributor_id",
      render: (value: any) => {
        if (!profiles || isLoadingProfiles) return <Skeleton.Input active />;
        return (
          <>
            <Typography.Text>
              {profiles.data?.find((profile) => profile.id == value)
                ?.full_name ?? "-"}
            </Typography.Text>
          </>
        );
      },
    },
    { title: "Total Amount", dataIndex: "total_amt", key: "total_amt" },
    {
      title: "Received Amount",
      dataIndex: "received_amt",
      key: "received_amt",
    },
    { title: "Pending Amount", dataIndex: "pending_amt", key: "pending_amt" },
  ];

  return <Table bordered size="small" columns={columns} dataSource={challans} pagination={false} />;
};

export default ChallanReportDetails;
