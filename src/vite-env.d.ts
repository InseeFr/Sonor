/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_AUTH_TYPE: string;
  readonly VITE_OIDC_CLIENT_ID: string;
  readonly VITE_OIDC_ISSUER: string;
  readonly VITE_IDENTITY_PROVIDER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
    ? []
    : T extends Array<any> | string
      ? string[]
      : never;

interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
}
