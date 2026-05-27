import { accessSync, constants, existsSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";

const checks: string[] = [];

if (!existsSync("node_modules")) {
  throw new Error("node_modules is missing. Run make install first.");
}
checks.push("node_modules present");

mkdirSync("output", { recursive: true });
accessSync("output", constants.W_OK);
checks.push("output directory writable");

const ffmpegPath = process.env.CS418_FFMPEG_PATH;
if (ffmpegPath) {
  accessSync(ffmpegPath, constants.X_OK);
  checks.push(`configured FFmpeg executable is accessible: ${ffmpegPath}`);
} else {
  checks.push("CS418_FFMPEG_PATH not set; live FFmpeg validation remains manual");
}

const nginx = spawnSync("nginx", ["-v"], { encoding: "utf8" });
checks.push(
  nginx.status === 0 ? "nginx available" : "nginx not found on PATH; install before live demo",
);

if (process.env.CS418_NODE_GPAC_DASH_DIR) {
  accessSync(process.env.CS418_NODE_GPAC_DASH_DIR, constants.R_OK);
  checks.push(`node-gpac-dash directory readable: ${process.env.CS418_NODE_GPAC_DASH_DIR}`);
} else {
  checks.push(
    "CS418_NODE_GPAC_DASH_DIR not set; modified node-gpac-dash validation remains manual",
  );
}

console.log(checks.map((check) => `- ${check}`).join("\n"));
