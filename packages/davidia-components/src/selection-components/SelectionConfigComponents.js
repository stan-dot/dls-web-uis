import { jsx as _jsx } from "react/jsx-runtime";
import { isNumber } from '../utils.js';
import LabelledInput from '../small-components/LabelledInput.js';
/**
 *
 * Renders a labelled input for angle.
 * @param {AngleInputProps} props - The component props.
 * @returns {JSX.Element<T>} The rendered component.
 */
function AngleInput(props) {
    const { selection, updateSelection, disabled } = props;
    return (_jsx(LabelledInput, { label: "angle", input: (selection.angle * 180) / Math.PI, decimalPlaces: 5, updateValue: (a) => {
            const radians = a * (Math.PI / 180);
            selection.setAngle(radians);
            updateSelection(selection);
        }, isValid: (v) => isNumber(v), disabled: disabled }, "angle"));
}
/**
 *
 * Renders a labelled inout for x.
 * @param {XInputProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function XInput(props) {
    const { selection, updateSelection, disabled } = props;
    return (_jsx(LabelledInput, { label: "x", input: selection.vStart.x, decimalPlaces: 8, updateValue: (x) => {
            selection.start[0] = x;
            selection.vStart.x = x;
            updateSelection(selection);
        }, isValid: (v) => isNumber(v), disabled: disabled }, "x"));
}
/**
 *
 * Renders a labelled input for y.
 * @param {YInputProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function YInput(props) {
    const { selection, updateSelection, disabled } = props;
    return (_jsx(LabelledInput, { label: "y", input: selection.vStart.y, decimalPlaces: 8, updateValue: (y) => {
            selection.start[1] = y;
            selection.vStart.y = y;
            updateSelection(selection);
        }, isValid: (v) => isNumber(v), disabled: disabled }, "y"));
}
/**
 *
 * Renders a labelled input for point x.
 * @param {PointInputProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function PointXInput(props) {
    const { i, point, updatePoint, disabled } = props;
    const label = `x${i}`;
    return (_jsx(LabelledInput, { label: label, input: point[0], decimalPlaces: 8, updateValue: (x) => {
            point[0] = x;
            updatePoint(point);
        }, isValid: (v) => isNumber(v), disabled: disabled }, label));
}
/**
 *
 * Renders a labelled input for point y.
 * @param {PointInputProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function PointYInput(props) {
    const { i, point, updatePoint, disabled } = props;
    const label = `y${i}`;
    return (_jsx(LabelledInput, { label: label, input: point[1], decimalPlaces: 8, updateValue: (y) => {
            point[1] = y;
            updatePoint(point);
        }, isValid: (v) => isNumber(v), disabled: disabled }, label));
}
export { AngleInput, XInput, YInput, PointXInput, PointYInput };
//# sourceMappingURL=SelectionConfigComponents.js.map