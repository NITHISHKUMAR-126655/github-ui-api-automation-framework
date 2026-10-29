import { APIRequestContext, expect, test as base } from '@playwright/test';
import { env } from '../../config/env';
import { AuthenticatedHomePage } from '../pages/AuthenticatedHomePage';
import { GitHubHomePage } from '../pages/GitHubHomePage';
import { ProfilePage } from '../pages/ProfilePage';
import { RepositoryPage } from '../pages/RepositoryPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { GitHubRepositoryService } from '../services/GitHubRepositoryService';
import { GitHubUserService } from '../services/GitHubUserService';
import { ApiUtil } from '../utils/ApiUtil';
import { ScreenshotUtil } from '../utils/ScreenshotUtil';

type ApiFixtures = {
  createApiContext: (token?: string) => Promise<APIRequestContext>;
  authApi: APIRequestContext;
  anonApi: APIRequestContext;
  userService: GitHubUserService;
  repoService: GitHubRepositoryService;
  anonRepoService: GitHubRepositoryService;
  anonUserService: GitHubUserService;
};

/** API tests: no browser is launched. Fixtures are lazy, so public tests need no token. */
export const apiTest = base.extend<ApiFixtures>({
  createApiContext: async ({ playwright }, use) => {
    const contexts: APIRequestContext[] = [];
    await use(async (token?: string) => {
      const context = await playwright.request.newContext({
        baseURL: env.apiBaseUrl,
        extraHTTPHeaders: ApiUtil.buildHeaders(token),
        ignoreHTTPSErrors: env.ignoreHttpsErrors,
      });
      contexts.push(context);
      return context;
    });
    await Promise.all(contexts.map((context) => context.dispose()));
  },
  authApi: async ({ createApiContext }, use) => {
    env.validate();
    await use(await createApiContext(env.token));
  },
  anonApi: async ({ createApiContext }, use) => {
    await use(await createApiContext());
  },
  userService: async ({ authApi }, use) => {
    await use(new GitHubUserService(authApi));
  },
  repoService: async ({ authApi }, use) => {
    await use(new GitHubRepositoryService(authApi));
  },
  anonRepoService: async ({ anonApi }, use) => {
    await use(new GitHubRepositoryService(anonApi));
  },
  anonUserService: async ({ anonApi }, use) => {
    await use(new GitHubUserService(anonApi));
  },
});

type UiFixtures = {
  homePage: GitHubHomePage;
  searchResultsPage: SearchResultsPage;
  repositoryPage: RepositoryPage;
  profilePage: ProfilePage;
  authenticatedHomePage: AuthenticatedHomePage;
  failureScreenshot: void;
};

/** UI + integrated tests: API fixtures plus page objects and a screenshot-on-failure hook. */
export const uiTest = apiTest.extend<UiFixtures>({
  homePage: async ({ page }, use) => {
    await use(new GitHubHomePage(page));
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
  repositoryPage: async ({ page }, use) => {
    await use(new RepositoryPage(page));
  },
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
  authenticatedHomePage: async ({ page }, use) => {
    await use(new AuthenticatedHomePage(page));
  },
  failureScreenshot: [
    async ({ page }, use, testInfo) => {
      await use();
      if (testInfo.status !== testInfo.expectedStatus) {
        try {
          const file = await ScreenshotUtil.capture(page, `FAILED-${testInfo.title}`);
          console.log(`[SCREENSHOT] Saved failure screenshot: ${file}`);
        } catch {
          // page may already be closed; Playwright's own screenshot-on-failure still applies
        }
      }
    },
    { auto: true },
  ],
});

export { expect };
