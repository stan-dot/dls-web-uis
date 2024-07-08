/**
 * 2D selections
 *
 * @remark All points are [x,y], all angles in radians
 */
import { type Size } from '@h5web/lib';
import { Vector3 } from 'three';
import AxialSelection from './AxialSelection.js';
import type BaseSelection from '../selection-components/BaseSelection.js';
import CircularSelection from './CircularSelection.js';
import CircularSectorialSelection from './CircularSectorialSelection.js';
import EllipticalSelection from './EllipticalSelection.js';
import LinearSelection from './LinearSelection.js';
import PolygonalSelection from './PolygonalSelection.js';
import RectangularSelection from './RectangularSelection.js';
import type { Points } from '../selection-components/MulticlickSelectionTool.js';
declare enum SelectionType {
    line = "line",
    rectangle = "rectangle",
    polyline = "polyline",
    polygon = "polygon",
    circle = "circle",
    ellipse = "ellipse",
    sector = "sector",
    horizontalAxis = "horizontalAxis",
    verticalAxis = "verticalAxis",
    unknown = "unknown"
}
declare function polar(xy: Vector3): [number, number];
declare function getSelectionType(selection: SelectionBase): SelectionType;
declare function recreateSelection(selection: SelectionBase): AxialSelection | CircularSelection | CircularSectorialSelection | EllipticalSelection | LinearSelection | PolygonalSelection | RectangularSelection | null;
declare function getClicks(selectionType: SelectionType): number[];
type _HandleChangeFunction = (i: number, position: [number | undefined, number | undefined]) => SelectionBase;
interface SelectionBase {
    readonly id: string;
    name: string;
    colour?: string;
    alpha: number;
    fixed: boolean;
    start: [number, number];
    asDashed?: boolean;
    getPoints?: () => Vector3[];
    onHandleChange: _HandleChangeFunction;
    toString: () => string;
}
declare function pointsToSelection(selections: SelectionBase[], selectionType: SelectionType, points: Vector3[], alpha: number, colour?: string): BaseSelection;
export type HandleChangeFunction = (i: number, pos: [number | undefined, number | undefined], b?: boolean) => BaseSelection;
declare function pointsToShape(selectionType: SelectionType, points: Vector3[], axesFlipped: [boolean, boolean], alpha: number, size: Size, colour?: string): import("react/jsx-runtime").JSX.Element | null;
declare function makeShapes(size: Size, selections: SelectionBase[], showHandles: boolean, update?: (s: SelectionBase) => void): import("react/jsx-runtime").JSX.Element[] | undefined;
declare function findSelection(selections: SelectionBase[], id: string | null): SelectionBase | undefined;
declare function getSelectionLabel(selection: SelectionBase | null, selectionIcons?: {
    line: string;
    rectangle: string;
    polyline: string;
    polygon: string;
    circle: string;
    ellipse: string;
    sector: string;
    horizontalAxis: string;
    verticalAxis: string;
    unknown: string;
}): string;
declare function getSelectionLabelFromID(selections: SelectionBase[], id: string | null, selectionIcons: {
    line: string;
    rectangle: string;
    polyline: string;
    polygon: string;
    circle: string;
    ellipse: string;
    sector: string;
    horizontalAxis: string;
    verticalAxis: string;
    unknown: string;
}): string;
declare function validateHtml(html: Points, selectionType: SelectionType): boolean;
export { findSelection, getClicks, getSelectionLabel, getSelectionLabelFromID, getSelectionType, makeShapes, pointsToSelection, pointsToShape, polar, recreateSelection, SelectionType, validateHtml, };
export type { SelectionBase };
//# sourceMappingURL=utils.d.ts.map