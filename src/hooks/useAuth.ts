import { useEffect } from "react";
import { createAppOidc } from "../functions/oidc.ts";

const { OidcProvider, useOidc } = createAppOidc();

export const useHasRole = (role: string): boolean => {
  const { oidcTokens } = useOidc({ assertUserLoggedIn: true });
  return oidcTokens.decodedIdToken.inseegroupedefaut.includes(role);
};

export const useAccessToken = (): string => {
  return useOidc({ assertUserLoggedIn: true }).oidcTokens.accessToken;
};

export const useUser = () => {
  return useOidc({ assertUserLoggedIn: true }).oidcTokens.decodedIdToken;
};

export const useLogout = () => {
  return useOidc({ assertUserLoggedIn: true }).logout;
};

export function useIsAuthenticated(): boolean {
  const { login, isUserLoggedIn } = useOidc({ assertUserLoggedIn: false });

  useEffect(() => {
    if (!login) {
      return;
    }
    login({
      doesCurrentHrefRequiresAuth: false,
    });
  }, [login]);

  return isUserLoggedIn;
}

export const AuthProvider = OidcProvider;