import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {AppHOC} from './components/App/AppHOC';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-notifications/lib/notifications.css';
import 'whatwg-fetch';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./Authentication/useAuth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AppHOC />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
