import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment } from 'react';
import LabelledInput from '../small-components/LabelledInput.js';
import { isNumber } from '../utils.js';
import { XInput, YInput, AngleInput } from '../index.js';
/**
 *
 * Renders the configuration options for a linear selection.
 * @param {LinearSelectionConfigProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function LinearSelectionConfig({ selection, updateSelection, disabled, }) {
    return (_jsxs(Fragment, { children: [_jsx(XInput, { selection: selection, updateSelection: updateSelection, disabled: disabled }), _jsx(YInput, { selection: selection, updateSelection: updateSelection, disabled: disabled }), _jsx(AngleInput, { selection: selection, updateSelection: updateSelection, disabled: disabled }), _jsx(LabelledInput, { label: "length", input: selection.length, updateValue: (l) => {
                    selection.length = l;
                    updateSelection(selection);
                }, decimalPlaces: 8, isValid: (v) => isNumber(v), disabled: disabled }, "length")] }, "line"));
}
export default LinearSelectionConfig;
//# sourceMappingURL=LinearSelectionConfig.js.map