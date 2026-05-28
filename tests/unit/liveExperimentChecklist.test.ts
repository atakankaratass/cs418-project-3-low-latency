import { describe, expect, test } from "vitest";

import { renderLiveExperimentChecklist } from "../../src/live/liveExperimentChecklist.js";

describe("live experiment checklist renderer", () => {
  test("renders segment and fragment experiment commands with manual evidence gates", () => {
    const markdown = renderLiveExperimentChecklist({
      ffmpegPath: "$HOME/bin/ffmpeg",
      inputUrl: "rtmp://127.0.0.1/live/stream",
      outputRoot: "output/dash",
    });

    expect(markdown).toContain("# Live Experiment Checklist");
    expect(markdown).toContain("## Segment Duration Commands");
    expect(markdown).toContain("-g 60");
    expect(markdown).toContain("-seg_duration 2");
    expect(markdown).toContain("## Fragment Duration Commands");
    expect(markdown).toContain("-frag_duration 0.033 -frag_type duration");
    expect(markdown).toContain("Browser inspector gate: pending manual confirmation");
    expect(markdown).toContain("Wall-clock latency gate: pending manual measurement");
  });
});
