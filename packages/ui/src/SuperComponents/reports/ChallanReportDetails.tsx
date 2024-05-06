import React from "react";
import { Select, Skeleton, Table, TableColumnsType, Typography } from "antd";
import { getDefaultFilter, useList } from "@refinedev/core";
import { Database } from "@repo/graphql";
import {
  FilterDropdown,
  getDefaultSortOrder,
  useSelect,
} from "@refinedev/antd";
import { SearchOutlined } from "@ant-design/icons";
import { UserRoleTypes } from "@repo/utility";

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

  const { selectProps: selectProps } = useSelect({
    resource: "profiles",
    optionLabel: "full_name",
    optionValue: "id",
    filters: [
      {
        field: "userrole",
        operator: "eq",
        value: UserRoleTypes.DISTRIBUTORS,
      },
    ],
    // defaultValue: getDefaultFilter("profiles.id", "in"),
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
      // onFilter: (value: any, record: any) => record.distributor_id == value,
      // filterIcon: <SearchOutlined />,
      // filterDropdown: (props) => (
      //   <FilterDropdown {...props} mapValue={(value) => value}>
      //     <Select
      //       style={{ minWidth: 200 }}
      //       // mode="tags"
      //       {...selectProps}
      //     />
      //   </FilterDropdown>
      // ),
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
    {
      title: "Total Amount",
      dataIndex: "total_amt",
      key: "total_amt",
      sorter: (a, b) => a.total_amt - b.total_amt,
      defaultSortOrder: getDefaultSortOrder("total_amt"),
    },
    {
      title: "Received Amount",
      dataIndex: "received_amt",
      key: "received_amt",
      sorter: (a, b) => a.received_amt - b.received_amt,
      defaultSortOrder: getDefaultSortOrder("received_amt"),
    },
    {
      title: "Pending Amount",
      dataIndex: "pending_amt",
      key: "pending_amt",
      sorter: (a, b) => a.pending_amt - b.pending_amt,
      defaultSortOrder: getDefaultSortOrder("pending_amt"),
    },
  ];

  return (
    <Table
      bordered
      size="small"
      columns={columns}
      dataSource={challans}
      pagination={false}
    />
  );
};

export default ChallanReportDetails;
