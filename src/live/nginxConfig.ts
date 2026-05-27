export type NginxConfigOptions = {
  listenPort: number;
  projectRoot: string;
  dashRoot: string;
};

const quotePath = (path: string): string =>
  `"${path.replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`;

export const renderNginxConfig = (options: NginxConfigOptions): string => `worker_processes  1;

events {
  worker_connections  1024;
}

http {
  default_type  application/octet-stream;
  sendfile      on;
  tcp_nopush    on;
  tcp_nodelay   on;

  server {
    listen ${options.listenPort};
    server_name 127.0.0.1 localhost;
    root ${quotePath(`${options.projectRoot}/public`)};

    location / {
      try_files $uri /index.html;
    }

    location /dash/ {
      alias ${quotePath(`${options.dashRoot}/`)};
      add_header Access-Control-Allow-Origin *;
      add_header Cache-Control no-cache;
      types {
        application/dash+xml mpd;
        video/iso.segment m4s;
        video/mp4 mp4;
      }
    }
  }
}
`;
