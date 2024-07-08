import { Vector3 } from 'three';
import OrientableSelection from './OrientableSelection.js';
import type { SelectionBase } from './utils.js';
/** export class to select a rectangle */
export default class RectangularSelection extends OrientableSelection {
    readonly defaultColour = "#ddcc77";
    lengths: [number, number];
    constructor(start: [number, number], lengths: [number, number], angle?: number);
    getPoints(): Vector3[];
    getPoint(i: number): Vector3 | null;
    toString(): string;
    static clicks(): number[];
    static isShape(s: RectangularSelection | SelectionBase): s is RectangularSelection;
    static createFromPoints(axesFlipped: [boolean, boolean], points: Vector3[]): RectangularSelection;
    static createFromSelection(s: RectangularSelection): RectangularSelection;
    onHandleChange(i: number, pos: [number | undefined, number | undefined]): RectangularSelection;
}
//# sourceMappingURL=RectangularSelection.d.ts.map