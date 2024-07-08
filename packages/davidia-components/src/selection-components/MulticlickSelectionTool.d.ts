import { type VisCanvasContextValue, type CommonInteractionProps } from '@h5web/lib';
import type { ReactNode } from 'react';
import { Vector3 } from 'three';
type Points = Vector3[];
/**
 * Represents a selection.
 * @interface {object} Selection
 * @member {Points} html - The html points.
 * @member {Points} world - The world points.
 * @member {Points} data - The data points.
 */
interface Selection {
    html: Points;
    world: Points;
    data: Points;
}
/**
 * The props for the `MultiClickSelectionTool` component.
 * @interface {object} Props
 * @extends CommonInteractionProps
 * @member {string} [id] - The ID.
 * @member {number} [minPoints] - The minimum number of points. Default = 2, must be >= 1.
 * @member {number} [maxPoints] - The maximum number of points. Defaults to minPoints, must be >= minPoints or -1 = unlimited.
 * @member {number} [maxMovement] - The maximum movement between pointer up/down to ignore, default = 1.
 * @member {(rawSelection: Selection, camera: Camera, context: VisCanvasContextValue) => Selection} [transform] - The transform.
 * @member {(selection: Selection) => boolean} [validate] - Validates selection.
 * @member {() => void} [onSelectionStart] - Handles start of selection.
 * @member {(selection: Selection | undefined, rawSelection: Selection, isValid: boolean) => void} [onSelectionChange] - Handles selection changing.
 * @member {{(selection: Selection | undefined, isValid: boolean) => void}} [onSelectionEnd] - Handles end of selection.
 * @member {(selection: Selection) => void} [onValidSelection] - Handles valid selections.
 * @member {(selection: Selection, rawSelection: Selection, isValid: boolean, isComplete: boolean) => ReactNode} [children] - Any child components.
 */
interface Props extends CommonInteractionProps {
    /** The ID (optional) */
    id?: string;
    /** The minimum number of points. Default = 2, must be >= 1 (optional) */
    minPoints?: number;
    /** The maximum number of points. Defaults to minPoints, must be >= minPoints or -1 = unlimited (optional) */
    maxPoints?: number;
    /** The maximum movement between pointer up/down to ignore, default = 1 (optional) */
    maxMovement?: number;
    /** The transform (optional) */
    transform?: (rawSelection: Selection, camera: Camera, context: VisCanvasContextValue) => Selection;
    /** Validates selection (optional) */
    validate?: (selection: Selection) => boolean;
    /** Handles selection starting (optional) */
    onSelectionStart?: () => void;
    /** Handles selection changing (optional) */
    onSelectionChange?: (selection: Selection | undefined, rawSelection: Selection, isValid: boolean) => void;
    /** Handles end of selection (optional) */
    onSelectionEnd?: (selection: Selection | undefined, isValid: boolean) => void;
    /** handles valid selections (optional) */
    onValidSelection?: (selection: Selection) => void;
    /** Any child components */
    children: (selection: Selection, rawSelection: Selection, isValid: boolean, isComplete: boolean) => ReactNode;
}
/**
 *
 * Renders a tool with which to create a multiclick selection.
 * @param {Props} props - The component props.
 */
declare function MulticlickSelectionTool(props: Props): import("react/jsx-runtime").JSX.Element | null;
export type { Props as MulticlickSelectionToolProps, Points, Selection };
export { MulticlickSelectionTool as default };
//# sourceMappingURL=MulticlickSelectionTool.d.ts.map