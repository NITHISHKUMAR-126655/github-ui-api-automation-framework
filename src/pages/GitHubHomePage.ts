import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class GitHubHomePage extends BasePage {
  private readonly searchButton: Locator;
  private readonly searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.searchButton = page.getByRole('button', { name: /search or jump to/i });
    this.searchInput = page.getByRole('combobox', { name: /search/i });
  }

  async open(): Promise<void> {
    await this.navigateTo('/');
  }

  /** Types the keyword into GitHub's global search and submits it. */
  async searchRepository(keyword: string): Promise<void> {
    await this.searchButton.click();
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
    await this.page.waitForURL(/\/search\?/);
  }
}
