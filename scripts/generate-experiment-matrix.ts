import { mkdirSync, writeFileSync } from "node:fs";

import { renderExperimentMatrixMarkdown } from "../src/config/experimentMatrix.js";

mkdirSync("docs", { recursive: true });
writeFileSync("docs/experiment-matrix.md", renderExperimentMatrixMarkdown());
console.log("Generated docs/experiment-matrix.md");
