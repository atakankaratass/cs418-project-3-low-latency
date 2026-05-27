export type ExperimentType = "segment" | "fragment";

export type LatencyInputRecord = {
  experimentType: ExperimentType;
  keyint: number;
  segDuration: number;
  fragDuration?: number;
  observedSystemTime: string;
  embeddedVideoTime: string;
  notes: string;
};

export type LatencyRecord = LatencyInputRecord & {
  latencyMs: number;
};

export const calculateLatencyMs = (observedSystemTime: string, embeddedVideoTime: string): number =>
  Date.parse(observedSystemTime) - Date.parse(embeddedVideoTime);

export const withLatency = (record: LatencyInputRecord): LatencyRecord => ({
  ...record,
  latencyMs: calculateLatencyMs(record.observedSystemTime, record.embeddedVideoTime),
});

export const formatLatencyCsvRow = (record: LatencyInputRecord): string => {
  const withComputedLatency = withLatency(record);

  return [
    withComputedLatency.experimentType,
    withComputedLatency.keyint,
    withComputedLatency.segDuration,
    withComputedLatency.fragDuration ?? "",
    withComputedLatency.observedSystemTime,
    withComputedLatency.embeddedVideoTime,
    withComputedLatency.latencyMs,
    withComputedLatency.notes,
  ].join(",");
};

export const parseLatencyCsv = (csv: string): LatencyRecord[] =>
  csv
    .trim()
    .split("\n")
    .filter((line) => line && !line.startsWith("experiment_type,"))
    .map((line) => {
      const [
        experimentType,
        keyint,
        segDuration,
        fragDuration,
        observedSystemTime,
        embeddedVideoTime,
        latencyMs,
        notes,
      ] = line.split(",");

      return {
        experimentType: experimentType as ExperimentType,
        keyint: Number(keyint),
        segDuration: Number(segDuration),
        fragDuration: fragDuration ? Number(fragDuration) : undefined,
        observedSystemTime,
        embeddedVideoTime,
        latencyMs: Number(latencyMs),
        notes: notes ?? "",
      };
    });
