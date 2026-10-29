import * as fs from 'fs';
import { env } from '../../config/env';
import { expect, uiTest as test } from '../../src/fixtures';

const hasStorageState = fs.existsSync(env.storageStatePath);

test.describe('UI | Authenticated navigation', () => {
  test.skip(
    !hasStorageState,
    'No Playwright storage state found. Run "npm run auth:save" (manual login, MFA-safe) to create one.',
  );
  test.use({ storageState: env.storageStatePath });

  test('UI-03 authenticated user can open the dashboard and the capstone repository', { tag: ['@auth', '@ui'] }, async ({
    page,
    authenticatedHomePage,
    repositoryPage,
  }) => {
    await authenticatedHomePage.open();
    await expect(authenticatedHomePage.getUserMenu()).toBeVisible();
    const login = await authenticatedHomePage.getSignedInLogin();
    expect(login?.toLowerCase()).toBe(env.userId.toLowerCase());

    await repositoryPage.open(env.userId, env.testRepo);
    await expect(page).toHaveURL(new RegExp(`/${env.userId}/${env.testRepo}$`, 'i'));
    await expect(repositoryPage.getRepositoryName(env.testRepo)).toBeVisible();
    await expect(repositoryPage.getOwner(env.userId)).toBeVisible();
  });
});
