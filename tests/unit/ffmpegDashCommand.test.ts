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
    expect(command).toContain("-seg_duration 4");
    expect(command).toContain("output/dash/live.mpd");
  });

  test("adds fragment duration options for chunk duration experiments", () => {
    const command = buildDashCommand({
      ffmpegPath: "$HOME/bin/ffmpeg",
      inputUrl: "rtmp://127.0.0.1/live/stream",
      outputManifest: "output/dash/live.mpd",
      segDuration: 4,
      fragDuration: 0.033,
    });

    expect(command).toContain("-frag_duration 0.033");
    expect(command).toContain("-frag_type duration");
  });
});
