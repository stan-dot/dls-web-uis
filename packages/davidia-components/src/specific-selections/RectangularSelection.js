import { Vector3 } from 'three';
import OrientableSelection from './OrientableSelection.js';
/** export class to select a rectangle */
export default class RectangularSelection extends OrientableSelection {
    constructor(start, lengths, angle = 0) {
        super(start, angle);
        Object.defineProperty(this, "defaultColour", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: '#ddcc77'
        }); // sand
        Object.defineProperty(this, "lengths", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.lengths = [...lengths];
        this.colour = this.defaultColour;
    }
    getPoints() {
        const a = new Array(5).fill(null, 0, 5);
        return a
            .map((_v, i) => this.getPoint(i))
            .filter((v) => v !== null);
    }
    getPoint(i) {
        let v = null;
        switch (i) {
            case 0:
                v = new Vector3(0, 0, 1);
                break;
            case 1:
                v = new Vector3(this.lengths[0], 0, 1);
                break;
            case 2:
                v = new Vector3(...this.lengths, 1);
                break;
            case 3:
                v = new Vector3(0, this.lengths[1], 1);
                break;
            case 4:
                v = new Vector3(this.lengths[0] * 0.5, this.lengths[1] * 0.5, 1);
                break;
            default:
                return null;
        }
        return v.applyMatrix3(this.transform).add(this.vStart);
    }
    toString() {
        const e = this.getPoint(2);
        return `Rect: ${this.start.toString()}; ${this.lengths.toString()};
     ${this.angle * (180 / Math.PI)}; to ${e?.x ?? '='},${e?.y ?? '='}`;
    }
    static clicks() {
        return [2, 2];
    }
    static isShape(s) {
        return 'lengths' in s;
    }
    static createFromPoints(axesFlipped, points) {
        if (points.length < 2) {
            throw Error('not enough points');
        }
        const b = points[0].clone();
        const l = new Vector3().subVectors(points[1], b);
        let a = 0;
        const dx = l.x;
        const dy = l.y;
        if (dx < 0 !== axesFlipped[0]) {
            l.x = -dx;
            if (dy < 0 !== axesFlipped[1]) {
                a = Math.PI;
                l.y = -dy;
            }
            else {
                a = Math.PI / 2;
                l.y = l.x;
                l.x = dy;
            }
        }
        else {
            if (dy < 0 !== axesFlipped[1]) {
                a = -Math.PI / 2;
                l.y = l.x;
                l.x = -dy;
            }
        }
        const r = new RectangularSelection([b.x, b.y], [l.x, l.y], a);
        return r;
    }
    static createFromSelection(s) {
        const r = new RectangularSelection([...s.start], [...s.lengths], s.angle);
        r.setProperties(s);
        return r;
    }
    onHandleChange(i, pos) {
        const r = RectangularSelection.createFromSelection(this);
        const o = this.getPoint(i);
        if (o !== null) {
            const x = pos[0] ?? 0;
            const y = pos[1] ?? 0;
            if (i === 4) {
                const d = new Vector3(x, y).sub(o);
                const s = r.vStart;
                s.x += d.x;
                s.y += d.y;
                r.start[0] = s.x;
                r.start[1] = s.y;
                return r;
            }
            const d = new Vector3(x, y).sub(o).applyMatrix3(this.invTransform);
            const [rx, ry] = r.lengths;
            // limit start point to interior of current rectangle and new lengths are non-negative
            let lx, ly;
            if (i !== 2) {
                lx = Math.max(0, rx - d.x);
                ly = Math.max(0, ry - d.y);
            }
            else {
                lx = Math.max(0, rx + d.x);
                ly = Math.max(0, ry + d.y);
            }
            let p = undefined;
            switch (i) {
                case 0:
                    p = new Vector3(rx - lx, ry - ly);
                    break;
                case 1:
                    p = new Vector3(0, ry - ly);
                    lx = Math.max(0, rx + d.x);
                    break;
                case 2:
                    break;
                case 3:
                    p = new Vector3(rx - lx);
                    ly = Math.max(0, ry + d.y);
                    break;
            }
            if (p !== undefined) {
                p.applyMatrix3(this.transform).add(this.vStart);
                r.start[0] = p.x;
                r.start[1] = p.y;
                r.vStart.x = p.x;
                r.vStart.y = p.y;
            }
            r.lengths[0] = lx;
            r.lengths[1] = ly;
        }
        return r;
    }
}
//# sourceMappingURL=RectangularSelection.js.map