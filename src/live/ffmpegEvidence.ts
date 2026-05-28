export type FfmpegEvidenceInput = {
  ffmpegPath: string;
  versionOutput: string;
  dashMuxerOutput: string;
  dashencPatchOutput: string;
};

const has = (value: string, token: string): boolean => value.includes(token);

const yesNo = (value: boolean): string => (value ? "yes" : "no");

const excerpt = (value: string): string => value.trim() || "not captured";

export const renderFfmpegEvidenceMarkdown = (input: FfmpegEvidenceInput): string => {
  const hasDashDemuxer = has(input.versionOutput, "--enable-demuxer=dash");
  const hasLibXml2 = has(input.versionOutput, "--enable-libxml2");
  const hasLowLatencyDash = has(input.dashMuxerOutput, "-ldash");
  const hasStreaming = has(input.dashMuxerOutput, "-streaming");
  const hasDashencPatch = has(input.dashencPatchOutput, 'use_rename ? "%s" : "%s"');
  const verified =
    hasDashDemuxer && hasLibXml2 && hasLowLatencyDash && hasStreaming && hasDashencPatch;

  return `# FFmpeg Build Evidence

- FFmpeg command checked: \`${input.ffmpegPath}\`
- Modified FFmpeg Appendix evidence: ${verified ? "verified" : "incomplete"}
- \`--enable-demuxer=dash\`: ${yesNo(hasDashDemuxer)}
- \`--enable-libxml2\`: ${yesNo(hasLibXml2)}
- \`-ldash\`: ${yesNo(hasLowLatencyDash)}
- \`-streaming\`: ${yesNo(hasStreaming)}
- \`dashenc.c\` temp-path patch: ${yesNo(hasDashencPatch)}

${verified ? "This evidence supports the source-built FFmpeg requirement." : "Do not claim DASH build readiness until this evidence is complete."}

## DASH muxer output excerpt

\`\`\`text
${excerpt(input.dashMuxerOutput)}
\`\`\`

## dashenc.c patch evidence

\`\`\`c
${excerpt(input.dashencPatchOutput)}
\`\`\`
`;
};
