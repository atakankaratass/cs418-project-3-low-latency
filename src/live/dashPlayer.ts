export type DashPlayerOptions = {
  manifestPath: string;
};

export const renderDashPlayerHtml = (options: DashPlayerOptions): string => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <title>CS 418 Project 3 Low Latency Player</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 2rem; background: #101318; color: #f6f7fb; }
      video { width: min(100%, 960px); background: #000; border: 1px solid #3a4252; }
      code { color: #9ad7ff; }
      #logs { width: min(100%, 960px); margin-top: 1rem; padding: 1rem; background: #161a22; border: 1px solid #3a4252; border-radius: 4px; box-sizing: border-box; }
      #log-container { height: 250px; overflow-y: auto; font-family: monospace; font-size: 0.85rem; color: #8892b0; margin: 0; padding: 0; }
      .log-line { margin: 2px 0; border-bottom: 1px solid #202632; padding-bottom: 2px; }
      .log-error { color: #f87171; }
      .log-warn { color: #fbbf24; }
      .log-success { color: #34d399; }
    </style>
  </head>
  <body>
    <h1>CS 418 Project 3 Low Latency Player</h1>
    <p>Manifest: <code>${options.manifestPath}</code></p>
    <video id="video" autoplay muted playsinline></video>
    
    <div id="logs">
      <h3 style="margin-top: 0; color: #f6f7fb; font-size: 1rem; border-bottom: 1px solid #3a4252; padding-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
        <span>Player Debug Logs</span>
        <button onclick="document.getElementById('log-container').innerHTML = ''" style="background: #3a4252; color: #f6f7fb; border: none; padding: 0.25rem 0.5rem; border-radius: 3px; cursor: pointer; font-size: 0.75rem;">Clear</button>
      </h3>
      <div id="log-container"></div>
    </div>

    <script src="https://cdn.dashjs.org/v4.7.4/dash.all.min.js"></script>
    <script>
      const logContainer = document.getElementById("log-container");
      function log(msg, type = "") {
        const div = document.createElement("div");
        div.className = "log-line" + (type ? " log-" + type : "");
        div.textContent = "[" + new Date().toLocaleTimeString() + "] " + msg;
        logContainer.appendChild(div);
        logContainer.scrollTop = logContainer.scrollHeight;
      }

      // Intercept console messages
      const originalLog = console.log;
      console.log = function(...args) {
        originalLog.apply(console, args);
        log(args.join(" "));
      };
      const originalWarn = console.warn;
      console.warn = function(...args) {
        originalWarn.apply(console, args);
        log(args.join(" "), "warn");
      };
      const originalError = console.error;
      console.error = function(...args) {
        originalError.apply(console, args);
        log(args.join(" "), "error");
      };

      // Handle window errors
      window.addEventListener("error", function(e) {
        log("JS Error: " + e.message + " at " + e.filename + ":" + e.lineno, "error");
      });

      const video = document.getElementById("video");
      video.controls = true;

      log("Initializing player with manifest: " + "${options.manifestPath}");
      const player = dashjs.MediaPlayer().create();
      log("dash.js version: " + player.getVersion());
      log("dash.js settings: " + JSON.stringify(player.getSettings()));
      player.updateSettings({
        streaming: {
          delay: {
            liveDelay: 2,
          },
          liveCatchup: {
            enabled: true,
            playbackBufferMin: 0.5,
          },
          scheduling: {
            lowLatencyTimeout: 0,
          },
          abr: {
            useDeadTimeLatency: true,
          },
        },
      });

      player.on(dashjs.MediaPlayer.events.ERROR, function(e) {
        log("DASH.js Error: " + JSON.stringify(e.error), "error");
      });
      player.on(dashjs.MediaPlayer.events.PLAYBACK_ERROR, function(e) {
        log("DASH.js Playback Error: " + JSON.stringify(e.error), "error");
      });
      player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED, function() {
        log("Stream initialized successfully!", "success");
      });
      player.on(dashjs.MediaPlayer.events.PLAYBACK_PLAYING, function() {
        log("Playback started playing", "success");
      });
      player.on(dashjs.MediaPlayer.events.QUALITY_CHANGE_RENDERED, function(e) {
        log("Rendered quality changed: mediaType=" + e.mediaType + ", index=" + e.newQuality);
      });

      player.initialize(video, "${options.manifestPath}", true);
    </script>
  </body>
</html>
`;
