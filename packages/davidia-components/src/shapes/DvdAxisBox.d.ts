import { type SVGProps } from 'react';
import type { HandleChangeFunction } from '../specific-selections/utils.js';
import type { Size } from '@h5web/lib';
import { Vector3 } from 'three';
interface DvdAxisBoxProps extends SVGProps<SVGPolygonElement> {
    size: Size;
    coords: Vector3[];
    isFixed?: boolean;
    axis: number;
    onHandleChange?: HandleChangeFunction;
}
declare function DvdAxisBox({ size, coords, isFixed, axis, onHandleChange, ...svgProps }: DvdAxisBoxProps): import("react/jsx-runtime").JSX.Element;
export default DvdAxisBox;
export type { DvdAxisBoxProps };
//# sourceMappingURL=DvdAxisBox.d.ts.map