import React, { useContext } from "react";
import {
  Layout as AntdLayout,
  Space,
  theme,
  Switch,
  Grid,
  Button,
  Flex,
} from "antd";
import {
  pickNotDeprecated,
  useActiveAuthProvider,
  useGetIdentity,
} from "@refinedev/core";
import { ColorModeContext } from "@repo/ui";
import { BarsOutlined } from "@ant-design/icons";
import { useThemedLayoutContext } from "@refinedev/antd";
interface HeaderProps {
  isSticky?: boolean | undefined;
  sticky?: boolean | undefined;
  appName?: string;
}
export const Header: React.FC<HeaderProps> = ({ isSticky, sticky }) => {
  const { mode, setMode } = useContext(ColorModeContext);
  const changeTheme = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };
  const { setMobileSiderOpen } = useThemedLayoutContext();
  const breakpoint = Grid.useBreakpoint();
  const { token } = theme.useToken();

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
    justifyContent: "flex-end",
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
      {isMobile && (
        <Flex align="center" justify="space-between" style={{ width: "100%" }}>
          <Button
            size="large"
            onClick={() => setMobileSiderOpen(true)}
            icon={<BarsOutlined />}
          />
          <Switch
            checkedChildren="🌛"
            unCheckedChildren="🔆"
            title="Theme"
            defaultValue={mode === "dark"}
            onChange={changeTheme}
          />
        </Flex>
      )}
      {!isMobile && (
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          title="Theme"
          defaultValue={mode === "dark"}
          onChange={changeTheme}
        />
      )}
    </AntdLayout.Header>
  );
};
