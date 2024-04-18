import { SIUnit } from "@repo/science/SIUnit";

export type BeamlineParams = {
  name: string;
  detectorName: string;
  beamstop: Beamstop;
  cameraTube: CameraTube;
  angle: number;
  wavelength: null;
  cameraLength: number;
  readonly minWavelength: number;
  readonly maxWavelength: number;
  readonly minCameraLength: number;
  readonly maxCameraLength: number;
  readonly cameraLengthStep: number;
};

export type Beamstop = {
  centre: Centre;
  diameter: number;
  clearance: number;
};

export type Centre = {
  x: number;
  y: number;
};

export type CameraTube = {
  centre: Centre;
  diameter: number;
};

// DETECTORS

export type DetectorParams = {
  name: string;
  readonly resolution: PixelSize;
  readonly pixelSize: PixelSize;
};

export type PixelSize = {
  width: SIUnit;
  height: SIUnit;
};
