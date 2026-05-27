import { buildDashCommand } from "../src/config/ffmpegDashCommand.js";
import { fragmentExperiments, segmentExperiments } from "../src/config/experimentMatrix.js";

const ffmpegPath = process.env.CS418_FFMPEG_PATH ?? "$HOME/bin/ffmpeg";
const inputUrl = process.env.CS418_RTMP_INPUT ?? "rtmp://127.0.0.1/live/stream";

console.log("# Segment experiment commands");
for (const row of segmentExperiments) {
  console.log(
    buildDashCommand({
      ffmpegPath,
      inputUrl,
      outputManifest: `output/dash/segment-${row.segDuration}/live.mpd`,
      segDuration: row.segDuration,
    }),
  );
}

console.log("# Fragment experiment commands");
for (const row of fragmentExperiments) {
  console.log(
    buildDashCommand({
      ffmpegPath,
      inputUrl,
      outputManifest: `output/dash/fragment-${row.fragDuration}/live.mpd`,
      segDuration: row.segDuration,
      fragDuration: row.fragDuration,
    }),
  );
}
