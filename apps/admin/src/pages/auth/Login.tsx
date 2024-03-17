import { AuthPage, ThemedTitleV2 } from "@refinedev/antd";
import { UserRoleTypes } from "@repo/utility";

export const Login = () => {
  return (
    <>
      <AuthPage
        registerLink={false}
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "32px",
              fontSize: "20px",
            }}
          >
            <ThemedTitleV2 collapsed={false} text="PurePride" />
          </div>
        }
      ></AuthPage>
    </>
  );
};
