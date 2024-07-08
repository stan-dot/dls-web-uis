import { Vector3 } from 'three';
import BaseSelection from '../selection-components/BaseSelection.js';
/** export class to select a polygon */
export default class PolygonalSelection extends BaseSelection {
    constructor(points, closed) {
        if (points.length < 2) {
            throw Error('must provide at least 2 points');
        }
        super(points[0]);
        Object.defineProperty(this, "defaultOpenColour", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: '#88ccee'
        }); // cyan
        Object.defineProperty(this, "defaultClosedColour", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: '#ffa07a'
        }); // lightsalmon
        Object.defineProperty(this, "defaultColour", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.defaultOpenColour
        });
        Object.defineProperty(this, "points", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "closed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.points = points;
        this.closed = !!closed;
        this.colour = this.closed
            ? this.defaultClosedColour
            : this.defaultOpenColour;
    }
    getPoints() {
        const pts = this.points.map((p) => new Vector3(...p));
        const mid_pt = new Vector3();
        pts.forEach((p) => {
            mid_pt.add(p);
        });
        mid_pt.divideScalar(pts.length);
        const all_pts = [...pts, mid_pt];
        return all_pts;
    }
    getPoint(i) {
        const n = this.points.length;
        if (i < n) {
            const p = this.points[i];
            return new Vector3(p[0], p[1]);
        }
        if (i == n) {
            const mid_pt = new Vector3();
            this.points.forEach((p) => {
                mid_pt.add(new Vector3(p[0], p[1]));
            });
            mid_pt.divideScalar(n);
            return mid_pt;
        }
        return null;
    }
    static clicks() {
        return [2, -1];
    }
    static isShape(s) {
        return 'points' in s;
    }
    static createFromPoints(closed, points) {
        const p = new PolygonalSelection(points.map((p) => [p.x, p.y]), closed);
        return p;
    }
    static createFromSelection(s) {
        const p = new PolygonalSelection(s.points.map((p) => [...p]), s.closed);
        p.setProperties(s);
        return p;
    }
    onHandleChange(i, pos) {
        const poly = PolygonalSelection.createFromSelection(this);
        const n = this.points.length;
        if (i < n) {
            const p = this.points[i];
            poly.points[i] = [pos[0] ?? p[0], pos[1] ?? p[1]];
        }
        else if (i == n) {
            const b = this.getPoint(i);
            if (b) {
                const d = [(pos[0] ?? b.x) - b.x, (pos[1] ?? b.y) - b.y];
                poly.points.forEach((p, i) => {
                    poly.points[i] = [p[0] + d[0], p[1] + d[1]];
                });
            }
        }
        return poly;
    }
}
//# sourceMappingURL=PolygonalSelection.js.map