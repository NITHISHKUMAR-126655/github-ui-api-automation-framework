# Viva Preparation (Part 23) - short answers to adapt

- **Why POM?** Locators and page actions live in one place, tests stay readable, UI changes touch one file.
- **Why BasePage?** Shared, feature-agnostic helpers (navigate, title, URL, screenshot). No feature methods.
- **Why `private readonly` locators?** Tests cannot reach in and bypass page methods; locators cannot be reassigned.
- **Why a service layer?** Endpoints, headers, auth and logging are centralised; specs only define scenarios and assertions.
- **Why externalise config?** No secrets or environment values in code; same code runs locally and in CI.
- **How is the token secured?** `.env` (git-ignored) locally, GitHub Secret in CI, never logged, minimum scopes, short expiry, traces/artifacts reviewed.
- **What is correlation?** Using data from one response (name, URL, owner) to drive later steps; INT-01 does this API -> UI.
- **How does INT-01 work?** Create public repo via API, retry-navigate in UI until 200, assert name/owner/visibility/branch, delete in `finally`.
- **If an API request fails?** `ApiUtil.expectStatus` fails with status + GitHub message; `finally` still cleans up.
- **How is cleanup safe?** Owner must equal the test account, name must match `aiqe-capstone-<ts>-<hex>`, never the dedicated repo; result logged; 404 verified.
- **Why did you reject an AI suggestion?** (Use a real entry from your AI log.)
- **How does Actions run tests?** Checkout, setup Node, `npm ci`, install Chromium, run suite, summary, upload HTML report.
- **Debugging a CI-only failure?** Download the report/trace, compare runner vs local (timing, bot checks, missing secrets), re-run with retries, add targeted logging.
- **Next improvement?** Global setup that validates config + token once, request/response schema validation, Allure.
