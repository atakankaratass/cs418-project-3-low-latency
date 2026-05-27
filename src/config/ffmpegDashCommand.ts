export type DashCommandOptions = {
  ffmpegPath: string;
  inputUrl: string;
  outputManifest: string;
  segDuration: number;
  fragDuration?: number;
};

export const buildDashCommand = (options: DashCommandOptions): string => {
  const fragmentOptions =
    options.fragDuration === undefined
      ? ""
      : ` -frag_duration ${options.fragDuration} -frag_type duration`;

  return [
    options.ffmpegPath,
    "-fflags nobuffer",
    "-flags low_delay",
    `-i ${options.inputUrl}`,
    "-c copy",
    "-f dash",
    "-streaming 1",
    "-use_template 1",
    "-use_timeline 1",
    `-seg_duration ${options.segDuration}`,
    fragmentOptions.trim(),
    options.outputManifest,
  ]
    .filter(Boolean)
    .join(" ");
};
