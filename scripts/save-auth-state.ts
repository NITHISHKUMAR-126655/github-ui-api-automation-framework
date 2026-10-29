/**
 * One-off helper: opens a real browser so YOU can log in manually (MFA/CAPTCHA/SSO safe),
 * then saves the session to a git-ignored Playwright storage state file.
 * Run with: npm run auth:save
 */
import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { env } from '../config/env';

(async () => {
  const target = env.storageStatePath;
  fs.mkdirSync(path.dirname(target), { recursive: true });

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(`${env.uiBaseUrl}/login`);

  console.log('Log in manually in the opened browser (including MFA).');
  console.log('When you can see your GitHub dashboard, come back here and press ENTER.');
  await new Promise<void>((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question('', () => {
      rl.close();
      resolve();
    });
  });

  await context.storageState({ path: target });
  await browser.close();
  console.log(`Storage state saved to ${target} (git-ignored). Never commit or share this file.`);
})();
