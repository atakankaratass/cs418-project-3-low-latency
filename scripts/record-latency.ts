import { appendFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";

import { formatLatencyCsvRow, type ExperimentType } from "../src/report/latencyCsv.js";

const [
  experimentType,
  keyint,
  segDuration,
  fragDuration,
  observedSystemTime,
  embeddedVideoTime,
  ...notesParts
] = process.argv.slice(2);

if (!experimentType || !keyint || !segDuration || !observedSystemTime || !embeddedVideoTime) {
  throw new Error(
    "Usage: npm run latency:record -- <segment|fragment> <keyint> <seg_duration> <frag_duration|-> <observed_iso> <embedded_iso> [notes]",
  );
}

mkdirSync("docs", { recursive: true });
const path = "docs/latency-measurements.csv";
if (!existsSync(path)) {
  writeFileSync(
    path,
    "experiment_type,keyint,seg_duration,frag_duration,observed_system_time,embedded_video_time,latency_ms,notes\n",
  );
}

appendFileSync(
  path,
  `${formatLatencyCsvRow({
    experimentType: experimentType as ExperimentType,
    keyint: Number(keyint),
    segDuration: Number(segDuration),
    fragDuration: fragDuration === "-" ? undefined : Number(fragDuration),
    observedSystemTime,
    embeddedVideoTime,
    notes: notesParts.join(" "),
  })}\n`,
);

console.log(`Recorded latency measurement in ${path}`);
