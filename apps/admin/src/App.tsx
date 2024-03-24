import { Refine, Authenticated } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  useNotificationProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
  RefineThemes,
  ThemedSiderV2,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider, liveProvider } from "@refinedev/supabase";
import { App as AntdApp, ConfigProvider } from "antd";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, {
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { UserRoleTypes } from "@repo/utility";
import { Header } from "./components/header";
import {
  AllInventory,
  AllOrders,
  AllProducts,
  CheckRole,
  ColorModeContextProvider,
  CreateStock,
  EditOrders,
  ProductPage,
  SUPABASE_PROJECT_ID,
  ShowOrders,
  authProvider,
  supabaseClient,
} from "@repo/ui";
import { resources } from "./config/resources";
import { CreateUsers, ForgotPassord, Home, Users } from "./pages";
import { Profile } from "./components/profile/Profile";
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";

function App() {
  const GetUserEmail = () => {
    try {
      const email = JSON.parse(
        localStorage.getItem(`sb-${SUPABASE_PROJECT_ID}-auth-token`) || "{}"
      )?.user.email as string;
      return email;
    } catch (e) {
      return "";
    }
  };
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <ConfigProvider>
                <Refine
                  dataProvider={dataProvider(supabaseClient)}
                  liveProvider={liveProvider(supabaseClient)}
                  authProvider={authProvider}
                  routerProvider={routerBindings}
                  notificationProvider={useNotificationProvider}
                  resources={resources}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: "06e4Jx-3QQm19-vkjYLd",
                  }}
                >
                  <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassord />}
                    />
                    <Route
                      element={
                        <Authenticated
                          key={"authenticated-layout"}
                          fallback={<CatchAllNavigate to="/login" />}
                        >
                          <CheckRole
                            email={GetUserEmail()}
                            userType={UserRoleTypes.ADMIN}
                          >
                            <ThemedLayoutV2
                              Header={() => <Header appName="Admin" />}
                              Sider={() => (
                                <ThemedSiderV2
                                  Title={() => (
                                    <ThemedTitleV2
                                      collapsed={false}
                                      text="PurePride"
                                    />
                                  )}
                                />
                              )}
                              Title={(titleProps) => (
                                <ThemedTitleV2
                                  {...titleProps}
                                  text={"PurePride"}
                                />
                              )}
                            >
                              <Outlet />
                            </ThemedLayoutV2>
                          </CheckRole>
                        </Authenticated>
                      }
                    >
                      <Route index element={<Home />} />
                      <Route path="/products">
                        <Route index element={<AllProducts />} />
                        <Route path=":id" element={<ProductPage />} />
                        <Route path="create" element={<>U r not su admin</>} />
                      </Route>
                      <Route path="/orders">
                        <Route index element={<AllOrders />} />
                        <Route path=":id" element={<ShowOrders />} />
                        <Route path="edit/:id" element={<EditOrders />} />
                      </Route>
                      <Route path="/inventory">
                        <Route index element={<AllInventory />} />
                        <Route path="create" element={<CreateStock />} />
                      </Route>
                      <Route path="/profiles">
                        <Route index element={<Users />} />
                        <Route path="create" element={<CreateUsers />} />
                      </Route>
                      <Route path="/me" element={<Profile />} />
                    </Route>
                  </Routes>
                  <RefineKbar />
                  <UnsavedChangesNotifier />
                  <DocumentTitleHandler />
                </Refine>
              </ConfigProvider>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
