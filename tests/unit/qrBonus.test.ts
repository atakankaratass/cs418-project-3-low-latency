import { describe, expect, test } from "vitest";

import { calculateQrLatencyMs, formatQrTimestampPayload } from "../../src/config/qrBonus.js";

describe("QR bonus timestamp helpers", () => {
  test("formats QR timestamp payload with the project prefix", () => {
    expect(formatQrTimestampPayload("2026-05-28T12:00:01.000Z")).toBe(
      "cs418-project3-ts=2026-05-28T12:00:01.000Z",
    );
  });

  test("calculates latency from decoded QR payload", () => {
    expect(
      calculateQrLatencyMs(
        "cs418-project3-ts=2026-05-28T12:00:01.000Z",
        "2026-05-28T12:00:05.250Z",
      ),
    ).toBe(4250);
  });
});
