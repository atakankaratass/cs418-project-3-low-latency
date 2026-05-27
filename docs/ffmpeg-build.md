# FFmpeg Source Build

`Low Latency.docx` requires compiling FFmpeg from source because the linked blog post requires a source change in FFmpeg's DASH muxer.

## Download Source

```bash
cd ~/ffmpeg_sources && \
wget -O ffmpeg-snapshot.tar.bz2 https://ffmpeg.org/releases/ffmpeg-snapshot.tar.bz2 && \
tar xjvf ffmpeg-snapshot.tar.bz2 && \
cd ffmpeg
```

## Required `dashenc.c` Change

Change `~/ffmpeg_sources/ffmpeg/libavformat/dashenc.c` as follows:

```c
        // remove .tmp extension in order to use node-gpac-dash
        // snprintf(os->temp_path, sizeof(os->temp_path),
        //         use_rename ? "%s.tmp" : "%s", os->full_path);
        snprintf(os->temp_path, sizeof(os->temp_path),
                use_rename ? "%s" : "%s", os->full_path);
```

## Dependencies

On Ubuntu, Debian, or Mint, Appendix A names these packages for DASH support:

```bash
sudo apt install liblzma-dev libunistring-dev libxml2-dev
```

If a build fails, inspect `ffmpeg/config.log` and resolve missing dependencies before rerunning configure.

## Required Configure Flags

The assignment explicitly requires adding:

```bash
--enable-demuxer=dash --enable-libxml2
```

## Appendix A Build Command

```bash
cd ~/ffmpeg_sources/ffmpeg/ && \
PATH="$HOME/bin:$PATH" PKG_CONFIG_PATH="$HOME/ffmpeg_build/lib/pkgconfig" ./configure \
  --prefix="$HOME/ffmpeg_build" \
  --pkg-config-flags="--static" \
  --extra-cflags="-I$HOME/ffmpeg_build/include" \
  --extra-ldflags="-L$HOME/ffmpeg_build/lib" \
  --extra-libs="-lpthread -lm" \
  --ld="g++" \
  --bindir="$HOME/bin" \
  --enable-gpl \
  --enable-gnutls \
  --enable-libaom \
  --enable-libass \
  --enable-libfdk-aac \
  --enable-libfreetype \
  --enable-libmp3lame \
  --enable-libopus \
  --enable-libdav1d \
  --enable-libvorbis \
  --enable-libvpx \
  --enable-libx264 \
  --enable-libx265 \
  --enable-libharfbuzz \
  --enable-libfontconfig \
  --enable-libfribidi \
  --enable-nonfree --enable-demuxer=dash --enable-libxml2 && \
PATH="$HOME/bin:$PATH" make && \
make install && \
hash -r
```

## Verification

Run:

```bash
whereis ffmpeg
$HOME/bin/ffmpeg
$HOME/bin/ffmpeg -h muxer=dash
```

Use the compiled binary by full path when running the project so another installed FFmpeg version is not used accidentally.

The Appendix A screenshot shows FFmpeg output where the configure line includes `--enable-demuxer=dash --enable-libxml2`. The extracted reference image should live at `docs/reference/appendix-a-dash-options.png`.
