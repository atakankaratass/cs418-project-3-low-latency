export type LiveValidationInput = {
  ffmpegVersionOutput: string;
  obsAppFound: boolean;
  nginxFound: boolean;
  nodeGpacDashDir?: string;
  browserInspectorChecked: boolean;
  browserInspectorEvidencePath?: string;
  browserInspectorEvidenceFound?: boolean;
  baselineLatencyMs?: number;
  latencyMeasurementPath?: string;
  latencyMeasurementFound?: boolean;
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

  if (!input.browserInspectorEvidencePath) {
    blockers.push("Browser inspector evidence artifact path has not been recorded.");
  } else if (input.browserInspectorEvidenceFound === false) {
    blockers.push(
      `Browser inspector evidence artifact was not found: ${input.browserInspectorEvidencePath}.`,
    );
  }

  if (input.baselineLatencyMs === undefined) {
    blockers.push("Baseline latency below 5000 ms has not been recorded.");
  } else if (!Number.isFinite(input.baselineLatencyMs) || input.baselineLatencyMs < 0) {
    blockers.push("Baseline latency must be a finite non-negative number below 5000 ms.");
  } else if (input.baselineLatencyMs >= 5000) {
    blockers.push(`Baseline latency is not below 5000 ms: ${input.baselineLatencyMs} ms.`);
  }

  if (!input.latencyMeasurementPath) {
    blockers.push("Latency measurement artifact path has not been recorded.");
  } else if (input.latencyMeasurementFound === false) {
    blockers.push(`Latency measurement artifact was not found: ${input.latencyMeasurementPath}.`);
  }

  return {
    modifiedFfmpegReady,
    coreLiveReady: blockers.length === 0,
    blockers,
  };
};
