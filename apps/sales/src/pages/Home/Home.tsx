import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useGo } from "@refinedev/core";
import { Button, Card, Col, Flex, Row, Skeleton, Statistic } from "antd";

export const Home = () => {
  const go = useGo();
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
