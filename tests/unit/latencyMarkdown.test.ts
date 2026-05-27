import { describe, expect, test } from "vitest";

import { renderLatencyMarkdown } from "../../src/report/latencyMarkdown.js";

describe("latency markdown", () => {
  test("keeps missing measurements visibly incomplete", () => {
    expect(renderLatencyMarkdown([])).toContain("not measured yet");
  });

  test("renders segment and fragment result tables", () => {
    const markdown = renderLatencyMarkdown([
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

    expect(markdown).toContain("## Segment Duration Results");
    expect(markdown).toContain("| 120 | 4 | 4250 | manual |");
    expect(markdown).toContain("## Fragment Duration Results");
    expect(markdown).toContain("| 120 | 4 | 0.5 | 2000 | manual |");
  });
});
