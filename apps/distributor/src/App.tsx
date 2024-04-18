import { Refine, Authenticated } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  useNotificationProvider,
  ThemedLayoutV2,
  ThemedTitleV2,
  ThemedSiderV2,
  ThemedHeaderV2,
  RefineThemes,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider, liveProvider } from "@refinedev/supabase";
import { App as AntdApp, ConfigProvider } from "antd";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  HashRouter,
} from "react-router-dom";
import routerBindings, {
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { UserRoleTypes } from "@repo/utility";
import {
  ChallanHome,
  CheckRole,
  ColorModeContextProvider,
  CustomSidebar,
  Loader,
  ProductPage,
  SUPABASE_PROJECT_ID,
  ShowChallan,
  ShowOrders,
  authProvider,
  supabaseClient,
  InventoryD,
  ShowInventoryD,
  CreateChallan,
  CustomerHome,
  CustomerCreate,
  CustomerShow,
  FundsHome,
  CreateFundTransfer,
  RequestsMoney,
} from "@repo/ui";
import { resources } from "./config/resources";
import { ForgotPassord, Home } from "./pages";
import { Profile } from "./components/profile/Profile";
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";
import { AllAvalableProducts } from "./pages/Products/AllProductsAvalable";
import { SalesHome } from "./pages/sales";
import { SalesEdit } from "./pages/sales/Edit";
import { SalesCreate } from "./pages/sales/create";
import { SalesShow } from "./pages/sales/show";
import { ShoppingCartProvider } from "./contexts/cart/ShoppingCartContext";
import { AllOrders_D } from "./components/orders/AllOrders";
import { Header } from "./components/header/header";

function App() {
  const GetUserEmail = () => {
    try {
      const email = JSON.parse(
        localStorage.getItem(`sb-${SUPABASE_PROJECT_ID}-auth-token`) || "{}",
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
              <ConfigProvider theme={RefineThemes.Purple}>
                <Refine
                  dataProvider={dataProvider(supabaseClient)}
                  liveProvider={liveProvider(supabaseClient)}
                  authProvider={authProvider}
                  routerProvider={routerBindings}
                  notificationProvider={useNotificationProvider}
                  resources={resources}
                  options={{
                    liveMode: "auto",
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: "06e4Jx-3QQm19-vkjYLd",
                  }}
                >
                  <ShoppingCartProvider>
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
                              userType={UserRoleTypes.DISTRIBUTORS}
                            >
                              <ThemedLayoutV2
                                Header={() => (
                                  <>
                                    <Header appName="Distributor" />
                                  </>
                                )}
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
                        <Route path="/products">
                          <Route index element={<AllAvalableProducts />} />
                          <Route path=":id" element={<ProductPage />} />
                        </Route>
                        <Route path="/orders">
                          <Route index element={<AllOrders_D />} />
                          <Route path=":id" element={<ShowOrders />} />
                          {/* <Route path="edit/:id" element={<EditOrders />} /> */}
                        </Route>
                        <Route path="/customer">
                          <Route index element={<CustomerHome />} />
                          {/* <Route path="edit/:id" element={<CustomerEdit />} /> */}
                          <Route path="create" element={<CustomerCreate />} />
                          <Route path=":id" element={<CustomerShow />} />
                        </Route>
                        <Route path="/sales">
                          <Route index element={<SalesHome />} />
                          <Route path="edit/:id" element={<SalesEdit />} />
                          <Route path="create" element={<SalesCreate />} />
                          <Route path=":id" element={<SalesShow />} />
                        </Route>
                        <Route path="/inventory">
                          <Route index element={<InventoryD />} />
                          <Route path=":id" element={<ShowInventoryD />} />
                        </Route>
                        <Route path="/challan">
                          <Route index element={<ChallanHome />} />
                          <Route path="create" element={<CreateChallan />} />
                          <Route path=":id" element={<ShowChallan />} />
                        </Route>
                        <Route path="/money">
                          <Route index element={<FundsHome />} />
                          <Route path="requests" element={<RequestsMoney />} />
                          <Route
                            path="create"
                            element={<CreateFundTransfer />}
                          />
                        </Route>
                        <Route path="/me" element={<Profile />} />
                      </Route>
                    </Routes>
                  </ShoppingCartProvider>
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
