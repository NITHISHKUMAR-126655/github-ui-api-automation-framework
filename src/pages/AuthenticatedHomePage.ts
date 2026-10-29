import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AuthenticatedHomePage extends BasePage {
  private readonly userMenuButton: Locator;
  private readonly signedInLoginMeta: Locator;

  constructor(page: Page) {
    super(page);
    this.userMenuButton = page.getByRole('button', { name: /open user navigation menu|view profile and more/i });
    // GitHub exposes the signed-in login in a <meta> tag; it is the most reliable "am I logged in" signal.
    this.signedInLoginMeta = page.locator('meta[name="user-login"]');
  }

  async open(): Promise<void> {
    await this.navigateTo('/');
  }

  getUserMenu(): Locator {
    return this.userMenuButton;
  }

  async getSignedInLogin(): Promise<string | null> {
    return this.signedInLoginMeta.getAttribute('content');
  }
}
