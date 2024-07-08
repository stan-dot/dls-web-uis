import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react-refresh/only-export-components */
/**
 * 2D selections
 *
 * @remark All points are [x,y], all angles in radians
 */
import { Box, DataToHtml, SvgElement, useVisCanvasContext, } from '@h5web/lib';
import { useThree } from '@react-three/fiber';
import { useCallback } from 'react';
import { Vector3 } from 'three';
import DvdAxisBox from '../shapes/DvdAxisBox.js';
import DvdPolyline from '../shapes/DvdPolyline.js';
import AxialSelection from './AxialSelection.js';
import CircularSelection from './CircularSelection.js';
import CircularSectorialSelection from './CircularSectorialSelection.js';
import EllipticalSelection from './EllipticalSelection.js';
import LinearSelection from './LinearSelection.js';
import PolygonalSelection from './PolygonalSelection.js';
import RectangularSelection from './RectangularSelection.js';
var SelectionType;
(function (SelectionType) {
    SelectionType["line"] = "line";
    SelectionType["rectangle"] = "rectangle";
    SelectionType["polyline"] = "polyline";
    SelectionType["polygon"] = "polygon";
    SelectionType["circle"] = "circle";
    SelectionType["ellipse"] = "ellipse";
    SelectionType["sector"] = "sector";
    SelectionType["horizontalAxis"] = "horizontalAxis";
    SelectionType["verticalAxis"] = "verticalAxis";
    SelectionType["unknown"] = "unknown";
})(SelectionType || (SelectionType = {}));
function polar(xy) {
    const x = xy.x;
    const y = xy.y;
    return [Math.hypot(y, x), Math.atan2(y, x)];
}
function getSelectionType(selection) {
    if (AxialSelection.isShape(selection)) {
        return selection.dimension === 0
            ? SelectionType.horizontalAxis
            : SelectionType.verticalAxis;
    }
    else if (RectangularSelection.isShape(selection)) {
        return SelectionType.rectangle;
    }
    else if (LinearSelection.isShape(selection)) {
        return SelectionType.line;
    }
    else if (PolygonalSelection.isShape(selection)) {
        return selection.closed ? SelectionType.polygon : SelectionType.polyline;
    }
    else if (EllipticalSelection.isShape(selection)) {
        return SelectionType.ellipse;
    }
    else if (CircularSelection.isShape(selection)) {
        return SelectionType.circle;
    }
    else if (CircularSectorialSelection.isShape(selection)) {
        return SelectionType.sector;
    }
    else {
        return SelectionType.unknown;
    }
}
function recreateSelection(selection) {
    if (AxialSelection.isShape(selection)) {
        return AxialSelection.createFromSelection(selection);
    }
    else if (RectangularSelection.isShape(selection)) {
        return RectangularSelection.createFromSelection(selection);
    }
    else if (LinearSelection.isShape(selection)) {
        return LinearSelection.createFromSelection(selection);
    }
    else if (PolygonalSelection.isShape(selection)) {
        return PolygonalSelection.createFromSelection(selection);
    }
    else if (EllipticalSelection.isShape(selection)) {
        return EllipticalSelection.createFromSelection(selection);
    }
    else if (CircularSelection.isShape(selection)) {
        return CircularSelection.createFromSelection(selection);
    }
    else if (CircularSectorialSelection.isShape(selection)) {
        return CircularSectorialSelection.createFromSelection(selection);
    }
    else {
        return null;
    }
}
function createSelection(selectionType, axesFlipped, points) {
    switch (selectionType) {
        case SelectionType.rectangle:
            return RectangularSelection.createFromPoints(axesFlipped, points);
        case SelectionType.sector:
            return CircularSectorialSelection.createFromPoints(points);
        case SelectionType.horizontalAxis:
        case SelectionType.verticalAxis:
            return AxialSelection.createFromPoints(points, selectionType === SelectionType.horizontalAxis ? 0 : 1);
        case SelectionType.circle:
            return CircularSelection.createFromPoints(points);
        case SelectionType.ellipse:
            return CircularSelection.createFromPoints(points);
        case SelectionType.polygon:
            return PolygonalSelection.createFromPoints(true, points);
        case SelectionType.polyline:
            return PolygonalSelection.createFromPoints(false, points);
        case SelectionType.line:
        case SelectionType.unknown:
        default:
            return LinearSelection.createFromPoints(points);
    }
}
function getClicks(selectionType) {
    switch (selectionType) {
        case SelectionType.rectangle:
            return RectangularSelection.clicks();
        case SelectionType.sector:
            return CircularSectorialSelection.clicks();
        case SelectionType.horizontalAxis:
        case SelectionType.verticalAxis:
            return AxialSelection.clicks();
        case SelectionType.circle:
            return CircularSelection.clicks();
        case SelectionType.ellipse:
            return CircularSelection.clicks();
        case SelectionType.polygon:
        case SelectionType.polyline:
            return PolygonalSelection.clicks();
        case SelectionType.line:
        case SelectionType.unknown:
        default:
            return LinearSelection.clicks();
    }
}
function pointsToSelection(selections, selectionType, points, alpha, colour) {
    console.debug('Points', selectionType, points);
    const s = createSelection(selectionType, [false, false], points);
    s.alpha = alpha;
    if (colour) {
        s.colour = colour;
    }
    const selectionNames = selections.map((s) => s.name);
    let newName;
    let counter = -1;
    do {
        counter++;
        newName = `${selectionType}${counter}`;
    } while (selectionNames.includes(newName));
    s.name = newName;
    return s;
}
function createShape(selectionType, points, alpha, size, colour, asDashed, isFixed, onHandleChange) {
    const props = {
        fill: colour,
        fillOpacity: alpha,
        stroke: colour,
        strokeWidth: 1,
    };
    switch (selectionType) {
        case SelectionType.rectangle:
        case SelectionType.polygon:
            return (_jsx(SvgElement, { children: _jsx(DvdPolyline, { size: size, coords: points, isClosed: true, strokeDasharray: asDashed ? '10, 10' : undefined, isFixed: isFixed, onHandleChange: onHandleChange, ...props }) }));
        case SelectionType.horizontalAxis:
        case SelectionType.verticalAxis:
            return (_jsx(SvgElement, { children: _jsx(DvdAxisBox, { size: size, coords: points, strokeDasharray: asDashed ? '10, 10' : undefined, isFixed: isFixed, axis: selectionType === SelectionType.horizontalAxis ? 0 : 1, onHandleChange: onHandleChange, ...props }) }));
        case SelectionType.line:
        case SelectionType.polyline:
            return (_jsx(SvgElement, { children: _jsx(DvdPolyline, { size: size, coords: points, strokeDasharray: asDashed ? '10, 10' : undefined, isFixed: isFixed, onHandleChange: onHandleChange, ...props }) }));
        case SelectionType.ellipse:
        case SelectionType.circle:
        case SelectionType.sector:
        case SelectionType.unknown:
        default:
            return null;
    }
}
function pointsToShape(selectionType, points, axesFlipped, alpha, size, colour) {
    const s = createSelection(selectionType, axesFlipped, points);
    return createShape(selectionType, s.getPoints(), alpha, size, colour ?? s.colour ?? s.defaultColour, undefined, true);
}
function SelectionShape(props) {
    const { size, selection, updateSelection, showHandles } = props;
    const selectionType = getSelectionType(selection);
    const context = useVisCanvasContext();
    const { htmlToData } = context;
    const camera = useThree((state) => state.camera);
    const htmlToDataFunction = useCallback((x, y) => {
        const v = htmlToData(camera, new Vector3(x, y));
        return [v.x, v.y];
    }, [htmlToData, camera]);
    const combinedUpdate = useCallback((s) => {
        const h = s.onHandleChange.bind(s);
        const f = (i, pos, b = true) => {
            const p = htmlToDataFunction(pos[0], pos[1]);
            console.debug('UH:', i, pos, p);
            const ns = h(i, p);
            updateSelection(ns, b);
            return ns;
        };
        return f;
    }, [updateSelection, htmlToDataFunction]);
    if (selectionType !== SelectionType.unknown &&
        selection.getPoints !== undefined) {
        const pts = selection.getPoints();
        const defColour = ('defaultColour' in selection ? selection.defaultColour : '#000000');
        return (_jsx(DataToHtml, { points: pts, children: (...htmlSelection) => createShape(selectionType, htmlSelection, selection.alpha, size, selection.colour ?? defColour, selection.asDashed, selection.fixed || !showHandles, combinedUpdate(selection)) }, selection.id));
    }
    console.error('Unknown selection type or has no points getter', selection);
    return null;
}
function makeShapes(size, selections, showHandles, update) {
    return (update &&
        selections.map((s) => (_jsx(SelectionShape, { size: size, selection: s, updateSelection: update, showHandles: showHandles }, s.id))));
}
function findSelection(selections, id) {
    return selections.find((s) => s.id === id);
}
function getSelectionLabel(selection, selectionIcons) {
    if (selection !== null) {
        const selectionIcon = selectionIcons
            ? selectionIcons[getSelectionType(selection)]
            : '';
        const selectionLabel = `${selectionIcon} ${selection.name} ${selection.id}`;
        return selectionLabel;
    }
    else {
        return 'No selection chosen';
    }
}
function getSelectionLabelFromID(selections, id, selectionIcons) {
    const selection = findSelection(selections, id) ?? null;
    return getSelectionLabel(selection, selectionIcons);
}
function validateHtml(html, selectionType) {
    return Box.fromPoints(...html).hasMinSize(selectionType === SelectionType.horizontalAxis ||
        selectionType === SelectionType.verticalAxis
        ? 0
        : 20);
}
export { findSelection, getClicks, getSelectionLabel, getSelectionLabelFromID, getSelectionType, makeShapes, pointsToSelection, pointsToShape, polar, recreateSelection, SelectionType, validateHtml, };
//# sourceMappingURL=utils.js.map