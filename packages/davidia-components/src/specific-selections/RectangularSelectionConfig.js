import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LabelledInput from '../small-components/LabelledInput.js';
import { isNumber } from '../utils.js';
import { AngleInput, XInput, YInput, } from '../selection-components/SelectionConfigComponents.js';
import { Fragment } from 'react';
/**
 *
 * Renders the configuration options for a rectangular selection.
 * @param {RectangularSelectionConfigProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function RectangularSelectionConfig(props) {
    const { selection, updateSelection, disabled } = props;
    return (_jsxs(Fragment, { children: [_jsx(XInput, { selection: selection, updateSelection: updateSelection, disabled: disabled }), _jsx(YInput, { selection: selection, updateSelection: updateSelection, disabled: disabled }), _jsx(AngleInput, { selection: selection, updateSelection: updateSelection, disabled: disabled }), _jsx(LabelledInput, { label: "x length", input: selection.lengths[0], updateValue: (l) => {
                    selection.lengths[0] = l;
                    updateSelection(selection);
                }, decimalPlaces: 8, isValid: (v) => isNumber(v), disabled: disabled }, "x length"), _jsx(LabelledInput, { label: "y length", input: selection.lengths[1], updateValue: (l) => {
                    selection.lengths[1] = l;
                    updateSelection(selection);
                }, decimalPlaces: 8, isValid: (v) => isNumber(v), disabled: disabled }, "y length")] }, "rectangle"));
}
export default RectangularSelectionConfig;
//# sourceMappingURL=RectangularSelectionConfig.js.map