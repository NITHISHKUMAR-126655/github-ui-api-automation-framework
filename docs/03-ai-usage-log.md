# AI Usage Log (Part 15)

> This is a TEMPLATE with the rows I can honestly pre-fill. The **Human Review**, **Accepted/Rejected**, **Reason** and **Final Implementation** columns must be completed by YOU after you read, run and change the code. The log should show your judgement, not just AI output.

| Phase | Task | Prompt used | AI tool/model | Output summary | Human review | Accepted | Rejected | Reason | Final implementation | Responsible-AI note |
|-------|------|-------------|---------------|----------------|--------------|----------|----------|--------|----------------------|---------------------|
| Planning | Generate full framework skeleton | Capstone brief pasted, "Give me code for everything" | Claude (Anthropic) | Full POM/service-layer/CI scaffold and docs | TODO: what did you verify by running it? | TODO | TODO | TODO | TODO | No token shared; placeholders only |
| Requirements | Requirement review | (Part 1 suggested prompt) | TODO | TODO | TODO | TODO | TODO | TODO | docs/01-requirement-review.md | Assumptions separated from facts |
| Code review | Review RepositoryPage locators | (Part 14 reviewer prompt) | TODO | TODO | TODO | TODO | TODO | TODO | TODO | |
| Debugging | Analyse a failing locator | (Part 14 debugging prompt) | TODO | TODO | TODO | TODO | TODO | TODO | TODO | Log pasted without secrets |
| CI | Review workflow | (Part 14 CI prompt) | TODO | TODO | TODO | TODO | TODO | TODO | TODO | |

## Examples of review decisions to look for (replace with your real ones)
- Locators for visibility badge and branch selector are text-based and may drift: verify with `npx playwright codegen https://github.com/microsoft/playwright` and adjust.
- Token env var renamed to `AIQE_GITHUB_TOKEN` because Actions rejects secrets starting with `GITHUB_`.
