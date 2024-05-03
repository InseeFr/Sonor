import { Fragment } from "react";
import { z } from "zod";
import { createReactOidc } from "oidc-spa/react";
import { createMockReactOidc } from "oidc-spa/mock/react";
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

const decodedIdTokenSchema = z.object({
  inseegroupedefaut: z.array(z.string()),
  preferred_username: z.string(),
  name: z.string(),
});

export const createAppOidc = () => {
  if (isOidc) {
    return !import.meta.env.VITE_OIDC_ISSUER
      ? createMockReactOidc<TokenInfo>({
          isUserInitiallyLoggedIn: true,
          
          mockedTokens: {
            decodedIdToken: {
              inseegroupedefaut: ["gr"],
              preferred_username: "john doe",
              name: "john",
            } satisfies z.infer<typeof decodedIdTokenSchema>,
          },
        })
      : createReactOidc<TokenInfo>({
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
