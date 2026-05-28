import { describe, expect, test } from "vitest";

import { renderFfmpegEvidenceMarkdown } from "../../src/live/ffmpegEvidence.js";

describe("FFmpeg evidence renderer", () => {
  test("marks source-built DASH support as verified when required flags and options are present", () => {
    const markdown = renderFfmpegEvidenceMarkdown({
      ffmpegPath: "/Users/example/bin/ffmpeg",
      versionOutput:
        "ffmpeg version N-123 configuration: --enable-libx264 --enable-demuxer=dash --enable-libxml2",
      dashMuxerOutput:
        "Muxer dash [DASH Muxer]\n  -ldash <boolean> enable low-latency dash\n  -streaming <boolean> enable streaming mode",
      dashencPatchOutput:
        '// remove .tmp extension in order to use node-gpac-dash\n// snprintf(os->temp_path, sizeof(os->temp_path), use_rename ? "%s.tmp" : "%s", os->full_path);\nsnprintf(os->temp_path, sizeof(os->temp_path), use_rename ? "%s" : "%s", os->full_path);',
    });

    expect(markdown).toContain("Modified FFmpeg Appendix evidence: verified");
    expect(markdown).toContain("`--enable-demuxer=dash`: yes");
    expect(markdown).toContain("`--enable-libxml2`: yes");
    expect(markdown).toContain("`-ldash`: yes");
    expect(markdown).toContain("`-streaming`: yes");
    expect(markdown).toContain("`dashenc.c` temp-path patch: yes");
    expect(markdown).toContain("## DASH muxer output excerpt");
    expect(markdown).toContain("## dashenc.c patch evidence");
  });

  test("keeps missing DASH evidence visibly incomplete", () => {
    const markdown = renderFfmpegEvidenceMarkdown({
      ffmpegPath: "ffmpeg",
      versionOutput: "ffmpeg version system configuration: --enable-libx264",
      dashMuxerOutput: "Unknown muxer dash",
      dashencPatchOutput:
        'snprintf(os->temp_path, sizeof(os->temp_path), use_rename ? "%s.tmp" : "%s", os->full_path);',
    });

    expect(markdown).toContain("Modified FFmpeg Appendix evidence: incomplete");
    expect(markdown).toContain("`--enable-demuxer=dash`: no");
    expect(markdown).toContain("`--enable-libxml2`: no");
    expect(markdown).toContain("`-ldash`: no");
    expect(markdown).toContain("`dashenc.c` temp-path patch: no");
    expect(markdown).toContain(
      "Do not claim DASH build readiness until this evidence is complete.",
    );
  });
});
