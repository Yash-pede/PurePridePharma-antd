import React, { useEffect } from "react";
import { DateField, Edit, useEditableTable, useTable } from "@refinedev/antd";
import { HttpError, useGo, useList, useOne } from "@refinedev/core";
import { GET_ALL_ORDERS_QUERY, Orders, Profiles } from "@repo/graphql";
import {
  Button,
  Col,
  Descriptions,
  Flex,
  Form,
  Grid,
  Row,
  Skeleton,
  Space,
  Table,
} from "antd";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

export const EditOrders = () => {
  const go = useGo();
  const orderId = useLocation().pathname.split("/")[3];
  const [orderDetails, setOrderDetails] = React.useState<{
    request: [];
    response: [];
  }>({ request: [], response: [] });
  const { tableProps, tableQueryResult: order } = useTable<Orders, HttpError>({
    resource: "ORDERS",
    meta: {
      gqlQuery: GET_ALL_ORDERS_QUERY,
    },
    filters: {
      permanent: [
        {
          field: "id",
          operator: "eq",
          value: orderId,
        },
      ],
    },
  });

  const { data: profile } = useOne<Profiles>({
    resource: "profiles",
    id: order.data?.data[0].distributor_id,
  });
  useEffect(() => {
    setOrderDetails(order.data?.data[0].order || {});
  }, [order]);

  return (
    <Edit>
      <h2>Order Id: {orderId}</h2>

      <Space direction="vertical">
        <Descriptions
          bordered
          title="Distributor Details"
          extra={
            <Button
              type="dashed"
              onClick={() =>
                go({
                  to: {
                    action: "show",
                    resource: "profiles",
                    id: order?.data?.distributor_id,
                  },
                })
              }
            >
              View
            </Button>
          }
        >
          <Descriptions.Item label="Name">
            {profile?.data?.username}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {profile?.data?.email}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {profile?.data?.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Full Name">
            {profile?.data?.full_name}
          </Descriptions.Item>
          <Descriptions.Item label="Updated at">
            {dayjs(profile?.data?.updated_at).format("DD-MM-YYYY hh:mm:ss")}
          </Descriptions.Item>
        </Descriptions>
      </Space>
    </Edit>
  );
};
