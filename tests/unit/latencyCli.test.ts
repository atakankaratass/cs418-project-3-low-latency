import { describe, expect, test } from "vitest";

import { parseLatencyRecordArgs } from "../../src/report/latencyCli.js";

describe("latency record CLI args", () => {
  test("parses flag-style manual latency measurements", () => {
    expect(
      parseLatencyRecordArgs([
        "--experiment",
        "fragment",
        "--keyint",
        "120",
        "--seg-duration",
        "4",
        "--frag-duration",
        "0.2",
        "--latency-ms",
        "6000",
        "--observed-time",
        "internet clock",
        "--video-time",
        "OBS overlay",
        "--notes",
        "stable no stalls",
      ]),
    ).toEqual({
      experimentType: "fragment",
      keyint: 120,
      segDuration: 4,
      fragDuration: 0.2,
      observedSystemTime: "internet clock",
      embeddedVideoTime: "OBS overlay",
      latencyMs: 6000,
      notes: "stable no stalls",
    });
  });
});
