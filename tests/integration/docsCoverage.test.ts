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
    expect(content).toContain("Start FFmpeg packaging");
    expect(content).toContain("Start OBS streaming");
    expect(content.indexOf("Start FFmpeg packaging")).toBeLessThan(
      content.indexOf("Start OBS streaming"),
    );
  });

  test("FFmpeg build guide covers Appendix A source-build requirements", () => {
    const content = read("docs/ffmpeg-build.md");

    expect(content).toContain("https://ffmpeg.org/releases/ffmpeg-snapshot.tar.bz2");
    expect(content).toContain("~/ffmpeg_sources/ffmpeg/libavformat/dashenc.c");
    expect(content).toContain('use_rename ? "%s" : "%s"');
    expect(content).toContain("liblzma-dev libunistring-dev libxml2-dev");
    expect(content).toContain("--enable-demuxer=dash --enable-libxml2");
    expect(content).toContain("$HOME/bin/ffmpeg -h muxer=dash");
  });

  test("CI runs the non-live validation generators used by the local gate", () => {
    const content = read(".github/workflows/ci.yml");

    expect(content).toContain("npm run validate:env");
    expect(content).toContain("npm run experiment:matrix");
    expect(content).toContain("npm run latency:report");
  });
});
