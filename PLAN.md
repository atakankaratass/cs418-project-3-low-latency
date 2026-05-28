# CS 418 Project 3 Low Latency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the CS 418 Project 3 low-latency live streaming project exactly within the scope of `Low Latency.docx`, including required experiments, report evidence, and the QR-code bonus after the core project is complete.

**Architecture:** The repository preserves the Project 2 working discipline while keeping the technical implementation strictly bound to `Low Latency.docx` and its referenced tutorial links. OBS provides the encoded RTMP source, a source-built modified FFmpeg packages low-latency DASH chunks/segments, NGINX plus modified `node-gpac-dash` serves the stream, and a dash.js player plays it. Repo automation validates scripts, generated configs, experiment matrices, docs, and report artifacts without replacing the required manual/live validation.

**Tech Stack:** OBS, RTMP, source-built FFmpeg, NGINX, modified node-gpac-dash, dash.js, TypeScript/Node scripts, Vitest, ESLint, Prettier, Husky, Make, GitHub Actions.

---

## Mandatory Source Of Truth

- `Low Latency.docx` is the main assignment source.
- The Medium tutorial linked from the DOCX defines the low-latency streaming setup.
- FFmpeg formats docs are used only for FFmpeg DASH options.
- OBS docs/site are used only for OBS setup.
- FFmpeg Ubuntu Compilation Guide is used only as directed by Appendix A.
- No feature or architecture should be added unless it directly supports the DOCX assignment, required validation, report, or bonus QR measurement.

## Required AI Startup Flow

- If an AI agent starts in `AGENTS.md`, it must read `AGENTS.md`, then `CONTRIBUTING.md`, then `README.md`, then `PLAN.md`.
- If an AI agent starts in `CONTRIBUTING.md`, it must stop and read `AGENTS.md`, then return to `CONTRIBUTING.md`, then read `README.md`, then `PLAN.md`.
- If an AI agent starts in `README.md`, it must stop and read `AGENTS.md`, then `CONTRIBUTING.md`, then return to `README.md`, then `PLAN.md`.
- If an AI agent starts in `PLAN.md`, it must stop and read `AGENTS.md`, then `CONTRIBUTING.md`, then `README.md`, then return to `PLAN.md`.

## Git And GitHub Rules

- Important completed development checkpoints should be committed after local validation passes.
- Push only after local validation is green and the branch/remote target is clear.
- Do not push if lint, typecheck, tests, build, validation, or relevant GitHub Actions are failing.
- Do not use `--no-verify` or force-push unless explicitly approved.
- Inspect status, diff, and recent commits before every commit.
- Stage only intended files.

## File Map

- Create: `AGENTS.md`
- Create: `CONTRIBUTING.md`
- Create: `README.md`
- Create: `PLAN.md`
- Create: `.gitignore`
- Create: `Makefile`
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `.prettierrc.json`
- Create: `.github/workflows/ci.yml`
- Create: `.github/workflows/security.yml`
- Create: `.husky/pre-commit`
- Create: `.husky/pre-push`
- Create: `docs/assignment-source.md`
- Create: `docs/reference/appendix-a-dash-options.png`
- Create: `docs/reference/links.md`
- Create: `docs/setup.md`
- Create: `docs/ffmpeg-build.md`
- Create: `docs/obs-setup.md`
- Create: `docs/streaming-runbook.md`
- Create: `docs/experiment-matrix.md`
- Create: `docs/latency-methodology.md`
- Create: `docs/latency-results.md`
- Create: `docs/demo-runbook.md`
- Create: `docs/sdk-and-open-source-disclosure.md`
- Create: `docs/report-outline.md`
- Create: `docs/final-report.md`
- Create: `docs/report-assets/`
- Create: `src/config/experimentMatrix.ts`
- Create: `src/config/ffmpegDashCommand.ts`
- Create: `src/config/paths.ts`
- Create: `src/config/qrBonus.ts`
- Create: `src/report/latencyCsv.ts`
- Create: `src/report/latencyMarkdown.ts`
- Create: `src/report/plotSpec.ts`
- Create: `scripts/check-assignment-source.ts`
- Create: `scripts/extract-appendix-image.ts`
- Create: `scripts/validate-environment.ts`
- Create: `scripts/print-ffmpeg-build-steps.ts`
- Create: `scripts/print-obs-checklist.ts`
- Create: `scripts/print-streaming-commands.ts`
- Create: `scripts/generate-experiment-matrix.ts`
- Create: `scripts/record-latency.ts`
- Create: `scripts/generate-latency-report.ts`
- Create: `scripts/generate-qr-bonus-plan.ts`
- Create: `tests/unit/experimentMatrix.test.ts`
- Create: `tests/unit/ffmpegDashCommand.test.ts`
- Create: `tests/unit/latencyCsv.test.ts`
- Create: `tests/unit/latencyMarkdown.test.ts`
- Create: `tests/unit/plotSpec.test.ts`
- Create: `tests/unit/qrBonus.test.ts`
- Create: `tests/integration/docsCoverage.test.ts`

## Task 1: Establish Guardrails And Repo Skeleton

- [x] Create `AGENTS.md` with the mandatory read order and the redirected-start behavior.
- [x] Create `CONTRIBUTING.md` with local validation rules, no-bypass policy, TDD expectation, commit/push approval rules, and a reminder to go back to `AGENTS.md` if opened first.
- [x] Create `README.md` with human setup overview and AI redirect notice.
- [x] Create `PLAN.md` from this plan and include it in the mandatory AI read sequence after `README.md`.
- [x] Create `.gitignore` for `node_modules/`, `dist/`, `coverage/`, `output/`, `docs/report-assets/generated/`, `.DS_Store`, and temporary DOCX lock files.
- [x] Create `package.json`, `Makefile`, TypeScript, ESLint, Prettier, Vitest, Husky, and GitHub Actions surfaces.
- [x] Configure `make lint`, `make typecheck`, `make test`, `make build`, `make validate-env`, `make assignment-check`, `make experiment-matrix`, `make latency-report`, and `make validate-pr`.
- [x] Configure pre-commit as `npx lint-staged`.
- [x] Configure pre-push as `npm run validate:push`.
- [x] Run `make install`.
- [x] Run `make lint`, expect pass.
- [x] Run `make typecheck`, expect pass.
- [x] Run `make test`, expect pass.
- [x] Run `make build`, expect pass.

## Task 2: Extract And Freeze Assignment Requirements

- [x] Extract text from `Low Latency.docx` into `docs/assignment-source.md`.
- [x] Extract embedded Appendix A image `word/media/image1.png` into `docs/reference/appendix-a-dash-options.png`.
- [x] Create `docs/reference/links.md` with these links: Medium low-latency tutorial, FFmpeg formats, OBS, FFmpeg Compilation Guide.
- [x] Create `scripts/check-assignment-source.ts` to assert key assignment phrases are present.
- [x] Add tests that fail if required requirements are missing from docs.
- [x] Document that `Low Latency.docx` remains the controlling source and generated markdown is only a traceable summary.
- [x] Run `make assignment-check`, expect pass.
- [x] Run `make test`, expect pass.

## Task 3: Document FFmpeg Source Build Exactly From Appendix A

- [x] Create `docs/ffmpeg-build.md`.
- [x] Include the Appendix A required `dashenc.c` change exactly.
- [x] Include the source download commands.
- [x] Include dependency notes: `liblzma-dev`, `libunistring-dev`, `libxml2-dev`.
- [x] Include required configure flags: `--enable-demuxer=dash --enable-libxml2`.
- [x] Include the full build command from the DOCX.
- [x] Include verification commands: `whereis ffmpeg`, full-path FFmpeg usage, `ffmpeg -h muxer=dash`.
- [x] Include the extracted Appendix A image as reference evidence.
- [x] Create `scripts/print-ffmpeg-build-steps.ts` to print the exact build checklist.
- [x] Add tests that assert the required flags and `dashenc.c` patch text appear in the generated output.
- [x] Run `make test`, expect pass.

## Task 4: Document OBS Setup Within Assignment Scope

- [x] Create `docs/obs-setup.md`.
- [x] Document OBS as the only required media source.
- [x] Document wall-clock time overlay requirement.
- [x] Document RTMP output to FFmpeg.
- [x] Document 30 fps assumption used by `keyint` mapping.
- [x] Document keyframe interval values: `30`, `60`, `90`, `120`, `150`, `180`.
- [x] Create `scripts/print-obs-checklist.ts`.
- [x] Add tests that assert all required keyint values and wall-clock overlay requirement are present.
- [x] Run `make test`, expect pass.

## Task 5: Generate Required Experiment Matrix

- [x] Create `src/config/experimentMatrix.ts`.
- [x] Encode segment experiment rows: `(30,1)`, `(60,2)`, `(90,3)`, `(120,4)`, `(150,5)`, `(180,6)`.
- [x] Encode fragment experiment rows with fixed `keyint=120`, fixed `seg_duration=4`, and `frag_duration` values `0.033`, `0.066`, `0.1`, `0.2`, `0.5`, `1.0`, `2.0`, `4.0`.
- [x] Create `docs/experiment-matrix.md` from this data.
- [x] Create `scripts/generate-experiment-matrix.ts`.
- [x] Add tests for exact matrix values and row counts.
- [x] Run `make experiment-matrix`, expect docs generated.
- [x] Run `make test`, expect pass.

## Task 6: Generate FFmpeg DASH Command Templates

- [x] Create `src/config/ffmpegDashCommand.ts`.
- [x] Generate command templates for OBS RTMP input and low-latency DASH output.
- [x] Include `-seg_duration` from matrix rows.
- [x] Include `-frag_duration` and `-frag_type duration` for fragment experiments.
- [x] Use modified FFmpeg path as an explicit config variable, not hardcoded to a system-specific path.
- [x] Keep commands as templates/checklists because live OBS and FFmpeg execution require manual environment confirmation.
- [x] Create `scripts/print-streaming-commands.ts`.
- [x] Add tests that generated commands include RTMP input, DASH output format, `seg_duration`, and `frag_type duration` where required.
- [x] Run `make test`, expect pass.

## Task 7: Build Environment Validation

- [x] Create `scripts/validate-environment.ts`.
- [x] Check Node dependencies.
- [x] Check `ffmpeg` path config exists if provided.
- [x] Check OBS is documented as manual prerequisite.
- [x] Check NGINX availability if present on PATH.
- [x] Check node-gpac-dash directory config if provided.
- [x] Check output directories can be created during runtime.
- [x] Do not fake live validation.
- [x] Create `docs/setup.md` with prerequisite and validation instructions.
- [x] Run `make validate-env`, expect truthful pass/warn output.

## Task 8: Create Streaming Runbook

- [x] Create `docs/streaming-runbook.md`.
- [x] Include startup order: modified FFmpeg ready, NGINX ready, node-gpac-dash ready, OBS configured, dash.js player opened.
- [x] Include browser inspector validation for chunked transfer encoding.
- [x] Include Wireshark as optional inspector alternative.
- [x] Include CPU/encoder lag mitigation: reduce OBS resolution/quality if needed.
- [x] Include `<5s` latency target.
- [x] Include clear failure diagnosis: if latency is not low, setup is not correct.
- [x] Add docs coverage tests to assert all required validation checks are documented.
- [x] Run `make test`, expect pass.

## Task 9: Implement Latency Result Recording

- [x] Create `src/report/latencyCsv.ts`.
- [x] Create `scripts/record-latency.ts`.
- [x] Support recording manual measurements after playback has been running 10-20 seconds.
- [x] Store fields: experiment type, `keyint`, `seg_duration`, `frag_duration`, observed system time, embedded video time, computed latency ms, notes.
- [x] Create `docs/latency-methodology.md`.
- [x] Create initial `docs/latency-results.md` with empty tables marked as “not measured yet” until real runs are performed.
- [x] Add tests for latency calculation and CSV row formatting.
- [x] Run `make test`, expect pass.

## Task 10: Generate Report Tables And Plot Specs

- [x] Create `src/report/latencyMarkdown.ts`.
- [x] Create `src/report/plotSpec.ts`.
- [x] Create `scripts/generate-latency-report.ts`.
- [x] Generate latency table grouped by `seg_duration`.
- [x] Generate latency table grouped by `frag_duration`.
- [x] Generate plot-ready CSV or JSON for both required graphs.
- [x] Do not fabricate values; empty/missing data should remain visibly incomplete.
- [x] Add tests for aggregation and missing-data behavior.
- [x] Run `make latency-report`, expect generated report files.
- [x] Run `make test`, expect pass.

## Task 11: Perform Core Live Validation Manually

- [x] Build modified FFmpeg from Appendix A (`$HOME/bin/ffmpeg`, dashenc.c modification applied, RTMP + DASH supported).
- [x] Verify modified FFmpeg path with `whereis ffmpeg`.
- [x] Verify DASH muxer/options with the command shown in Appendix A and compare to the embedded screenshot.
- [x] Start NGINX (serving player at port 8080).
- [x] Start modified node-gpac-dash server (port 8000).
- [x] Configure OBS RTMP output and wall-clock overlay. **MANUAL STEP — OBS GUI required.**
- [x] Start OBS stream to `rtmp://127.0.0.1/live/stream`. **MANUAL STEP.**
- [x] Start FFmpeg packaging command for baseline `keyint=120`, `seg_duration=4`. **MANUAL STEP.**
- [x] Open dash.js player at `http://127.0.0.1:8080/`.
- [x] Confirm playback starts (live OBS+FFmpeg stream played in dash.js).
- [ ] Confirm browser inspector shows chunks arriving via chunked transfer, not full segments only.
  - **CURRENT STATUS:** gpac-dash logs show media fragments sent and responses ending by EOF timeout, but browser inspector chunked-transfer evidence still must be captured.
- [x] Diagnose baseline playback instability.
  - `seg_duration=4`, `keyint=120` repeatedly reached dash.js `PLAYBACK_WAITING` near segment boundaries; player logs showed `GapController` jumps of about `0.1s`.
  - `seg_duration=2`, `keyint=60`, `-ldash 1`, `-frag_type every_frame` was observed to play smoothly and should be used as the next formal measurement run.
- [ ] Confirm latency is below 5 seconds.
- [ ] Save screenshots under `docs/report-assets/`.
- [ ] Record baseline result in `docs/latency-results.md`.

## Task 12: Run Segment Duration Experiments

- [ ] Run `keyint=30`, `seg_duration=1`.
- [ ] Measure latency 10-20 seconds after playback starts.
- [ ] Record result.
- [x] Run `keyint=60`, `seg_duration=2`.
- [ ] Measure latency 10-20 seconds after playback starts.
- [ ] Record result.
- [ ] Run `keyint=90`, `seg_duration=3`.
- [ ] Measure latency 10-20 seconds after playback starts.
- [ ] Record result.
- [ ] Run `keyint=120`, `seg_duration=4`.
- [ ] Measure latency 10-20 seconds after playback starts.
- [ ] Record result.
- [ ] Run `keyint=150`, `seg_duration=5`.
- [ ] Measure latency 10-20 seconds after playback starts.
- [ ] Record result.
- [ ] Run `keyint=180`, `seg_duration=6`.
- [ ] Measure latency 10-20 seconds after playback starts.
- [ ] Record result.
- [ ] Generate latency vs `seg_duration` graph data.
- [ ] Explain whether latency changes with `seg_duration`.

## Task 13: Run Fragment Duration Experiments

- [ ] Fix `keyint=120`.
- [ ] Fix `seg_duration=4`.
- [ ] Run `frag_duration=0.033`, `frag_type=duration`.
- [ ] Measure and record latency.
- [ ] Run `frag_duration=0.066`, `frag_type=duration`.
- [ ] Measure and record latency.
- [ ] Run `frag_duration=0.1`, `frag_type=duration`.
- [ ] Measure and record latency.
- [ ] Run `frag_duration=0.2`, `frag_type=duration`.
- [ ] Measure and record latency.
- [ ] Run `frag_duration=0.5`, `frag_type=duration`.
- [ ] Measure and record latency.
- [ ] Run `frag_duration=1.0`, `frag_type=duration`.
- [ ] Measure and record latency.
- [ ] Run `frag_duration=2.0`, `frag_type=duration`.
- [ ] Measure and record latency.
- [ ] Run `frag_duration=4.0`, `frag_type=duration`.
- [ ] Measure and record latency.
- [ ] Generate latency vs `frag_duration` graph data.
- [ ] Explain whether latency changes with `frag_duration`.

## Task 14: Complete Core Report And Demo Docs

- [ ] Create `docs/demo-runbook.md`.
- [ ] Create `docs/sdk-and-open-source-disclosure.md`.
- [ ] Create `docs/report-outline.md`.
- [ ] Create `docs/final-report.md`.
- [ ] Include assignment goal.
- [ ] Include architecture: OBS, RTMP, modified FFmpeg, DASH chunks/segments, NGINX, node-gpac-dash, dash.js.
- [ ] Include FFmpeg source modification and build verification.
- [ ] Include setup validation and chunked transfer proof.
- [ ] Include both experiment result tables.
- [ ] Include both required graphs.
- [ ] Include findings/explanations.
- [ ] Include SDK/open-source disclosure.
- [ ] Include demo/Q&A notes.
- [ ] Include screenshots only from real runs.
- [ ] Run docs coverage tests.
- [ ] Run `make validate-pr`, expect pass before claiming completion.

## Task 15: Implement Bonus QR Timestamp Measurement After Core Completion

- [ ] Confirm all core tasks are complete and validated.
- [ ] Create `src/config/qrBonus.ts`.
- [ ] Create `scripts/generate-qr-bonus-plan.ts`.
- [ ] Choose a QR timestamp generator that stays within assignment intent and disclose it in SDK/open-source docs.
- [ ] Generate QR code containing current system clock timestamp.
- [ ] Embed QR code into the video frame during encoding or OBS composition.
- [ ] On player side, read QR from the frame.
- [ ] Subtract QR timestamp from current system clock.
- [ ] Record QR-based latency separately from required manual wall-clock measurements.
- [ ] Add tests for QR timestamp payload formatting and latency subtraction logic.
- [ ] Add `docs/qr-bonus.md`.
- [ ] Add bonus section to final report.
- [ ] Re-run `make validate-pr`.

## Task 16: Prepare Submission Bundle

- [ ] Verify final report is complete.
- [ ] Verify code, docs, results, screenshots, and report are included.
- [ ] Verify SDK/open-source disclosure is complete.
- [ ] Verify no generated runtime junk or local secrets are included.
- [ ] Create `lastname_project3.zip` or group lastname format if needed.
- [ ] Inspect zip contents before submission.
- [ ] Do not claim submission-ready until local validation and artifact inspection pass.

## Final Validation Gate

Run these before completion:

```bash
make lint
make typecheck
make test
make build
make validate-env
make assignment-check
make experiment-matrix
make latency-report
make validate-pr
```

Expected result: all automated checks pass, and live validation/results are documented truthfully.
