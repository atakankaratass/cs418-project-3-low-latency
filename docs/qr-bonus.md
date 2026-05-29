# QR Bonus

The QR-code bonus is isolated from the core live-streaming path. Use it only after the required wall-clock latency and browser-inspector chunked-transfer evidence has been captured.

## Generate Overlay

Run:

```bash
make qr-overlay
```

This generates `public/qr-overlay.html`.

## OBS Setup

1. Keep the normal wall-clock overlay enabled for required core measurements.
2. Add an OBS Browser Source pointing to `http://127.0.0.1:8080/qr-overlay.html`.
3. Place the QR overlay where it does not cover the wall-clock overlay.
4. Start the stream normally.

## Payload And Measurement

- The QR payload format is `cs418-project3-ts=<ISO timestamp>`.
- Decode the QR code from a received video frame.
- Subtract the decoded timestamp from the current system clock.
- Record QR-based latency separately from the required wall-clock overlay measurements.
- Do not report QR-based latency unless the decode measurement was actually performed and recorded.
