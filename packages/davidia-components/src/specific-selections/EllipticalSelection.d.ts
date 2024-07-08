import { Vector3 } from 'three';
import OrientableSelection from './OrientableSelection.js';
import type { SelectionBase } from './utils.js';
/** export class to select an ellipse */
export default class EllipticalSelection extends OrientableSelection {
    readonly defaultColour = "#999933";
    semi_axes: [number, number];
    constructor(start: [number, number], semi_axes: [number, number], angle?: number);
    static clicks(): number[];
    static isShape(s: EllipticalSelection | SelectionBase): s is EllipticalSelection;
    static createFromPoints(points: Vector3[]): EllipticalSelection;
    static createFromSelection(s: EllipticalSelection): EllipticalSelection;
}
//# sourceMappingURL=EllipticalSelection.d.ts.map