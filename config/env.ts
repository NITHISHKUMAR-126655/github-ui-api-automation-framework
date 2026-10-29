import * as dotenv from 'dotenv';
import * as path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '..');
dotenv.config({ path: path.join(PROJECT_ROOT, '.env') }); // no-op in CI where real env vars are injected

const MANDATORY_FOR_API = ['AIQE_GITHUB_USER', 'AIQE_GITHUB_TOKEN', 'AIQE_TEST_REPO'] as const;

function readRequired(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `Missing required environment variable "${name}". ` +
        'Define it in your local .env file (see .env.example) or as a CI secret/variable.',
    );
  }
  return value;
}

function readOptional(name: string, fallback: string): string {
  const value = process.env[name]?.trim();
  return value ? value : fallback;
}

const stripTrailingSlash = (url: string): string => url.replace(/\/+$/, '');

/**
 * Central configuration. Values are read lazily (getters) so public UI tests can run
 * without a token, while anything that needs a secret fails with a clear message.
 * Secrets are never logged or returned in error messages.
 */
export const env = {
  get uiBaseUrl(): string {
    return stripTrailingSlash(readOptional('AIQE_UI_BASE_URL', 'https://github.com'));
  },
  get apiBaseUrl(): string {
    return stripTrailingSlash(readOptional('AIQE_API_BASE_URL', 'https://api.github.com'));
  },
  get ignoreHttpsErrors(): boolean {
    return readOptional('AIQE_IGNORE_HTTPS_ERRORS', 'false').toLowerCase() === 'true';
  },
  get userId(): string {
    return readRequired('AIQE_GITHUB_USER');
  },
  get token(): string {
    return readRequired('AIQE_GITHUB_TOKEN');
  },
  get testRepo(): string {
    return readRequired('AIQE_TEST_REPO');
  },
  get storageStatePath(): string {
    return path.resolve(PROJECT_ROOT, readOptional('AIQE_STORAGE_STATE', 'playwright/.auth/github.json'));
  },
  /** Validates every mandatory API value at once and reports all missing names together. */
  validate(): void {
    const missing = MANDATORY_FOR_API.filter((name) => !process.env[name]?.trim());
    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variable(s): ${missing.join(', ')}. ` +
          'Define them in your local .env file (see .env.example) or as CI secrets/variables.',
      );
    }
  },
};
