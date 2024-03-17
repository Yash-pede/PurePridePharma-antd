import React, { useContext } from "react";
import {
  Layout as AntdLayout,
  Typography,
  Space,
  theme,
  Button,
  Grid,
  Switch,
} from "antd";
import {
  pickNotDeprecated,
  useActiveAuthProvider,
  useGetIdentity,
} from "@refinedev/core";
import { useThemedLayoutContext } from "@refinedev/antd";
import { BarsOutlined } from "@ant-design/icons";
import { ColorModeContext } from "@repo/ui";

const { useToken } = theme;

interface HeaderProps {
  isSticky?: boolean | undefined;
  sticky?: boolean | undefined;
  appName?: string;
}
export const Header: React.FC<HeaderProps> = ({
  isSticky,
  sticky,
  appName,
}) => {
  const { mode, setMode } = useContext(ColorModeContext);
  const changeTheme = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  const breakpoint = Grid.useBreakpoint();
  const { token } = useToken();
  const { setMobileSiderOpen } = useThemedLayoutContext();

  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });
  const { Title } = Typography;
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
      <Space>{isMobile && <Title level={3}>{appName}</Title>}</Space>
      <Space align="center" size="large" >
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          title="Theme"
          defaultValue={mode === "dark"}
          onChange={changeTheme}
        />
        {isMobile && (
          <Button
            size="large"
            onClick={() => setMobileSiderOpen(true)}
            icon={<BarsOutlined />}
          />
        )}
      </Space>
    </AntdLayout.Header>
  );
};
