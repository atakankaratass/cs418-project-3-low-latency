---
marp: true
theme: default
size: 4:3
paginate: false
style: |
  section {
    font-family: "Nimbus Sans L", "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding: 35px 40px;
    background-color: #ffffff;
    color: #000000;
  }
  h1 {
    color: #20325a;
    font-size: 1.6em;
    margin-top: 0;
    margin-bottom: 10px;
    border-bottom: 2px solid #20325a;
    padding-bottom: 6px;
  }
  h2 {
    color: #20325a;
    font-size: 1.2em;
    margin-top: 10px;
  }
  p, li {
    font-size: 0.85em;
    line-height: 1.5;
  }
  ul {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  li::marker {
    color: #20325a;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 0.75em;
  }
  th {
    background-color: #20325a;
    color: #ffffff;
    padding: 6px 10px;
    border: 1px solid #96a0b4;
    font-weight: bold;
    text-align: left;
  }
  td {
    padding: 5px 10px;
    border: 1px solid #96a0b4;
    background-color: #ffffff;
  }
  .highlight {
    color: #c0392b;
    font-weight: bold;
  }

  /* Beamer blocks styling */
  .block {
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #20325a;
  }
  .block-title {
    background-color: #20325a;
    color: #ffffff;
    padding: 4px 10px;
    font-weight: bold;
    font-size: 0.85em;
  }
  .block-body {
    background-color: #f0f4f8;
    color: #333333;
    padding: 8px 10px;
    font-size: 0.8em;
  }

  .block-example {
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    overflow: hidden;
    border: 1px solid #465a78;
  }
  .block-example-title {
    background-color: #465a78;
    color: #ffffff;
    padding: 4px 10px;
    font-weight: bold;
    font-size: 0.85em;
  }
  .block-example-body {
    background-color: #f0f4f8;
    color: #333333;
    padding: 8px 10px;
    font-size: 0.8em;
  }

  /* Footer: Beamer Madrid style bottom bar */
  footer {
    display: flex !important;
    width: 100%;
    padding: 0 !important;
    margin: 0 !important;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 22px;
    line-height: 22px;
    font-size: 10px;
    font-family: sans-serif;
  }
  .foot-left {
    flex: 4;
    background-color: #20325a;
    color: #ffffff;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 5px;
  }
  .foot-mid {
    flex: 3;
    background-color: #465a78;
    color: #ffffff;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 5px;
  }
  .foot-right {
    flex: 2;
    background-color: #96a0b4;
    color: #000000;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 5px;
  }
---

<!-- _class: lead -->
<!-- _footer: "" -->

<br><br>

<center>
  <span style="font-size: 1.5em; font-weight: bold; color: #20325a;">Low-Latency DASH Live Streaming Pipeline</span><br>
  <span style="font-size: 1.0em; color: #465a78; font-weight: 500;">CS 418 Project 3 - Final Presentation</span><br>
  <br><br>
  <span style="font-size: 0.9em; font-weight: bold;">Atakan Karataş</span><br>
  <span style="font-size: 0.8em; color: #555555;">Department of Computer Engineering, Özyeğin University</span><br>
  <br>
  <span style="font-size: 0.8em; color: #555555;">May 30, 2026</span>
</center>

---

<!-- _footer: '<span class="foot-left">Atakan Karataş (Özyeğin University)</span><span class="foot-mid">Low-Latency DASH Streaming</span><span class="foot-right">May 2026 &nbsp;&nbsp;&nbsp;&nbsp; 2 / 11</span>' -->

# Outline

1. **Motivation & Task**
2. **System Architecture**
3. **FFmpeg Source Modification**
4. **Core Validation**
5. **Segment Duration Experiment**
6. **Fragment Duration Experiment**
7. **Bonus: QR Latency Monitor**
8. **Conclusion**

---

<!-- _footer: '<span class="foot-left">Atakan Karataş (Özyeğin University)</span><span class="foot-mid">Low-Latency DASH Streaming</span><span class="foot-right">May 2026 &nbsp;&nbsp;&nbsp;&nbsp; 3 / 11</span>' -->

# Motivation & Task

<div class="block">
  <div class="block-title">Core Objective</div>
  <div class="block-body">
    Build a low-latency live streaming pipeline to achieve glass-to-glass latency of <span class="highlight">under 5 seconds</span> using open-source tools.
  </div>
</div>

- **Standard HTTP Streaming:** HLS/DASH introduce 6-30s latency due to segment buffering.
- **Low-Latency DASH (LL-DASH):** Solves this by utilizing HTTP/1.1 chunked transfer encoding.
- **Deliverables:** Working stream pipeline, parameter experiments, analysis of latency trade-offs, and final report.

---

<!-- _footer: '<span class="foot-left">Atakan Karataş (Özyeğin University)</span><span class="foot-mid">Low-Latency DASH Streaming</span><span class="foot-right">May 2026 &nbsp;&nbsp;&nbsp;&nbsp; 4 / 11</span>' -->

# System Architecture

The delivery pipeline consists of five connected components:

1. **OBS Studio:** Media source. Captures video and embeds high-precision wall-clock time overlay.
2. **RTMP Link:** Encoded media transmission from OBS to local packaging process.
3. **Modified FFmpeg:** Packages incoming RTMP stream into low-latency DASH chunks/segments on local disk.
4. **NGINX & node-gpac-dash:** Serves the browser player page and delivers media chunks progressively.
5. **dash.js Player:** Browser playback engine with live synchronization and catchup logic.

---

<!-- _footer: '<span class="foot-left">Atakan Karataş (Özyeğin University)</span><span class="foot-mid">Low-Latency DASH Streaming</span><span class="foot-right">May 2026 &nbsp;&nbsp;&nbsp;&nbsp; 5 / 11</span>' -->

# FFmpeg Source Modification

- **The Problem:** Standard FFmpeg writes segments with a temporary `.tmp` extension and renames them only when complete. This blocks the server from progressive reads.
- **The Solution (Appendix A):** Modify `libavformat/dashenc.c` to write directly to the final file name:

<div class="block-example">
  <div class="block-example-title">Source Change in dashenc.c</div>
  <div class="block-example-body">
    Original: <code>use_rename ? "%s.tmp" : "%s"</code><br>
    Modified: <code>use_rename ? "%s" : "%s"</code>
  </div>
</div>

- **Verification:** Compiled from source with configure flags: `--enable-demuxer=dash --enable-libxml2`. Verified via `ffmpeg -h muxer=dash`.

---

<!-- _footer: '<span class="foot-left">Atakan Karataş (Özyeğin University)</span><span class="foot-mid">Low-Latency DASH Streaming</span><span class="foot-right">May 2026 &nbsp;&nbsp;&nbsp;&nbsp; 6 / 11</span>' -->

# Core Validation

- **Chunked Delivery:** Verified via browser Network tab showing `Transfer-Encoding: chunked` for `.m4s` segment requests.
- **Stabilizing Encoder Lag:** OBS encoding resolution and bitrate reduced to prevent CPU/encoder lag:
  - Output Resolution: **852x480**
  - Output Bitrate: **1200 kbps** (30 FPS)
- **Baseline Result:** 1-second segment profile reached stable <span class="highlight">~4.0 seconds</span> of glass-to-glass latency without stalls.

---

<!-- _footer: '<span class="foot-left">Atakan Karataş (Özyeğin University)</span><span class="foot-mid">Low-Latency DASH Streaming</span><span class="foot-right">May 2026 &nbsp;&nbsp;&nbsp;&nbsp; 7 / 11</span>' -->

# Segment Duration Experiment

Varying segment duration (`seg_duration`) and keyframe interval (`keyint`) at 30 FPS:

| Seg. Duration (s) | Keyint | Measured Latency (ms) | Playback Stability      |
| :---------------: | :----: | :-------------------: | :---------------------- |
|       **1**       | **30** |       **4000**        | **Stable (Target Met)** |
|         2         |   60   |         5500          | Stable (Target Missed)  |
|         3         |   90   |         5500          | Stable (Target Missed)  |
|         4         |  120   |         5500          | Stable (Target Missed)  |
|         5         |  150   |         7000          | Repeated stalls         |
|         6         |  180   |         7500          | Stable but slow         |

- **Finding:** Latency scales directly with segment duration. Only the 1-second segment profile remained below the 5s threshold.

---

<!-- _footer: '<span class="foot-left">Atakan Karataş (Özyeğin University)</span><span class="foot-mid">Low-Latency DASH Streaming</span><span class="foot-right">May 2026 &nbsp;&nbsp;&nbsp;&nbsp; 8 / 11</span>' -->

# Fragment Duration Experiment

Testing fragment duration (`frag_duration`) with fixed 4s segments and `keyint=120`:

| Fragment Duration (s) | Latency (ms) | Playback Stability               |
| :-------------------: | :----------: | :------------------------------- |
|         0.033         |     5000     | Stable                           |
|         0.066         |     5500     | Stable                           |
|         0.100         |     5500     | Stable                           |
|         0.500         |     6000     | Stable                           |
|         1.000         |     6000     | Minor playback waiting / catchup |
|         2.000         |     6000     | Gap Controller adjustments       |
|         4.000         |     9000     | Severe buffer depletion / stalls |

- **Finding:** Fragment size alone does not bypass segment-level buffer delays. Large fragments (1s - 4s) cause playback stalls.

---

<!-- _footer: '<span class="foot-left">Atakan Karataş (Özyeğin University)</span><span class="foot-mid">Low-Latency DASH Streaming</span><span class="foot-right">May 2026 &nbsp;&nbsp;&nbsp;&nbsp; 9 / 11</span>' -->

# Bonus: QR Latency Monitor

- **Overlay:** Generates QR code containing local clock timestamp.
  - Payload format: `cs418-project3-ts=<ISO timestamp>`
- **Player Integration:**
  - Embedded a **QR-Based Latency Monitor** panel.
  - Samples video frames to an offscreen canvas.
  - Decodes payload in real-time using the `jsQR` library.
  - Subtracts embedded time from current browser system clock.
- **Advantage:** Enables automated, sub-second precision latency monitoring without manual stopwatch screenshots.

---

<!-- _footer: '<span class="foot-left">Atakan Karataş (Özyeğin University)</span><span class="foot-mid">Low-Latency DASH Streaming</span><span class="foot-right">May 2026 &nbsp;&nbsp;&nbsp;&nbsp; 10 / 11</span>' -->

# Conclusion

1. **Target Met:** Low-latency live streaming achieved at **4.0 seconds** of adjusted latency.
2. **End-to-End Dependency:** Low latency is a system-wide attribute. Buffering in NGINX, chunk handling in node-gpac-dash, and player properties in dash.js are as critical as the encoder settings.
3. **Chunked delivery is essential:** Prevents standard segment compilation delays.
4. **Validation Integrity:** Verified locally through reproducible scripts and real metrics.

---

<!-- _footer: '<span class="foot-left">Atakan Karataş (Özyeğin University)</span><span class="foot-mid">Low-Latency DASH Streaming</span><span class="foot-right">May 2026 &nbsp;&nbsp;&nbsp;&nbsp; 11 / 11</span>' -->

# Thank You

<br><br>

<center>
<span style="font-size: 2.2em; font-weight: bold; color: #20325a;">Questions?</span><br>
<span style="font-size: 1.3em; color: #465a78; font-weight: 500;">Q&A Session</span>
</center>
