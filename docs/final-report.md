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
