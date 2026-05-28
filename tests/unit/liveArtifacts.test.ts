import { describe, expect, test } from "vitest";

import { renderDashPlayerHtml } from "../../src/live/dashPlayer.js";
import { renderNginxConfig } from "../../src/live/nginxConfig.js";

describe("live run artifacts", () => {
  test("renders an NGINX config that serves player and DASH artifacts", () => {
    const config = renderNginxConfig({
      listenPort: 8080,
      projectRoot: "/project with spaces",
      dashRoot: "/project with spaces/output/dash",
    });

    expect(config).toContain("listen 8080;");
    expect(config).toContain('root "/project with spaces/public";');
    expect(config).toContain("location /dash/");
    expect(config).toContain("proxy_pass http://127.0.0.1:8000/;");
    expect(config).toContain("proxy_http_version 1.1;");
    expect(config).toContain("proxy_buffering off;");
    expect(config).toContain("add_header Access-Control-Allow-Origin *;");
    expect(config).not.toContain("include mime.types;");
  });

  test("renders a dash.js player for the low latency DASH manifest", () => {
    const html = renderDashPlayerHtml({ manifestPath: "/dash/live.mpd" });

    expect(html).toContain("https://cdn.dashjs.org/v4.7.4/dash.all.min.js");
    expect(html).toContain("/dash/live.mpd");
    expect(html).toContain("dashjs.MediaPlayer().create()");
    expect(html).toContain("liveDelay: 2");
    expect(html).toContain("dash.js applied settings:");
    expect(html).toContain("PLAYBACK_STALLED");
    expect(html).toContain("PLAYBACK_WAITING");
    expect(html).toContain("video.controls = true");
    expect(html).not.toMatch(/manifest:/i);
  });
});
