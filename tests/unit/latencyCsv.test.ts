import { describe, expect, test } from "vitest";

import { calculateLatencyMs, formatLatencyCsvRow } from "../../src/report/latencyCsv.js";

describe("latency CSV helpers", () => {
  test("calculates latency from system and embedded timestamps", () => {
    expect(calculateLatencyMs("2026-05-28T12:00:05.250Z", "2026-05-28T12:00:01.000Z")).toBe(4250);
  });

  test("formats manual measurement records without inventing missing frag duration", () => {
    expect(
      formatLatencyCsvRow({
        experimentType: "segment",
        keyint: 120,
        segDuration: 4,
        observedSystemTime: "2026-05-28T12:00:05.250Z",
        embeddedVideoTime: "2026-05-28T12:00:01.000Z",
        notes: "manual wall-clock reading",
      }),
    ).toBe(
      "segment,120,4,,2026-05-28T12:00:05.250Z,2026-05-28T12:00:01.000Z,4250,manual wall-clock reading",
    );
  });
});
