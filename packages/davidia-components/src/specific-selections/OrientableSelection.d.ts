import { Matrix3 } from 'three';
import BaseSelection from '../selection-components/BaseSelection.js';
import type { SelectionBase } from './utils.js';
/** export class for all orientable selections */
export default class OrientableSelection extends BaseSelection {
    angle: number;
    transform: Matrix3;
    invTransform: Matrix3;
    constructor(start: [number, number], angle?: number);
    setAngle(angle: number): void;
    static isShape(s: OrientableSelection | SelectionBase): s is OrientableSelection;
}
//# sourceMappingURL=OrientableSelection.d.ts.map