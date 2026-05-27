import { writeFileSync } from "node:fs";

const content = `# QR Bonus Plan

This bonus is implemented only after the core Low Latency assignment is complete.

1. Generate a QR code payload with \`cs418-project3-ts=<ISO timestamp>\`.
2. Embed that QR code in the video frame during OBS composition or FFmpeg filtering.
3. Decode the QR code on the player side.
4. Subtract the decoded timestamp from the current system clock.
5. Record QR-based latency separately from the required wall-clock overlay measurements.
`;

writeFileSync("docs/qr-bonus.md", content);
console.log("Generated docs/qr-bonus.md");
