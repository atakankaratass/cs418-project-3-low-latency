import type { LatencyRecord } from "./latencyCsv.js";

export type PlotSpec = {
  xLabel: string;
  yLabel: "latency_ms";
  points: Array<[number, number]>;
};

export const buildPlotSpecs = (
  records: LatencyRecord[],
): { segment: PlotSpec; fragment: PlotSpec } => ({
  segment: {
    xLabel: "seg_duration",
    yLabel: "latency_ms",
    points: records
      .filter((record) => record.experimentType === "segment")
      .map((record) => [record.segDuration, record.latencyMs]),
  },
  fragment: {
    xLabel: "frag_duration",
    yLabel: "latency_ms",
    points: records
      .filter((record) => record.experimentType === "fragment" && record.fragDuration !== undefined)
      .map((record) => [record.fragDuration as number, record.latencyMs]),
  },
});
