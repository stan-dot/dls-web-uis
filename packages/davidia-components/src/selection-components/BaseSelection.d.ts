/**
 * 2D selections
 *
 * @remark All points are [x,y], all angles in radians
 */
import { Vector3 } from 'three';
import type { SelectionBase } from '../specific-selections/utils.js';
/** export class for all selections */
export default class BaseSelection implements SelectionBase {
    id: string;
    name: string;
    colour?: string;
    alpha: number;
    fixed: boolean;
    start: [number, number];
    asDashed?: boolean;
    vStart: Vector3;
    constructor(start: [number, number]);
    toString(): string;
    getPoints(): Vector3[];
    setProperties(other: BaseSelection): void;
    setName(name: string): void;
    setFixed(fixed: boolean): void;
    static createFromSelection(s: BaseSelection): BaseSelection;
    onHandleChange(i: number, pos: [number | undefined, number | undefined]): BaseSelection;
    static isShape(s: BaseSelection | SelectionBase): s is BaseSelection;
}
//# sourceMappingURL=BaseSelection.d.ts.map