import { describe, expect, test } from "vitest";

import { calculateQrLatencyMs, formatQrTimestampPayload } from "../../src/config/qrBonus.js";

describe("QR bonus helpers", () => {
  test("formats QR timestamp payloads as assignment-readable clock data", () => {
    expect(formatQrTimestampPayload("2026-05-28T12:00:01.000Z")).toBe(
      "cs418-project3-ts=2026-05-28T12:00:01.000Z",
    );
  });

  test("calculates QR latency from decoded payload and current time", () => {
    expect(
      calculateQrLatencyMs(
        "cs418-project3-ts=2026-05-28T12:00:01.000Z",
        "2026-05-28T12:00:03.500Z",
      ),
    ).toBe(2500);
  });
});
