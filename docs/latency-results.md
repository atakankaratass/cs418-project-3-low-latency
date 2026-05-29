# Latency Results

## Segment Duration Results

| keyint | seg_duration | latency_ms | notes                                                                                                                                                                            |
| ------ | ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 60     | 2            | 7000       | stable uninterrupted playback; browser inspector screenshot saved with Transfer-Encoding chunked; latency adjusted for 1s clock offset to about 7 seconds, above 5s target       |
| 60     | 2            | 6000       | stable uninterrupted playback after dash.js liveDelay=2 refresh; browser chunked-transfer evidence already captured; adjusted latency still above 5s target                      |
| 60     | 2            | 5500       | stable uninterrupted playback with dash.js liveDelay=2 and DASH window_size=2; adjusted latency slightly above 5s target                                                         |
| 30     | 1            | 4000       | below 5s after refresh; initial page load stalled with BUFFER_EMPTY/PLAYBACK_WAITING and required refresh; adjusted playback latency was about 4s                                |
| 30     | 1            | 4000       | foreground playback observed stable for 1-2 minutes at about 4s adjusted latency; switching tabs/windows can trigger playback waiting, then dash.js live catchup returns near 4s |
| 90     | 3            | 5500       | foreground playback stable with no stalls; adjusted latency slightly above 5s target                                                                                             |
| 120    | 4            | 5500       | foreground playback stable with no stalls; adjusted latency above 5s target                                                                                                      |
| 150    | 5            | 7000       | above 5s target; adjusted latency about 7s                                                                                                                                       |
| 180    | 6            | 7500       | foreground playback stable with no stalls; adjusted latency above 5s target                                                                                                      |
| 30     | 1            | 4000       | low resolution OBS output 852x480 bicubic, bitrate 1200 kbps, keyframe interval 1s; foreground playback no visible stalls; adjusted latency below 5s target                      |

## Fragment Duration Results

| keyint | seg_duration | frag_duration | latency_ms | notes                                                                                                                                                                                                   |
| ------ | ------------ | ------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 120    | 4            | 0.033         | 5000       | low resolution OBS output 852x480, bitrate 1200 kbps, keyframe interval 4s; foreground playback stable with no stalls; adjusted latency near 5s target                                                  |
| 120    | 4            | 0.066         | 5500       | low resolution OBS output 852x480, bitrate 1200 kbps, keyframe interval 4s; foreground playback stable with no stalls; adjusted latency above 5s target                                                 |
| 120    | 4            | 0.1           | 5500       | low resolution OBS output 852x480, bitrate 1200 kbps, keyframe interval 4s; foreground playback stable with no stalls; adjusted latency above 5s target                                                 |
| 120    | 4            | 0.2           | 5500       | low resolution OBS output 852x480, bitrate 1200 kbps, keyframe interval 4s; foreground playback stable with no stalls; adjusted latency above 5s target                                                 |
| 120    | 4            | 0.5           | 6000       | low resolution OBS output 852x480, bitrate 1200 kbps, keyframe interval 4s; foreground playback stable with no stalls; adjusted latency above 5s target                                                 |
| 120    | 4            | 1             | 6000       | low resolution OBS output 852x480, bitrate 1200 kbps, keyframe interval 4s; repeated PLAYBACK_WAITING roughly every 4s; playback not stable; adjusted latency above 5s target                           |
| 120    | 4            | 2             | 6000       | low resolution OBS output 852x480, bitrate 1200 kbps, keyframe interval 4s; repeated PLAYBACK_WAITING and GapController jumps; playback not stable; adjusted latency above 5s target                    |
| 120    | 4            | 4             | 9000       | low resolution OBS output 852x480, bitrate 1200 kbps, keyframe interval 4s; repeated audio BUFFER_EMPTY/PLAYBACK_WAITING and GapController jumps; playback not stable; adjusted latency above 5s target |
