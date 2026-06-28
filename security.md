# Security sweep

## Supply-chain advisory check — 2026-06-27

- Source: https://pranava0x0.github.io/vibe-coding-security/llms-ctx.txt (index dated 2026-06-27).
- Trigger: scaffolding a new project.
- **Result: no action needed.** This project is a single self-contained static HTML newsletter
  with **no package dependencies, no build step, no CDN assets, and no install scripts.** None of
  the active threats (Miasma/Shai-Hulud npm worms, Mastra/Hades/IronWorm/TrapDoor packages, AI-IDE
  RCEs, MCP config hijacks) have any surface here.
- Re-check trigger: refresh only if we (a) add any dependency / CDN asset / GitHub Action,
  (b) add a build toolchain, or (c) this cache is >7 days old at the next such action.

## Dependency add — 2026-06-27

- Added `docx` (dolanmiu/docx-js) as a **dev-only** dependency to generate the Word newsletter.
  Not shipped with the deliverable (the .docx itself has no runtime deps). Checked against the
  2026-06-27 advisory index above: `docx` is not among any flagged package/wave. No action needed.
