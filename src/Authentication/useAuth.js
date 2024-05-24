import { useEffect } from "react";
import { createAppOidc } from "./oidc.js";

export const { OidcProvider, prOidc, useOidc } =  createAppOidc();

export const useHasRole = (role)=> {
  const { oidcTokens } = useOidc({ assertUserLoggedIn: true });
  return oidcTokens.decodedIdToken.inseegroupedefaut.includes(role);
};

export const useAccessToken = () => {
  return useOidc({ assertUserLoggedIn: true }).oidcTokens.accessToken;
};

export const useUser = () => {
  return useOidc({ assertUserLoggedIn: true }).oidcTokens.decodedIdToken;
};

export const useMaybeUser = () => {
  return useOidc({ assertUserLoggedIn: false }).oidcTokens?.decodedIdToken;
};

export const useLogout = () => {
  return useOidc({ assertUserLoggedIn: false }).logout;
};

export function useIsAuthenticated() {
  const { login, isUserLoggedIn, oidcTokens } = useOidc({ assertUserLoggedIn: false });

  useEffect(() => {
    if (!login) {
      return;
    }
    login({
      doesCurrentHrefRequiresAuth: false,
    });
  }, [login]);

  return { isAuthenticated: isUserLoggedIn, tokens: oidcTokens };
}

export const AuthProvider = OidcProvider;
