import { Vector3 } from 'three';
import OrientableSelection from './OrientableSelection.js';
import type { SelectionBase } from './utils.js';
/** export class to select a line */
export default class LinearSelection extends OrientableSelection {
    readonly defaultColour = "#44aa99";
    length: number;
    constructor(start?: [number, number], length?: number, angle?: number);
    _getPoint(fraction?: number): Vector3;
    getPoints(): Vector3[];
    toString(): string;
    static clicks(): number[];
    static isShape(s: LinearSelection | SelectionBase): s is LinearSelection;
    _setFromPoints(points: Vector3[]): void;
    static createFromPoints(points: Vector3[]): LinearSelection;
    static createFromSelection(s: LinearSelection): LinearSelection;
    onHandleChange(i: number, pos: [number | undefined, number | undefined]): LinearSelection;
}
//# sourceMappingURL=LinearSelection.d.ts.map