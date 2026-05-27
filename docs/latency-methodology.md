# Latency Methodology

For each scenario, latency is measured 10-20 seconds after playback starts.

## Required Manual Method

1. Start the low-latency pipeline for the selected experiment row.
2. Wait for playback to start in the dash.js player.
3. Wait 10-20 seconds.
4. Read the current system clock time.
5. Read the wall-clock time embedded in the OBS video frame.
6. Subtract embedded video time from current system clock time.
7. Record the result in milliseconds with the matching `keyint`, `seg_duration`, and optional `frag_duration`.

## Output

- Raw manual rows: `docs/latency-measurements.csv`
- Report tables: `docs/latency-results.md`
- Plot-ready data: `docs/report-assets/plot-spec.json`

Do not fabricate latency values. Missing measurements must remain visibly incomplete.
