# SDK And Open-Source Disclosure

## Tools And Libraries

- OBS: media source and wall-clock overlay composition.
- FFmpeg: RTMP input handling and low-latency DASH packaging after the required source modification.
- NGINX: HTTP delivery.
- node-gpac-dash: modified low-latency DASH serving path from the assignment tutorial.
- dash.js: browser DASH playback.
- Node.js and TypeScript: repository automation scripts.
- Vitest: automated tests for scripts and generated artifacts.
- ESLint and Prettier: code and documentation quality.
- Husky and lint-staged: local git hooks.

## Bonus Disclosure

- QR Code Generator for JavaScript (`qrcode-generator@1.4.4`, Kazuhiko Arase): vendored as `public/qrcode.bundle` to render the optional OBS Browser Source QR timestamp overlay without relying on a remote CDN during the live demo.
- The QR overlay is isolated from the core streaming pipeline and should be used only after the required core validation evidence has been captured.

## Local Patch Notes

- The local node-gpac-dash checkout was adjusted so a zero `chunks-per-segment` value does not terminate a segment response before any media data is sent.
- The local node-gpac-dash checkout also uses an EOF timeout while serving live-edge `.m4s` files so audio and video can finish independently after FFmpeg stops appending to each file.
- These changes are part of the live-serving setup and are documented in `docs/node-gpac-dash-local-patch.md`. They must be disclosed in the final report alongside the required FFmpeg `dashenc.c` source modification.
- The source-built FFmpeg evidence is recorded in `docs/report-assets/ffmpeg-build-evidence.md`.
