import "./App.css";

import PageLoading from "./components/common/PageLoading";
import AppRoutes from "./App.routes";

import { Suspense } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <Router>
        <Suspense fallback={<PageLoading fixed />}>
          <NextUIProvider>
            <AppRoutes />
          </NextUIProvider>
        </Suspense>
      </Router>
    </Auth0Provider>
  );
}

export default App;
