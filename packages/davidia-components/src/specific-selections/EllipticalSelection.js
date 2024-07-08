import { Vector3 } from 'three';
import { polar } from './utils.js';
import OrientableSelection from './OrientableSelection.js';
/** export class to select an ellipse */
export default class EllipticalSelection extends OrientableSelection {
    constructor(start, semi_axes, angle = 0) {
        super(start, angle);
        Object.defineProperty(this, "defaultColour", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: '#999933'
        }); // olive
        Object.defineProperty(this, "semi_axes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.semi_axes = semi_axes;
        this.colour = this.defaultColour;
    }
    static clicks() {
        return [2, 3];
    }
    static isShape(s) {
        return 'semi_axes' in s;
    }
    static createFromPoints(points) {
        if (points.length < 2) {
            throw Error('not enought points provided');
        }
        const c = points[0];
        const i = new Vector3().subVectors(points[1], c);
        if (points.length < 3) {
            return new EllipticalSelection([c.x, c.y], [Math.abs(i.x), Math.abs(i.y)]);
        }
        const pi = polar(i);
        const si = pi[0];
        const o = new Vector3().subVectors(points[2], c);
        const so = Math.hypot(o.x, o.y);
        const ss = si < so ? [si, so] : [so, si];
        return new EllipticalSelection([c.x, c.y], ss, pi[1]);
    }
    static createFromSelection(s) {
        const e = new EllipticalSelection([...s.start], [...s.semi_axes]);
        e.setProperties(s);
        return e;
    }
}
//# sourceMappingURL=EllipticalSelection.js.map