import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Drag } from '@visx/drag';
function getRestrictOptions(restrictX, nx, restrictY, ny) {
    let restrict = {};
    if (restrictX) {
        restrict = { xMin: nx, xMax: nx };
    }
    if (restrictY) {
        restrict = { yMin: ny, yMax: ny, ...restrict };
    }
    return restrict;
}
const HANDLE_SIZE = 8;
function Handle(props) {
    const { n, nx, ny, i, drag, ...svgProps } = props;
    const handlers = useMemo(() => ({
        onPointerMove: drag?.dragMove,
        onPointerUp: drag &&
            ((e) => {
                e.stopPropagation();
                e.target.releasePointerCapture(e.pointerId);
                drag.dragEnd(e);
            }),
        onPointerDown: drag &&
            ((e) => {
                e.stopPropagation();
                e.target.setPointerCapture(e.pointerId);
                drag.dragStart(e);
            }),
    }), [drag]);
    const circleProps = useMemo(() => {
        if ('ref' in svgProps) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { ref, ...nProps } = svgProps; // remove legacy ref
            return nProps;
        }
        return svgProps;
    }, [svgProps]);
    return (_jsxs("g", { transform: `translate(${drag?.dx ?? 0}, ${drag?.dy ?? 0})`, style: { cursor: drag ? 'move' : undefined }, ...handlers, children: [_jsx("circle", { cx: nx, cy: ny, r: HANDLE_SIZE, pointerEvents: "visibleFill", ...circleProps, fill: drag?.isDragging ? 'white' : 'transparent', fillOpacity: drag?.isDragging ? 0.3 : 1.0, strokeWidth: 1 }, `${n}-handle-${i}`), _jsx("circle", { cx: nx, cy: ny, r: 2 * HANDLE_SIZE, fill: "transparent", fillOpacity: 0, stroke: "none" }, `${n}-handle-surround-${i}`)] }));
}
function DvdDragHandle(props) {
    const { name, size, i, nx, ny, onHandleChange, restrictX, restrictY, ...svgProps } = props;
    const restrict = getRestrictOptions(restrictX, nx, restrictY, ny);
    return (_jsx(Drag, { width: size.width, height: size.height, x: nx, y: ny, captureDragArea: true, onDragMove: ({ x, y, dx, dy }) => {
            onHandleChange?.(i, [(x ?? 0) + dx, (y ?? 0) + dy], false);
        }, onDragEnd: ({ x, y, dx, dy, isDragging }) => {
            console.debug('DE:', x, y, '; delta:', dx, dy, '; drag:', isDragging);
            onHandleChange?.(i, [(x ?? 0) + dx, (y ?? 0) + dy]);
        }, restrict: restrict, children: (dragState) => (_jsx(Handle, { n: name, i: i, nx: nx, ny: ny, drag: onHandleChange && dragState, ...svgProps })) }));
}
// eslint-disable-next-line react-refresh/only-export-components
export { DvdDragHandle, HANDLE_SIZE };
//# sourceMappingURL=DvdDragHandle.js.map