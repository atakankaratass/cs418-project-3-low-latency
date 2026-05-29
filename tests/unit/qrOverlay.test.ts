import { describe, expect, test } from "vitest";

import { renderQrOverlayHtml } from "../../src/live/qrOverlay.js";

describe("QR overlay renderer", () => {
  test("renders an OBS browser-source page that updates timestamp QR payloads", () => {
    const html = renderQrOverlayHtml({ refreshMs: 500 });

    expect(html).toContain("/qrcode.bundle");
    expect(html).not.toContain("cdn.jsdelivr.net");
    expect(html).toContain("cs418-project3-ts=");
    expect(html).toContain("setInterval(updateQr, 500)");
    expect(html).toContain('qrcode(0, "M")');
    expect(html).toContain("qr.addData(payload)");
    expect(html).toContain("QR timestamp overlay");
  });
});
