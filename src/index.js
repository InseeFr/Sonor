import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-notifications/lib/notifications.css';
import 'whatwg-fetch';
import { initializeOidc } from './Authentication/useAuth';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./components/App/App"

async function main() {
  // Load OIDC configuration
  const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
  const response = await fetch(`${publicUrl.origin}/configuration.json`)
  const configuration = await response.json();

  // Inject configuration infos in the localStorage
  window.localStorage.setItem(
    'AUTHENTICATION_MODE',
    configuration.AUTHENTICATION_MODE,
  );
  window.localStorage.setItem('PEARL_JAM_URL', configuration.PEARL_JAM_URL);
  window.localStorage.setItem('QUEEN_URL_BACK_END', configuration.QUEEN_URL_BACK_END);
  window.localStorage.setItem('QUEEN_URL_FRONT_END', configuration.QUEEN_URL_FRONT_END);

  // Initialize OIDC globally to use it later
  const {OidcProvider} = initializeOidc({
    issuerUri: configuration.ISSUER_URI,
    clientId: configuration.OIDC_CLIENT_ID,
    publicUrl: "/",  
  })

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10000,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  ReactDOM.render(
    <React.StrictMode>
      <OidcProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </OidcProvider>
    </React.StrictMode>,
    document.getElementById('root'),
  );
}

main();

