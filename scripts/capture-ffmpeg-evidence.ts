import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

import { renderFfmpegEvidenceMarkdown } from "../src/live/ffmpegEvidence.js";

const ffmpegPath = process.env.CS418_FFMPEG_PATH ?? `${process.env.HOME ?? "~"}/bin/ffmpeg`;

const run = (args: string[]): string => {
  const result = spawnSync(ffmpegPath, args, { encoding: "utf8" });
  return `${result.stdout ?? ""}${result.stderr ?? ""}`;
};

const markdown = renderFfmpegEvidenceMarkdown({
  ffmpegPath,
  versionOutput: run(["-version"]),
  dashMuxerOutput: run(["-h", "muxer=dash"]),
});

mkdirSync("docs/report-assets", { recursive: true });
writeFileSync("docs/report-assets/ffmpeg-build-evidence.md", markdown);
console.log(markdown);
