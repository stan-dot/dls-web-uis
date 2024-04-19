import { Vector2, Vector3 } from "three";
import QSpace, { DetectorDynamicState } from "./qspace";
import { BeamlineParams, Beamstop, CameraTube, DetectorParams } from "../types";
import { SIRange } from "@repo/science";

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
  } = getRightUnits(beamProperties, beamstop, detector, cameraTube);

  // get initial position x and y
  const initialPositionX = mathjs.add(
    mathjs.multiply(clearanceWidth, mathjs.cos(beamProperties.angle)),
    beamcentreX
  );

  if (typeof initialPositionX === "number" || !("units" in initialPositionX)) {
    return defaultReturn;
  }

  const initialPositionY = mathjs.add(
    mathjs.multiply(clearanceHeight, mathjs.sin(beamProperties.angle)),
    beamcentreY
  );
  if (typeof initialPositionY === "number" || !("units" in initialPositionY)) {
    return defaultReturn;
  }

  const initialPosition = new Vector2(
    initialPositionX.toSI().toNumber(),
    initialPositionY.toSI().toNumber()
  );

  const rayDirection = new Vector2(
    mathjs.cos(beamProperties.angle),
    mathjs.sin(beamProperties.angle)
  );

  const ray = new Ray(rayDirection, initialPosition);

  let t1 = ray.getRectangleIntersectionParameterRange(
    new Vector2(0, detectorHeight.toSI().toNumber()),
    detectorWidth.toSI().toNumber(),
    detectorHeight.toSI().toNumber()
  );

  if (t1 === null) return defaultReturn;

  const cameraOk =
    cameraTube !== null && cameraTube.diameter.toSI().toNumber() != 0;

  if (cameraOk) {
    const radius = mathjs.divide(cameraTube.diameter, 2).toSI().toNumber();
    const centre = new Vector2(
      cameraTubeCentreX.toSI().toNumber(),
      cemeraTubeCentreY.toSI().toNumber()
    );
    t1 = t1.intersect(ray.getCircleIntersectionParameterRange(radius, centre));
  }

  if (t1 === null) return defaultReturn;

  // set up the min, max and qspace values
  const ptMin = ray.getPoint(t1.min);
  const ptMax = ray.getPoint(t1.max);

  const origin = new Vector3(
    beamcentreX.toSI().toNumber(),
    beamcentreY.toSI().toNumber(),
    cameraLength.toSI().toNumber()
  );

  const detProps: DetectorDynamicState = {
    origin,
    beamVector: new Vector3(0, 0, 1),
  };

  const qScale = 2 * Math.PI;

  const qspace = new QSpace(
    detector,
    detProps,
    beamProperties.wavelength.toSI().toNumber(),
    qScale
  );

  // get visible range
  const visibleQMin = qspace.qFromPixelPosition(ptMin);
  const visibleQMax = qspace.qFromPixelPosition(ptMax);

  // get the min
  detProps.origin.z = beamProperties.minCameraLength.toSI().toNumber();
  qspace.setDiffractionCrystalEnviroment(
    beamProperties.minWavelength.toSI().toNumber()
  );
  const fullQMin = qspace.qFromPixelPosition(ptMax);

  // get the max
  detProps.origin.z = beamProperties.maxCameraLength.toSI().toNumber();
  qspace.setDiffractionCrystalEnviroment(
    beamProperties.maxWavelength.toSI().toNumber()
  );
  const fullQMax = qspace.qFromPixelPosition(ptMin);

  const visibleQRange = new NumericRange(
    visibleQMin.length(),
    visibleQMax.length()
  );
  const fullQRange = new NumericRange(fullQMin.length(), fullQMax.length());

  return { ptMin, ptMax, visibleQRange, fullQRange };
}

function getRightUnits(
  beamProperties: BeamlineParams,
  beamstop: Beamstop,
  detector: DetectorParams,
  cameraTube: CameraTube
) {
  const cameraLength = mathjs.unit(beamProperties.cameraLength ?? NaN, "m");
  const clearanceWidth = mathjs.add(
    mathjs.unit(beamstop.clearance ?? NaN, "xpixel"),
    mathjs.divide(beamstop.diameter, 2)
  );
  const clearanceHeight = mathjs.add(
    mathjs.unit(beamstop.clearance ?? NaN, "ypixel"),
    mathjs.divide(beamstop.diameter, 2)
  );

  const beamcentreX = mathjs.unit(beamstop.centre.x ?? NaN, "xpixel");
  const beamcentreY = mathjs.unit(beamstop.centre.y ?? NaN, "ypixel");

  const detectorHeight = mathjs.unit(detector.resolution.height, "ypixel");
  const detectorWidth = mathjs.unit(detector.resolution.width, "xpixel");

  const cameraTubeCentreX = mathjs.unit(cameraTube.centre.x ?? NaN, "xpixel");
  const cemeraTubeCentreY = mathjs.unit(cameraTube.centre.y ?? NaN, "ypixel");

  return {
    clearanceWidth,
    beamcentreX,
    clearanceHeight,
    beamcentreY,
    detectorHeight,
    detectorWidth,
    cameraTubeCentreX,
    cemeraTubeCentreY,
    cameraLength,
  };
}