import {
  Refine,
  GitHubBanner,
  WelcomePage,
  Authenticated,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider, liveProvider } from "@refinedev/supabase";
import { App as AntdApp, ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import routerBindings, {
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Header } from "./components/header";
import { authProvider } from "./authProvider";
import { supabaseClient } from "./utility";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
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
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: "l3FWWj-xHKRgM-cae5oj",
                  }}
                >
                  {/* <Routes>
                  <Route index element={<WelcomePage />} />
                </Routes> */}
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
