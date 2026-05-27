# OBS Setup

OBS is the required media source for this assignment.

## Required Settings

- Add a visible wall-clock time overlay to the video frame.
- Send encoded media to FFmpeg using RTMP.
- Use 30 fps for the required keyint mapping.
- Keep encoder load low enough that OBS does not lag real time.
- If CPU load is too high, reduce OBS resolution or quality before measuring latency.

## Segment Experiment Keyint Values

| keyint | Meaning at 30 fps         |
| ------ | ------------------------- |
| 30     | key frame every 1 second  |
| 60     | key frame every 2 seconds |
| 90     | key frame every 3 seconds |
| 120    | key frame every 4 seconds |
| 150    | key frame every 5 seconds |
| 180    | key frame every 6 seconds |

Each OBS keyint value must be paired with the matching FFmpeg `seg_duration` value in `docs/experiment-matrix.md`.
