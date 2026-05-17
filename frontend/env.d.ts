/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CMS_URL: string;
  // outras variáveis, se necessário
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
