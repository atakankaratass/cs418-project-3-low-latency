import type { LatencyRecord } from "./latencyCsv.js";

export const renderLatencyMarkdown = (records: LatencyRecord[]): string => {
  const segmentRecords = records.filter((record) => record.experimentType === "segment");
  const fragmentRecords = records.filter((record) => record.experimentType === "fragment");

  if (records.length === 0) {
    return `# Latency Results

Real latency measurements are not measured yet. Do not replace this section with fabricated values.
`;
  }

  const segmentRows = segmentRecords
    .map(
      (record) =>
        `| ${record.keyint} | ${record.segDuration} | ${record.latencyMs} | ${record.notes} |`,
    )
    .join("\n");
  const fragmentRows = fragmentRecords
    .map(
      (record) =>
        `| ${record.keyint} | ${record.segDuration} | ${record.fragDuration ?? ""} | ${record.latencyMs} | ${record.notes} |`,
    )
    .join("\n");

  return `# Latency Results

## Segment Duration Results

| keyint | seg_duration | latency_ms | notes |
| --- | --- | --- | --- |
${segmentRows || "| not measured yet | not measured yet | not measured yet | not measured yet |"}

## Fragment Duration Results

| keyint | seg_duration | frag_duration | latency_ms | notes |
| --- | --- | --- | --- | --- |
${fragmentRows || "| not measured yet | not measured yet | not measured yet | not measured yet | not measured yet |"}
`;
};
