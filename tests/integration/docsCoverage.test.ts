import { readFileSync } from "node:fs";

import { describe, expect, test } from "vitest";

const read = (path: string): string => readFileSync(path, "utf8");

describe("required docs coverage", () => {
  test("assignment source summary covers the controlling DOCX requirements", () => {
    const content = read("docs/assignment-source.md");

    expect(content).toContain("Low Latency.docx");
    expect(content).toContain("OBS");
    expect(content).toContain("RTMP");
    expect(content).toContain("node-gpac-dash");
    expect(content).toContain("dash.js");
    expect(content).toContain("QR code");
  });

  test("streaming runbook documents live validation checks without faking them", () => {
    const content = read("docs/streaming-runbook.md");

    expect(content).toContain("chunked transfer");
    expect(content).toContain("Wireshark");
    expect(content).toContain("less than 5 seconds");
    expect(content).toContain("must not be faked");
  });
});
