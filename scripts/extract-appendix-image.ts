import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

mkdirSync("docs/reference", { recursive: true });

const unzip = spawnSync("unzip", ["-p", "Low Latency.docx", "word/media/image1.png"], {
  encoding: "buffer",
});

if (unzip.status !== 0 || unzip.stdout.length === 0) {
  throw new Error("Could not extract Appendix A image from Low Latency.docx");
}

writeFileSync("docs/reference/appendix-a-dash-options.png", unzip.stdout);

if (!existsSync("docs/reference/appendix-a-dash-options.png")) {
  throw new Error("Appendix A image extraction did not produce the expected file");
}

console.log("Extracted docs/reference/appendix-a-dash-options.png");
