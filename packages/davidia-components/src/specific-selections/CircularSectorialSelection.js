import { Vector3 } from 'three';
import { polar } from './utils.js';
import BaseSelection from '../selection-components/BaseSelection.js';
/** export class to select a circular sector */
export default class CircularSectorialSelection extends BaseSelection {
    constructor(start, radii, angles) {
        super(start);
        Object.defineProperty(this, "defaultColour", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: '#117733'
        }); // green
        Object.defineProperty(this, "radii", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "angles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.radii = radii;
        this.angles = angles;
        this.colour = this.defaultColour;
    }
    static clicks() {
        return [2, 3];
    }
    static isShape(s) {
        return 'radii' in s;
    }
    static createFromPoints(points) {
        if (points.length < 2) {
            throw Error('need to provide two points to create axial selection');
        }
        const c = points[0];
        const i = new Vector3().subVectors(points[1], c);
        const pi = polar(i);
        const ri = pi[0];
        const ai = pi[1];
        let ro = ri;
        let ao = ai;
        if (points.length > 2) {
            const o = new Vector3().subVectors(points[2], c);
            const po = polar(o);
            ro = po[0];
            ao = po[1];
        }
        const rs = ri < ro ? [ri, ro] : [ro, ri];
        const as = ai < ao ? [ai, ao] : [ao, ai];
        return new CircularSectorialSelection([c.x, c.y], rs, as);
    }
    static createFromSelection(s) {
        const cs = new CircularSectorialSelection([...s.start], [...s.radii], [...s.angles]);
        cs.setProperties(s);
        return cs;
    }
}
//# sourceMappingURL=CircularSectorialSelection.js.map