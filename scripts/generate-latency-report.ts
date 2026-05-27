import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

import { parseLatencyCsv } from "../src/report/latencyCsv.js";
import { renderLatencyMarkdown } from "../src/report/latencyMarkdown.js";
import { buildPlotSpecs } from "../src/report/plotSpec.js";

mkdirSync("docs/report-assets", { recursive: true });

const csvPath = "docs/latency-measurements.csv";
const records = existsSync(csvPath) ? parseLatencyCsv(readFileSync(csvPath, "utf8")) : [];

writeFileSync("docs/latency-results.md", renderLatencyMarkdown(records));
writeFileSync(
  "docs/report-assets/plot-spec.json",
  `${JSON.stringify(buildPlotSpecs(records), null, 2)}\n`,
);

console.log("Generated docs/latency-results.md and docs/report-assets/plot-spec.json");
