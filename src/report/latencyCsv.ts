export type ExperimentType = "segment" | "fragment";

export type LatencyInputRecord = {
  experimentType: ExperimentType;
  keyint: number;
  segDuration: number;
  fragDuration?: number;
  observedSystemTime: string;
  embeddedVideoTime: string;
  latencyMs?: number;
  notes: string;
};

export type LatencyRecord = LatencyInputRecord & {
  latencyMs: number;
};

export const calculateLatencyMs = (observedSystemTime: string, embeddedVideoTime: string): number =>
  Date.parse(observedSystemTime) - Date.parse(embeddedVideoTime);

export const withLatency = (record: LatencyInputRecord): LatencyRecord => ({
  ...record,
  latencyMs:
    record.latencyMs ?? calculateLatencyMs(record.observedSystemTime, record.embeddedVideoTime),
});

const formatCsvField = (value: string | number): string => {
  const stringValue = String(value);
  if (stringValue.includes("\n") || stringValue.includes("\r")) {
    throw new Error("Latency CSV fields must not contain newlines");
  }

  return /[",]/.test(stringValue) ? `"${stringValue.replaceAll('"', '""')}"` : stringValue;
};

const parseCsvLine = (line: string): string[] => {
  const fields: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      fields.push(field);
      field = "";
    } else {
      field += char;
    }
  }

  fields.push(field);
  return fields;
};

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
  ]
    .map(formatCsvField)
    .join(",");
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
      ] = parseCsvLine(line);

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
