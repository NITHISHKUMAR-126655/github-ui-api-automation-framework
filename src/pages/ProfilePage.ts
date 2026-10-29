import { Locator, Page, Response } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  private readonly repositoriesTab: Locator;
  private readonly followersLink: Locator;

  constructor(page: Page) {
    super(page);
    this.repositoriesTab = page
      .getByRole('navigation', { name: /user profile/i })
      .getByRole('link', { name: /^Repositories/ });
    this.followersLink = page.getByRole('link', { name: /followers/i }).first();
  }

  open(username: string): Promise<Response | null> {
    return this.navigateTo(`/${username}`);
  }

  getUsername(username: string): Locator {
    return this.page.getByText(username, { exact: true }).first();
  }

  getRepositoriesTab(): Locator {
    return this.repositoriesTab;
  }

  getFollowersLink(): Locator {
    return this.followersLink;
  }

  getRepositoryLink(repoName: string): Locator {
    return this.page.getByRole('link', { name: repoName, exact: true }).first();
  }

  async openRepositoriesTab(): Promise<void> {
    await this.repositoriesTab.click();
  }
}
