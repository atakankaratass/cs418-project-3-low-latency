# CS 418 Project 3: Low Latency

If you are an AI agent and opened this file first, stop here and read `AGENTS.md`, then `CONTRIBUTING.md`, then return to this `README.md`, then read `PLAN.md`.

This repository implements CS 418 Project 3 using the provided `Low Latency.docx` assignment as the source of truth. The project builds a low-latency live streaming pipeline using OBS, RTMP, a source-built modified FFmpeg, low-latency DASH chunks and segments, NGINX plus modified `node-gpac-dash`, and dash.js playback.

## Assignment Scope

- Use OBS as the media source.
- Embed wall-clock time in the video for latency measurement.
- Send encoded media from OBS to FFmpeg using RTMP.
- Compile FFmpeg from source and apply the Appendix A `dashenc.c` change.
- Package low-latency DASH chunks and segments with FFmpeg.
- Serve with NGINX plus modified `node-gpac-dash`.
- Play with dash.js.
- Validate latency below 5 seconds before experiments.
- Run the required `keyint`/`seg_duration` and `frag_duration` experiments.
- Add the QR-code timestamp bonus after the core assignment is complete.

## Available Commands

- `make install`
- `make lint`
- `make typecheck`
- `make test`
- `make build`
- `make validate-env`
- `make assignment-check`
- `make experiment-matrix`
- `make latency-report`
- `make validate-pr`

## Required Reading

- `Low Latency.docx`
- `docs/assignment-source.md`
- `docs/ffmpeg-build.md`
- `docs/obs-setup.md`
- `docs/streaming-runbook.md`
- `docs/experiment-matrix.md`
- `docs/latency-methodology.md`

## Validation Policy

Automated tests verify repo scripts and docs coverage. Live OBS/FFmpeg/NGINX/node-gpac-dash/browser validation must be run manually and recorded truthfully; it must never be replaced by CI or fabricated evidence.

## GitHub Policy

Use focused commits for important completed work after local validation passes. Push only when local validation is green and there is no known unresolved failing GitHub Actions state for the branch. Failed local tests or validation block push.
