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
      browserInspectorEvidencePath: undefined,
      baselineLatencyMs: undefined,
      latencyMeasurementPath: undefined,
    });

    expect(status.modifiedFfmpegReady).toBe(true);
    expect(status.blockers).toContain(
      "Browser inspector chunked transfer check has not been recorded.",
    );
    expect(status.blockers).toContain(
      "Browser inspector evidence artifact path has not been recorded.",
    );
    expect(status.blockers).toContain("Baseline latency below 5000 ms has not been recorded.");
    expect(status.blockers).toContain("Latency measurement artifact path has not been recorded.");
  });

  test("reports blockers without fabricating live validation", () => {
    const status = summarizeLiveValidationStatus({
      ffmpegVersionOutput:
        "configuration: --prefix=/opt/homebrew/Cellar/ffmpeg/8.1 --enable-libx264",
      obsAppFound: false,
      nginxFound: true,
      nodeGpacDashDir: undefined,
      browserInspectorChecked: false,
      browserInspectorEvidencePath: undefined,
      baselineLatencyMs: 6200,
      latencyMeasurementPath: undefined,
    });

    expect(status.modifiedFfmpegReady).toBe(false);
    expect(status.coreLiveReady).toBe(false);
    expect(status.blockers).toEqual([
      "Modified source-built FFmpeg with --enable-demuxer=dash --enable-libxml2 was not verified.",
      "OBS was not found or not recorded as installed.",
      "CS418_NODE_GPAC_DASH_DIR is not set to a modified node-gpac-dash checkout.",
      "Browser inspector chunked transfer check has not been recorded.",
      "Browser inspector evidence artifact path has not been recorded.",
      "Baseline latency is not below 5000 ms: 6200 ms.",
      "Latency measurement artifact path has not been recorded.",
    ]);
  });

  test("requires durable evidence paths for manual browser and latency gates", () => {
    const status = summarizeLiveValidationStatus({
      ffmpegVersionOutput:
        "configuration: --prefix=/home/user/ffmpeg_build --enable-demuxer=dash --enable-libxml2",
      obsAppFound: true,
      nginxFound: true,
      nodeGpacDashDir: "/tmp/node-gpac-dash",
      browserInspectorChecked: true,
      browserInspectorEvidencePath: "docs/report-assets/browser-chunked-transfer.png",
      baselineLatencyMs: 4200,
      latencyMeasurementPath: "docs/latency-measurements.csv",
      browserInspectorEvidenceFound: true,
      latencyMeasurementFound: true,
    });

    expect(status.coreLiveReady).toBe(true);
    expect(status.blockers).toEqual([]);
  });

  test("does not clear manual gates for missing evidence files or invalid latency values", () => {
    const status = summarizeLiveValidationStatus({
      ffmpegVersionOutput:
        "configuration: --prefix=/home/user/ffmpeg_build --enable-demuxer=dash --enable-libxml2",
      obsAppFound: true,
      nginxFound: true,
      nodeGpacDashDir: "/tmp/node-gpac-dash",
      browserInspectorChecked: true,
      browserInspectorEvidencePath: "docs/report-assets/missing.png",
      browserInspectorEvidenceFound: false,
      baselineLatencyMs: Number.NaN,
      latencyMeasurementPath: "docs/latency-measurements.csv",
      latencyMeasurementFound: false,
    });

    expect(status.coreLiveReady).toBe(false);
    expect(status.blockers).toContain(
      "Browser inspector evidence artifact was not found: docs/report-assets/missing.png.",
    );
    expect(status.blockers).toContain(
      "Baseline latency must be a finite non-negative number below 5000 ms.",
    );
    expect(status.blockers).toContain(
      "Latency measurement artifact was not found: docs/latency-measurements.csv.",
    );
  });
});
