import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

import { summarizeLiveValidationStatus } from "../src/live/liveValidationStatus.js";

const run = (command: string, args: string[]): { found: boolean; output: string } => {
  const result = spawnSync(command, args, { encoding: "utf8" });

  return {
    found: result.status === 0,
    output: `${result.stdout ?? ""}${result.stderr ?? ""}`,
  };
};

const ffmpegPath = process.env.CS418_FFMPEG_PATH ?? "ffmpeg";
const ffmpeg = run(ffmpegPath, ["-version"]);
const nginx = run("nginx", ["-v"]);
const obsAppFound =
  existsSync("/Applications/OBS.app") || existsSync(process.env.CS418_OBS_APP_PATH ?? "");
const baselineLatencyMs = process.env.CS418_BASELINE_LATENCY_MS
  ? Number(process.env.CS418_BASELINE_LATENCY_MS)
  : undefined;

const status = summarizeLiveValidationStatus({
  ffmpegVersionOutput: ffmpeg.output,
  obsAppFound,
  nginxFound: nginx.found,
  nodeGpacDashDir: process.env.CS418_NODE_GPAC_DASH_DIR,
  browserInspectorChecked: process.env.CS418_BROWSER_CHUNKED_TRANSFER_CONFIRMED === "1",
  baselineLatencyMs,
});

const lines = [
  "# Live Validation Status",
  "",
  `- Modified FFmpeg ready: ${status.modifiedFfmpegReady ? "yes" : "no"}`,
  `- Core live validation ready: ${status.coreLiveReady ? "yes" : "no"}`,
  `- FFmpeg command checked: ${ffmpegPath}`,
  `- OBS found: ${obsAppFound ? "yes" : "no"}`,
  `- NGINX found: ${nginx.found ? "yes" : "no"}`,
  `- node-gpac-dash dir: ${process.env.CS418_NODE_GPAC_DASH_DIR ?? "not set"}`,
  `- Browser chunked transfer confirmed: ${process.env.CS418_BROWSER_CHUNKED_TRANSFER_CONFIRMED === "1" ? "yes" : "no"}`,
  `- Baseline latency ms: ${baselineLatencyMs ?? "not recorded"}`,
  "",
  "## Blockers",
  "",
  ...(status.blockers.length === 0 ? ["- none"] : status.blockers.map((blocker) => `- ${blocker}`)),
  "",
  "This file is a local status report only. It does not replace manual OBS, browser inspector, or latency validation.",
  "",
];

mkdirSync("docs/report-assets", { recursive: true });
writeFileSync("docs/report-assets/live-validation-status.md", lines.join("\n"));
console.log(lines.join("\n"));
