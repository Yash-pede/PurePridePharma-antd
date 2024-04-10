import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useGetIdentity, useGo, useList, useOne } from "@refinedev/core";
import { Button, Card, Col, Flex, Row, Skeleton, Statistic } from "antd";
import dayjs from "dayjs";

export const Home = () => {
  const go = useGo();
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

  const { data: User } = useGetIdentity<any>();
  const { data: targetsData, isLoading: isLoadingTargets } = useList({
    resource: "targets",
    filters: [
      {
        field: "distributor_id",
        operator: "eq",
        value: User?.id || "",
      },
      {
        field: "month",
        operator: "in",
        value: `${currentYear}-${currentMonth.toString().padStart(2, "0")}`,
      },
    ],
  });
  
  console.log(targetsData);

  return (
    <div>
      <div className="">
        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="This month"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Last month"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
