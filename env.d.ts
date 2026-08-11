/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * URL base do Strapi. Opcional de propósito: em builds sem a variável ela
   * chega como `undefined` (ou string vazia), e o código precisa tratar isso.
   */
  readonly VITE_CMS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
