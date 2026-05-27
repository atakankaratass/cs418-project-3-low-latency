export type DashPlayerOptions = {
  manifestPath: string;
};

export const renderDashPlayerHtml = (options: DashPlayerOptions): string => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CS 418 Project 3 Low Latency Player</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 2rem; background: #101318; color: #f6f7fb; }
      video { width: min(100%, 960px); background: #000; border: 1px solid #3a4252; }
      code { color: #9ad7ff; }
    </style>
  </head>
  <body>
    <h1>CS 418 Project 3 Low Latency Player</h1>
    <p>Manifest: <code>${options.manifestPath}</code></p>
    <video id="video" autoplay muted playsinline></video>
    <script src="https://cdn.dashjs.org/latest/dash.all.min.js"></script>
    <script>
      const video = document.getElementById("video");
      video.controls = true;

      const player = dashjs.MediaPlayer().create();
      player.updateSettings({
        streaming: {
          lowLatencyEnabled: true,
          liveDelay: 2,
          liveCatchup: {
            enabled: true,
          },
        },
      });
      player.initialize(video, "${options.manifestPath}", true);
    </script>
  </body>
</html>
`;
