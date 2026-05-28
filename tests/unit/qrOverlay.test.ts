import { describe, expect, test } from "vitest";

import { renderQrOverlayHtml } from "../../src/live/qrOverlay.js";

describe("QR overlay renderer", () => {
  test("renders an OBS browser-source page that updates timestamp QR payloads", () => {
    const html = renderQrOverlayHtml({ refreshMs: 500 });

    expect(html).toContain("https://cdn.jsdelivr.net/npm/qrcode@1.5.4/build/qrcode.min.js");
    expect(html).toContain("cs418-project3-ts=");
    expect(html).toContain("setInterval(updateQr, 500)");
    expect(html).toContain("QRCode.toCanvas");
    expect(html).toContain("QR timestamp overlay");
  });
});
