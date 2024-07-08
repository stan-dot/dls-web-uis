/**
 * 2D selections
 *
 * @remark All points are [x,y], all angles in radians
 */
import { Vector3 } from 'three';
/** export class for all selections */
export default class BaseSelection {
    constructor(start) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "colour", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "alpha", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0.3
        });
        Object.defineProperty(this, "fixed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "start", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "asDashed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "vStart", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.id = crypto.randomUUID().slice(-8); // use last 8 characters only
        this.start = start;
        this.vStart = new Vector3(...start);
    }
    toString() {
        return '';
    }
    getPoints() {
        return [this.vStart.clone()];
    }
    setProperties(other) {
        this.id = other.id;
        this.name = other.name;
        this.colour = other.colour;
        this.alpha = other.alpha;
        this.asDashed = other.asDashed;
        this.fixed = other.fixed;
    }
    setName(name) {
        this.name = name;
    }
    setFixed(fixed) {
        this.fixed = fixed;
    }
    static createFromSelection(s) {
        const l = new BaseSelection([...s.start]);
        l.setProperties(s);
        return l;
    }
    onHandleChange(i, pos) {
        console.debug('base: oHC', i, pos);
        if (i === 0) {
            const b = BaseSelection.createFromSelection(this);
            const x = pos[0];
            if (x !== undefined) {
                b.start[0] = x;
                b.vStart.x = x;
            }
            const y = pos[1];
            if (y !== undefined) {
                b.start[1] = y;
                b.vStart.y = y;
            }
            return b;
        }
        return this;
    }
    static isShape(s) {
        return 'vStart' in s;
    }
}
//# sourceMappingURL=BaseSelection.js.map