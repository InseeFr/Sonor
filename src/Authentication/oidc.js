import { createMockReactOidc } from "oidc-spa/mock/react";
import { createReactOidc } from "oidc-spa/react";

const guestUser = {
  inseegroupedefaut: [],
  preferred_username: "Guest",
  name: "Guest",
};

// const publicUrl = new URL(process.env.PUBLIC_URL!, window.location.href); 
// const response = await fetch(`${publicUrl.origin}/configuration.json`);
// const configuration = await response.json();

// const isOidc = configuration.AUTHENTICATION_MODE === "oidc"
const isOidc = true

const getConfiguration = async () => {
  const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
  const response = await fetch(`${publicUrl.origin}/configuration.json`)
  const configuration = await response.json();
  console.log("configuration", configuration)
  return  configuration
}

export const createAppOidc = () => {
  // const configuration =  getConfiguration()
  // console.log("dans oidc",configuration)
  
  if (isOidc) {
    return createReactOidc({
    // issuerUri: configuration.ISSUER_URI,
    // clientId: configuration.OIDC_CLIENT_ID,
    
    issuerUri:"https://auth.insee.test/auth/realms/agents-insee-interne",
    clientId:"localhost-frontend",
    
    publicUrl: "/",
    //   extraQueryParams: { kc_idp_hint: import.meta.env.VITE_IDENTITY_PROVIDER },
    extraQueryParams: {kc_idp_hint :"insee-ssp"}
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
