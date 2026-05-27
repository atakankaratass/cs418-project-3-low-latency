# Setup

## Prerequisites

- Node.js 20 for repository scripts and tests.
- OBS for the required media source.
- Modified source-built FFmpeg from `docs/ffmpeg-build.md`.
- NGINX for HTTP serving.
- Modified node-gpac-dash server as required by the assignment tutorial.
- Browser with dash.js playback support and inspector tools.

## Local Repo Setup

```bash
make install
make validate-env
make assignment-check
make experiment-matrix
make latency-report
make live-artifacts
```

## Live Setup Notes

Set these environment variables when available:

```bash
export CS418_FFMPEG_PATH="$HOME/bin/ffmpeg"
export CS418_NODE_GPAC_DASH_DIR="/path/to/node-gpac-dash"
export CS418_RTMP_INPUT="rtmp://127.0.0.1/live/stream"
```

`make validate-env` reports what can be checked automatically. OBS, NGINX, modified node-gpac-dash, browser inspector checks, and latency measurements still require real manual validation.

`make live-artifacts` generates:

- `public/index.html`: dash.js low-latency player targeting `/dash/live.mpd`
- `configs/nginx/generated.conf`: local NGINX config serving the player and `/dash/` artifacts
