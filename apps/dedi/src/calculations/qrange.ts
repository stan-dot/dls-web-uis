import { Vector2, Vector3 } from "three";
import QSpace, { DetectorDynamicState } from "./qspace";
import { BeamlineParams, Beamstop, CameraTube, DetectorParams } from "../types";
import { Ray, SIRange, SIUnit } from "@repo/science";

// convert pixel values to mm
const defaultReturn = {
  ptMin: new Vector2(0, 0),
  ptMax: new Vector2(0, 0),
  visibleQRange: null,
  fullQRange: null,
};

// todo suggestion: this function is quite big.
// I created blocks in it with comments (not the only way to do this)
export function computeQrange(
  detector: DetectorParams,
  beamstop: Beamstop,
  cameraTube: CameraTube,
  beamProperties: BeamlineParams
): {
  ptMin: Vector2;
  ptMax: Vector2;
  visibleQRange: SIRange | null;
  fullQRange: SIRange | null;
} {
  const {
    clearanceWidth,
    beamcentreX,
    clearanceHeight,
    beamcentreY,
    detectorHeight,
    detectorWidth,
    cameraTubeCentreX,
    cemeraTubeCentreY,
    cameraLength,
  } = extractUnits(beamProperties, beamstop, detector, cameraTube);

  // get initial position x and y
  const initialPositionX = new SIUnit(
    clearanceWidth * Math.cos(beamProperties.angle) + beamcentreX,
    "m"
  );
  // const initialPositionX = mathjs.add(
  //   mathjs.multiply(clearanceWidth, mathjs.cos(beamProperties.angle)),
  //   beamcentreX
  // );

  // if (typeof initialPositionX === "number" || !("units" in initialPositionX)) {
  //   return defaultReturn;
  // }
  const initialPositionY = new SIUnit(
    clearanceHeight * Math.sin(beamProperties.angle) + beamcentreY,
    "m"
  );

  // const initialPositionY = mathjs.add(
  //   mathjs.multiply(clearanceHeight, mathjs.sin(beamProperties.angle)),
  //   beamcentreY
  // );
  // if (typeof initialPositionY === "number" || !("units" in initialPositionY)) {
  //   return defaultReturn;
  // }

  const initialPosition = new Vector2(
    initialPositionX.value,
    initialPositionY.value
  );

  const rayDirection = new Vector2(
    Math.cos(beamProperties.angle),
    Math.sin(beamProperties.angle)
  );

  const ray = new Ray(rayDirection, initialPosition);

  let t1: SIRange | null = ray.getRectangleIntersectionParameterRange(
    new Vector2(0, detectorHeight),
    detectorWidth,
    detectorHeight
  );

  if (t1 === null) return defaultReturn;

  const cameraOk = cameraTube !== null && cameraTube.diameter.value != 0;

  if (cameraOk) {
    const radius = cameraTube.diameter.value / 2;
    const centre = new Vector2(cameraTubeCentreX, cemeraTubeCentreY);
    const t2 = ray.getCircleIntersectionParameterRange(radius, centre);
    t1 = t1.intersection(t2);
  }

  if (t1 === null) return defaultReturn;

  // set up the min, max and qspace values
  const ptMin = ray.getPoint(t1.min.value);
  const ptMax = ray.getPoint(t1.max.value);

  const origin = new Vector3(beamcentreX, beamcentreY, cameraLength);

  const detProps: DetectorDynamicState = {
    origin,
    beamVector: new Vector3(0, 0, 1),
  };

  const qspace = new QSpace(detector, detProps, beamProperties.wavelength);

  // get visible range
  const visibleQMin = qspace.qFromPixelPosition(ptMin);
  const visibleQMax = qspace.qFromPixelPosition(ptMax);

  // get the min
  detProps.origin.z = beamProperties.minCameraLength;

  qspace.setDiffractionCrystalEnviroment(beamProperties.minWavelength);
  const fullQMin = qspace.qFromPixelPosition(ptMax);

  // get the max
  detProps.origin.z = beamProperties.maxCameraLength;
  qspace.setDiffractionCrystalEnviroment(
    beamProperties.maxWavelength.toSI().toNumber()
  );
  const fullQMax = qspace.qFromPixelPosition(ptMin);

  const visibleQRange = new SIRange(
    new SIUnit(visibleQMin.length(), "m"), // todo fix units
    new SIUnit(visibleQMax.length(), "m") // todo fix units
  );
  const fullQRange = new SIRange(
    new SIUnit(fullQMin.length(), "m"), // todo fix units
    new SIUnit(fullQMax.length(), "m") // todo fix units
  );

  return { ptMin, ptMax, visibleQRange, fullQRange };
}

type RightUnits = {
  clearanceWidth: number;
  beamcentreX: number;
  clearanceHeight: number;
  beamcentreY: number;
  detectorHeight: number;
  detectorWidth: number;
  cameraTubeCentreX: number;
  cemeraTubeCentreY: number;
  cameraLength: number;
};

function extractUnits(
  beamProperties: BeamlineParams,
  beamstop: Beamstop,
  detector: DetectorParams,
  cameraTube: CameraTube
): RightUnits {
  const clearanceWidth: number =
    beamstop.diameter.value / 2 + beamstop.clearance;

  const clearanceHeight: number =
    beamstop.diameter.value / 2 + beamstop.clearance;

  return {
    clearanceWidth,
    clearanceHeight,
    beamcentreX: beamstop.centre.x ?? 0,
    beamcentreY: beamstop.centre.y ?? 0,
    detectorHeight: detector.resolution.height.value ?? 0,
    detectorWidth: detector.resolution.width.value ?? 0,
    cameraTubeCentreX: cameraTube.centre.x ?? 0,
    cemeraTubeCentreY: cameraTube.centre.x ?? 0,
    cameraLength: beamProperties.cameraLength,
  };
}
