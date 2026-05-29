import type { LatencyRecord } from "./latencyCsv.js";

export type PlotSpec = {
  xLabel: string;
  yLabel: "latency_ms";
  points: Array<[number, number]>;
};

const latestPointByX = (points: Array<[number, number]>): Array<[number, number]> => {
  const byX = new Map<number, [number, number]>();

  for (const point of points) {
    byX.set(point[0], point);
  }

  return [...byX.values()].sort((left, right) => left[0] - right[0]);
};

export const buildPlotSpecs = (
  records: LatencyRecord[],
): { segment: PlotSpec; fragment: PlotSpec } => ({
  segment: {
    xLabel: "seg_duration",
    yLabel: "latency_ms",
    points: latestPointByX(
      records
        .filter((record) => record.experimentType === "segment")
        .map((record) => [record.segDuration, record.latencyMs]),
    ),
  },
  fragment: {
    xLabel: "frag_duration",
    yLabel: "latency_ms",
    points: latestPointByX(
      records
        .filter(
          (record) => record.experimentType === "fragment" && record.fragDuration !== undefined,
        )
        .map((record) => [record.fragDuration as number, record.latencyMs]),
    ),
  },
});
