import { type SVGProps } from 'react';
import type { Size } from '@h5web/lib';
import type { HandleChangeFunction } from '../specific-selections/utils.js';
declare const HANDLE_SIZE = 8;
interface DvdDragHandleProps extends SVGProps<SVGElement> {
    name: string;
    size: Size;
    i: number;
    nx: number;
    ny: number;
    onHandleChange?: HandleChangeFunction;
    restrictX?: boolean;
    restrictY?: boolean;
}
declare function DvdDragHandle(props: DvdDragHandleProps): import("react/jsx-runtime").JSX.Element;
export { DvdDragHandle, HANDLE_SIZE };
export type { DvdDragHandleProps };
//# sourceMappingURL=DvdDragHandle.d.ts.map