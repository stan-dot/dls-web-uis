import { Vector3 } from 'three';
import BaseSelection from '../selection-components/BaseSelection.js';
/** export class to make an axis selection */
export default class AxialSelection extends BaseSelection {
    constructor(start, length, dimension) {
        super(start);
        Object.defineProperty(this, "defaultColour", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: '#882255'
        }); // wine
        Object.defineProperty(this, "length", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dimension", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.length = length;
        this.dimension = dimension;
        this.colour = this.defaultColour;
    }
    _getPoint(fraction = 1) {
        const v = new Vector3(0, 0, 1);
        v.setComponent(this.dimension, this.length * fraction);
        return v.add(this.vStart);
    }
    getPoints() {
        return [this.vStart.clone(), this._getPoint()];
    }
    toString() {
        const e = this._getPoint();
        const d = this.dimension;
        return `Axis: ${this.start[d]}; ${this.length}; to ${e.getComponent(d)}`;
    }
    static clicks() {
        return [2, 2];
    }
    static isShape(s) {
        return 'dimension' in s;
    }
    _setFromPoints(points) {
        if (points.length < 2) {
            throw Error('need to provide two points to create axial selection');
        }
        const b = points[0];
        const e = points[1];
        const d = this.dimension;
        const bv = b.getComponent(d);
        const ev = e.getComponent(d);
        this.start = [0, 0];
        if (bv < ev) {
            this.start[d] = bv;
            this.length = ev - bv;
        }
        else {
            this.start[d] = ev;
            this.length = bv - ev;
        }
        this.vStart.setComponent(d, this.start[d]);
    }
    static createFromPoints(points, dimension) {
        if (points.length < 2) {
            throw Error('need to provide two points to create axial selection');
        }
        const b = points[0].getComponent(dimension);
        const e = points[1].getComponent(dimension);
        const l = e - b;
        const s = [0, 0];
        s[dimension] = l > 0 ? b : e;
        return new AxialSelection(s, Math.abs(l), dimension);
    }
    static createFromSelection(s) {
        const r = new AxialSelection([...s.start], s.length, s.dimension);
        r.setProperties(s);
        return r;
    }
    onHandleChange(i, pos) {
        const r = AxialSelection.createFromSelection(this);
        // handles are ordered as min,a_l; min,a_h; max,a_h; max,a_l; centre
        const d = this.dimension;
        if (i === 4) {
            const b = pos[d] ?? 0;
            const o = this._getPoint(0.5);
            const db = b - o.getComponent(d);
            const nb = r.start[d] + db;
            r.start[d] = nb;
            r.vStart.setComponent(d, nb);
            return r;
        }
        const c = pos[d] ?? 0;
        if (i < 2) {
            const ce = r.start[d] + r.length - c;
            if (ce >= 0) {
                r.start[d] = c;
                r.vStart.setComponent(d, c);
                r.length = ce;
            }
        }
        else {
            const cs = c - r.start[d];
            if (cs >= 0) {
                r.length = cs;
            }
        }
        return r;
    }
}
//# sourceMappingURL=AxialSelection.js.map