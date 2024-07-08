import { type SVGProps } from 'react';
import type { HandleChangeFunction } from '../specific-selections/utils.js';
import type { Size } from '@h5web/lib';
import { Vector3 } from 'three';
interface DvdPolylineProps extends SVGProps<SVGPolylineElement> {
    size: Size;
    coords: Vector3[];
    isClosed?: boolean;
    isFixed?: boolean;
    onHandleChange?: HandleChangeFunction;
}
declare function DvdPolyline(props: DvdPolylineProps): import("react/jsx-runtime").JSX.Element;
export default DvdPolyline;
export type { DvdPolylineProps };
//# sourceMappingURL=DvdPolyline.d.ts.map