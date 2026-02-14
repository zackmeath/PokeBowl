/// <reference types="vite/client" />

interface ImportMetaEnv {
  // API
  readonly VITE_API_URL: string;
  readonly VITE_API_TIMEOUT: string;

  // App
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_URL: string;

  // Features
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_DEBUG: string;

  // Vite built-ins
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly SSR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
