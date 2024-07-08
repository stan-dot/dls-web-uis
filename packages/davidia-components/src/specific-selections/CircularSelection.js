import BaseSelection from '../selection-components/BaseSelection.js';
/** export class to select a circle */
export default class CircularSelection extends BaseSelection {
    constructor(start, radius) {
        super(start);
        Object.defineProperty(this, "defaultColour", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: '#332288'
        }); // indigo
        Object.defineProperty(this, "radius", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.radius = radius;
        this.colour = this.defaultColour;
    }
    static clicks() {
        return [2, 2];
    }
    static isShape(s) {
        return 'radius' in s;
    }
    static createFromPoints(points) {
        if (points.length < 2) {
            throw Error('not enought points provided');
        }
        const [c, e] = points;
        return new CircularSelection([c.x, c.y], Math.hypot(e.x, e.y));
    }
    static createFromSelection(s) {
        const c = new CircularSelection([...s.start], s.radius);
        c.setProperties(s);
        return c;
    }
}
//# sourceMappingURL=CircularSelection.js.map