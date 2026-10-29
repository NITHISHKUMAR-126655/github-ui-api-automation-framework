# Responsible AI Checklist (Part 16)

Tick each item only after you have verified it yourself.

- [ ] No token was shared with AI (chat, prompts, screenshots)
- [ ] No token was committed (`git log -p | grep -i token`, check `.env` not tracked)
- [ ] AI-generated code was reviewed line by line
- [ ] AI-generated assertions were validated against real GitHub behaviour
- [ ] AI did not invent unsupported requirements (see Assumptions in 01-requirement-review.md)
- [ ] Assumptions were documented
- [ ] Token scopes minimised and expiry set
- [ ] Logs, reports, traces and screenshots reviewed for sensitive data before sharing
- [ ] Destructive actions controlled (guarded `deleteRepository`)
- [ ] Final responsibility remained with me
- [ ] Generate -> Review -> Validate -> Use was followed
