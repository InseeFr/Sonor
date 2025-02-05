/// <reference types="vite-envs/client" />

type ImportMetaEnv = {
  VITE_AUTHENTICATION_MODE: string;
  VITE_PEARL_JAM_URL: string;
  VITE_QUEEN_URL_BACK_END: string;
  VITE_QUEEN_URL_FRONT_END: string;
  VITE_ISSUER_URI: string;
  VITE_OIDC_CLIENT_ID: string;

  SSR: boolean;
};

interface ImportMeta {
  url: string;

  readonly hot?: import('vite-envs/types/hot').ViteHotContext;

  readonly env: ImportMetaEnv;

  glob: import('vite-envs/types/importGlob').ImportGlobFunction;
}
