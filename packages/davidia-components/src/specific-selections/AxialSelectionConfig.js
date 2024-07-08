import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LabelledInput from '../small-components/LabelledInput.js';
import { isNumber } from '../utils.js';
import { Fragment } from 'react';
import { XInput, YInput } from '../index.js';
/**
 * Renders the configuration options for an axial selection.
 * @param {AxialSelectionConfigProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function AxialSelectionConfig(props) {
    const { selection, updateSelection, disabled } = props;
    return selection.dimension === 0 ? (_jsxs(Fragment, { children: [_jsx(XInput, { selection: selection, updateSelection: updateSelection }), _jsx(LabelledInput, { label: "x length", input: selection.length, updateValue: (l) => {
                    selection.length = l;
                    updateSelection(selection);
                }, decimalPlaces: 8, isValid: (v) => isNumber(v), disabled: disabled }, "x length")] }, "axis x")) : (_jsxs(Fragment, { children: [_jsx(YInput, { selection: selection, updateSelection: updateSelection }), _jsx(LabelledInput, { label: "y length", input: selection.length, updateValue: (l) => {
                    selection.length = l;
                    updateSelection(selection);
                }, decimalPlaces: 8, isValid: (v) => isNumber(v), disabled: disabled }, "y length")] }, "axis y"));
}
export default AxialSelectionConfig;
//# sourceMappingURL=AxialSelectionConfig.js.map