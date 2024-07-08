import { Vector3 } from 'three';
import BaseSelection from '../selection-components/BaseSelection.js';
import type { SelectionBase } from './utils.js';
/** export class to select a polygon */
export default class PolygonalSelection extends BaseSelection {
    readonly defaultOpenColour = "#88ccee";
    readonly defaultClosedColour = "#ffa07a";
    readonly defaultColour = "#88ccee";
    points: [number, number][];
    closed: boolean;
    constructor(points: [number, number][], closed?: boolean);
    getPoints(): Vector3[];
    getPoint(i: number): Vector3 | null;
    static clicks(): number[];
    static isShape(s: PolygonalSelection | SelectionBase): s is PolygonalSelection;
    static createFromPoints(closed: boolean, points: Vector3[]): PolygonalSelection;
    static createFromSelection(s: PolygonalSelection): PolygonalSelection;
    onHandleChange(i: number, pos: [number | undefined, number | undefined]): PolygonalSelection;
}
//# sourceMappingURL=PolygonalSelection.d.ts.map