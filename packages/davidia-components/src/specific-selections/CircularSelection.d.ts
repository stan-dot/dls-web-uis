import { Vector3 } from 'three';
import BaseSelection from '../selection-components/BaseSelection.js';
import type { SelectionBase } from './utils.js';
/** export class to select a circle */
export default class CircularSelection extends BaseSelection {
    readonly defaultColour = "#332288";
    radius: number;
    constructor(start: [number, number], radius: number);
    static clicks(): number[];
    static isShape(s: CircularSelection | SelectionBase): s is CircularSelection;
    static createFromPoints(points: Vector3[]): CircularSelection;
    static createFromSelection(s: CircularSelection): CircularSelection;
}
//# sourceMappingURL=CircularSelection.d.ts.map