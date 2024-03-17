import React from "react";
import { Layout as AntdLayout, Space, theme, Button, Grid } from "antd";
import {
  pickNotDeprecated,
  useActiveAuthProvider,
  useGetIdentity,
} from "@refinedev/core";
import { useThemedLayoutContext } from "@refinedev/antd";
import { BarsOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useShoppingCart } from "../../contexts/cart/ShoppingCartContext";

const { useToken } = theme;

interface HeaderProps {
  isSticky?: boolean | undefined;
  sticky?: boolean | undefined;
  appName?: string;
}
export const Header: React.FC<HeaderProps> = ({ isSticky, sticky }) => {
  const { openCart } = useShoppingCart();
  const breakpoint = Grid.useBreakpoint();
  const { token } = useToken();
  const { setMobileSiderOpen } = useThemedLayoutContext();

  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const shouldRenderHeader = user && (user.name || user.avatar);

  if (!shouldRenderHeader) {
    return null;
  }

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  if (pickNotDeprecated(sticky, isSticky)) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }
  const isMobile =
    typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

  return (
    <AntdLayout.Header style={headerStyles}>
      {/* <Space>{isMobile && <Title level={3}>{appName}</Title>}</Space> */}
      <Space align="center">
        {isMobile && (
          <Button
            size="large"
            onClick={() => setMobileSiderOpen(true)}
            icon={<BarsOutlined />}
          />
        )}
      </Space>
      {shouldRenderHeader && (
        <Button
          size="large"
          type="dashed"
          shape="round"
          onClick={() => {
            openCart();
          }}
        >
          <ShoppingCartOutlined />
          {!isMobile && "Cart"}
        </Button>
      )}
    </AntdLayout.Header>
  );
};
