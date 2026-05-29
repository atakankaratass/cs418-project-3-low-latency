import { describe, expect, test } from "vitest";

import { buildPlotSpecs } from "../../src/report/plotSpec.js";

describe("plot specs", () => {
  test("creates plot-ready data for required assignment graphs", () => {
    const specs = buildPlotSpecs([
      {
        experimentType: "segment",
        keyint: 120,
        segDuration: 4,
        observedSystemTime: "2026-05-28T12:00:05.250Z",
        embeddedVideoTime: "2026-05-28T12:00:01.000Z",
        latencyMs: 4250,
        notes: "manual",
      },
      {
        experimentType: "segment",
        keyint: 120,
        segDuration: 4,
        observedSystemTime: "2026-05-28T12:01:05.250Z",
        embeddedVideoTime: "2026-05-28T12:01:00.250Z",
        latencyMs: 5000,
        notes: "final selected run",
      },
      {
        experimentType: "fragment",
        keyint: 120,
        segDuration: 4,
        fragDuration: 0.5,
        observedSystemTime: "2026-05-28T12:00:03.000Z",
        embeddedVideoTime: "2026-05-28T12:00:01.000Z",
        latencyMs: 2000,
        notes: "manual",
      },
    ]);

    expect(specs.segment).toEqual({
      xLabel: "seg_duration",
      yLabel: "latency_ms",
      points: [[4, 5000]],
    });
    expect(specs.fragment).toEqual({
      xLabel: "frag_duration",
      yLabel: "latency_ms",
      points: [[0.5, 2000]],
    });
  });
});
