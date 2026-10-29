# AIQE GitHub Capstone - Playwright + TypeScript

## Project Objective
A scalable UI + API automation framework for GitHub using Playwright, TypeScript, AI-assisted development and GitHub Actions.

## Application Under Test
UI: https://github.com - REST API: https://api.github.com

## Scope
In scope: public search, public profile, authenticated navigation (storage state), dedicated repo validation, REST user/repo operations, negative cases, integrated UI+API flow. Out of scope: destructive account-level actions, organisation repos.

## Core Features
Page Object Model + BasePage - API service layer - `.env` configuration with validation - JSON test data - utilities (data, screenshots, API, cleanup) - HTML/JSON reports, screenshots, traces - GitHub Actions workflow.

## Bonus Enhancements Implemented
Custom fixtures, API DDT, correlation, rate-limit test, tags (`@smoke`, `@negative`, ...), storage state, optional multi-browser (`AIQE_ALL_BROWSERS=true`), workflow inputs, test summary, typed response models.

## Prerequisites
Node.js 20+, a GitHub account, a dedicated capstone repository, a personal access token (classic: `repo` + `delete_repo`; use a short expiry).

## Installation
```bash
npm ci            # or npm install the first time
npx playwright install chromium
```

## Environment Variable Setup
```bash
cp .env.example .env     # then edit .env
```
| Variable | Purpose |
|----------|---------|
| AIQE_UI_BASE_URL / AIQE_API_BASE_URL | Defaults to github.com / api.github.com |
| AIQE_IGNORE_HTTPS_ERRORS | Optional; set `true` only for a trusted network with TLS interception |
| AIQE_GITHUB_USER | Your GitHub username |
| AIQE_GITHUB_TOKEN | Your token (**never commit or share**) |
| AIQE_TEST_REPO | Dedicated capstone repo name |
| AIQE_STORAGE_STATE | Optional storage-state path |

Edit `testdata/repositoryData.json` so the expected description, visibility, branch and README text match your repo.

Optional authenticated UI: `npm run auth:save` (log in manually, press Enter). The file is git-ignored.

## Test Execution
```bash
npm run test:ui          # UI only
npm run test:api         # API only
npm run test:integrated  # UI + API
npm run test:capstone    # everything
npm run test:smoke       # @smoke tag
npm run typecheck
npm run report           # open HTML report
```

## UI Test Structure
`tests/ui/*.spec.ts` use page objects from `src/pages`. Locators are `private readonly`, initialised in constructors, user-facing where possible. Tests contain no raw selectors.

## API Test Structure
`tests/api/*.spec.ts` call `src/services`, which build endpoints and send requests via `ApiUtil.send` (shared headers, base URL, logging). Specs define scenarios and assert.

## Framework Architecture
```
tests -> fixtures (src/fixtures) -> pages / services -> utils -> config/env.ts
                                             testdata/*.json (non-secret)
```

## Reporting
Playwright HTML report (`playwright-report/`), JSON results, screenshots on failure (`screenshots/` + report), trace on first retry, `[API]` and `[CLEANUP]` logs. Review artifacts before sharing.

## GitHub Actions Execution
Workflow: `.github/workflows/playwright.yml` (manual dispatch with suite choice, push/PR to `main`).
Set in the repo: Secret `AIQE_GITHUB_TOKEN`; Variables `AIQE_GITHUB_USER`, `AIQE_TEST_REPO`. (Names start with `AIQE_` because Actions forbids `GITHUB_` secret names.) Authenticated UI tests auto-skip in CI (no storage state).

## AI Usage
See `docs/03-ai-usage-log.md`. AI assisted requirement review, generation, review and debugging; every output was reviewed before use.

## Responsible AI Precautions
See `docs/04-responsible-ai-checklist.md`. No secrets in prompts; guarded deletion; artifacts reviewed.

## Known Limitations
- GitHub UI locators (visibility badge, branch selector, search dialog, no-results text) are text-based and can drift; verify with `npx playwright codegen https://github.com`.
- Unauthenticated github.com traffic can be rate-limited or challenged, especially from CI.
- `API-03` reads the first 100 repos sorted by last update.
- Traces record network activity; check a trace for the Authorization header before sharing artifacts.
- This code was generated without being executed against live GitHub; expect to adjust expectations on first run.

## Cleanup Instructions
Tests delete their own `aiqe-capstone-<timestamp>-<hex>` repositories. If a run is killed mid-way, list repos with that prefix on your account and delete them manually.

## Project Structure
```
.github/workflows/playwright.yml   config/env.ts   src/{pages,services,utils,models,fixtures}
testdata/*.json   tests/{ui,api,integrated}   scripts/save-auth-state.ts   docs/
```
