import { DetectorParams } from "../types";

const pilatus: DetectorParams = {
  name: "Pilatus P3-2M",
  resolution: {
    width: 1475,
    height: 1679,
  },
  pixelSize: {
    width: 0.172,
    height: 0.172,
  },
};

const longBoy: DetectorParams = {
  name: "long boy",
  resolution: {
    width: 1475,
    height: 679,
  },
  pixelSize: {
    width: 0.2,
    height: 0.2,
  },
};

export const detectors = [pilatus, longBoy];
