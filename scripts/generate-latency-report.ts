import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import prettier from "prettier";

import { parseLatencyCsv } from "../src/report/latencyCsv.js";
import { renderLatencyMarkdown } from "../src/report/latencyMarkdown.js";
import { buildPlotSpecs } from "../src/report/plotSpec.js";

mkdirSync("docs/report-assets", { recursive: true });

const csvPath = "docs/latency-measurements.csv";
const records = existsSync(csvPath) ? parseLatencyCsv(readFileSync(csvPath, "utf8")) : [];

writeFileSync(
  "docs/latency-results.md",
  await prettier.format(renderLatencyMarkdown(records), { parser: "markdown" }),
);
writeFileSync(
  "docs/report-assets/plot-spec.json",
  await prettier.format(JSON.stringify(buildPlotSpecs(records), null, 2), { parser: "json" }),
);

console.log("Generated docs/latency-results.md and docs/report-assets/plot-spec.json");
