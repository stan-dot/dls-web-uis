import { Vector3 } from 'three';
import BaseSelection from '../selection-components/BaseSelection.js';
import type { SelectionBase } from './utils.js';

/** export class to select a circle */
export default class CircularSelection extends BaseSelection {
  readonly defaultColour = '#332288'; // indigo
  radius: number;
  constructor(start: [number, number], radius: number) {
    super(start);
    this.radius = radius;
    this.colour = this.defaultColour;
  }

  static clicks() {
    return [2, 2];
  }

  static override isShape(
    s: CircularSelection | SelectionBase
  ): s is CircularSelection {
    return 'radius' in s;
  }

  static createFromPoints(points: Vector3[]) {
    if(points.length < 2){
      throw Error('not enought points provided')
    }
    const [c, e] = points;
    return new CircularSelection([c.x, c.y], Math.hypot(e.x, e.y));
  }

  static override createFromSelection(s: CircularSelection) {
    const c = new CircularSelection([...s.start], s.radius);
    c.setProperties(s);
    return c;
  }
}
