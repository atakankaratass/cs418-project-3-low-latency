# Latency Results

## Segment Duration Results

| keyint | seg_duration | latency_ms | notes                                                                                                                                                                            |
| ------ | ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 60     | 2            | 8000       | stable uninterrupted playback; browser inspector screenshot saved with Transfer-Encoding chunked; latency estimated from internet clock site at about 8 seconds, above 5s target |
| 60     | 2            | 7000       | stable uninterrupted playback after dash.js liveDelay=2 refresh; browser chunked-transfer evidence already captured; still above 5s target                                       |
| 60     | 2            | 6000       | stable uninterrupted playback with dash.js liveDelay=2 and DASH window_size=2; still above 5s target                                                                             |
| 30     | 1            | 4500       | below 5s after refresh; initial page load stalled with BUFFER_EMPTY/PLAYBACK_WAITING and required refresh; playback at measurement was about 4.5s                                |
| 30     | 1            | 4500       | foreground playback observed stable for 1-2 minutes at about 4.5s latency; switching tabs/windows can trigger playback waiting, then dash.js live catchup returns near 4.5s      |
| 90     | 3            | 5500       | foreground playback stable with no stalls; above 5s target                                                                                                                       |
| 120    | 4            | 6500       | foreground playback stable with no stalls; above 5s target                                                                                                                       |
| 150    | 5            | 8000       | above 5s target; user reported about 8s latency                                                                                                                                  |
| 180    | 6            | 8500       | foreground playback stable with no stalls; above 5s target                                                                                                                       |
| 30     | 1            | 4500       | low resolution OBS output 852x480 bicubic, bitrate 1200 kbps, keyframe interval 1s; screenshot evidence provided; foreground playback no visible stalls; below 5s target         |

## Fragment Duration Results

| keyint | seg_duration | frag_duration | latency_ms | notes                                                                                                                                                                                  |
| ------ | ------------ | ------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 120    | 4            | 0.033         | 6500       | low resolution OBS output 852x480, bitrate 1200 kbps, keyframe interval 4s; foreground playback stable with no stalls; above 5s target                                                 |
| 120    | 4            | 0.066         | 6500       | low resolution OBS output 852x480, bitrate 1200 kbps, keyframe interval 4s; foreground playback stable with no stalls; above 5s target                                                 |
| 120    | 4            | 0.1           | 6500       | low resolution OBS output 852x480, bitrate 1200 kbps, keyframe interval 4s; foreground playback stable with no stalls; above 5s target                                                 |
| 120    | 4            | 0.2           | 6000       | low resolution OBS output 852x480, bitrate 1200 kbps, keyframe interval 4s; foreground playback stable with no stalls; above 5s target                                                 |
| 120    | 4            | 0.5           | 7000       | low resolution OBS output 852x480, bitrate 1200 kbps, keyframe interval 4s; foreground playback stable with no stalls; above 5s target                                                 |
| 120    | 4            | 1             | 7000       | low resolution OBS output 852x480, bitrate 1200 kbps, keyframe interval 4s; repeated PLAYBACK_WAITING roughly every 4s; playback not stable; above 5s target                           |
| 120    | 4            | 2             | 7000       | low resolution OBS output 852x480, bitrate 1200 kbps, keyframe interval 4s; repeated PLAYBACK_WAITING and GapController jumps; playback not stable; above 5s target                    |
| 120    | 4            | 4             | 10000      | low resolution OBS output 852x480, bitrate 1200 kbps, keyframe interval 4s; repeated audio BUFFER_EMPTY/PLAYBACK_WAITING and GapController jumps; playback not stable; above 5s target |
