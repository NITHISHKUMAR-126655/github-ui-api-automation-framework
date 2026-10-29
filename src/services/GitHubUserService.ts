import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiUtil } from '../utils/ApiUtil';

export class GitHubUserService {
  constructor(private readonly api: APIRequestContext) {}

  /** GET /user (requires authentication) */
  getAuthenticatedUser(): Promise<APIResponse> {
    return ApiUtil.send(this.api, 'GET', '/user');
  }

  /** GET /rate_limit */
  getRateLimit(): Promise<APIResponse> {
    return ApiUtil.send(this.api, 'GET', '/rate_limit');
  }
}
