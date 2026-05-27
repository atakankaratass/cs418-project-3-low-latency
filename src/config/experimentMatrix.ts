export type SegmentExperiment = {
  keyint: number;
  segDuration: number;
};

export type FragmentExperiment = SegmentExperiment & {
  fragDuration: number;
};

export const segmentExperiments: SegmentExperiment[] = [
  { keyint: 30, segDuration: 1 },
  { keyint: 60, segDuration: 2 },
  { keyint: 90, segDuration: 3 },
  { keyint: 120, segDuration: 4 },
  { keyint: 150, segDuration: 5 },
  { keyint: 180, segDuration: 6 },
];

export const fragmentExperiments: FragmentExperiment[] = [
  { keyint: 120, segDuration: 4, fragDuration: 0.033 },
  { keyint: 120, segDuration: 4, fragDuration: 0.066 },
  { keyint: 120, segDuration: 4, fragDuration: 0.1 },
  { keyint: 120, segDuration: 4, fragDuration: 0.2 },
  { keyint: 120, segDuration: 4, fragDuration: 0.5 },
  { keyint: 120, segDuration: 4, fragDuration: 1.0 },
  { keyint: 120, segDuration: 4, fragDuration: 2.0 },
  { keyint: 120, segDuration: 4, fragDuration: 4.0 },
];

export const renderExperimentMatrixMarkdown = (): string => {
  const segmentRows = segmentExperiments
    .map((row) => `| ${row.keyint} | ${row.segDuration} |`)
    .join("\n");
  const fragmentRows = fragmentExperiments
    .map((row) => `| ${row.keyint} | ${row.segDuration} | ${row.fragDuration} |`)
    .join("\n");

  return `# Experiment Matrix

These experiments come directly from \`Low Latency.docx\`.

## Segment Duration Experiment

| keyint | seg_duration |
| --- | --- |
${segmentRows}

## Fragment Duration Experiment

Fixed values: \`keyint=120\`, \`seg_duration=4\`.

| keyint | seg_duration | frag_duration |
| --- | --- | --- |
${fragmentRows}
`;
};
