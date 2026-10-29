# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\negativeApi.spec.ts >> API | Negative scenarios >> API-N03 invalid repository name "!!invalid!!" returns 404
- Location: tests\api\negativeApi.spec.ts:25:9

# Error details

```
Error: Expected 404 from /repos/NITHISHKUMAR-126655/!!invalid!! but got 401 (GitHub message: Bad credentials)

expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 401
```

# Test source

```ts
  1  | import { APIRequestContext, APIResponse, expect } from '@playwright/test';
  2  | import { GitHubErrorBody } from '../models/GitHubModels';
  3  | 
  4  | export class ApiUtil {
  5  |   /** Common headers. The token is only placed in the Authorization header and never logged. */
  6  |   static buildHeaders(token?: string): Record<string, string> {
  7  |     const headers: Record<string, string> = {
  8  |       Accept: 'application/vnd.github+json',
  9  |       'X-GitHub-Api-Version': '2022-11-28',
  10 |       'User-Agent': 'aiqe-github-capstone',
  11 |     };
  12 |     if (token) {
  13 |       headers.Authorization = `Bearer ${token}`;
  14 |     }
  15 |     return headers;
  16 |   }
  17 | 
  18 |   /** Sends a request through the given context and logs method, endpoint and status only. */
  19 |   static async send(
  20 |     api: APIRequestContext,
  21 |     method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  22 |     endpoint: string,
  23 |     data?: object,
  24 |   ): Promise<APIResponse> {
  25 |     const response = await api.fetch(endpoint, { method, data });
  26 |     ApiUtil.logResponse(method, endpoint, response);
  27 |     return response;
  28 |   }
  29 | 
  30 |   static logResponse(method: string, endpoint: string, response: APIResponse): void {
  31 |     const remaining = response.headers()['x-ratelimit-remaining'];
  32 |     const suffix = remaining ? ` (rate-limit remaining: ${remaining})` : '';
  33 |     console.log(`[API] ${method} ${endpoint} -> ${response.status()} ${response.statusText()}${suffix}`);
  34 |   }
  35 | 
  36 |   static async safeJson<T = Record<string, unknown>>(response: APIResponse): Promise<T | undefined> {
  37 |     try {
  38 |       return (await response.json()) as T;
  39 |     } catch {
  40 |       return undefined;
  41 |     }
  42 |   }
  43 | 
  44 |   /** Status assertion with a useful failure message (status + GitHub error message, no headers). */
  45 |   static async expectStatus(response: APIResponse, expected: number): Promise<void> {
  46 |     if (response.status() !== expected) {
  47 |       const body = await ApiUtil.safeJson<GitHubErrorBody>(response);
  48 |       expect(
  49 |         response.status(),
  50 |         `Expected ${expected} from ${new URL(response.url()).pathname} but got ${response.status()} ` +
  51 |           `(GitHub message: ${body?.message ?? 'n/a'})`,
> 52 |       ).toBe(expected);
     |         ^ Error: Expected 404 from /repos/NITHISHKUMAR-126655/!!invalid!! but got 401 (GitHub message: Bad credentials)
  53 |     }
  54 |   }
  55 | 
  56 |   static expectJsonContentType(response: APIResponse): void {
  57 |     expect(response.headers()['content-type'] ?? '').toContain('application/json');
  58 |   }
  59 | 
  60 |   static expectRequiredFields(body: object, fields: string[]): void {
  61 |     const missing = fields.filter((field) => !(field in body));
  62 |     expect(missing, `Response is missing required field(s): ${missing.join(', ')}`).toEqual([]);
  63 |   }
  64 | 
  65 |   static async expectErrorResponse(
  66 |     response: APIResponse,
  67 |     expectedStatus: number,
  68 |     expectedMessage: string,
  69 |   ): Promise<void> {
  70 |     await ApiUtil.expectStatus(response, expectedStatus);
  71 |     ApiUtil.expectJsonContentType(response);
  72 |     const body = (await response.json()) as GitHubErrorBody;
  73 |     expect(body.message).toBe(expectedMessage);
  74 |     expect(body, 'Error body should contain documentation_url').toHaveProperty('documentation_url');
  75 |   }
  76 | }
  77 | 
```