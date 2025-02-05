/// <reference types="vite-envs/client" />

type ImportMetaEnv = {
  AUTHENTICATION_MODE: string;
  PEARL_JAM_URL: string;
  QUEEN_URL_BACK_END: string;
  QUEEN_URL_FRONT_END: string;
  ISSUER_URI: string;
  OIDC_CLIENT_ID: string;

  SSR: boolean;
};

interface ImportMeta {
  url: string;

  readonly hot?: import('vite-envs/types/hot').ViteHotContext;

  readonly env: ImportMetaEnv;

  glob: import('vite-envs/types/importGlob').ImportGlobFunction;
}
