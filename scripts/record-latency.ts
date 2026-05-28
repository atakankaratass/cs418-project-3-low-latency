import { appendFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";

import { parseLatencyRecordArgs } from "../src/report/latencyCli.js";
import { formatLatencyCsvRow } from "../src/report/latencyCsv.js";

const record = parseLatencyRecordArgs(process.argv.slice(2));

mkdirSync("docs", { recursive: true });
const path = "docs/latency-measurements.csv";
if (!existsSync(path)) {
  writeFileSync(
    path,
    "experiment_type,keyint,seg_duration,frag_duration,observed_system_time,embedded_video_time,latency_ms,notes\n",
  );
}

appendFileSync(path, `${formatLatencyCsvRow(record)}\n`);

console.log(`Recorded latency measurement in ${path}`);
