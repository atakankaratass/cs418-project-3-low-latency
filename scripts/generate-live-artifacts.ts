import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { renderDashPlayerHtml } from "../src/live/dashPlayer.js";
import { renderNginxConfig } from "../src/live/nginxConfig.js";

const projectRoot = resolve(process.cwd());
const dashRoot = resolve(projectRoot, "output/dash");
const listenPort = Number(process.env.CS418_NGINX_PORT ?? 8080);

mkdirSync("public", { recursive: true });
mkdirSync("configs/nginx", { recursive: true });
mkdirSync("output/dash", { recursive: true });

writeFileSync("public/index.html", renderDashPlayerHtml({ manifestPath: "/dash/live.mpd" }));
writeFileSync(
  "configs/nginx/generated.conf",
  renderNginxConfig({
    listenPort,
    projectRoot,
    dashRoot,
  }),
);

console.log("Generated public/index.html");
console.log("Generated configs/nginx/generated.conf");
console.log(`Player URL: http://127.0.0.1:${listenPort}/`);
console.log(`Manifest URL: http://127.0.0.1:${listenPort}/dash/live.mpd`);
