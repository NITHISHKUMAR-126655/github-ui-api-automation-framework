# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: integrated\createAndValidateRepository.spec.ts >> Integrated | UI + API >> INT-01 create repository via API, validate it in the UI, delete via API
- Location: tests\integrated\createAndValidateRepository.spec.ts:16:7

# Error details

```
Error: Cleanup of NITHISHKUMAR-126655/aiqe-capstone-20261029063205097-dcd6 returned 401

expect(received).toContain(expected) // indexOf

Expected value: 401
Received array: [204, 404]
```

```
Error: Repository NITHISHKUMAR-126655/aiqe-capstone-20261029063205097-dcd6 should be gone after cleanup

Repository NITHISHKUMAR-126655/aiqe-capstone-20261029063205097-dcd6 should be gone after cleanup

expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 401

Call Log:
- Timeout 15000ms exceeded while waiting on the predicate
```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | import { GitHubRepositoryService } from '../services/GitHubRepositoryService';
  3  | 
  4  | export class CleanupUtil {
  5  |   /**
  6  |    * Deletes a repository created by the current test, logs the result and verifies it is gone.
  7  |    * 404 on delete is tolerated (the repository may never have been created).
  8  |    * Uses soft assertions so a cleanup problem never hides the original test failure.
  9  |    */
  10 |   static async deleteGeneratedRepository(
  11 |     repoService: GitHubRepositoryService,
  12 |     owner: string,
  13 |     repo: string,
  14 |   ): Promise<void> {
  15 |     const response = await repoService.deleteRepository(owner, repo);
  16 |     const status = response.status();
  17 |     console.log(`[CLEANUP] ${owner}/${repo} -> delete status ${status} (${status === 204 ? 'deleted' : 'not deleted'})`);
  18 |     expect.soft([204, 404], `Cleanup of ${owner}/${repo} returned ${status}`).toContain(status);
  19 | 
  20 |     await expect
  21 |       .poll(async () => (await repoService.getRepository(owner, repo)).status(), {
  22 |         message: `Repository ${owner}/${repo} should be gone after cleanup`,
  23 |         timeout: 15_000,
  24 |       })
> 25 |       .toBe(404);
     |        ^ Error: Repository NITHISHKUMAR-126655/aiqe-capstone-20261029063205097-dcd6 should be gone after cleanup
  26 |   }
  27 | }
  28 | 
```