import { UserRoleTypes } from "@repo/utility";
import { useUserRoleCheck } from "../hooks/UseCheckRole";
import "./CheckRole.css";
import { FloatButton } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

export const CheckRole = ({
  userType,
  email,
  children,
}: {
  userType: UserRoleTypes;
  email: string;
  children: React.ReactNode;
}) => {
  // console.log(email);
  const isUserValid = useUserRoleCheck(email, userType);
  if (!isUserValid) {
    return (
      <>
        <FloatButton
          icon={<ReloadOutlined />}
          onClick={() => window.location.reload()}
          shape="circle"
        >
          If this page dosnt load redirect automatically, Try Refreshing the
          page
        </FloatButton>
        {/* <div className="main-terminal">
          <div className="terminal">
            <div className="terminal-header">
              <div className="buttons">
                <span className="close"></span>
                <span className="minimize"></span>
                <span className="maximize"></span>
              </div>
              <div className="title">PurePride</div>
            </div>
            <div className="terminal-body">
              <div className="terminal-loader">
                <span className="loader-text">
                  You are not authorized as a {userType.toLowerCase()} user
                </span>
                <span id="dot1" className="dot">
                  .
                </span>
                <span id="dot2" className="dot">
                  .
                </span>
                <span id="dot3" className="dot">
                  .
                </span>
              </div>
            </div>
          </div>
        </div> */}
        <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
          <div className="loader"></div>
        </div>
      </>
    );
  }

  return <>{children}</>;
};
