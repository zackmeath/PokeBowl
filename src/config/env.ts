/**
 * Environment configuration
 *
 * All environment variables must be prefixed with VITE_ to be exposed to the client.
 * Access via import.meta.env.VITE_*
 *
 * For sensitive values (API keys, secrets), these should only be used server-side.
 * This file is for client-safe configuration only.
 */

interface EnvConfig {
  // API
  apiUrl: string;
  apiTimeout: number;

  // App
  appName: string;
  appUrl: string;

  // Features
  enableAnalytics: boolean;
  enableDebugMode: boolean;

  // Environment
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
}

function getEnvVar(key: string, defaultValue?: string): string {
  const value = import.meta.env[key] ?? defaultValue;
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

function getEnvVarBoolean(key: string, defaultValue: boolean): boolean {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value === 'true' || value === '1';
}

function getEnvVarNumber(key: string, defaultValue: number): number {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

export const env: EnvConfig = {
  // API
  apiUrl: getEnvVar('VITE_API_URL', 'http://localhost:3001/api'),
  apiTimeout: getEnvVarNumber('VITE_API_TIMEOUT', 30000),

  // App
  appName: getEnvVar('VITE_APP_NAME', 'Pokemon Draft League'),
  appUrl: getEnvVar('VITE_APP_URL', 'http://localhost:5173'),

  // Features
  enableAnalytics: getEnvVarBoolean('VITE_ENABLE_ANALYTICS', false),
  enableDebugMode: getEnvVarBoolean('VITE_ENABLE_DEBUG', import.meta.env.DEV),

  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  isTest: import.meta.env.MODE === 'test',
};

// Freeze to prevent accidental mutation
Object.freeze(env);

// Log config in development (excluding sensitive values)
if (env.isDevelopment && env.enableDebugMode) {
  console.log('[Config] Environment loaded:', {
    apiUrl: env.apiUrl,
    appUrl: env.appUrl,
    mode: import.meta.env.MODE,
  });
}
