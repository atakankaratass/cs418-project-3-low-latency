# CS 418 Project 3 Final Report Draft

This draft must not be treated as final until live validation, latency measurements, screenshots, graphs, and SDK disclosure are complete.

## 1. Introduction

This project implements the low-latency live streaming workflow required by `Low Latency.docx`.

## 2. System Architecture

The required path is OBS to RTMP to modified FFmpeg to low-latency DASH chunks and segments to NGINX plus modified node-gpac-dash to dash.js playback.

## 3. FFmpeg Source Modification

The FFmpeg source build and `dashenc.c` modification are documented in `docs/ffmpeg-build.md`.

## 4. Setup And Live Validation

Live validation must prove playback latency is less than 5 seconds and browser inspector or Wireshark shows chunked transfer behavior.

Current implementation notes to include after evidence is collected:

- The serving path uses modified node-gpac-dash in `-chunk-media-segments` mode behind NGINX with proxy buffering disabled.
- During debugging, `seg_duration=4` and `keyint=120` produced repeatable dash.js waiting events at segment boundaries. Player logs showed `GapController` jumping approximately `0.1s`, so the symptom was a segment-boundary timeline gap rather than a missing stream.
- The smoother current live run uses `seg_duration=2`, `keyint=60`, `-ldash 1`, and `-frag_type every_frame`.
- The observed smooth playback is not a substitute for final evidence. Screenshots, browser inspector chunked-transfer proof, and wall-clock latency measurements still need to be recorded truthfully before this report is finalized.

## 5. Segment Duration Experiment

Results will be inserted from real `keyint` and `seg_duration` measurements.

## 6. Fragment Duration Experiment

Results will be inserted from real `frag_duration` measurements.

## 7. QR Bonus Measurement

The QR bonus will be implemented only after all core requirements are complete.

## 8. SDK And Open-Source Disclosure

The disclosure source is `docs/sdk-and-open-source-disclosure.md`.

## 9. Conclusion

The conclusion will be finalized after real validation and experiments.
