/** Minimal response/request models. Only fields the framework asserts on are declared. */

export interface GitHubOwner {
  login: string;
  id: number;
  html_url: string;
  type: string;
}

export interface GitHubUser extends GitHubOwner {
  node_id: string;
  avatar_url: string;
  public_repos: number;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  visibility: 'public' | 'private' | 'internal';
  html_url: string;
  url: string;
  description: string | null;
  default_branch: string;
  owner: GitHubOwner;
}

export interface GitHubRateLimit {
  resources: { core: { limit: number; remaining: number; reset: number } };
}

export interface GitHubErrorBody {
  message: string;
  documentation_url?: string;
  status?: string;
}

export interface CreateRepositoryRequest {
  name: string;
  description?: string;
  private?: boolean;
  auto_init?: boolean;
}
