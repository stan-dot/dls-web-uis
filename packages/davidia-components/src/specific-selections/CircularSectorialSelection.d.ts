import { Vector3 } from 'three';
import BaseSelection from '../selection-components/BaseSelection.js';
import type { SelectionBase } from './utils.js';
/** export class to select a circular sector */
export default class CircularSectorialSelection extends BaseSelection {
    readonly defaultColour = "#117733";
    radii: [number, number];
    angles: [number, number];
    constructor(start: [number, number], radii: [number, number], angles: [number, number]);
    static clicks(): number[];
    static isShape(s: CircularSectorialSelection | SelectionBase): s is CircularSectorialSelection;
    static createFromPoints(points: Vector3[]): CircularSectorialSelection;
    static createFromSelection(s: CircularSectorialSelection): CircularSectorialSelection;
}
//# sourceMappingURL=CircularSectorialSelection.d.ts.map