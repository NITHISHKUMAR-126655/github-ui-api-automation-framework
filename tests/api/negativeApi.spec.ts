import { env } from '../../config/env';
import { apiTest as test, expect } from '../../src/fixtures';
import { GitHubUserService } from '../../src/services/GitHubUserService';
import { ApiUtil } from '../../src/utils/ApiUtil';
import { DataUtil } from '../../src/utils/DataUtil';
import negative from '../../testdata/negativeApiData.json';

test.describe('API | Negative scenarios', () => {
  test('API-N01 non-existing repository returns 404 with GitHub error structure', { tag: ['@negative', '@api'] }, async ({
    anonRepoService,
  }) => {
    const data = negative.nonExistingRepository;
    const response = await anonRepoService.getRepository(data.owner, data.repo);
    await ApiUtil.expectErrorResponse(response, data.expectedStatus, data.expectedMessage);
  });

  test('API-N02 invalid owner returns 404', { tag: ['@negative', '@api'] }, async ({ anonRepoService }) => {
    const data = negative.invalidOwner;
    const response = await anonRepoService.getRepository(data.owner, data.repo);
    await ApiUtil.expectErrorResponse(response, data.expectedStatus, data.expectedMessage);
  });

  // Data-driven: each invalid repository name is its own test case.
  for (const invalidName of negative.invalidRepositoryNames) {
    test(`API-N03 invalid repository name "${invalidName}" returns 404`, { tag: ['@negative', '@api', '@ddt'] }, async ({
      repoService,
    }) => {
      const response = await repoService.getRepository(env.userId, invalidName);
      await ApiUtil.expectErrorResponse(response, 404, 'Not Found');
    });
  }

  test('API-N04 boundary: 101-character repository name returns 404', { tag: ['@negative', '@api', '@boundary'] }, async ({
    repoService,
  }) => {
    const response = await repoService.getRepository(env.userId, DataUtil.longString(101));
    await ApiUtil.expectErrorResponse(response, 404, 'Not Found');
  });

  test('API-N05 unauthenticated request to a protected endpoint returns 401', { tag: ['@negative', '@api', '@security'] }, async ({
    anonUserService,
  }) => {
    const data = negative.unauthenticatedProtectedEndpoint;
    const response = await anonUserService.getAuthenticatedUser();
    await ApiUtil.expectErrorResponse(response, data.expectedStatus, data.expectedMessage);
  });

  test('API-N06 invalid token returns 401 Bad credentials', { tag: ['@negative', '@api', '@security'] }, async ({
    createApiContext,
  }) => {
    const data = negative.invalidToken;
    const service = new GitHubUserService(await createApiContext(data.token));
    const response = await service.getAuthenticatedUser();
    await ApiUtil.expectErrorResponse(response, data.expectedStatus, data.expectedMessage);
  });

  test('API-N07 unauthenticated create is rejected and no repository is created', { tag: ['@negative', '@api', '@security'] }, async ({
    anonRepoService,
    repoService,
  }) => {
    const repoName = DataUtil.uniqueRepositoryName();

    const createResponse = await anonRepoService.createRepository(repoName);
    await ApiUtil.expectErrorResponse(createResponse, 401, 'Requires authentication');

    // Verify with the authenticated service that nothing was created.
    const lookup = await repoService.getRepository(env.userId, repoName);
    expect(lookup.status(), `Repository ${repoName} must not exist`).toBe(404);
  });
});

