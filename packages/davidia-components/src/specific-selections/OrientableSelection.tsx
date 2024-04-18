import { Matrix3 } from '../../node_modules/@types/three/index.js';
import BaseSelection from '../selection-components/BaseSelection.js';
import type { SelectionBase } from './utils.js';

/** export class for all orientable selections */
export default class OrientableSelection extends BaseSelection {
  angle: number;
  transform: Matrix3;
  invTransform: Matrix3;
  constructor(start: [number, number], angle = 0) {
    super(start);
    this.angle = angle;
    this.transform = new Matrix3().identity().rotate(-this.angle);
    this.invTransform = new Matrix3().identity().rotate(this.angle);
  }

  setAngle(angle: number) {
    this.angle = angle;
    this.transform = new Matrix3().identity().rotate(-this.angle);
    this.invTransform = new Matrix3().identity().rotate(this.angle);
  }

  static override isShape(
    s: OrientableSelection | SelectionBase
  ): s is OrientableSelection {
    return 'transform' in s;
  }
}
