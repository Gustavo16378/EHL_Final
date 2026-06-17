/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Adicione variáveis VITE_* aqui se necessário.
  // ATENÇÃO: tudo com prefixo VITE_ é PÚBLICO no bundle — nunca colocar segredo (R2/Strapi) aqui.
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
