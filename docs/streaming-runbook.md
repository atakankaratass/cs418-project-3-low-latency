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
