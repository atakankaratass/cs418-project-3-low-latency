import { mkdirSync, writeFileSync } from "node:fs";

import { renderLiveExperimentChecklist } from "../src/live/liveExperimentChecklist.js";

const markdown = renderLiveExperimentChecklist({
  ffmpegPath: process.env.CS418_FFMPEG_PATH ?? "$HOME/bin/ffmpeg",
  inputUrl: process.env.CS418_RTMP_INPUT ?? "rtmp://127.0.0.1/live/stream",
  outputRoot: process.env.CS418_DASH_OUTPUT_ROOT ?? "output/dash",
});

mkdirSync("docs/report-assets", { recursive: true });
writeFileSync("docs/report-assets/live-experiment-checklist.md", markdown);
console.log("Generated docs/report-assets/live-experiment-checklist.md");
