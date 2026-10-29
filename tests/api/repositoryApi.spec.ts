import { env } from '../../config/env';
import { apiTest as test, expect } from '../../src/fixtures';
import { GitHubRepository } from '../../src/models/GitHubModels';
import { ApiUtil } from '../../src/utils/ApiUtil';
import { CleanupUtil } from '../../src/utils/CleanupUtil';
import { DataUtil } from '../../src/utils/DataUtil';
import apiData from '../../testdata/apiData.json';

test.describe('API | Repositories', () => {
  test('API-02 GET /repos/{owner}/{repo} returns repository details', { tag: ['@smoke', '@api'] }, async ({
    repoService,
  }) => {
    const response = await repoService.getRepository(env.userId, env.testRepo);

    await ApiUtil.expectStatus(response, 200);
    ApiUtil.expectJsonContentType(response);

    const repo = (await response.json()) as GitHubRepository;
    expect(repo.name.toLowerCase()).toBe(env.testRepo.toLowerCase());
    expect(repo.owner.login.toLowerCase()).toBe(env.userId.toLowerCase());
    expect(repo.full_name.toLowerCase()).toBe(`${env.userId}/${env.testRepo}`.toLowerCase());
    expect(repo.html_url.toLowerCase()).toBe(`${env.uiBaseUrl}/${env.userId}/${env.testRepo}`.toLowerCase());
    expect(['public', 'private']).toContain(repo.visibility);
    expect(repo.default_branch).toBeTruthy();
    ApiUtil.expectRequiredFields(repo, apiData.repository.requiredFields);
  });

  test('API-03 GET /user/repos lists repositories including the capstone repository', { tag: ['@api'] }, async ({
    repoService,
  }) => {
    const { perPage, requiredFields } = apiData.listRepositories;
    const response = await repoService.listRepositories(perPage);

    await ApiUtil.expectStatus(response, 200);
    const repos = (await response.json()) as GitHubRepository[];

    expect(Array.isArray(repos)).toBe(true);
    expect(repos.length).toBeGreaterThan(0);
    expect(repos.length).toBeLessThanOrEqual(perPage);
    // Sorted by last update, so a very active account with >100 repos could push it off page 1.
    expect(repos.map((r) => r.name.toLowerCase())).toContain(env.testRepo.toLowerCase());
    for (const repo of repos) {
      ApiUtil.expectRequiredFields(repo, requiredFields);
    }
  });

  test('API-04 create a uniquely named repository, validate it, then clean it up', { tag: ['@api', '@cleanup'] }, async ({
    repoService,
  }) => {
    const cfg = apiData.createRepository;
    const repoName = DataUtil.uniqueRepositoryName();
    const owner = env.userId;

    try {
      const response = await repoService.createRepository(repoName, {
        description: cfg.description,
        isPrivate: cfg.private,
        autoInit: cfg.autoInit,
      });

      await ApiUtil.expectStatus(response, 201);
      ApiUtil.expectJsonContentType(response);
      const repo = (await response.json()) as GitHubRepository;

      expect(repo.name).toBe(repoName);
      expect(repo.owner.login.toLowerCase()).toBe(owner.toLowerCase());
      expect(repo.visibility).toBe(cfg.expectedVisibility);
      expect(repo.html_url.toLowerCase()).toBe(`${env.uiBaseUrl}/${owner}/${repoName}`.toLowerCase());
      expect(repo.default_branch).toBe(cfg.expectedDefaultBranch);
      ApiUtil.expectRequiredFields(repo, apiData.repository.requiredFields);
    } finally {
      await CleanupUtil.deleteGeneratedRepository(repoService, owner, repoName);
    }
  });
});
