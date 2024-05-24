import React from "react";
import App from "./App";
import {
  useAccessToken,
  useIsAuthenticated,
} from "../../Authentication/useAuth";
import D from "../../i18n";

export const AppHOC = () => {
  const isAuthenticated = useIsAuthenticated();

  const token = useAccessToken();

  if (!isAuthenticated) {
    return <div>{D.initializationFailed}</div>;
  }

  return <App token={token} />;
};
