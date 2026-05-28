import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

import { renderFfmpegEvidenceMarkdown } from "../src/live/ffmpegEvidence.js";

const ffmpegPath = process.env.CS418_FFMPEG_PATH ?? `${process.env.HOME ?? "~"}/bin/ffmpeg`;
const dashencPath =
  process.env.CS418_DASHENC_PATH ??
  `${process.env.HOME ?? "~"}/ffmpeg_sources/ffmpeg/libavformat/dashenc.c`;

const run = (args: string[]): string => {
  const result = spawnSync(ffmpegPath, args, { encoding: "utf8" });
  return `${result.stdout ?? ""}${result.stderr ?? ""}`;
};

const dashencPatchSnippet = (): string => {
  if (!existsSync(dashencPath)) {
    return `dashenc.c not found at ${dashencPath}`;
  }

  const content = readFileSync(dashencPath, "utf8");
  const marker = "remove .tmp extension in order to use node-gpac-dash";
  const activePatch = 'use_rename ? "%s" : "%s"';
  const markerIndex = content.indexOf(marker);
  const activePatchIndex = content.indexOf(activePatch);
  const snippetIndex = markerIndex >= 0 ? markerIndex : activePatchIndex;
  if (snippetIndex < 0) {
    return `dashenc.c found at ${dashencPath}, but the node-gpac-dash temp-path patch was not found`;
  }

  return content.slice(Math.max(0, snippetIndex - 160), snippetIndex + 260).trim();
};

const markdown = renderFfmpegEvidenceMarkdown({
  ffmpegPath,
  versionOutput: run(["-version"]),
  dashMuxerOutput: run(["-h", "muxer=dash"]),
  dashencPatchOutput: dashencPatchSnippet(),
});

mkdirSync("docs/report-assets", { recursive: true });
writeFileSync("docs/report-assets/ffmpeg-build-evidence.md", markdown);
console.log(markdown);
