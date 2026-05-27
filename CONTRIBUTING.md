# Contributing

If you are an AI agent and opened this file first, stop here and read `AGENTS.md` first. Then return to this file, read `README.md`, and finally read `PLAN.md`.

## Quality Rules

- Fix code and docs to meet the rules; never weaken the rules.
- Tests, lint, typecheck, and build must pass locally before completion claims.
- CI is a backup safety net, not a replacement for local validation.
- No bypasses: do not use `--no-verify`, `@ts-ignore`, skipped tests, or weakened configs.
- Do not fabricate screenshots, latency measurements, graphs, or validation results.

## Scope Rules

- `Low Latency.docx` is the assignment source of truth.
- Use the linked Medium tutorial, FFmpeg docs, OBS reference, and FFmpeg compilation guide only as directed by the assignment.
- Keep implementation focused on the required low-latency streaming workflow and required report evidence.
- Implement the QR-code latency bonus only after the core assignment is complete.

## Workflow

Follow TDD for behavior changes and scripts:

1. Write a failing test.
2. Verify it fails for the expected reason.
3. Write the minimal implementation.
4. Re-run tests until green.
5. Refactor while staying green.

## Git And GitHub Workflow

- Make focused commits at meaningful project checkpoints after local validation passes.
- Do not let important completed work remain uncommitted without telling the user why.
- Push only after local validation passes and the target branch/remote is clear.
- Do not push when lint, typecheck, tests, build, or repository validation are failing.
- Do not push over a known failing GitHub Actions state unless the local change is intended to fix that failure and local validation passes first.
- Inspect `git status`, `git diff`, and recent commits before committing.
- Stage only intended files.
- Never use `--no-verify`.
- Never force-push unless explicitly approved.

## Validation Gates

Pre-commit should stay fast and run staged formatting/lint through `lint-staged`.

Pre-push is the strict local gate and must run:

- `make lint`
- `make typecheck`
- `make test`
- `make build`
- `make validate-env`
- `make assignment-check`
- `make experiment-matrix`
- `make latency-report`

Before submission readiness:

- automated validation must pass locally
- live setup validation must be documented truthfully
- required latency measurements and graphs must be based on real runs
- report and screenshots must reflect the real implementation

## Documentation

Update docs whenever setup, commands, validation flow, experiment flow, output locations, or report evidence changes.

All docs under `docs/` should use lowercase kebab-case filenames.
