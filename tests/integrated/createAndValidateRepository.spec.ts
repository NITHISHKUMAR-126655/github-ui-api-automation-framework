import * as fs from 'fs';
import { env } from '../../config/env';
import { expect, uiTest as test } from '../../src/fixtures';
import { GitHubRepository } from '../../src/models/GitHubModels';
import { ApiUtil } from '../../src/utils/ApiUtil';
import { CleanupUtil } from '../../src/utils/CleanupUtil';
import { DataUtil } from '../../src/utils/DataUtil';
import repositoryData from '../../testdata/repositoryData.json';

const hasStorageState = fs.existsSync(env.storageStatePath);
if (hasStorageState) {
  test.use({ storageState: env.storageStatePath });
}

test.describe('Integrated | UI + API', () => {
  test('INT-01 create repository via API, validate it in the UI, delete via API', { tag: ['@integrated', '@cleanup'] }, async ({
    page,
    repoService,
    repositoryPage,
  }) => {
    const cfg = repositoryData.integratedRepository;
    const repoName = DataUtil.uniqueRepositoryName();
    const owner = env.userId;

    try {
      // 1. API setup (public repository so the UI check works without logging in)
      const response = await repoService.createRepository(repoName, {
        description: cfg.description,
        isPrivate: false,
        autoInit: true,
      });
      await ApiUtil.expectStatus(response, 201);
      const created = (await response.json()) as GitHubRepository;

      // 2. Correlation: values captured from the API drive the UI navigation and checks
      const { name, html_url: url, owner: { login } } = created;
      expect(name).toBe(repoName);

      // 3. UI validation (retry: a brand-new repository can take a moment to be served)
      await expect(async () => {
        const uiResponse = await repositoryPage.open(login, name);
        expect(uiResponse?.status()).toBe(200);
      }).toPass({ timeout: 20_000 });

      await expect(page).toHaveURL(url);
      await expect(repositoryPage.getRepositoryName(name)).toBeVisible();
      await expect(repositoryPage.getOwner(login)).toBeVisible();
      await expect(repositoryPage.getVisibility()).toHaveText(cfg.expectedVisibility);
      await expect(repositoryPage.getBranchSelector()).toContainText(cfg.expectedDefaultBranch);
      await expect(repositoryPage.getDescription(cfg.description)).toBeVisible();
    } finally {
      // 4. Cleanup: guarded delete of only the repository created by this test
      await CleanupUtil.deleteGeneratedRepository(repoService, owner, repoName);
    }
  });

  test('INT-02 repository details from the API match the UI (alternative scenario)', { tag: ['@integrated'] }, async ({
    page,
    repoService,
    repositoryPage,
  }) => {
    const response = await repoService.getRepository(env.userId, env.testRepo);
    await ApiUtil.expectStatus(response, 200);
    const repo = (await response.json()) as GitHubRepository;

    test.skip(repo.private && !hasStorageState, 'Private repository needs a storage state (npm run auth:save).');

    await repositoryPage.open(repo.owner.login, repo.name);

    await expect(page).toHaveURL(repo.html_url);
    await expect(repositoryPage.getRepositoryName(repo.name)).toBeVisible();
    await expect(repositoryPage.getOwner(repo.owner.login)).toBeVisible();
    await expect(repositoryPage.getVisibility()).toHaveText(new RegExp(`^${repo.visibility}$`, 'i'));
  });
});
