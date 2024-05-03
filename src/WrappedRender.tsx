import { render } from "@testing-library/react";
import { BrowserRouter as Router, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { messagesFr } from "./i18n-fr";
import { IntlProvider } from "react-intl";
import { ReactElement } from "react";
import { SonorTheme } from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./hooks/useAuth";

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const WrappedRender = (children: ReactElement) => {
  return render(
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <SonorTheme>
          <IntlProvider locale="fr" messages={messagesFr}>
            <Router {...router}>{children}</Router>
          </IntlProvider>
        </SonorTheme>
      </QueryClientProvider>
    </AuthProvider>,
  );
};
