import * as mathjs from "mathjs";
import { Vector2, Vector3 } from "three";
import { getPointForQ } from "../calculations/qvalue";
import UnitRange from "../calculations/unitRange";
import { useBeamlineConfigStore } from "../data-entry/beamlineconfigStore";
import {
  ResultStore,
  ScatteringOptions
} from "../results/resultsStore";
import {
  convertBetweenQAndD,
  convertBetweenQAndS
} from "../results/scatteringQuantities";
import {
  BeamlineConfig,
  Beamstop,
  CircularDevice,
  Detector
} from "../utils/types";
import { Plotter } from "./Plotter";
import { UnitVector } from "./plotUtils";

export function getScaleFactor(beamlineConfig: BeamlineConfig) {
  let scaleFactor: mathjs.MathType | null = null;
  if (beamlineConfig.cameraLength && beamlineConfig.wavelength) {
    scaleFactor = mathjs.divide(
      2 * Math.PI,
      mathjs.multiply(
        mathjs.unit(beamlineConfig.cameraLength, "m"),
        beamlineConfig.wavelength.to("m")
      )
    );
  }
  if (scaleFactor == null) {
    return scaleFactor;
  }

  if (typeof scaleFactor == "number" || !("units" in scaleFactor)) {
    throw TypeError("scaleFactor should be a unit not a number");
  }

  return scaleFactor;
}
export function useBeamlineConfig() {
  return useBeamlineConfigStore<BeamlineConfig>((state) => {
    return {
      angle: state.angle,
      cameraLength: state.cameraLength,
      minWavelength: state.minWavelength,
      maxWavelength: state.maxWavelength,
      minCameraLength: state.minCameraLength,
      maxCameraLength: state.maxCameraLength,
      cameraLengthStep: state.cameraLengthStep,
      wavelength: state.wavelength,
    };
  });
}
export function getReferencePoints(
  ptMin: Vector2,
  ptMax: Vector2,
  beamstop: Beamstop,
  cameraTube: CircularDevice
) {
  const minPoint: UnitVector = {
    x: mathjs.unit(ptMin.x, "m"),
    y: mathjs.unit(ptMin.y, "m"),
  };

  const maxPoint: UnitVector = {
    x: mathjs.unit(ptMax.x, "m"),
    y: mathjs.unit(ptMax.y, "m"),
  };

  const beamstopCentre: UnitVector = {
    x: mathjs.unit(beamstop.centre.x ?? NaN, "xpixel"),
    y: mathjs.unit(beamstop.centre.y ?? NaN, "ypixel"),
  };

  const cameraTubeCentre: UnitVector = {
    x: mathjs.unit(cameraTube.centre.x ?? NaN, "xpixel"),
    y: mathjs.unit(cameraTube.centre.y ?? NaN, "ypixel"),
  };
  return { beamstopCentre, cameraTubeCentre, minPoint, maxPoint };
}
export function createPlots(
  plotter: Plotter,
  beamstopCentre: UnitVector,
  beamstop: Beamstop,
  cameraTubeCentre: UnitVector,
  cameraTube: CircularDevice,
  detector: Detector,
  minPoint: UnitVector,
  maxPoint: UnitVector
) {
  const plotBeamstop = plotter.createPlotEllipse(
    beamstopCentre,
    beamstop.diameter,
    beamstopCentre
  );

  const plotCameraTube = plotter.createPlotEllipse(
    cameraTubeCentre,
    cameraTube.diameter,
    beamstopCentre
  );

  const plotClearance = plotter.createPlotEllipseClearance(
    beamstopCentre,
    beamstop.diameter,
    beamstop.clearance ?? 0,
    beamstopCentre
  );

  const plotDetector = plotter.createPlotRectangle(
    detector.resolution,
    beamstopCentre
  );

  const plotVisibleRange = plotter.createPlotRange(
    minPoint,
    maxPoint,
    beamstopCentre
  );
  return {
    plotDetector,
    plotBeamstop,
    plotClearance,
    plotCameraTube,
    plotVisibleRange,
  };
}
export function getRequestedRange(
  requestedRange: UnitRange,
  beamlineConfig: BeamlineConfig,
  beamstopCentre: UnitVector,
  plotRequestedRange: { start: Vector3; end: Vector3; },
  plotter: Plotter
) {
  const requestedMaxPt = getPointForQ(
    requestedRange.max,
    beamlineConfig.angle,
    mathjs.unit(beamlineConfig.cameraLength, "m"),
    beamlineConfig.wavelength,
    beamstopCentre
  );
  const requestedMinPt = getPointForQ(
    requestedRange.min,
    beamlineConfig.angle,
    mathjs.unit(beamlineConfig.cameraLength, "m"),
    beamlineConfig.wavelength,
    beamstopCentre
  );
  plotRequestedRange = plotter.createPlotRange(
    requestedMinPt,
    requestedMaxPt,
    beamstopCentre
  );
  return plotRequestedRange;
}
export function getRange(): (state: ResultStore) => UnitRange | null {
  return (state) => {
    if (!state.requestedMax || !state.requestedMin) {
      return null;
    }

    const getUnit = (value: number): mathjs.Unit => {
      let result: mathjs.Unit;
      switch (state.requested) {
        case ScatteringOptions.d:
          result = convertBetweenQAndD(mathjs.unit(value, state.dUnits));
          break;
        case ScatteringOptions.s:
          result = convertBetweenQAndS(mathjs.unit(value, state.sUnits));
          break;
        default:
          result = mathjs.unit(value, state.qUnits);
      }
      return result;
    };

    return new UnitRange(
      getUnit(state.requestedMin),
      getUnit(state.requestedMax)
    );
  };
}
