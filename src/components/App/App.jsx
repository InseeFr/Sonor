import React, { useEffect, useState } from "react";
import { useIsAuthenticated } from "../../Authentication/useAuth";
import D from "../../i18n";
import View from "../View/View";
import DataFormatter from "../../utils/DataFormatter";
import { OIDC, ANONYMOUS } from "../../utils/constants.json";

export const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [contactFailed, setContactFailed] = useState(false);
  const [data, setData] = useState(null);

  const { tokens } = useIsAuthenticated();

  useEffect(() => {
    if (window.localStorage.getItem("AUTHENTICATION_MODE") === ANONYMOUS) {
      const dataRetreiver = new DataFormatter();
      dataRetreiver.getUserInfo((data) => {
        if (data.error) {
          setContactFailed(true);
        } else {
          setAuthenticated(true);
          setData(data);
        }
      });
    } else if (
      window.localStorage.getItem("AUTHENTICATION_MODE") === OIDC &&
      tokens?.accessToken
    ) {
      const dataRetreiver = new DataFormatter(tokens.accessToken);
      dataRetreiver.getUserInfo((data) => {
        setAuthenticated(data !== undefined);
        setData(data);
      });
    }
  }, [tokens]);

  if (!tokens?.accessToken) {
    return <div>{D.initializationFailed}</div>;
  }

  if (authenticated && tokens?.accessToken && data) {
    return (
      <div className="App">
        <View token={tokens.accessToken} userData={data} />
      </div>
    );
  }

  if (contactFailed) {
    return <div>{D.cannotContactServer}</div>;
  }

  return <div>{D.initializing}</div>;
};
