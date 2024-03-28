import {
  Refine,
} from "@refinedev/core";
import {RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider, liveProvider } from "@refinedev/supabase";
import { App as AntdApp, ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import routerBindings, {
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { authProvider } from "./authProvider";
import { supabaseClient } from "./utility";
import { auditLogProvider } from "./SuperComponents/providers/auditLogProvider";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            {/* <DevtoolsProvider> */}
            <ConfigProvider>
              <Refine
                dataProvider={dataProvider(supabaseClient)}
                liveProvider={liveProvider(supabaseClient)}
                authProvider={authProvider}
                routerProvider={routerBindings}
                notificationProvider={useNotificationProvider}
                options={{
                  liveMode: "auto",
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "l3FWWj-xHKRgM-cae5oj",
                }}
              >
                {/* <Routes>
                  <Route index element={<WelcomePage />} />
                </Routes> */}
                <UnsavedChangesNotifier />
                {/* <DocumentTitleHandler /> */}
              </Refine>
            </ConfigProvider>
            {/* <DevtoolsPanel /> */}
            {/* </DevtoolsProvider> */}
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
