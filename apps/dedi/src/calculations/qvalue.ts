import { Vector2 } from "three";
import { SIUnit } from "@repo/science/SIUnit";

type UnitVector = { x: SIUnit; y: SIUnit };


const calculateDistanceFromQValue = (
  qValue: number,
  cameraLength: number,
  wavelength: number
): number | null => {
  if (qValue < 0 || cameraLength < 0 || wavelength < 0) {
    return null;
  }
  const temp = (wavelength * qValue) / (4 * Math.PI);
  if (Math.abs(temp) >= Math.sqrt(2) / 2) {
    return null;
  }
  return Math.tan(2 * Math.asin(temp)) * cameraLength;
};

/**
 *  convert into numbers then get result
 * @param qValue
 * @param angle
 * @param cameralength
 * @param wavelength
 * @param beamstopCentre
 * @returns
 */
export const getPointForQ = (
  qValue: SIUnit,
  angle: SIUnit,
  cameralength: SIUnit,
  wavelength: SIUnit,
  beamstopCentre: UnitVector
): UnitVector => {

  const relevantThings: SIUnit[] = [
    qValue,
    cameralength,
    wavelength,
    angle,
    beamstopCentre.x,
    beamstopCentre.y,
  ];

  const [q, c, v, a, beamX, beamY] = relevantThings.map((i) =>
    i.value
  );

  const ray = new Ray(
    new Vector2(Math.cos(a), Math.sin(a)),
    new Vector2(beamX, beamY)
  );

  const distance = calculateDistanceFromQValue(q, c, v) ?? 0;

  const result = ray.getPointAtDistance(distance);
  const x = SIUnit(result.x, "m");
  const y = SIUnit(result.y, "m");
  return { x, y };
};
