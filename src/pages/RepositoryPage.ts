import { Locator, Page, Response } from '@playwright/test';
import { BasePage } from './BasePage';

export type RepositoryTab = 'Code' | 'Issues' | 'Pull requests' | 'Actions';

export class RepositoryPage extends BasePage {
  private readonly repositoryNavigation: Locator;
  private readonly visibilityBadge: Locator;
  private readonly branchSelector: Locator;
  private readonly fileListing: Locator;
  private readonly readme: Locator;

  constructor(page: Page) {
    super(page);
    this.repositoryNavigation = page.getByRole('navigation', { name: 'Repository' });
    this.visibilityBadge = page.getByText(/^(Public|Private)$/).first();
    this.branchSelector = page.getByRole('button', { name: /branch/i }).first();
    this.fileListing = page.getByRole('table', { name: /folders and files/i });
    // README content has no accessible role; the markdown-body class is GitHub's stable hook.
    this.readme = page.locator('article.markdown-body').first();
  }

  open(owner: string, repo: string): Promise<Response | null> {
    return this.navigateTo(`/${owner}/${repo}`);
  }

  getRepositoryName(repo: string): Locator {
    return this.page.getByRole('link', { name: repo, exact: true }).first();
  }

  getOwner(owner: string): Locator {
    return this.page.getByRole('link', { name: owner, exact: true }).first();
  }

  getDescription(text: string): Locator {
    return this.page.getByText(text, { exact: false }).first();
  }

  getVisibility(): Locator {
    return this.visibilityBadge;
  }

  getBranchSelector(): Locator {
    return this.branchSelector;
  }

  getFileListing(): Locator {
    return this.fileListing;
  }

  getReadme(): Locator {
    return this.readme;
  }

  getTab(tab: RepositoryTab): Locator {
    return this.repositoryNavigation.getByRole('link', { name: new RegExp(`^${tab}`) });
  }

  async openTab(tab: RepositoryTab): Promise<void> {
    await this.getTab(tab).click();
  }
}
