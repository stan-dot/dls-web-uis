import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CellWidthInput, Separator, ToggleGroup, Toolbar } from '@h5web/lib';
import LabelledInput from '../small-components/LabelledInput.js';
import { isValidNumber } from '../utils.js';
import { defaultWidth } from './tableConstants.js';
export function TableToolbar({ cellWidth, setCellWidth, displayStyle, updateDisplayStyle, numberDigits, setNumberDigits, }) {
    const lowerBound = displayStyle === 'standard' ? 0 : 1;
    const upperBound = 10;
    const validateNumber = (v) => isValidNumber(v, lowerBound, upperBound);
    return (_jsxs(Toolbar, { children: [_jsx(CellWidthInput, { value: cellWidth, defaultValue: defaultWidth, onChange: (e) => {
                    if (e) {
                        setCellWidth(e);
                    }
                } }, "cell width input"), _jsx(Separator, {}), _jsxs(ToggleGroup, { role: "radiogroup", ariaLabel: "displayStyle", value: displayStyle, onChange: (e) => {
                    if (e === 'scientific' || e === 'standard') {
                        updateDisplayStyle(e);
                    }
                }, children: [_jsx(ToggleGroup.Btn, { label: "standard", value: "standard" }), _jsx(ToggleGroup.Btn, { label: "scientific", value: "scientific" })] }, "display style toggle"), _jsx(Separator, {}), _jsx(LabelledInput, { label: "digits", input: numberDigits, isValid: validateNumber, inputAttribs: {
                    name: 'digits',
                    pattern: '^\\d$',
                    size: 1,
                }, updateValue: setNumberDigits }, "0"), _jsx(Separator, {})] }));
}
//# sourceMappingURL=TableToolbar.js.map