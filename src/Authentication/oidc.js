import { createMockReactOidc } from "oidc-spa/mock/react";
import { createReactOidc } from "oidc-spa/react";
import { useEffect, useState } from "react";

const guestUser = {
  inseegroupedefaut: [],
  preferred_username: "anonymous",
  name: "anonymous",
};


export const useConfiguration = () => {
  const [configuration, setConfiguration] = useState()
  useEffect(() => {
    const getConfiguration =  async () => {
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      const response = await fetch(`${publicUrl.origin}/configuration.json`)
      const configuration = await response.json();
      setConfiguration(configuration)
      window.localStorage.setItem(
        'AUTHENTICATION_MODE',
        configuration.AUTHENTICATION_MODE,
      );
      window.localStorage.setItem('PEARL_JAM_URL', configuration.PEARL_JAM_URL);
      window.localStorage.setItem('QUEEN_URL_BACK_END', configuration.QUEEN_URL_BACK_END);
      window.localStorage.setItem('QUEEN_URL_FRONT_END', configuration.QUEEN_URL_FRONT_END);
    }
    getConfiguration()
  }, [])
  
  return configuration
}

export const createAppOidc =  (configuration) => {
  if(configuration && configuration.AUTHENTICATION_MODE === "oidc"){
    return createReactOidc({
      issuerUri: configuration.ISSUER_URI,
      clientId: configuration.OIDC_CLIENT_ID,
      publicUrl: "/",  
    });
  }

  return createMockReactOidc({
    isUserInitiallyLoggedIn: true,
    mockedTokens: {
      decodedIdToken: guestUser,
      accessToken: "accessToken",
    },
  });
};
