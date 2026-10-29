import { randomBytes } from 'crypto';

export class DataUtil {
  static readonly TEST_REPO_PREFIX = 'aiqe-capstone';

  /** 17 digits: YYYYMMDDHHmmssSSS */
  static timestampSuffix(): string {
    return new Date().toISOString().replace(/\D/g, '');
  }

  static randomSuffix(length = 4): string {
    return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
  }

  /** aiqe-capstone-<timestamp>-<4 hex chars>. The random tail avoids clashes between parallel workers. */
  static uniqueRepositoryName(): string {
    return `${DataUtil.TEST_REPO_PREFIX}-${DataUtil.timestampSuffix()}-${DataUtil.randomSuffix(4)}`;
  }

  /** True only for names produced by uniqueRepositoryName(). Used as a deletion safety guard. */
  static isGeneratedRepositoryName(name: string): boolean {
    return new RegExp(`^${DataUtil.TEST_REPO_PREFIX}-\\d{17}-[0-9a-f]{4}$`).test(name);
  }

  static uniqueName(prefix: string): string {
    return `${prefix}-${DataUtil.randomSuffix(8)}`;
  }

  static sanitizeTestName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80);
  }

  static longString(length: number): string {
    return 'a'.repeat(length);
  }
}
