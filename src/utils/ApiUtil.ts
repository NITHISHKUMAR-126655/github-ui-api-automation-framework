import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { GitHubErrorBody } from '../models/GitHubModels';

export class ApiUtil {
  /** Common headers. The token is only placed in the Authorization header and never logged. */
  static buildHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'aiqe-github-capstone',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }

  /** Sends a request through the given context and logs method, endpoint and status only. */
  static async send(
    api: APIRequestContext,
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    endpoint: string,
    data?: object,
  ): Promise<APIResponse> {
    const response = await api.fetch(endpoint, { method, data });
    ApiUtil.logResponse(method, endpoint, response);
    return response;
  }

  static logResponse(method: string, endpoint: string, response: APIResponse): void {
    const remaining = response.headers()['x-ratelimit-remaining'];
    const suffix = remaining ? ` (rate-limit remaining: ${remaining})` : '';
    console.log(`[API] ${method} ${endpoint} -> ${response.status()} ${response.statusText()}${suffix}`);
  }

  static async safeJson<T = Record<string, unknown>>(response: APIResponse): Promise<T | undefined> {
    try {
      return (await response.json()) as T;
    } catch {
      return undefined;
    }
  }

  /** Status assertion with a useful failure message (status + GitHub error message, no headers). */
  static async expectStatus(response: APIResponse, expected: number): Promise<void> {
    if (response.status() !== expected) {
      const body = await ApiUtil.safeJson<GitHubErrorBody>(response);
      expect(
        response.status(),
        `Expected ${expected} from ${new URL(response.url()).pathname} but got ${response.status()} ` +
          `(GitHub message: ${body?.message ?? 'n/a'})`,
      ).toBe(expected);
    }
  }

  static expectJsonContentType(response: APIResponse): void {
    expect(response.headers()['content-type'] ?? '').toContain('application/json');
  }

  static expectRequiredFields(body: object, fields: string[]): void {
    const missing = fields.filter((field) => !(field in body));
    expect(missing, `Response is missing required field(s): ${missing.join(', ')}`).toEqual([]);
  }

  static async expectErrorResponse(
    response: APIResponse,
    expectedStatus: number,
    expectedMessage: string,
  ): Promise<void> {
    await ApiUtil.expectStatus(response, expectedStatus);
    ApiUtil.expectJsonContentType(response);
    const body = (await response.json()) as GitHubErrorBody;
    expect(body.message).toBe(expectedMessage);
    expect(body, 'Error body should contain documentation_url').toHaveProperty('documentation_url');
  }
}
