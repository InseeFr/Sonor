export const useConfiguration = () => {
  return {
    AUTHENTICATION_MODE: import.meta.env.VITE_AUTHENTICATION_MODE,
    PEARL_JAM_URL: import.meta.env.VITE_PEARL_JAM_URL,
    QUEEN_URL_BACK_END: import.meta.env.VITE_QUEEN_URL_BACK_END,
    QUEEN_URL_FRONT_END: import.meta.env.VITE_QUEEN_URL_FRONT_END,
    ISSUER_URI: import.meta.env.VITE_ISSUER_URI,
    OIDC_CLIENT_ID: import.meta.env.VITE_OIDC_CLIENT_ID,
  };
};
