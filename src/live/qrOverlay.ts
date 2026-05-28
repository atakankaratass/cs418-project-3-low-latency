export type QrOverlayOptions = {
  refreshMs: number;
};

export const renderQrOverlayHtml = (options: QrOverlayOptions): string => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CS 418 QR timestamp overlay</title>
    <style>
      html, body { margin: 0; background: transparent; overflow: hidden; }
      #wrap { display: inline-flex; align-items: center; gap: 8px; padding: 8px; background: rgba(0, 0, 0, 0.72); color: white; font-family: system-ui, sans-serif; border-radius: 8px; }
      #qr { width: 132px; height: 132px; background: white; }
      #label { font-size: 18px; line-height: 1.25; text-shadow: 0 1px 2px black; }
      #payload { font-size: 12px; opacity: 0.85; max-width: 300px; overflow-wrap: anywhere; }
    </style>
  </head>
  <body>
    <div id="wrap" aria-label="QR timestamp overlay">
      <canvas id="qr" width="132" height="132"></canvas>
      <div>
        <div id="label">QR timestamp overlay</div>
        <div id="payload"></div>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.4/build/qrcode.min.js"></script>
    <script>
      const prefix = "cs418-project3-ts=";
      const canvas = document.getElementById("qr");
      const payloadLabel = document.getElementById("payload");

      function updateQr() {
        const payload = prefix + new Date().toISOString();
        payloadLabel.textContent = payload;
        QRCode.toCanvas(canvas, payload, { margin: 1, width: 132, errorCorrectionLevel: "M" });
      }

      updateQr();
      setInterval(updateQr, ${options.refreshMs});
    </script>
  </body>
</html>
`;
