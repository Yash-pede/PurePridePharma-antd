import { useGo } from "@refinedev/core";
import { Button, Flex, Skeleton } from "antd";

export const Home = () => {
  const go = useGo();

  const RoutToOrdersPage = () => {
    go({
      to: { resource: "orders", action: "list" },
    });
  };
  return (
    <div>
      <div>Home page</div>
      <Button type="link" onClick={() => RoutToOrdersPage()}>
        Link to Orders
      </Button>
      <Flex>
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </Flex>
    </div>
  );
};
