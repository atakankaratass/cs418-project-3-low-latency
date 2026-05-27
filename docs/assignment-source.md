# Assignment Source Summary

`Low Latency.docx` is the controlling source for CS 418 Project 3. This markdown file is a traceable summary only; if there is any conflict, the DOCX wins.

## Project Goal

Create a low-latency live streaming platform using the assignment's referenced low-latency DASH tutorial and required tools.

## Required Pipeline

- OBS is the media source.
- OBS embeds wall-clock time in the video so latency can be measured from capture to playback.
- OBS provides encoded media in real time to FFmpeg using RTMP.
- FFmpeg must be compiled from source even if another FFmpeg version is installed.
- FFmpeg must be modified in `libavformat/dashenc.c` to remove the temporary `.tmp` extension behavior needed for node-gpac-dash.
- FFmpeg packages the stream in low-latency DASH format using chunks and segments.
- The HTTP path uses NGINX plus the modified node-gpac-dash server.
- Playback uses dash.js.
- Correct setup should produce latency less than 5 seconds.

## Required Validation

- Confirm browser inspector requests show chunks arriving with chunked transfer encoding rather than complete segments only.
- Wireshark may be used instead of the browser inspector.
- Confirm the encoder is not lagging real time.
- If CPU load causes lag, reduce OBS resolution or quality.
- Do not proceed to experiments until the low-latency setup works.

## Segment Duration Experiment

At 30 fps, use these OBS `keyint` values and matching FFmpeg `seg_duration` values:

| keyint | seg_duration |
| ------ | ------------ |
| 30     | 1            |
| 60     | 2            |
| 90     | 3            |
| 120    | 4            |
| 150    | 5            |
| 180    | 6            |

For each scenario, measure latency 10-20 seconds after playback starts by subtracting the time embedded in the video from the current system clock time. Plot latency on the y-axis and `seg_duration` on the x-axis, then explain whether latency changes with `seg_duration`.

## Fragment Duration Experiment

Fix `keyint=120` and `seg_duration=4`. Use `-frag_duration <value> -frag_type duration` and test:

| frag_duration |
| ------------- |
| 0.033         |
| 0.066         |
| 0.1           |
| 0.2           |
| 0.5           |
| 1.0           |
| 2.0           |
| 4.0           |

For each scenario, measure latency and plot latency on the y-axis and `frag_duration` on the x-axis, then explain whether latency changes with `frag_duration`.

## Appendix A Requirements

- Follow the FFmpeg Compilation Guide until the FFmpeg header.
- Download and extract the latest FFmpeg release snapshot.
- Modify `~/ffmpeg_sources/ffmpeg/libavformat/dashenc.c` as shown in the assignment.
- Install or resolve missing packages such as `liblzma-dev`, `libunistring-dev`, and `libxml2-dev` where applicable.
- Add `--enable-demuxer=dash --enable-libxml2` to the FFmpeg build command.
- Use the compiled FFmpeg executable by full path, for example `$HOME/bin/ffmpeg`.
- Verify the FFmpeg output includes the required DASH parameters. The DOCX includes a screenshot with `--enable-demuxer=dash --enable-libxml2` underlined.

## Bonus

After core requirements are complete, implement the QR code bonus: generate a QR code containing the system clock time, embed it in the frame when encoding, read the QR code on the player side, and subtract it from the current system clock time for more accurate latency.
