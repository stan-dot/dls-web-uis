import { BeamlineParams } from "../types";

const i22Isotropic: BeamlineParams = {
  name: "i22 SAXS Isotropic",
  detectorName: "Pilatus P3-2M",
  beamstop: {
    centre: {
      x: 738,
      y: 100,
    },
    diameter: 4,
    clearance: 10,
  },
  cameraTube: {
    centre: {
      x: 738,
      y: 840,
    },
    diameter: 310,
  },
  angle: 90,
  wavelength: null,
  cameraLength: 1.9,
  minWavelength: 0.062,
  maxWavelength: 0.335,
  minCameraLength: 1.9,
  maxCameraLength: 9.9,
  cameraLengthStep: 0.25,
};

const i22Anisotropic: BeamlineParams = {
  name: "i22 SAXS Anisotropic",
  detectorName: "Pilatus P3-2M",
  beamstop: {
    centre: {
      x: 738,
      y: 840,
    },
    diameter: 4,
    clearance: 10,
  },
  cameraTube: {
    centre: {
      x: 738,
      y: 840,
    },
    diameter: 310,
  },
  angle: 90,
  wavelength: null,
  cameraLength: 1.9,
  minWavelength: 0.062,
  maxWavelength: 0.335,
  minCameraLength: 1.9,
  maxCameraLength: 9.9,
  cameraLengthStep: 0.25,
};

export const beamlineConfigDict: Record<string, BeamlineParams> = {
  i22Isotropic: i22Isotropic,
  i22Anisotropic: i22Anisotropic,
};
