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
import {
  AllInventory,
  AllOrders,
  AllProducts,
  CheckRole,
  ColorModeContextProvider,
  CreateStock,
  Loader,
  ProductPage,
  SUPABASE_PROJECT_ID,
  ShowOrders,
  authProvider,
  supabaseClient,
} from "@repo/ui";
import {} from "@repo/ui";
import { resources } from "./config/resources";
import { CreateUsers, ForgotPassord, Home, Users } from "./pages";
import { Profile } from "./components/profile/Profile";
import { Register } from "./pages/auth/Register";
import { Login } from "./pages/auth/Login";
import { AllAvalableProducts } from "./pages/Products/AllProductsAvalable";
import { CustomerHome } from "./pages/customer";
import { CustomerEdit } from "./pages/customer/Edit";
import { CustomerCreate } from "./pages/customer/create";
import { CustomerShow } from "./pages/customer/show";
import { SalesHome } from "./pages/sales";
import { SalesEdit } from "./pages/sales/Edit";
import { SalesCreate } from "./pages/sales/create";
import { SalesShow } from "./pages/sales/show";
import { Header } from "./components/header/header";
import { ShoppingCartProvider } from "./contexts/cart/ShoppingCartContext";
import { InventoryD } from "./pages/inventory/inventory";
import { AllOrders_D } from "./components/orders/AllOrders";
import { ShowInventoryD } from "./pages/inventory/ShowInventory";

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
                  <ShoppingCartProvider>
                    <Routes>
                      <Route
                        loader={() => <Loader />}
                        path="/register"
                        element={<Register />}
                      />
                      <Route
                        loader={() => <Loader />}
                        path="/login"
                        element={<Login />}
                      />
                      <Route
                        path="/forgot-password"
                        element={<ForgotPassord />}
                      />
                      <Route
                        loader={() => <Loader />}
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
                                Header={() => <Header appName="Distributor" />}
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
                        <Route
                          loader={() => <Loader />}
                          index
                          element={<Home />}
                        />
                        <Route loader={() => <Loader />} path="/products">
                          <Route index element={<AllAvalableProducts />} />
                          <Route path=":id" element={<ProductPage />} />
                        </Route>
                        <Route loader={() => <Loader />} path="/orders">
                          <Route index element={<AllOrders_D />} />
                          <Route path=":id" element={<ShowOrders />} />
                          {/* <Route path="edit/:id" element={<EditOrders />} /> */}
                        </Route>
                        <Route loader={() => <Loader />} path="/customer">
                          <Route index element={<CustomerHome />} />
                          <Route path="edit/:id" element={<CustomerEdit />} />
                          <Route path="create" element={<CustomerCreate />} />
                          <Route path=":id" element={<CustomerShow />} />
                        </Route>
                        <Route loader={() => <Loader />} path="/sales">
                          <Route index element={<SalesHome />} />
                          <Route path="edit/:id" element={<SalesEdit />} />
                          <Route path="create" element={<SalesCreate />} />
                          <Route path=":id" element={<SalesShow />} />
                        </Route>
                        <Route loader={() => <Loader />} path="/inventory">
                          <Route index element={<InventoryD />} />
                          <Route path=":id" element={<ShowInventoryD />} />
                        </Route>
                        <Route
                          loader={() => <Loader />}
                          path="/me"
                          element={<Profile />}
                        />
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
    </BrowserRouter>
  );
}

export default App;
