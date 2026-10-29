import { defineConfig, devices } from '@playwright/test';
import { env } from './config/env';

const isCI = !!process.env.CI;
const allBrowsers = process.env.AIQE_ALL_BROWSERS === 'true'; // bonus: multi-browser execution
const uiMatch = ['**/ui/**/*.spec.ts', '**/integrated/**/*.spec.ts'];

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results/artifacts',
  timeout: 45_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    trace: 'on-first-retry', // review traces before sharing: they can contain sensitive data
    screenshot: 'only-on-failure',
    video: 'off',
    actionTimeout: 15_000,
    ignoreHTTPSErrors: env.ignoreHttpsErrors,
  },
  projects: [
    { name: 'api', testMatch: '**/api/**/*.spec.ts' },
    {
      name: 'ui-chromium',
      testMatch: uiMatch,
      use: { ...devices['Desktop Chrome'], baseURL: env.uiBaseUrl },
    },
    ...(allBrowsers
      ? [
          {
            name: 'ui-firefox',
            testMatch: uiMatch,
            use: { ...devices['Desktop Firefox'], baseURL: env.uiBaseUrl },
          },
          {
            name: 'ui-webkit',
            testMatch: uiMatch,
            use: { ...devices['Desktop Safari'], baseURL: env.uiBaseUrl },
          },
        ]
      : []),
  ],
});
