import { SIUnit } from "@repo/science/SIUnit";

export interface SimpleVector2 {
  x?: number | null;
  y?: number | null;
}

export type BeamlineParams = {
  name: string;
  detectorName: string;
  beamstop: Beamstop;
  cameraTube: CameraTube;
  angle: number;
  wavelength: number;
  cameraLength: number;
  // todo move this into a separate type and then do composition
  readonly minWavelength: number;
  readonly maxWavelength: number;
  readonly minCameraLength: number;
  readonly maxCameraLength: number;
  readonly cameraLengthStep: number;
};

export type Beamstop = {
  centre: SimpleVector2;
  diameter: SIUnit;
  clearance: number;
};

export type CameraTube = {
  centre: SimpleVector2;
  diameter: SIUnit;
};

// DETECTORS

export type DetectorParams = {
  name: string;
  resolution: PixelSize;
  pixelSize: PixelSize;
};

export type PixelSize = {
  width: SIUnit;
  height: SIUnit;
};
