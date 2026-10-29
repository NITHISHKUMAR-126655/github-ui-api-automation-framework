import { env } from '../../config/env';
import { apiTest as test, expect } from '../../src/fixtures';
import { GitHubRateLimit, GitHubUser } from '../../src/models/GitHubModels';
import { ApiUtil } from '../../src/utils/ApiUtil';
import apiData from '../../testdata/apiData.json';

test.describe('API | Authenticated user', () => {
  test('API-01 GET /user returns the authenticated user', { tag: ['@smoke', '@api'] }, async ({ userService }) => {
    const response = await userService.getAuthenticatedUser();

    await ApiUtil.expectStatus(response, 200);
    expect(response.ok()).toBeTruthy();
    ApiUtil.expectJsonContentType(response);

    const user = (await response.json()) as GitHubUser;
    expect(user.login.toLowerCase()).toBe(env.userId.toLowerCase());
    expect(user.id).toEqual(expect.any(Number));
    ApiUtil.expectRequiredFields(user, apiData.user.requiredFields);
  });

  test('API-06 GET /rate_limit reports a valid core rate limit', { tag: ['@api', '@bonus'] }, async ({ userService }) => {
    const response = await userService.getRateLimit();

    await ApiUtil.expectStatus(response, 200);
    const { core } = ((await response.json()) as GitHubRateLimit).resources;
    expect(core.limit).toBeGreaterThan(0);
    expect(core.remaining).toBeGreaterThanOrEqual(0);
    expect(core.remaining).toBeLessThanOrEqual(core.limit);
  });
});
