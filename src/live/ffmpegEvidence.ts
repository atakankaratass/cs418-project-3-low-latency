export type FfmpegEvidenceInput = {
  ffmpegPath: string;
  versionOutput: string;
  dashMuxerOutput: string;
};

const has = (value: string, token: string): boolean => value.includes(token);

const yesNo = (value: boolean): string => (value ? "yes" : "no");

export const renderFfmpegEvidenceMarkdown = (input: FfmpegEvidenceInput): string => {
  const hasDashDemuxer = has(input.versionOutput, "--enable-demuxer=dash");
  const hasLibXml2 = has(input.versionOutput, "--enable-libxml2");
  const hasLowLatencyDash = has(input.dashMuxerOutput, "-ldash");
  const hasStreaming = has(input.dashMuxerOutput, "-streaming");
  const verified = hasDashDemuxer && hasLibXml2 && hasLowLatencyDash && hasStreaming;

  return `# FFmpeg Build Evidence

- FFmpeg command checked: \`${input.ffmpegPath}\`
- Modified FFmpeg DASH support: ${verified ? "verified" : "incomplete"}
- \`--enable-demuxer=dash\`: ${yesNo(hasDashDemuxer)}
- \`--enable-libxml2\`: ${yesNo(hasLibXml2)}
- \`-ldash\`: ${yesNo(hasLowLatencyDash)}
- \`-streaming\`: ${yesNo(hasStreaming)}

${verified ? "This evidence supports the source-built FFmpeg requirement." : "Do not claim DASH build readiness until this evidence is complete."}
`;
};
