import { useGo } from "@refinedev/core";

export const Home = () => {
  const go = useGo();

  const RoutToOrdersPage = () => {
    go({
      to: { resource: "orders", action: "list" },
    });
  };
  return <div>Home page</div>;
};
