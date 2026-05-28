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

## Current Live Debugging Notes

- The modified node-gpac-dash checkout must treat `-chunks-per-segment 0` as disabled; otherwise its `nbMdatInSegment == chunkCount` check can end a segment response immediately before media data is sent.
- A short EOF timeout in node-gpac-dash is used during live-edge segment serving so video and audio responses can end independently after FFmpeg stops appending to the current `.m4s` file.
- The exact local node-gpac-dash patch notes are documented in `docs/node-gpac-dash-local-patch.md`.
- The earlier `seg_duration=4`, `keyint=120` baseline played but produced repeated dash.js `PLAYBACK_WAITING` events at segment boundaries. The player log showed `GapController` jumping about `0.1s` every segment, which indicates a segment-boundary timeline gap rather than a missing stream.
- A `seg_duration=2`, `keyint=60`, `-frag_type every_frame` run was observed by the user to play smoothly. Treat this as qualitative live validation only until browser inspector evidence, screenshots, and wall-clock latency measurements are captured.
- The generated player currently uses `liveDelay: 4` and logs applied dash.js settings plus stall/waiting/buffer events to make future runs diagnosable.

## Generated Player And NGINX Config

Run `make live-artifacts` before starting the HTTP serving path. It generates a dash.js player at `public/index.html` and an NGINX config at `configs/nginx/generated.conf`.

Start NGINX with the generated config:

```bash
nginx -c "$PWD/configs/nginx/generated.conf" -p "$PWD/output/nginx"
```

Then open `http://127.0.0.1:8080/` after FFmpeg and node-gpac-dash are producing the `/dash/live.mpd` stream.

## Local Status Helper

Run `make live-status` to generate `docs/report-assets/live-validation-status.md`. This helper checks the locally visible FFmpeg configuration, OBS app presence, NGINX availability, `CS418_NODE_GPAC_DASH_DIR`, browser-inspector confirmation flag, and optional baseline latency value.

Run `make live-ffmpeg-evidence` to generate `docs/report-assets/ffmpeg-build-evidence.md`. This captures the local FFmpeg version/configuration output and DASH muxer options without replacing the manual source-build requirement.

Run `make live-experiment-checklist` to generate `docs/report-assets/live-experiment-checklist.md`. This records the FFmpeg commands for all segment-duration and fragment-duration experiments, while leaving browser inspector and wall-clock latency gates explicitly pending until manually measured.

Useful environment variables:

```bash
export CS418_FFMPEG_PATH="$HOME/bin/ffmpeg"
export CS418_NODE_GPAC_DASH_DIR="/path/to/modified/node-gpac-dash"
export CS418_BROWSER_CHUNKED_TRANSFER_CONFIRMED="1"
export CS418_BASELINE_LATENCY_MS="4200"
```

The helper is a checklist report. It does not prove live validation by itself.
