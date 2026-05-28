import { describe, expect, test } from "vitest";

import { buildDashCommand } from "../../src/config/ffmpegDashCommand.js";

describe("FFmpeg DASH command templates", () => {
  test("builds a segment experiment command with RTMP input and DASH output", () => {
    const command = buildDashCommand({
      ffmpegPath: "$HOME/bin/ffmpeg",
      inputUrl: "rtmp://127.0.0.1/live/stream",
      outputManifest: "output/dash/live.mpd",
      segDuration: 4,
    });

    expect(command).toContain("$HOME/bin/ffmpeg");
    expect(command).toContain("-i rtmp://127.0.0.1/live/stream");
    expect(command).toContain("-f dash");
    expect(command).toContain("-ldash 1");
    expect(command).toContain("-frag_type every_frame");
    expect(command).toContain("-seg_duration 4");
    expect(command).toContain("output/dash/live.mpd");
    expect(command).toContain("-c:a aac");
    expect(command).toContain("-b:a 128k");
  });

  test("fragment duration experiment uses frag_type duration", () => {
    const command = buildDashCommand({
      ffmpegPath: "$HOME/bin/ffmpeg",
      inputUrl: "rtmp://127.0.0.1/live/stream",
      outputManifest: "output/dash/live.mpd",
      segDuration: 4,
      fragDuration: 0.033,
    });

    expect(command).toContain("-ldash 1");
    expect(command).toContain("-frag_duration 0.033");
    expect(command).toContain("-frag_type duration");
    expect(command).not.toContain("-frag_type every_frame");
  });
});
