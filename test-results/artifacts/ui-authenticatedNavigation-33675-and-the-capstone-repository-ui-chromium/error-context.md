# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\authenticatedNavigation.spec.ts >> UI | Authenticated navigation >> UI-03 authenticated user can open the dashboard and the capstone repository
- Location: tests\ui\authenticatedNavigation.spec.ts:14:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/NITHISHKUMAR-126655\/github-ui-api-automation-framework.git$/i
Received string:  "https://github.com/NITHISHKUMAR-126655/github-ui-api-automation-framework"
Timeout: 10000ms

Call log:
  - Expect "toHaveURL" with timeout 10000ms
    21 × locator resolved to <html lang="en" data-render-ssr="true" data-color-mode="auto" data-dark-theme="dark" data-light-theme="light" class="js-focus-visible" data-js-focus-visible="" data-a11y-link-underlines="true" data-a11y-animated-images="system">…</html>
       - unexpected value "https://github.com/NITHISHKUMAR-126655/github-ui-api-automation-framework"

```

```yaml
- banner "Global navigation menu":
  - button "Open menu"
  - link "Homepage (g then d)":
    - /url: /
  - navigation "Breadcrumbs":
    - list:
      - listitem:
        - link "NITHISHKUMAR-126655":
          - /url: /NITHISHKUMAR-126655
      - listitem:
        - link "github-ui-api-automation-framework":
          - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework
        - button "Switch repository (alt shift r)"
  - button "Open quick search dialog, type / to search": Type / to search
  - link "Chat with Copilot":
    - /url: /copilot
  - button "Open Copilot…"
  - button "Create new..."
  - link "All issues":
    - /url: /issues
  - link "All pull requests":
    - /url: /pulls
  - link "All repositories":
    - /url: /repos
  - link "You have no unread notifications (g then n)":
    - /url: /notifications
  - button "Open user navigation menu":
    - img "User avatar"
  - heading "Repository navigation" [level=2]
  - navigation "Repository":
    - list:
      - listitem:
        - link "Code":
          - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework
      - listitem:
        - link "Issues":
          - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/issues
      - listitem:
        - link "Pull requests":
          - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/pulls
      - listitem:
        - link "Agents":
          - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/agents?author=NITHISHKUMAR-126655
      - listitem:
        - link "Actions":
          - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/actions
      - listitem:
        - link "Projects":
          - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/projects
      - listitem:
        - link "Wiki":
          - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/wiki
      - listitem:
        - link "Security and quality":
          - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/security
      - listitem:
        - link "Insights":
          - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/pulse
      - listitem:
        - link "Settings":
          - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/settings
- main:
  - img "NITHISHKUMAR-126655"
  - strong:
    - link "github-ui-api-automation-framework":
      - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework
  - text: Public
  - list:
    - listitem:
      - button "Pin NITHISHKUMAR-126655/github-ui-api-automation-framework": Pin
    - listitem:
      - 'button "Watch: Participating in NITHISHKUMAR-126655/github-ui-api-automation-framework. 0 users are watching this repository. Click to change subscription settings."': Watch (0)
    - listitem:
      - button "You own NITHISHKUMAR-126655/github-ui-api-automation-framework and are not a member of any organizations": Fork (0)
    - listitem:
      - button "Star NITHISHKUMAR-126655/github-ui-api-automation-framework": Star (0)
      - button "Star lists"
  - button "main branch": main
  - link "5 Branches":
    - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/branches
    - strong: "5"
    - text: Branches
  - link "0 Tags":
    - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/tags
    - strong: "0"
    - text: Tags
  - combobox "Go to file"
  - heading "Add file" [level=2]
  - button "Add file"
  - button "Code"
  - heading "Latest commit" [level=2]
  - link "NITHISHKUMAR-126655":
    - /url: /NITHISHKUMAR-126655
    - img "NITHISHKUMAR-126655"
  - link "commits by NITHISHKUMAR-126655":
    - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/commits?author=NITHISHKUMAR-126655
    - text: NITHISHKUMAR-126655
  - link "Add Playwright CI workflow for testing":
    - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/commit/b7ccbced748b31042cff73a4aee37b547123d035
  - link "Commit b7ccbce":
    - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/commit/b7ccbced748b31042cff73a4aee37b547123d035
    - text: b7ccbce
  - text: · Oct 29, 20262 hours ago
  - heading "History" [level=2]
  - link "2 Commits":
    - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/commits/main/
  - heading "Folders and files" [level=2]
  - table "Folders and files":
    - rowgroup:
      - row "Name Last commit message Last commit date":
        - columnheader "Name"
        - columnheader "Last commit message"
        - columnheader "Last commit date"
    - rowgroup:
      - row ".github/workflows/.github/workflows, (Directory) Add Playwright CI workflow for testing Oct 29, 20262 hours ago":
        - cell ".github/workflows/.github/workflows, (Directory)":
          - link ".github/workflows/.github/workflows, (Directory)":
            - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/tree/main/.github/workflows/.github/workflows
            - text: .github/workflows/.github/workflows
        - cell "Add Playwright CI workflow for testing":
          - link "Add Playwright CI workflow for testing":
            - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/commit/b7ccbced748b31042cff73a4aee37b547123d035
        - cell "Oct 29, 20262 hours ago"
      - row ".gitignore, (File) Initial commit Oct 29, 20263 hours ago":
        - cell ".gitignore, (File)":
          - link ".gitignore, (File)":
            - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/blob/main/.gitignore
            - text: .gitignore
        - cell "Initial commit":
          - link "Initial commit":
            - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/commit/0bd99cbbf032fde900bf30743f9079d08ff292a7
        - cell "Oct 29, 20263 hours ago"
      - row "README.md, (File) Initial commit Oct 29, 20263 hours ago":
        - cell "README.md, (File)":
          - link "README.md, (File)":
            - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/blob/main/README.md
            - text: README.md
        - cell "Initial commit":
          - link "Initial commit":
            - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/commit/0bd99cbbf032fde900bf30743f9079d08ff292a7
        - cell "Oct 29, 20263 hours ago"
  - heading "Repository files navigation" [level=2]
  - navigation "Repository files":
    - list:
      - listitem:
        - link "README":
          - /url: "#"
  - button "Edit file"
  - article:
    - heading "github-ui-api-automation-framework" [level=1]
    - 'link "Permalink: github-ui-api-automation-framework"':
      - /url: "#github-ui-api-automation-framework"
    - paragraph: GitHub UI and API automation framework built with Playwright and TypeScript.
  - heading "About Edit repository metadata" [level=2]:
    - text: About
    - button "Edit repository metadata"
  - paragraph: GitHub UI and API automation framework built with Playwright and TypeScript.
  - heading "Resources" [level=3]
  - link "Readme":
    - /url: "#readme-ov-file"
  - link "Activity":
    - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/activity
  - heading "Stars" [level=3]
  - link "0 stars":
    - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/stargazers
    - strong: "0"
    - text: stars
  - heading "Watchers" [level=3]
  - link "0 watching":
    - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/watchers
    - strong: "0"
    - text: watching
  - heading "Forks" [level=3]
  - link "0 forks":
    - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/forks
    - strong: "0"
    - text: forks
  - heading "Releases" [level=2]:
    - link "Releases":
      - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/releases
  - text: No releases published
  - link "Create a new release":
    - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/releases/new
  - heading "Packages" [level=2]:
    - link "Packages":
      - /url: /users/NITHISHKUMAR-126655/packages?repo_name=github-ui-api-automation-framework
  - text: No packages published
  - link "Publish your first package":
    - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/packages
  - heading "Contributors (1)" [level=2]:
    - link "Contributors":
      - /url: /NITHISHKUMAR-126655/github-ui-api-automation-framework/graphs/contributors
    - text: (1)
  - list:
    - listitem:
      - link "@NITHISHKUMAR-126655":
        - /url: /NITHISHKUMAR-126655
        - img "@NITHISHKUMAR-126655"
      - link "NITHISHKUMAR-126655":
        - /url: /NITHISHKUMAR-126655
        - strong: NITHISHKUMAR-126655
```

# Test source

```ts
  1  | import * as fs from 'fs';
  2  | import { env } from '../../config/env';
  3  | import { expect, uiTest as test } from '../../src/fixtures';
  4  | 
  5  | const hasStorageState = fs.existsSync(env.storageStatePath);
  6  | 
  7  | test.describe('UI | Authenticated navigation', () => {
  8  |   test.skip(
  9  |     !hasStorageState,
  10 |     'No Playwright storage state found. Run "npm run auth:save" (manual login, MFA-safe) to create one.',
  11 |   );
  12 |   test.use({ storageState: env.storageStatePath });
  13 | 
  14 |   test('UI-03 authenticated user can open the dashboard and the capstone repository', { tag: ['@auth', '@ui'] }, async ({
  15 |     page,
  16 |     authenticatedHomePage,
  17 |     repositoryPage,
  18 |   }) => {
  19 |     await authenticatedHomePage.open();
  20 |     await expect(authenticatedHomePage.getUserMenu()).toBeVisible();
  21 |     const login = await authenticatedHomePage.getSignedInLogin();
  22 |     expect(login?.toLowerCase()).toBe(env.userId.toLowerCase());
  23 | 
  24 |     await repositoryPage.open(env.userId, env.testRepo);
> 25 |     await expect(page).toHaveURL(new RegExp(`/${env.userId}/${env.testRepo}$`, 'i'));
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  26 |     await expect(repositoryPage.getRepositoryName(env.testRepo)).toBeVisible();
  27 |     await expect(repositoryPage.getOwner(env.userId)).toBeVisible();
  28 |   });
  29 | });
  30 | 
```