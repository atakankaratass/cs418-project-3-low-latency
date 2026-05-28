import { describe, expect, test } from "vitest";

import {
  calculateLatencyMs,
  formatLatencyCsvRow,
  parseLatencyCsv,
} from "../../src/report/latencyCsv.js";

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

  test("escapes and parses notes containing commas and quotes", () => {
    const row = formatLatencyCsvRow({
      experimentType: "segment",
      keyint: 60,
      segDuration: 2,
      observedSystemTime: "2026-05-28T12:00:04.000Z",
      embeddedVideoTime: "2026-05-28T12:00:00.000Z",
      notes: 'stable, no stalls, "smooth" playback',
    });

    expect(row).toBe(
      'segment,60,2,,2026-05-28T12:00:04.000Z,2026-05-28T12:00:00.000Z,4000,"stable, no stalls, ""smooth"" playback"',
    );
    expect(
      parseLatencyCsv(
        `experiment_type,keyint,seg_duration,frag_duration,observed_system_time,embedded_video_time,latency_ms,notes\n${row}`,
      ),
    ).toEqual([
      {
        experimentType: "segment",
        keyint: 60,
        segDuration: 2,
        fragDuration: undefined,
        observedSystemTime: "2026-05-28T12:00:04.000Z",
        embeddedVideoTime: "2026-05-28T12:00:00.000Z",
        latencyMs: 4000,
        notes: 'stable, no stalls, "smooth" playback',
      },
    ]);
  });

  test("rejects notes with newlines so one measurement stays one CSV row", () => {
    expect(() =>
      formatLatencyCsvRow({
        experimentType: "segment",
        keyint: 60,
        segDuration: 2,
        observedSystemTime: "2026-05-28T12:00:04.000Z",
        embeddedVideoTime: "2026-05-28T12:00:00.000Z",
        notes: "stable\nsecond line",
      }),
    ).toThrow("Latency CSV fields must not contain newlines");
  });
});
