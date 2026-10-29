import { Page, Response, TestInfo } from '@playwright/test';
import { ScreenshotUtil } from '../utils/ScreenshotUtil';

/** Common, feature-agnostic page behaviour only. Feature methods live in the specific page classes. */
export class BasePage {
  constructor(protected readonly page: Page) {}

  async navigateTo(path: string): Promise<Response | null> {
    return this.page.goto(path);
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  getCurrentURL(): string {
    return this.page.url();
  }

  async takeScreenshot(name: string, testInfo?: TestInfo): Promise<string> {
    return ScreenshotUtil.capture(this.page, name, testInfo);
  }
}
