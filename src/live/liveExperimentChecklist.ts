import { buildDashCommand } from "../config/ffmpegDashCommand.js";
import { fragmentExperiments, segmentExperiments } from "../config/experimentMatrix.js";

export type LiveExperimentChecklistOptions = {
  ffmpegPath: string;
  inputUrl: string;
  outputRoot: string;
};

const fenced = (command: string): string => `\`\`\`bash\n${command}\n\`\`\``;

export const renderLiveExperimentChecklist = (options: LiveExperimentChecklistOptions): string => {
  const segmentCommands = segmentExperiments
    .map((row) => {
      const command = buildDashCommand({
        ffmpegPath: options.ffmpegPath,
        inputUrl: options.inputUrl,
        outputManifest: `${options.outputRoot}/segment-${row.segDuration}/live.mpd`,
        segDuration: row.segDuration,
      });

      return `### keyint=${row.keyint}, seg_duration=${row.segDuration}\n\n${fenced(command)}`;
    })
    .join("\n\n");

  const fragmentCommands = fragmentExperiments
    .map((row) => {
      const command = buildDashCommand({
        ffmpegPath: options.ffmpegPath,
        inputUrl: options.inputUrl,
        outputManifest: `${options.outputRoot}/fragment-${row.fragDuration}/live.mpd`,
        segDuration: row.segDuration,
        fragDuration: row.fragDuration,
      });

      return `### frag_duration=${row.fragDuration}\n\n${fenced(command)}`;
    })
    .join("\n\n");

  return `# Live Experiment Checklist

These commands are generated from the assignment experiment matrix. They do not replace manual OBS, browser inspector, or wall-clock latency validation.

## Manual Evidence Gates

- Browser inspector gate: pending manual confirmation of chunked transfer encoding for DASH media segment responses.
- Wall-clock latency gate: pending manual measurement from the OBS overlay and system clock.

## Segment Duration Commands

${segmentCommands}

## Fragment Duration Commands

${fragmentCommands}
`;
};
