import { authProvider } from "@repo/ui";
import { redirect } from "react-router-dom";
import { AuthPage } from "@refinedev/antd";
import { notification } from "antd";
import { NotificationPlacement } from "antd/lib/notification/interface";

export const Register = () => {
  const [api] = notification.useNotification();
  const openNotification = ({
    placement,
    description,
  }: {
    placement: NotificationPlacement;
    description: string;
  }) => {
    api.info({
      message: `welcome to Purepridepharma`,
      description: description,
      placement,
    });
  };
  return (
    <AuthPage
      type="register"
      formProps={{
        onSubmitCapture(values) {
          console.log(values);
          authProvider.register &&
            authProvider.register(values).then((response: any) => {
              if (response.error) {
                openNotification({
                  placement: "topRight",
                  description: response.error.message,
                });
              }
              if (response.success) {
                openNotification({
                  placement: "topRight",
                  description: "check your email.",
                });
                redirect(response.redirectTo || "/");
              }
            });
        },
      }}
    />
  );
};
