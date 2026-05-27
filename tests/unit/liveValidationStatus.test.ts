import { describe, expect, test } from "vitest";

import { summarizeLiveValidationStatus } from "../../src/live/liveValidationStatus.js";

describe("live validation status", () => {
  test("marks modified FFmpeg ready only when Appendix A flags are present", () => {
    const status = summarizeLiveValidationStatus({
      ffmpegVersionOutput:
        "configuration: --prefix=/home/user/ffmpeg_build --enable-demuxer=dash --enable-libxml2",
      obsAppFound: true,
      nginxFound: true,
      nodeGpacDashDir: "/tmp/node-gpac-dash",
      browserInspectorChecked: false,
      baselineLatencyMs: undefined,
    });

    expect(status.modifiedFfmpegReady).toBe(true);
    expect(status.blockers).toContain(
      "Browser inspector chunked transfer check has not been recorded.",
    );
    expect(status.blockers).toContain("Baseline latency below 5000 ms has not been recorded.");
  });

  test("reports blockers without fabricating live validation", () => {
    const status = summarizeLiveValidationStatus({
      ffmpegVersionOutput:
        "configuration: --prefix=/opt/homebrew/Cellar/ffmpeg/8.1 --enable-libx264",
      obsAppFound: false,
      nginxFound: true,
      nodeGpacDashDir: undefined,
      browserInspectorChecked: false,
      baselineLatencyMs: 6200,
    });

    expect(status.modifiedFfmpegReady).toBe(false);
    expect(status.coreLiveReady).toBe(false);
    expect(status.blockers).toEqual([
      "Modified source-built FFmpeg with --enable-demuxer=dash --enable-libxml2 was not verified.",
      "OBS was not found or not recorded as installed.",
      "CS418_NODE_GPAC_DASH_DIR is not set to a modified node-gpac-dash checkout.",
      "Browser inspector chunked transfer check has not been recorded.",
      "Baseline latency is not below 5000 ms: 6200 ms.",
    ]);
  });
});
