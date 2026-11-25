# Project skills — provenance

Vendored 2026-11-25 after the owner approved them and after a full read of each SKILL.md
(no scripts are included). Do not update by pulling `latest`; re-review any new version first.

| Skill | Source | Pinned commit | License |
|---|---|---|---|
| frontend-design | github.com/anthropics/skills · skills/frontend-design | e4bb5d960d87126ff3b3a8af1a104b7db67560ba | see LICENSE.txt |
| web-design-guidelines | github.com/vercel-labs/agent-skills · skills/web-design-guidelines | 5a37a6329fbad3666c3207392a6a7c0110e92efb | MIT (rules from vercel-labs/web-interface-guidelines @ 434b7f9, sha256 d246b026…0234 verified) |
| react-best-practices | github.com/vercel-labs/agent-skills · skills/react-best-practices | 5a37a6329fbad3666c3207392a6a7c0110e92efb | MIT (per SKILL.md frontmatter; repo has no LICENSE file) |
| impeccable | github.com/pbakaus/impeccable · .claude/skills/impeccable | 9e460a87ef338ee9d12c7beed8fedc597a5af5f7 | Apache-2.0 (LICENSE) |

## impeccable: text only
`scripts/` was deliberately NOT copied. Its launcher downloads and runs a prebuilt binary from
GitHub releases (checksum-verified) and its `hooks` command writes Claude Code hooks into
`.claude/settings.local.json` that run on every edit. Neither is allowed here.
- Use the skill's documented "Launcher unavailable" path: read the project context directly.
- Never run `impeccable` launcher commands, `/impeccable hooks …`, `live`, `generate`, `pin` or `foundations`.
- Project context lives in docs/ (CONTENT.md, DESIGN.md, briefs/). Do not create root PRODUCT.md or DESIGN.md without asking.

## Precedence
Owner's briefs and docs/ win over any skill. Where skills disagree (e.g. frontend-design asks for
sentence case, web-design-guidelines suggests Title Case), docs/DESIGN.md decides.
