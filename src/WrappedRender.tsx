import { render } from "@testing-library/react";
import { BrowserRouter as Router, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { messagesFr } from "./i18n-fr";
import { IntlProvider } from "react-intl";
import { ReactElement } from "react";
import { SonorTheme } from "./theme";

const router = createBrowserRouter(routes);

export const WrappedRender = (children: ReactElement) => {
  return render(
    <SonorTheme>
      <IntlProvider locale="fr" messages={messagesFr}>
        <Router {...router}>{children}</Router>
      </IntlProvider>
    </SonorTheme>,
  );
};
