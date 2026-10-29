import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchResultsPage extends BasePage {
  private readonly noResultsMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.noResultsMessage = page.getByText(/couldn.t find any|did not match|didn.t match|no results/i).first();
  }

  getRepositoryLink(fullName: string): Locator {
    return this.page.getByRole('link', { name: fullName, exact: true }).first();
  }

  getNoResultsMessage(): Locator {
    return this.noResultsMessage;
  }

  async openRepository(fullName: string): Promise<void> {
    await this.getRepositoryLink(fullName).click();
  }
}
