# Agent Protocol

This document defines mandatory repository behavior for AI agents working on CS 418 Project 3.

## Required Startup Order

AI agents must read files in this exact order before planning, searching, editing, testing, or command execution:

1. `AGENTS.md`
2. `CONTRIBUTING.md`
3. `README.md`
4. `PLAN.md`

If an agent starts in `README.md`, it must stop, read `AGENTS.md`, then `CONTRIBUTING.md`, then return to `README.md`, then read `PLAN.md`.

If an agent starts in `CONTRIBUTING.md`, it must stop, read `AGENTS.md`, then return to `CONTRIBUTING.md`, then read `README.md`, then read `PLAN.md`.

If an agent starts in `PLAN.md`, it must stop, read `AGENTS.md`, then `CONTRIBUTING.md`, then `README.md`, then return to `PLAN.md`.

## Source Of Truth

- `Low Latency.docx` is the main assignment source.
- Stay within the assignment scope and its referenced tutorial links.
- Do not introduce unrelated features or toolkit abstractions.
- Implement the required work first; implement the QR-code bonus only after core requirements are complete.

## Non-Negotiable Rules

- Do not bypass validation gates.
- Do not weaken lint, typecheck, test, build, pre-commit, or pre-push rules.
- Do not fabricate outputs, screenshots, metrics, latency results, or validation results.
- Do not mark work complete before local validation passes.
- Do not modify or revert user work you did not create unless explicitly instructed.
- Do not use `--no-verify`, `@ts-ignore`, or equivalent bypasses.

## Required Workflow

1. Follow the required startup order.
2. Treat `Low Latency.docx` as controlling scope.
3. Use TDD for behavior changes and scripts.
4. Make the smallest correct change.
5. Validate locally before claiming success.
6. Report manual/live validation truthfully.

## Local Validation

Minimum automated validation before completion claims:

- `make lint`
- `make typecheck`
- `make test`
- `make build`
- `make validate-env`
- `make assignment-check`
- `make experiment-matrix`
- `make latency-report`
- `make validate-pr`

Live OBS, FFmpeg, NGINX, node-gpac-dash, browser inspector, and latency measurements are manual validation gates and must not be faked.

## Git Rules

- Use GitHub like a professional software project: meaningful work should be captured in focused commits after the relevant local validation passes.
- Never commit failing lint, typecheck, test, build, or validation output unless the user explicitly asks for a WIP commit and the failure is documented in the commit message or follow-up note.
- Never push if any required local validation fails.
- Never push if there is a known failing GitHub Actions state for the branch unless the push is specifically fixing that failure and local validation passes first.
- Before every commit, inspect repository status and staged changes; stage only intended files.
- Before every push, run the required local validation gate and confirm the branch/remote target.
- Do not use `--no-verify` or force-push unless the user explicitly approves that exact action.
- Local validation is required before PR, push, submission readiness, or public release claims.
