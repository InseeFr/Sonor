import { createReactOidc } from "oidc-spa/react";
import { Fragment } from "react";

type TokenInfo = {
  inseegroupedefaut: string[];
  preferred_username: string;
  name: string;
};

const guestUser: TokenInfo = {
  inseegroupedefaut: [],
  preferred_username: "Guest",
  name: "Guest",
};

const isOidc = import.meta.env.VITE_AUTH_TYPE === "oidc";

export const createAppOidc = () => {
  if (isOidc) {
    return createReactOidc<TokenInfo>({
      issuerUri: import.meta.env.VITE_OIDC_ISSUER,
      clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
      publicUrl: "/",
      extraQueryParams: { kc_idp_hint: import.meta.env.VITE_IDENTITY_PROVIDER },
    });
  }

  return {
    OidcProvider: Fragment,
    useOidc: () => ({
      login: () => null,
      isUserLoggedIn: true,
      oidcTokens: {
        decodedIdToken: guestUser,
        accessToken: "accessToken",
      },
      logout: () => (window.location.href = "/"),
    }),
  };
};
