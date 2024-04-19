import { Vector3 } from 'three';
import { polar } from './utils.js';
import OrientableSelection from './OrientableSelection.js';
import type { SelectionBase } from './utils.js';

/** export class to select an ellipse */
export default class EllipticalSelection extends OrientableSelection {
  readonly defaultColour = '#999933'; // olive
  semi_axes: [number, number];
  constructor(start: [number, number], semi_axes: [number, number], angle = 0) {
    super(start, angle);
    this.semi_axes = semi_axes;
    this.colour = this.defaultColour;
  }

  static clicks() {
    return [2, 3];
  }

  static override isShape(
    s: EllipticalSelection | SelectionBase
  ): s is EllipticalSelection {
    return 'semi_axes' in s;
  }

  static createFromPoints(points: Vector3[]) {
    if (points.length < 2) {
      throw Error('not enought points provided')
    }
    const c = points[0]!;
    const i = new Vector3().subVectors(points[1]!, c);
    if (points.length < 3) {
      return new EllipticalSelection(
        [c.x, c.y],
        [Math.abs(i.x), Math.abs(i.y)]
      );
    }
    const pi = polar(i);
    const si = pi[0];
    const o = new Vector3().subVectors(points[2]!, c);
    const so = Math.hypot(o.x, o.y);
    const ss = si < so ? [si, so] : [so, si];

    return new EllipticalSelection([c.x, c.y], ss as [number, number], pi[1]);
  }

  static override createFromSelection(s: EllipticalSelection) {
    const e = new EllipticalSelection([...s.start], [...s.semi_axes]);
    e.setProperties(s);
    return e;
  }
}
