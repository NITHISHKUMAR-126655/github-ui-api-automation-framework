# Test Scenarios (Part 2)

| ID | Type | Layer | Scenario | Automated in |
|----|------|-------|----------|--------------|
| UI-01 | Positive | UI | Search public repo, open, validate name/owner/URL/tabs/files | tests/ui/repositorySearch.spec.ts |
| UI-02 | Positive | UI | Public profile: username, URL, Repositories tab, followers | tests/ui/profileValidation.spec.ts |
| UI-03 | Positive/Auth | UI | Storage-state login, dashboard, open capstone repo | tests/ui/authenticatedNavigation.spec.ts |
| UI-04 | Positive | UI | Dedicated repo: name, owner, visibility, description, README, branch | tests/ui/repositoryValidation.spec.ts |
| UI-04b | Positive | UI | Issues and Pull requests tab navigation | tests/ui/repositoryValidation.spec.ts |
| UI-05a | Negative | UI | Search random keyword -> empty state | tests/ui/negativeSearch.spec.ts |
| UI-05b | Negative | UI | Invalid repo URL -> 404 page | tests/ui/negativeSearch.spec.ts |
| API-01 | Positive | API | GET /user | tests/api/userApi.spec.ts |
| API-02 | Positive | API | GET /repos/{owner}/{repo} | tests/api/repositoryApi.spec.ts |
| API-03 | Positive | API | GET /user/repos contains capstone repo | tests/api/repositoryApi.spec.ts |
| API-04 | Positive + Cleanup | API | Create unique repo, validate, delete | tests/api/repositoryApi.spec.ts |
| API-06 | Boundary/Bonus | API | GET /rate_limit sanity | tests/api/userApi.spec.ts |
| API-N01 | Negative | API | Non-existing repo -> 404 + error structure | tests/api/negativeApi.spec.ts |
| API-N02 | Negative | API | Invalid owner -> 404 | same |
| API-N03 | Negative/DDT | API | Invalid repository names -> 404 | same |
| API-N04 | Boundary | API | 101-char repo name -> 404 | same |
| API-N05 | Security | API | No token on /user -> 401 | same |
| API-N06 | Security | API | Invalid token -> 401 Bad credentials | same |
| API-N07 | Security | API | Unauthenticated create -> 401, nothing created | same |
| INT-01 | Integrated + Correlation + Cleanup | UI+API | API create -> UI validate -> API delete | tests/integrated/... |
| INT-02 | Integrated (alternative) | UI+API | API details match UI | tests/integrated/... |
| CFG-01 | Configuration | Config | Missing env var gives a clear error (manual: unset AIQE_GITHUB_TOKEN, run `npm run test:api`) | manual |
| CI-01 | CI | CI | Manual dispatch with suite input | .github/workflows/playwright.yml |
| CI-02 | CI | CI | Push to main runs suite, uploads report | same |
| CI-03 | CI | CI | Missing secret fails with config error, not a token leak | same |
| CLN-01 | Cleanup | API | Guard refuses non-generated names (manual: call deleteRepository with the dedicated repo name) | manual |

**Correlation example:** INT-01 captures `name`, `html_url`, `owner.login` from the create response and uses them for UI navigation and assertions.
