# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\negativeApi.spec.ts >> API | Negative scenarios >> API-N07 unauthenticated create is rejected and no repository is created
- Location: tests\api\negativeApi.spec.ts:57:7

# Error details

```
Error: Repository aiqe-capstone-20261029063159218-b951 must not exist

expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 401
```

# Test source

```ts
  1  | import { env } from '../../config/env';
  2  | import { apiTest as test, expect } from '../../src/fixtures';
  3  | import { GitHubUserService } from '../../src/services/GitHubUserService';
  4  | import { ApiUtil } from '../../src/utils/ApiUtil';
  5  | import { DataUtil } from '../../src/utils/DataUtil';
  6  | import negative from '../../testdata/negativeApiData.json';
  7  | 
  8  | test.describe('API | Negative scenarios', () => {
  9  |   test('API-N01 non-existing repository returns 404 with GitHub error structure', { tag: ['@negative', '@api'] }, async ({
  10 |     anonRepoService,
  11 |   }) => {
  12 |     const data = negative.nonExistingRepository;
  13 |     const response = await anonRepoService.getRepository(data.owner, data.repo);
  14 |     await ApiUtil.expectErrorResponse(response, data.expectedStatus, data.expectedMessage);
  15 |   });
  16 | 
  17 |   test('API-N02 invalid owner returns 404', { tag: ['@negative', '@api'] }, async ({ anonRepoService }) => {
  18 |     const data = negative.invalidOwner;
  19 |     const response = await anonRepoService.getRepository(data.owner, data.repo);
  20 |     await ApiUtil.expectErrorResponse(response, data.expectedStatus, data.expectedMessage);
  21 |   });
  22 | 
  23 |   // Data-driven: each invalid repository name is its own test case.
  24 |   for (const invalidName of negative.invalidRepositoryNames) {
  25 |     test(`API-N03 invalid repository name "${invalidName}" returns 404`, { tag: ['@negative', '@api', '@ddt'] }, async ({
  26 |       repoService,
  27 |     }) => {
  28 |       const response = await repoService.getRepository(env.userId, invalidName);
  29 |       await ApiUtil.expectErrorResponse(response, 404, 'Not Found');
  30 |     });
  31 |   }
  32 | 
  33 |   test('API-N04 boundary: 101-character repository name returns 404', { tag: ['@negative', '@api', '@boundary'] }, async ({
  34 |     repoService,
  35 |   }) => {
  36 |     const response = await repoService.getRepository(env.userId, DataUtil.longString(101));
  37 |     await ApiUtil.expectErrorResponse(response, 404, 'Not Found');
  38 |   });
  39 | 
  40 |   test('API-N05 unauthenticated request to a protected endpoint returns 401', { tag: ['@negative', '@api', '@security'] }, async ({
  41 |     anonUserService,
  42 |   }) => {
  43 |     const data = negative.unauthenticatedProtectedEndpoint;
  44 |     const response = await anonUserService.getAuthenticatedUser();
  45 |     await ApiUtil.expectErrorResponse(response, data.expectedStatus, data.expectedMessage);
  46 |   });
  47 | 
  48 |   test('API-N06 invalid token returns 401 Bad credentials', { tag: ['@negative', '@api', '@security'] }, async ({
  49 |     createApiContext,
  50 |   }) => {
  51 |     const data = negative.invalidToken;
  52 |     const service = new GitHubUserService(await createApiContext(data.token));
  53 |     const response = await service.getAuthenticatedUser();
  54 |     await ApiUtil.expectErrorResponse(response, data.expectedStatus, data.expectedMessage);
  55 |   });
  56 | 
  57 |   test('API-N07 unauthenticated create is rejected and no repository is created', { tag: ['@negative', '@api', '@security'] }, async ({
  58 |     anonRepoService,
  59 |     repoService,
  60 |   }) => {
  61 |     const repoName = DataUtil.uniqueRepositoryName();
  62 | 
  63 |     const createResponse = await anonRepoService.createRepository(repoName);
  64 |     await ApiUtil.expectErrorResponse(createResponse, 401, 'Requires authentication');
  65 | 
  66 |     // Verify with the authenticated service that nothing was created.
  67 |     const lookup = await repoService.getRepository(env.userId, repoName);
> 68 |     expect(lookup.status(), `Repository ${repoName} must not exist`).toBe(404);
     |                                                                      ^ Error: Repository aiqe-capstone-20261029063159218-b951 must not exist
  69 |   });
  70 | });
  71 | 
  72 | 
```