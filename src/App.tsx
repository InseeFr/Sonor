import { CircularProgress } from "@mui/material";
import "./App.css";
import { useIsAuthenticated } from "./hooks/useAuth";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes.tsx";
import { Row } from "./ui/Row.tsx";
import { IntlProvider } from "react-intl";
import { LocaleType, getMessages } from "./i18n/messages.ts";
import { getEnvVar } from "./utils/configuration/index.ts";

const router = createBrowserRouter(routes);

export function App() {
  const isAuthenticated = useIsAuthenticated();

  let locale: LocaleType = "en";
  if (getEnvVar("VITE_LOCALE")) {
    locale = getEnvVar("VITE_LOCALE");
  }

  if (!isAuthenticated) {
    return (
      <Row justifyContent="center" py={10}>
        <CircularProgress />
      </Row>
    );
  }
  return (
    <IntlProvider messages={getMessages(locale)} locale={locale}>
      <RouterProvider router={router} />
    </IntlProvider>
  );
}
