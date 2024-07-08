import type BaseSelection from './BaseSelection.js';
import type OrientableSelection from '../specific-selections/OrientableSelection.js';
/**
 *
 * The props for the `AngleInput` component.
 * @interface AngleInputProps
 * @member {OrientableSelection} selection - The selection for which the angle is being configured.
 * @member {(s: OrientableSelection) => void} updateSelection - Function to handle updating angle of selection.
 * @member {boolean} [disabled] - If input component is disabled.
 */
interface AngleInputProps {
    selection: OrientableSelection;
    updateSelection: (s: OrientableSelection) => void;
    disabled?: boolean;
}
/**
 *
 * Renders a labelled input for angle.
 * @param {AngleInputProps} props - The component props.
 * @returns {JSX.Element<T>} The rendered component.
 */
declare function AngleInput(props: AngleInputProps): import("react/jsx-runtime").JSX.Element;
interface XInputProps {
    selection: BaseSelection;
    updateSelection: (s: BaseSelection) => void;
    disabled?: boolean;
}
/**
 *
 * Renders a labelled inout for x.
 * @param {XInputProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function XInput(props: XInputProps): import("react/jsx-runtime").JSX.Element;
/**
 *
 * The props for the `YInput` component.
 * @interface YInputProps
 * @member {BaseSelection} selection - The selection for which the y values are being configured.
 * @member {(s: BaseSelection) => void} updateSelection - Function to handle updating y of selection.
 * @member {boolean} [disabled] - If input component is disabled.
 */
interface YInputProps {
    /** The selection for which the y values are being configured */
    selection: BaseSelection;
    /** Function to handle updating y of selection */
    updateSelection: (s: BaseSelection) => void;
    /** If input component is disabled (optional) */
    disabled?: boolean;
}
/**
 *
 * Renders a labelled input for y.
 * @param {YInputProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function YInput(props: YInputProps): import("react/jsx-runtime").JSX.Element;
/**
 *
 * The props for the `PointInput` component.
 * @interface PointInputProps
 * @member {number} i - The point number.
 * @member {[number, number]} point - The coordinates of the point.
 * @member {(p: [number, number]) => void} updatePoint - Function to handle updating of point.
 * @member {boolean} [disabled] - If input component is disabled.
 */
interface PointInputProps {
    /** The point number */
    i: number;
    /** The coordinates of the point */
    point: [number, number];
    /** Function to handle updating of point */
    updatePoint: (p: [number, number]) => void;
    /** If input component is disabled (optional) */
    disabled?: boolean;
}
/**
 *
 * Renders a labelled input for point x.
 * @param {PointInputProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function PointXInput(props: PointInputProps): import("react/jsx-runtime").JSX.Element;
/**
 *
 * Renders a labelled input for point y.
 * @param {PointInputProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function PointYInput(props: PointInputProps): import("react/jsx-runtime").JSX.Element;
export { AngleInput, XInput, YInput, PointXInput, PointYInput };
//# sourceMappingURL=SelectionConfigComponents.d.ts.map