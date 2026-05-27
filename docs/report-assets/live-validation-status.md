# Live Validation Status

- Modified FFmpeg ready: no
- Core live validation ready: no
- FFmpeg command checked: ffmpeg
- OBS found: no
- NGINX found: yes
- node-gpac-dash dir: not set
- Browser chunked transfer confirmed: no
- Baseline latency ms: not recorded

## Blockers

- Modified source-built FFmpeg with --enable-demuxer=dash --enable-libxml2 was not verified.
- OBS was not found or not recorded as installed.
- CS418_NODE_GPAC_DASH_DIR is not set to a modified node-gpac-dash checkout.
- Browser inspector chunked transfer check has not been recorded.
- Baseline latency below 5000 ms has not been recorded.

This file is a local status report only. It does not replace manual OBS, browser inspector, or latency validation.
