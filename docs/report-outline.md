# Final Report Outline

The final report will live in `docs/final-report.md` and should be converted to the required submission format after real measurements and screenshots exist.

## Required Sections And Current Sources

1. Introduction: summarize `Low Latency.docx` scope from `docs/assignment-source.md`.
2. System Architecture: OBS, RTMP, modified FFmpeg, DASH chunks/segments, NGINX, modified node-gpac-dash, dash.js.
3. FFmpeg Source Modification: use `docs/ffmpeg-build.md` and `docs/report-assets/ffmpeg-build-evidence.md`.
4. Setup And Live Validation: use `docs/streaming-runbook.md`, `docs/report-assets/live-validation-status.md`, and the saved browser inspector screenshot.
5. Segment Duration Experiment: use `docs/latency-results.md` and `docs/report-assets/plot-spec.json`.
6. Fragment Duration Experiment: use `docs/latency-results.md` and `docs/report-assets/plot-spec.json`.
7. QR Bonus Measurement: include `docs/qr-bonus.md` as optional overlay setup unless a real QR decode measurement is later recorded.
8. SDK And Open-Source Disclosure: use `docs/sdk-and-open-source-disclosure.md`.
9. Conclusion: state the measured below-5-second profile and the observed latency/stall trends.

## Evidence Rules

- Use only measurements from `docs/latency-measurements.csv`.
- Use only screenshots/files that exist under `docs/report-assets/`.
- Do not replace missing evidence with estimates.
- Keep the final report draft incomplete until the final writing pass.
