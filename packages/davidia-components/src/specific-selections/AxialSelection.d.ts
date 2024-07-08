import { Vector3 } from 'three';
import BaseSelection from '../selection-components/BaseSelection.js';
import type { SelectionBase } from './utils.js';
/** export class to make an axis selection */
export default class AxialSelection extends BaseSelection {
    readonly defaultColour = "#882255";
    length: number;
    dimension: number;
    constructor(start: [number, number], length: number, dimension: number);
    _getPoint(fraction?: number): Vector3;
    getPoints(): Vector3[];
    toString(): string;
    static clicks(): number[];
    static isShape(s: AxialSelection | SelectionBase): s is AxialSelection;
    _setFromPoints(points: Vector3[]): void;
    static createFromPoints(points: Vector3[], dimension: number): AxialSelection;
    static createFromSelection(s: AxialSelection): AxialSelection;
    onHandleChange(i: number, pos: [number | undefined, number | undefined]): AxialSelection;
}
//# sourceMappingURL=AxialSelection.d.ts.map