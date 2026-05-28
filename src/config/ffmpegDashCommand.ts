export type DashCommandOptions = {
  ffmpegPath: string;
  inputUrl: string;
  outputManifest: string;
  segDuration: number;
  fragDuration?: number;
};

export const buildDashCommand = (options: DashCommandOptions): string => {
  const baselineFrag =
    options.fragDuration === undefined
      ? "-frag_type every_frame"
      : `-frag_duration ${options.fragDuration} -frag_type duration`;

  const gopSize = options.segDuration * 30;

  return [
    options.ffmpegPath,
    "-fflags nobuffer",
    "-flags low_delay",
    "-listen 1",
    `-i ${options.inputUrl}`,
    "-c:v libx264",
    `-g ${gopSize}`,
    `-keyint_min ${gopSize}`,
    "-sc_threshold 0",
    "-bf 0",
    "-tune zerolatency",
    "-preset veryfast",
    "-pix_fmt yuv420p",
    "-c:a aac",
    "-b:a 128k",
    "-f dash",
    "-ldash 1",
    "-streaming 1",
    "-use_template 1",
    "-use_timeline 1",
    "-window_size 5",
    "-extra_window_size 5",
    "-remove_at_exit 0",
    `-seg_duration ${options.segDuration}`,
    baselineFrag,
    options.outputManifest,
  ].join(" ");
};
