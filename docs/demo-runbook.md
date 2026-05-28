# Demo Runbook

The demo is expected to happen online through screen sharing and Q&A.

## Demo Order

1. Show `Low Latency.docx` requirements are covered by the repo docs.
2. Show modified FFmpeg build verification, including `--enable-demuxer=dash --enable-libxml2`.
3. Show the required `dashenc.c` source modification: `.tmp` is removed from the media segment temp path.
4. Show OBS wall-clock overlay and RTMP output settings.
5. Show the low-latency OBS validation profile: `852x480`, `1200 kbps`, `30 fps`, keyframe interval `1s`.
6. Show NGINX and modified node-gpac-dash serving path.
7. Open the dash.js player at `http://127.0.0.1:8080/`.
8. Show browser inspector chunked transfer evidence from `docs/report-assets/browser-chunked-transfer.png`.
9. Show the below-5-second latency row in `docs/latency-measurements.csv` and the generated table in `docs/latency-results.md`.
10. Present segment and fragment experiment graph data from `docs/report-assets/plot-spec.json`.
11. Present QR overlay bonus setup from `docs/qr-bonus.md` only as optional bonus work, not as a substitute for the required wall-clock measurements.

## Current Evidence Artifacts

- `docs/report-assets/ffmpeg-build-evidence.md`: source-built FFmpeg and DASH muxer evidence.
- `docs/report-assets/browser-chunked-transfer.png`: browser inspector chunked-transfer evidence.
- `docs/report-assets/live-validation-status.md`: current live validation checklist status.
- `docs/latency-measurements.csv`: raw manual latency measurements.
- `docs/latency-results.md`: generated measurement tables.
- `docs/report-assets/plot-spec.json`: plot-ready data for required graphs.

## Fallback

If live streaming fails during screen sharing, explain the latest truthful local validation state and show only real saved evidence. Do not invent a passing live result.
