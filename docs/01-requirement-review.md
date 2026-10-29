# Requirement Review (Part 1)

> Draft for you to review. Facts come from the capstone brief; everything else is labelled. Edit before submitting.

## Business Objective
Build a maintainable Playwright + TypeScript framework that automates GitHub UI and REST API workflows, runs locally and in GitHub Actions, handles credentials safely and documents responsible AI use.

## Features in Scope
- UI: public repository search, public profile validation, authenticated navigation, dedicated repository validation, negative search / invalid URL.
- API: GET /user, GET /repos/{owner}/{repo}, GET /user/repos, POST /user/repos, DELETE /repos/{owner}/{repo} (cleanup only), negative requests.
- Integrated UI + API repository workflow, config, test data, utilities, reporting, CI.

## Features Out of Scope
- Destructive account-level UI operations, organisation repositories, GitHub Enterprise, performance/load testing, issue/PR creation (bonus only).

## Preconditions
- A personal GitHub account and a dedicated capstone repository.
- Token with minimum scopes (see Authentication). Node.js 20+.

## Assumptions (not stated in the brief)
- A1: The dedicated capstone repository already exists and is owned by the test account.
- A2: Public pages (microsoft/playwright, torvalds profile) stay available.
- A3: Integrated test creates a **public** repo so the UI check needs no login.
- A4: GitHub UI markup can change; locators may need maintenance.

## Dependencies
github.com, api.github.com, npm registry, Playwright browsers, GitHub Actions runners.

## Risks
| ID | Risk | Mitigation |
|----|------|-----------|
| R1 | MFA/CAPTCHA blocks UI login | Manually created storage state, git-ignored |
| R2 | Token leaked in logs/traces/screenshots | .env ignored, no secret logging, review artifacts, short-lived token |
| R3 | Accidental deletion of a real repo | Guarded delete: owner + generated-name regex + not the dedicated repo |
| R4 | API rate limits / anti-bot on github.com | Few requests, retries in CI only, rate-limit test |
| R5 | UI locator drift | User-facing locators, one Page Object per page |
| R6 | CI runners flagged by GitHub for UI traffic | Re-run, or run API-only suite in CI |

## Testable Acceptance Criteria
- AC1: Searching `microsoft/playwright` lists and opens that repo with correct name, owner, URL.
- AC2: `torvalds` profile shows username, URL, Repositories tab.
- AC3: GET /user returns 200 JSON with login equal to the configured user.
- AC4: GET /repos/{owner}/{repo} returns matching name, owner, visibility, default branch, URL.
- AC5: Invalid repo/owner/token/unauthenticated requests return the documented 401/404 error body.
- AC6: Created repo matches the UI and is deleted afterwards (404 on re-read).
- AC7: No secret appears in repo, logs or report.

## Authentication Requirements
- API: Bearer token from `AIQE_GITHUB_TOKEN`. Recommended: classic PAT with `repo` + `delete_repo`, short expiry, test account only. (Fine-grained tokens may not support creating user repositories; verify before relying on them.)
- UI: storage state from `npm run auth:save`. Never commit it.

## Test Data Requirements
Non-secret data in `testdata/*.json`; secrets only in `.env`/CI secrets.

## Cleanup Requirements
Delete only repos matching `aiqe-capstone-<17-digit timestamp>-<4 hex>` owned by the test account; log result; verify 404 afterwards.

## Automation Opportunities
- UI: search, profile, repo validation, tabs, auth navigation, 404 page.
- API: all scenarios in `02-test-scenarios.md`, DDT for invalid names.
- Integrated: API create -> UI validate -> API delete; API details vs UI comparison.

## Open Questions
1. Is the dedicated repo public or private? (affects UI-04 and INT-02)
2. Should CI run UI tests against github.com, or API only?
3. Which default branch name does your repo use?
