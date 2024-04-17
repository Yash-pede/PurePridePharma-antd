import { Refine, Authenticated } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  useNotificationProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
  RefineThemes,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider, liveProvider } from "@refinedev/supabase";
import { App as AntdApp, ConfigProvider } from "antd";
import { Route, Routes, Outlet, HashRouter } from "react-router-dom";
import routerBindings, {
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { UserRoleTypes } from "@repo/utility";
import {
  CreateChallan,
  CreateFundTransfer,
  CustomerCreate,
  CustomerHome,
  CustomerShow,
  FundsHome,
  Header,
  InventoryD,
  ShowChallan,
} from "@repo/ui";
import {
  CheckRole,
  ColorModeContextProvider,
  ChallanHome,
  SUPABASE_PROJECT_ID,
  authProvider,
  supabaseClient,
  CustomSidebar,
} from "@repo/ui";
import { resources } from "./config/resources";
import { ForgotPassord, Home } from "./pages";
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
    <HashRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                  dataProvider={dataProvider(supabaseClient)}
                  liveProvider={liveProvider(supabaseClient)}
                  authProvider={authProvider}
                  routerProvider={routerBindings}
                  notificationProvider={useNotificationProvider}
                  resources={resources}
                  options={{
                    liveMode: "auto",
                    breadcrumb: true,
                    disableTelemetry: true,
                    mutationMode: "undoable",
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
                            userType={UserRoleTypes.SALES}
                          >
                            <ThemedLayoutV2
                              Header={() => <Header appName="Sales" />}
                              Sider={() => (
                                <CustomSidebar
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
                      <Route path="/inventory">
                        <Route index element={<InventoryD sales />} />
                      </Route>
                      <Route path="/challan">
                        <Route index element={<ChallanHome sales />} />
                        <Route
                          path="create"
                          element={<CreateChallan sales />}
                        />
                        <Route path=":id" element={<ShowChallan />} />
                      </Route>
                      <Route path="/money">
                        <Route index element={<FundsHome sales />} />
                        <Route path="create" element={<CreateFundTransfer sales/>} />
                      </Route>
                      <Route path="/customer">
                        <Route index element={<CustomerHome sales />} />
                        {/* <Route path="edit/:id" element={<CustomerEdit />} /> */}
                        <Route
                          path="create"
                          element={<CustomerCreate sales />}
                        />
                        <Route path=":id" element={<CustomerShow sales />} />
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
    </HashRouter>
  );
}

export default App;
