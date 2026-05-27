import { readFileSync } from "node:fs";

const requiredPhrases = [
  "Low Latency.docx",
  "OBS",
  "RTMP",
  "FFmpeg",
  "node-gpac-dash",
  "dash.js",
  "keyint",
  "seg_duration",
  "frag_duration",
  "QR code",
];

const content = readFileSync("docs/assignment-source.md", "utf8");
const missing = requiredPhrases.filter((phrase) => !content.includes(phrase));

if (missing.length > 0) {
  throw new Error(`Assignment source summary is missing: ${missing.join(", ")}`);
}

console.log("Assignment source coverage check passed.");
