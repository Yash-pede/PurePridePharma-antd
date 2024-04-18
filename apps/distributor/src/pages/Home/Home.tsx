import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useGetIdentity, useGo, useList, useOne } from "@refinedev/core";
import { Database } from "@repo/graphql";
import { Button, Card, Col, Flex, Row, Skeleton, Statistic } from "antd";
import dayjs from "dayjs";

export const Home = () => {
  const go = useGo();
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

  const { data: User } = useGetIdentity<any>();
  const { data: targetsData, isLoading: isLoadingTargets } = useList<
    Database["public"]["Tables"]["targets"]["Row"]
  >({
    resource: "targets",
    filters: [
      {
        field: "user_id",
        operator: "eq",
        value: User?.id || "",
      },
      {
        operator: "or",
        value: [
          {
            field: "month",
            operator: "eq",
            value: dayjs(new Date())
              .format("MM/YYYY")
              .toString()
              .padStart(2, "0"),
          },
          {
            field: "month",
            operator: "eq",
            value: dayjs(new Date())
              .subtract(1, "month")
              .format("MM/YYYY")
              .toString()
              .padStart(2, "0"),
          },
        ],
      },
    ],
  });

  console.log(targetsData?.data);
  console.log(
    dayjs(new Date())
      .subtract(1, "month")
      .format("MM/YYYY")
      .toString()
      .padStart(2, "0"),
  );

  return (
    <div>
      <div className="">
        <Row gutter={16}>
          <Col span={12}>
            {targetsData?.data[0] ? (
              <Card bordered={false}>
                <Statistic
                  title="Target Achived"
                  value={
                    (targetsData?.data[0].target ??
                      0 / targetsData?.data[0].total) * 100
                  }
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            ) : (
              <Skeleton.Node active />
            )}
          </Col>
          <Col span={12}>
            {targetsData?.data[1] ? (
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
            ) : (
              <Skeleton.Node active />
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};
