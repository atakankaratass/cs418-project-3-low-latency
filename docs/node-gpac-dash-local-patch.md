# node-gpac-dash Local Patch Notes

The modified node-gpac-dash checkout used during live validation is outside this repository at `/Users/atakankaratas/Development/node-gpac-dash/`. These notes document the local changes required for the current live-serving behavior.

## Disabled Chunk Count Handling

When `-chunks-per-segment` is omitted, node-gpac-dash leaves `chunkCount` as `0`. The original equality check can end a segment response after the first non-media box because `nbMdatInSegment` is also `0` at that point. The local checkout treats `chunkCount=0` as disabled:

```js
if (chunkCount > 0 && params.nbMdatInSegment >= chunkCount)
```

## EOF Timeout For Live-Edge Segments

Video and audio segments contain different numbers of media fragments with `-frag_type every_frame`. A single global `-chunks-per-segment` value can truncate one stream. The local checkout instead keeps the response open while FFmpeg appends data and ends it after a short EOF timeout:

```js
params.endTimer = setTimeout(function () {
  if (!params.endSent) {
    reportMessage(logLevels.INFO, "EOF timeout - ending response for " + filename);
    params.response.end();
    params.endSent = true;
  }
}, 500);
```

## Live Debugging Result

- `seg_duration=4`, `keyint=120` streamed but produced repeated dash.js `PLAYBACK_WAITING` events near segment boundaries.
- `seg_duration=2`, `keyint=60`, `-ldash 1`, and `-frag_type every_frame` was observed to play smoothly.
- Browser inspector chunked-transfer evidence and formal wall-clock latency measurements still need to be captured before final report claims.
