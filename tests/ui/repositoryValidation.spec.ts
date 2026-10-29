import * as fs from 'fs';
import { env } from '../../config/env';
import { expect, uiTest as test } from '../../src/fixtures';
import repositoryData from '../../testdata/repositoryData.json';

// A private capstone repository is only visible when a storage state is available.
if (fs.existsSync(env.storageStatePath)) {
  test.use({ storageState: env.storageStatePath });
}

const expected = repositoryData.dedicatedRepository;

test.describe('UI | Dedicated repository validation', () => {
  test('UI-04 validate the dedicated capstone repository', { tag: ['@smoke', '@ui'] }, async ({ page, repositoryPage }) => {
    const response = await repositoryPage.open(env.userId, env.testRepo);
    expect(response?.status(), 'Repository page should load (private repo needs a storage state)').toBe(200);

    await expect(page).toHaveURL(new RegExp(`/${env.userId}/${env.testRepo}$`, 'i'));
    await expect(repositoryPage.getRepositoryName(env.testRepo)).toBeVisible();
    await expect(repositoryPage.getOwner(env.userId)).toBeVisible();
    await expect(repositoryPage.getVisibility()).toHaveText(expected.expectedVisibility);
    await expect(repositoryPage.getDescription(expected.expectedDescription)).toBeVisible();
    await expect(repositoryPage.getReadme()).toContainText(new RegExp(expected.expectedReadmeText, 'i'));
    await expect(repositoryPage.getBranchSelector()).toContainText(expected.expectedDefaultBranch);
  });

  test('UI-04b repository tabs navigate correctly', { tag: ['@ui'] }, async ({ page, repositoryPage }) => {
    await repositoryPage.open(env.userId, env.testRepo);

    await repositoryPage.openTab('Issues');
    await expect(page).toHaveURL(/\/issues/);

    await repositoryPage.openTab('Pull requests');
    await expect(page).toHaveURL(/\/pulls/);
  });
});
