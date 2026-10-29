import { expect } from '@playwright/test';
import { GitHubRepositoryService } from '../services/GitHubRepositoryService';

export class CleanupUtil {
  /**
   * Deletes a repository created by the current test, logs the result and verifies it is gone.
   * 404 on delete is tolerated (the repository may never have been created).
   * Uses soft assertions so a cleanup problem never hides the original test failure.
   */
  static async deleteGeneratedRepository(
    repoService: GitHubRepositoryService,
    owner: string,
    repo: string,
  ): Promise<void> {
    const response = await repoService.deleteRepository(owner, repo);
    const status = response.status();
    console.log(`[CLEANUP] ${owner}/${repo} -> delete status ${status} (${status === 204 ? 'deleted' : 'not deleted'})`);
    expect.soft([204, 404], `Cleanup of ${owner}/${repo} returned ${status}`).toContain(status);

    await expect
      .poll(async () => (await repoService.getRepository(owner, repo)).status(), {
        message: `Repository ${owner}/${repo} should be gone after cleanup`,
        timeout: 15_000,
      })
      .toBe(404);
  }
}
