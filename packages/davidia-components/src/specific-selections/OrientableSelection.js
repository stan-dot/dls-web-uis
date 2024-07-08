import { Matrix3 } from 'three';
import BaseSelection from '../selection-components/BaseSelection.js';
/** export class for all orientable selections */
export default class OrientableSelection extends BaseSelection {
    constructor(start, angle = 0) {
        super(start);
        Object.defineProperty(this, "angle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "transform", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "invTransform", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.angle = angle;
        this.transform = new Matrix3().identity().rotate(-this.angle);
        this.invTransform = new Matrix3().identity().rotate(this.angle);
    }
    setAngle(angle) {
        this.angle = angle;
        this.transform = new Matrix3().identity().rotate(-this.angle);
        this.invTransform = new Matrix3().identity().rotate(this.angle);
    }
    static isShape(s) {
        return 'transform' in s;
    }
}
//# sourceMappingURL=OrientableSelection.js.map