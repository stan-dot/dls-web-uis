import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { DvdDragHandle } from './DvdDragHandle.js';
import { Vector3 } from 'three';
function generateInitialPoints(axis, cMin, size, cMax) {
    if (axis === 0) {
        return [
            new Vector3(cMin, size.height),
            new Vector3(cMin, 0),
            new Vector3(cMax, 0),
            new Vector3(cMax, size.height),
            new Vector3((cMin + cMax) / 2, size.height / 2),
        ];
    }
    return [
        new Vector3(0, cMax),
        new Vector3(size.width, cMax),
        new Vector3(size.width, cMin),
        new Vector3(0, cMin),
        new Vector3(size.width / 2, (cMin + cMax) / 2),
    ];
}
// todo
function useCustomDragHandles(points, size, onHandleChange, axis, svgProps) {
    return useMemo(() => {
        const handles = points.map((c, i) => {
            const name = `'axisbox-drag-${i}`;
            return (_jsx(DvdDragHandle, { name: name, size: size, i: i, nx: c.x, ny: c.y, onHandleChange: onHandleChange, restrictX: axis !== 0, restrictY: axis === 0, ...svgProps }, name));
        });
        return handles;
    }, [points, size, onHandleChange, axis, svgProps]);
}
function DvdAxisBox({ size, coords, isFixed, axis, onHandleChange, ...svgProps }) {
    if (coords.length !== 2) {
        throw Error('must provide exactly two coordinates for the box');
    }
    const values = [coords[0].getComponent(axis), coords[1].getComponent(axis)];
    if (values.length !== 2) {
        throw Error('must provide exactly two values for the box');
    }
    const cMin = Math.min(values[0], values[1]);
    const cMax = Math.max(values[0], values[1]);
    const points = generateInitialPoints(axis, cMin, size, cMax);
    const drag_handles = useCustomDragHandles(points, size, onHandleChange, axis, svgProps);
    points.pop(); // remove centre handle // why?
    const pts = useMemo(() => points.map((c) => `${c.x},${c.y}`).join(' '), [points]);
    return (_jsxs(_Fragment, { children: [_jsx("polygon", { points: pts, ...svgProps, stroke: "none" }), !isFixed && drag_handles, axis === 0 && (_jsxs(_Fragment, { children: [_jsx("line", { x1: cMin, y1: 0, x2: cMin, y2: size.height, stroke: svgProps.fill, strokeDasharray: svgProps.strokeDasharray }), _jsx("line", { x1: cMax, y1: 0, x2: cMax, y2: size.height, stroke: svgProps.fill, strokeDasharray: svgProps.strokeDasharray })] })), axis !== 0 && (_jsxs(_Fragment, { children: [_jsx("line", { x1: 0, y1: cMin, x2: size.width, y2: cMin, stroke: svgProps.fill, strokeDasharray: svgProps.strokeDasharray }), _jsx("line", { x1: 0, y1: cMax, x2: size.width, y2: cMax, stroke: svgProps.fill, strokeDasharray: svgProps.strokeDasharray })] }))] }));
}
export default DvdAxisBox;
//# sourceMappingURL=DvdAxisBox.js.map