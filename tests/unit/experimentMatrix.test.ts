import { describe, expect, test } from "vitest";

import { fragmentExperiments, segmentExperiments } from "../../src/config/experimentMatrix.js";

describe("experiment matrix", () => {
  test("contains the required keyint and segment duration pairs", () => {
    expect(segmentExperiments).toEqual([
      { keyint: 30, segDuration: 1 },
      { keyint: 60, segDuration: 2 },
      { keyint: 90, segDuration: 3 },
      { keyint: 120, segDuration: 4 },
      { keyint: 150, segDuration: 5 },
      { keyint: 180, segDuration: 6 },
    ]);
  });

  test("contains the required fixed keyint fragment duration matrix", () => {
    expect(fragmentExperiments).toEqual([
      { keyint: 120, segDuration: 4, fragDuration: 0.033 },
      { keyint: 120, segDuration: 4, fragDuration: 0.066 },
      { keyint: 120, segDuration: 4, fragDuration: 0.1 },
      { keyint: 120, segDuration: 4, fragDuration: 0.2 },
      { keyint: 120, segDuration: 4, fragDuration: 0.5 },
      { keyint: 120, segDuration: 4, fragDuration: 1.0 },
      { keyint: 120, segDuration: 4, fragDuration: 2.0 },
      { keyint: 120, segDuration: 4, fragDuration: 4.0 },
    ]);
  });
});
