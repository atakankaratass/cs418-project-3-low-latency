import type { LatencyInputRecord } from "./latencyCsv.js";

const readFlag = (args: string[], flag: string): string | undefined => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};

export const parseLatencyRecordArgs = (args: string[]): LatencyInputRecord => {
  if (args[0]?.startsWith("--")) {
    const experimentType = readFlag(args, "--experiment");
    const keyint = readFlag(args, "--keyint");
    const segDuration = readFlag(args, "--seg-duration");
    const fragDuration = readFlag(args, "--frag-duration");
    const latencyMs = readFlag(args, "--latency-ms");
    const observedSystemTime = readFlag(args, "--observed-time");
    const embeddedVideoTime = readFlag(args, "--video-time");
    const notes = readFlag(args, "--notes");

    if (
      !experimentType ||
      !keyint ||
      !segDuration ||
      !latencyMs ||
      !observedSystemTime ||
      !embeddedVideoTime
    ) {
      throw new Error("Missing required latency measurement flags");
    }

    return {
      experimentType: experimentType as LatencyInputRecord["experimentType"],
      keyint: Number(keyint),
      segDuration: Number(segDuration),
      fragDuration: fragDuration === undefined ? undefined : Number(fragDuration),
      observedSystemTime,
      embeddedVideoTime,
      latencyMs: Number(latencyMs),
      notes: notes ?? "",
    };
  }

  const [
    experimentType,
    keyint,
    segDuration,
    fragDuration,
    observedSystemTime,
    embeddedVideoTime,
    ...notesParts
  ] = args;
  if (!experimentType || !keyint || !segDuration || !observedSystemTime || !embeddedVideoTime) {
    throw new Error(
      "Usage: npm run latency:record -- <segment|fragment> <keyint> <seg_duration> <frag_duration|-> <observed_iso> <embedded_iso> [notes]",
    );
  }

  return {
    experimentType: experimentType as LatencyInputRecord["experimentType"],
    keyint: Number(keyint),
    segDuration: Number(segDuration),
    fragDuration: fragDuration === "-" ? undefined : Number(fragDuration),
    observedSystemTime,
    embeddedVideoTime,
    notes: notesParts.join(" "),
  };
};
