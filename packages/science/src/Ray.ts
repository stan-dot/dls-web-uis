import { Vector2 } from "three";
import SIRange from "./SIRange";
import SIUnit from "./SIUnit";

// todo this or pixels?
const rayUnit: string = "mm";

/**
 * A class which represents a (geometrical) ray.
 */
export class Ray {
  direction: Vector2;
  initial_point: Vector2;

  constructor(direction: Vector2, initial_point: Vector2) {
    if (direction.length() == 0)
      throw TypeError(
        "The direction vector of a ray cannot be the zero vector."
      );
    this.direction = direction;
    this.initial_point = initial_point;
  }

  /**
   * The point on the ray that corresponds to the given scalar.
   * @param scalar - given scalar value
   * @returns - point on the ray
   */
  public getPoint(scalar: number): Vector2 {
    const result = new Vector2(this.direction.x, this.direction.y);
    result.multiplyScalar(scalar);
    result.add(this.initial_point);
    return result;
  }

  /**
   * Get the point at a given distance from the initial point
   * @param distance - given distance
   * @returns - point on the
   */
  getPointAtDistance(distance: number): Vector2 {
    return this.getPoint(distance / this.direction.length());
  }

  /**
   * Gets the Numeric range of the scalars
   * of the intersection points of this ray and a circle.
   * @param radius - radius of the circle
   * @param centre - centre of the circle
   * @returns - NumericRange of the intersection scalars
   */
  public getCircleIntersectionParameterRange(
    radius: number,
    centre: Vector2
  ): SIRange | null {
    const diff = this.initial_point.clone().add(centre.multiplyScalar(-1));
    const a = this.direction.dot(this.direction);
    const b = 2 * diff.dot(this.direction);
    const c = diff.dot(diff) - Math.pow(radius, 2);
    const discriminant = Math.pow(b, 2) - 4 * a * c;

    if (discriminant < 0) return null;

    let t1: number;
    let t2: number;

    if (a == 0) {
      if (b == 0) return c == 0 ? SIRange.ZERO_TO_INFINITY : null;
      t1 = -c / b;
      t2 = -c / b;
    } else {
      t1 = (0.5 * (-b - Math.sqrt(discriminant))) / a;
      t2 = (0.5 * (-b + Math.sqrt(discriminant))) / a;
    }
    const range = new SIRange(new SIUnit(t1, rayUnit), new SIUnit(t2, rayUnit));

    return range.restrictToPositive();
  }

  /**
   * Get the scalars of the intersection points of a rectangle with the ray
   * @param topLeftCorner - top ledt corner of rectangle
   * @param width - width of rectangle
   * @param height - height of rectangle
   * @returns - NumericRange of the scalars
   */
  public getRectangleIntersectionParameterRange(
    topLeftCorner: Vector2,
    width: number,
    height: number
  ): SIRange | null {
    let result: SIRange | null;

    const xmax = topLeftCorner.x + width;
    const xmin = topLeftCorner.x;

    if (this.direction.x === 0) {
      const xRange = new NumericRange(xmin, xmax);
      if (!xRange.containsValue(this.initial_point.x)) return null;
      result = SIRange.ZERO_TO_INFINITY;
    } else
      result = new SIRange(
        new SIUnit((xmin - this.initial_point.x) / this.direction.x, rayUnit),
        new SIUnit((xmax - this.initial_point.x) / this.direction.x, rayUnit)
      );

    const ymax: number = topLeftCorner.y;
    const ymin: number = topLeftCorner.y - height;
    if (this.direction.y == 0) {
      const yRange = new SIRange(
        new SIUnit(ymin, rayUnit),
        new SIUnit(ymax, rayUnit)
      );
      const initial_y = new SIUnit(this.initial_point.y, rayUnit);
      if (!yRange.containsValue(initial_y)) return null;
      return result.restrictToPositive();
    }

    result = result.intersection(
      new SIRange(
        new SIUnit((ymin - this.initial_point.y) / this.direction.y, rayUnit),
        new SIUnit((ymax - this.initial_point.y) / this.direction.y, rayUnit)
      )
    );

    if (result == null) return null;

    return result.restrictToPositive();
  }
}
