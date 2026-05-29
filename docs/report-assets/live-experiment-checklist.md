# Live Experiment Checklist

These commands are generated from the assignment experiment matrix. They do not replace manual OBS, browser inspector, or wall-clock latency validation.

## Manual Evidence Gates

- Browser inspector gate: confirmed for DASH media segment responses; screenshot evidence is saved as `docs/report-assets/browser-chunked-transfer.png`.
- Wall-clock latency gate: completed from the OBS overlay and system clock; recorded measurements are in `docs/latency-measurements.csv`.

## Segment Duration Commands

### keyint=30, seg_duration=1

```bash
$HOME/bin/ffmpeg -fflags nobuffer -flags low_delay -f flv -listen 1 -i rtmp://127.0.0.1/live/stream -c:v libx264 -g 30 -keyint_min 30 -sc_threshold 0 -bf 0 -tune zerolatency -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 128k -f dash -ldash 1 -streaming 1 -use_template 1 -use_timeline 0 -utc_timing_url 'https://time.akamai.com/?iso' -window_size 2 -extra_window_size 2 -remove_at_exit 0 -seg_duration 1 -frag_type every_frame output/dash/segment-1/live.mpd
```

### keyint=60, seg_duration=2

```bash
$HOME/bin/ffmpeg -fflags nobuffer -flags low_delay -f flv -listen 1 -i rtmp://127.0.0.1/live/stream -c:v libx264 -g 60 -keyint_min 60 -sc_threshold 0 -bf 0 -tune zerolatency -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 128k -f dash -ldash 1 -streaming 1 -use_template 1 -use_timeline 0 -utc_timing_url 'https://time.akamai.com/?iso' -window_size 2 -extra_window_size 2 -remove_at_exit 0 -seg_duration 2 -frag_type every_frame output/dash/segment-2/live.mpd
```

### keyint=90, seg_duration=3

```bash
$HOME/bin/ffmpeg -fflags nobuffer -flags low_delay -f flv -listen 1 -i rtmp://127.0.0.1/live/stream -c:v libx264 -g 90 -keyint_min 90 -sc_threshold 0 -bf 0 -tune zerolatency -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 128k -f dash -ldash 1 -streaming 1 -use_template 1 -use_timeline 0 -utc_timing_url 'https://time.akamai.com/?iso' -window_size 2 -extra_window_size 2 -remove_at_exit 0 -seg_duration 3 -frag_type every_frame output/dash/segment-3/live.mpd
```

### keyint=120, seg_duration=4

```bash
$HOME/bin/ffmpeg -fflags nobuffer -flags low_delay -f flv -listen 1 -i rtmp://127.0.0.1/live/stream -c:v libx264 -g 120 -keyint_min 120 -sc_threshold 0 -bf 0 -tune zerolatency -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 128k -f dash -ldash 1 -streaming 1 -use_template 1 -use_timeline 0 -utc_timing_url 'https://time.akamai.com/?iso' -window_size 2 -extra_window_size 2 -remove_at_exit 0 -seg_duration 4 -frag_type every_frame output/dash/segment-4/live.mpd
```

### keyint=150, seg_duration=5

```bash
$HOME/bin/ffmpeg -fflags nobuffer -flags low_delay -f flv -listen 1 -i rtmp://127.0.0.1/live/stream -c:v libx264 -g 150 -keyint_min 150 -sc_threshold 0 -bf 0 -tune zerolatency -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 128k -f dash -ldash 1 -streaming 1 -use_template 1 -use_timeline 0 -utc_timing_url 'https://time.akamai.com/?iso' -window_size 2 -extra_window_size 2 -remove_at_exit 0 -seg_duration 5 -frag_type every_frame output/dash/segment-5/live.mpd
```

### keyint=180, seg_duration=6

```bash
$HOME/bin/ffmpeg -fflags nobuffer -flags low_delay -f flv -listen 1 -i rtmp://127.0.0.1/live/stream -c:v libx264 -g 180 -keyint_min 180 -sc_threshold 0 -bf 0 -tune zerolatency -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 128k -f dash -ldash 1 -streaming 1 -use_template 1 -use_timeline 0 -utc_timing_url 'https://time.akamai.com/?iso' -window_size 2 -extra_window_size 2 -remove_at_exit 0 -seg_duration 6 -frag_type every_frame output/dash/segment-6/live.mpd
```

## Fragment Duration Commands

### frag_duration=0.033

```bash
$HOME/bin/ffmpeg -fflags nobuffer -flags low_delay -f flv -listen 1 -i rtmp://127.0.0.1/live/stream -c:v libx264 -g 120 -keyint_min 120 -sc_threshold 0 -bf 0 -tune zerolatency -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 128k -f dash -ldash 1 -streaming 1 -use_template 1 -use_timeline 0 -utc_timing_url 'https://time.akamai.com/?iso' -window_size 2 -extra_window_size 2 -remove_at_exit 0 -seg_duration 4 -frag_duration 0.033 -frag_type duration output/dash/fragment-0.033/live.mpd
```

### frag_duration=0.066

```bash
$HOME/bin/ffmpeg -fflags nobuffer -flags low_delay -f flv -listen 1 -i rtmp://127.0.0.1/live/stream -c:v libx264 -g 120 -keyint_min 120 -sc_threshold 0 -bf 0 -tune zerolatency -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 128k -f dash -ldash 1 -streaming 1 -use_template 1 -use_timeline 0 -utc_timing_url 'https://time.akamai.com/?iso' -window_size 2 -extra_window_size 2 -remove_at_exit 0 -seg_duration 4 -frag_duration 0.066 -frag_type duration output/dash/fragment-0.066/live.mpd
```

### frag_duration=0.1

```bash
$HOME/bin/ffmpeg -fflags nobuffer -flags low_delay -f flv -listen 1 -i rtmp://127.0.0.1/live/stream -c:v libx264 -g 120 -keyint_min 120 -sc_threshold 0 -bf 0 -tune zerolatency -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 128k -f dash -ldash 1 -streaming 1 -use_template 1 -use_timeline 0 -utc_timing_url 'https://time.akamai.com/?iso' -window_size 2 -extra_window_size 2 -remove_at_exit 0 -seg_duration 4 -frag_duration 0.1 -frag_type duration output/dash/fragment-0.1/live.mpd
```

### frag_duration=0.2

```bash
$HOME/bin/ffmpeg -fflags nobuffer -flags low_delay -f flv -listen 1 -i rtmp://127.0.0.1/live/stream -c:v libx264 -g 120 -keyint_min 120 -sc_threshold 0 -bf 0 -tune zerolatency -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 128k -f dash -ldash 1 -streaming 1 -use_template 1 -use_timeline 0 -utc_timing_url 'https://time.akamai.com/?iso' -window_size 2 -extra_window_size 2 -remove_at_exit 0 -seg_duration 4 -frag_duration 0.2 -frag_type duration output/dash/fragment-0.2/live.mpd
```

### frag_duration=0.5

```bash
$HOME/bin/ffmpeg -fflags nobuffer -flags low_delay -f flv -listen 1 -i rtmp://127.0.0.1/live/stream -c:v libx264 -g 120 -keyint_min 120 -sc_threshold 0 -bf 0 -tune zerolatency -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 128k -f dash -ldash 1 -streaming 1 -use_template 1 -use_timeline 0 -utc_timing_url 'https://time.akamai.com/?iso' -window_size 2 -extra_window_size 2 -remove_at_exit 0 -seg_duration 4 -frag_duration 0.5 -frag_type duration output/dash/fragment-0.5/live.mpd
```

### frag_duration=1

```bash
$HOME/bin/ffmpeg -fflags nobuffer -flags low_delay -f flv -listen 1 -i rtmp://127.0.0.1/live/stream -c:v libx264 -g 120 -keyint_min 120 -sc_threshold 0 -bf 0 -tune zerolatency -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 128k -f dash -ldash 1 -streaming 1 -use_template 1 -use_timeline 0 -utc_timing_url 'https://time.akamai.com/?iso' -window_size 2 -extra_window_size 2 -remove_at_exit 0 -seg_duration 4 -frag_duration 1 -frag_type duration output/dash/fragment-1/live.mpd
```

### frag_duration=2

```bash
$HOME/bin/ffmpeg -fflags nobuffer -flags low_delay -f flv -listen 1 -i rtmp://127.0.0.1/live/stream -c:v libx264 -g 120 -keyint_min 120 -sc_threshold 0 -bf 0 -tune zerolatency -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 128k -f dash -ldash 1 -streaming 1 -use_template 1 -use_timeline 0 -utc_timing_url 'https://time.akamai.com/?iso' -window_size 2 -extra_window_size 2 -remove_at_exit 0 -seg_duration 4 -frag_duration 2 -frag_type duration output/dash/fragment-2/live.mpd
```

### frag_duration=4

```bash
$HOME/bin/ffmpeg -fflags nobuffer -flags low_delay -f flv -listen 1 -i rtmp://127.0.0.1/live/stream -c:v libx264 -g 120 -keyint_min 120 -sc_threshold 0 -bf 0 -tune zerolatency -preset veryfast -pix_fmt yuv420p -c:a aac -b:a 128k -f dash -ldash 1 -streaming 1 -use_template 1 -use_timeline 0 -utc_timing_url 'https://time.akamai.com/?iso' -window_size 2 -extra_window_size 2 -remove_at_exit 0 -seg_duration 4 -frag_duration 4 -frag_type duration output/dash/fragment-4/live.mpd
```
