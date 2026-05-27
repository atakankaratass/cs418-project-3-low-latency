# Streaming Runbook

## Startup Order

1. Build and verify the modified FFmpeg binary from `docs/ffmpeg-build.md`.
2. Start NGINX for HTTP delivery.
3. Start the modified node-gpac-dash server.
4. Configure OBS with wall-clock overlay and RTMP output.
5. Start OBS streaming.
6. Start FFmpeg packaging with the current experiment command.
7. Open the dash.js player in a browser.

## Required Live Checks

- Confirm playback starts and stays close to live.
- Confirm measured latency is less than 5 seconds before proceeding to experiments.
- Use browser inspector to confirm requested DASH segments are arriving in chunks via chunked transfer encoding, not only as complete segments.
- Wireshark may be used instead of browser inspector.
- Confirm the encoder is not lagging real time.
- If CPU is choking, reduce OBS resolution or quality.

## Evidence Rules

Manual/live validation must not be faked. Screenshots, latency values, inspector evidence, and report statements must come from real runs.

If latency is not low, the setup is not correct. Do not proceed to experiment measurements until the pipeline is fixed.

## Local Status Helper

Run `make live-status` to generate `docs/report-assets/live-validation-status.md`. This helper checks the locally visible FFmpeg configuration, OBS app presence, NGINX availability, `CS418_NODE_GPAC_DASH_DIR`, browser-inspector confirmation flag, and optional baseline latency value.

Useful environment variables:

```bash
export CS418_FFMPEG_PATH="$HOME/bin/ffmpeg"
export CS418_NODE_GPAC_DASH_DIR="/path/to/modified/node-gpac-dash"
export CS418_BROWSER_CHUNKED_TRANSFER_CONFIRMED="1"
export CS418_BASELINE_LATENCY_MS="4200"
```

The helper is a checklist report. It does not prove live validation by itself.
