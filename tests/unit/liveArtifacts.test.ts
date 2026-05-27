import { describe, expect, test } from "vitest";

import { renderDashPlayerHtml } from "../../src/live/dashPlayer.js";
import { renderNginxConfig } from "../../src/live/nginxConfig.js";

describe("live run artifacts", () => {
  test("renders an NGINX config that serves player and DASH artifacts", () => {
    const config = renderNginxConfig({
      listenPort: 8080,
      projectRoot: "/project",
      dashRoot: "/project/output/dash",
    });

    expect(config).toContain("listen 8080;");
    expect(config).toContain("root /project/public;");
    expect(config).toContain("location /dash/");
    expect(config).toContain("alias /project/output/dash/");
    expect(config).toContain("add_header Access-Control-Allow-Origin *;");
  });

  test("renders a dash.js player for the low latency DASH manifest", () => {
    const html = renderDashPlayerHtml({ manifestPath: "/dash/live.mpd" });

    expect(html).toContain("https://cdn.dashjs.org/latest/dash.all.min.js");
    expect(html).toContain("/dash/live.mpd");
    expect(html).toContain("dashjs.MediaPlayer().create()");
    expect(html).toContain("lowLatencyEnabled");
    expect(html).toContain("video.controls = true");
  });
});
