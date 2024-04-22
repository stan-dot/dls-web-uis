import { SIRange, SIUnit } from "@repo/science";
import { RGBColor } from "react-color";
import { Vector3 } from "three";

// Re think in future
export const getDomains = (
  detector: PlotRectangle
): { xAxis: SIRange; yAxis: SIRange } => {
  const maxAxis =
    detector.upperBound.x > detector.upperBound.y
      ? detector.upperBound.x
      : detector.upperBound.y;

  const minAxis =
    detector.lowerBound.x < detector.lowerBound.y
      ? detector.lowerBound.x
      : detector.lowerBound.y;

  const offset = 0.2 * (maxAxis - minAxis);

  const min = Math.round(minAxis - offset);
  const max = Math.round(maxAxis + offset);
  const range = new SIRange(min, max);
  return { xAxis: range, yAxis: range };
};

export const color2String = (color: RGBColor) => {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
};

export interface PlotEllipse {
  centre: Vector3;
  endPointX: Vector3;
  endPointY: Vector3;
}

export interface UnitVector {
  x: SIUnit;
  y: SIUnit;
}

export interface PlotRectangle {
  upperBound: Vector3;
  lowerBound: Vector3;
}

export interface PlotRange {
  start: Vector3;
  end: Vector3;
}
