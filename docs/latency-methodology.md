# Latency Methodology

For each scenario, latency is measured 10-20 seconds after playback starts.

The final successful below-5-second validation used reduced OBS output settings: `852x480`, `1200 kbps`, `30 fps`, and a `1s` keyframe interval for the `keyint=30`, `seg_duration=1` run. The recorded values were corrected by subtracting a 1-second clock offset found in the measurement setup. Larger segment and fragment settings were still recorded even when latency exceeded 5 seconds or playback showed stalls.

Most experiment rows record the manual reading as an explicit `latency_ms` value because the visible OBS overlay and current clock were read during the live run rather than captured as machine-parseable timestamps. Rows with literal clock strings preserve the detailed source observation when it was recorded. These values remain manual measurements and are not automatically recomputed by CI.

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
- Browser chunked-transfer evidence: `docs/report-assets/browser-chunked-transfer.png`

Do not fabricate latency values. Missing measurements must remain visibly incomplete.
