const prefix = "cs418-project3-ts=";

export const formatQrTimestampPayload = (isoTimestamp: string): string =>
  `${prefix}${isoTimestamp}`;

export const calculateQrLatencyMs = (payload: string, currentIsoTimestamp: string): number => {
  if (!payload.startsWith(prefix)) {
    throw new Error("QR payload does not contain a CS 418 Project 3 timestamp");
  }

  return Date.parse(currentIsoTimestamp) - Date.parse(payload.slice(prefix.length));
};
