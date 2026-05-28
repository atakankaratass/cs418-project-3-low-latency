import { mkdirSync, writeFileSync } from "node:fs";

import { renderQrOverlayHtml } from "../src/live/qrOverlay.js";

const refreshMs = Number(process.env.CS418_QR_REFRESH_MS ?? 500);

if (!Number.isFinite(refreshMs) || refreshMs <= 0) {
  throw new Error("CS418_QR_REFRESH_MS must be a positive number");
}

mkdirSync("public", { recursive: true });
writeFileSync("public/qr-overlay.html", renderQrOverlayHtml({ refreshMs }));
console.log("Generated public/qr-overlay.html");
