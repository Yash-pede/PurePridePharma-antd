import React from "react";
import { Card, Flex, Typography } from "antd";
import { useGo } from "@refinedev/core";

export const Reports = () => {
  const go = useGo();
  return (
    <Flex wrap="wrap" gap="20px" align="center">
      <Card
        onClick={() => go({ to: "/reports/challan" })}
        style={{ width: 300, marginTop: 16 }}
        hoverable
      >
        <Typography.Title level={3}>Challan Report</Typography.Title>
      </Card>
      <Card
        onClick={() => go({ to: "/reports/distributor" })}
        style={{ width: 300, marginTop: 16 }}
        hoverable
      >
        <Typography.Title level={3}>Distributor</Typography.Title>
      </Card>
    </Flex>
  );
};
