export type LiveValidationInput = {
  ffmpegVersionOutput: string;
  obsAppFound: boolean;
  nginxFound: boolean;
  nodeGpacDashDir?: string;
  browserInspectorChecked: boolean;
  baselineLatencyMs?: number;
};

export type LiveValidationStatus = {
  modifiedFfmpegReady: boolean;
  coreLiveReady: boolean;
  blockers: string[];
};

export const summarizeLiveValidationStatus = (input: LiveValidationInput): LiveValidationStatus => {
  const modifiedFfmpegReady =
    input.ffmpegVersionOutput.includes("--enable-demuxer=dash") &&
    input.ffmpegVersionOutput.includes("--enable-libxml2");

  const blockers: string[] = [];

  if (!modifiedFfmpegReady) {
    blockers.push(
      "Modified source-built FFmpeg with --enable-demuxer=dash --enable-libxml2 was not verified.",
    );
  }

  if (!input.obsAppFound) {
    blockers.push("OBS was not found or not recorded as installed.");
  }

  if (!input.nginxFound) {
    blockers.push("NGINX was not found on PATH.");
  }

  if (!input.nodeGpacDashDir) {
    blockers.push("CS418_NODE_GPAC_DASH_DIR is not set to a modified node-gpac-dash checkout.");
  }

  if (!input.browserInspectorChecked) {
    blockers.push("Browser inspector chunked transfer check has not been recorded.");
  }

  if (input.baselineLatencyMs === undefined) {
    blockers.push("Baseline latency below 5000 ms has not been recorded.");
  } else if (input.baselineLatencyMs >= 5000) {
    blockers.push(`Baseline latency is not below 5000 ms: ${input.baselineLatencyMs} ms.`);
  }

  return {
    modifiedFfmpegReady,
    coreLiveReady: blockers.length === 0,
    blockers,
  };
};
