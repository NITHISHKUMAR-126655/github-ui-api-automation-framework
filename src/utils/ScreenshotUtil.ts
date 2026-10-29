import { Page, TestInfo } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { DataUtil } from './DataUtil';

export class ScreenshotUtil {
  private static readonly DIRECTORY = path.resolve(__dirname, '..', '..', 'screenshots');

  static buildFileName(name: string): string {
    return `${DataUtil.sanitizeTestName(name)}-${DataUtil.timestampSuffix()}.png`;
  }

  static buildPath(name: string): string {
    return path.join(ScreenshotUtil.DIRECTORY, ScreenshotUtil.buildFileName(name));
  }

  /**
   * Saves a full-page screenshot under /screenshots (git-ignored) and, when testInfo is
   * supplied, attaches it to the HTML report. Review screenshots before sharing them.
   */
  static async capture(page: Page, name: string, testInfo?: TestInfo): Promise<string> {
    fs.mkdirSync(ScreenshotUtil.DIRECTORY, { recursive: true });
    const filePath = ScreenshotUtil.buildPath(name);
    await page.screenshot({ path: filePath, fullPage: true });
    if (testInfo) {
      await testInfo.attach(name, { path: filePath, contentType: 'image/png' });
    }
    return filePath;
  }
}
