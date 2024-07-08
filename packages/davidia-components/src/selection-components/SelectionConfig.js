import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Modeless from './Modeless.js';
import { getSelectionLabel } from '../specific-selections/utils.js';
import AxialSelection from '../specific-selections/AxialSelection.js';
import RectangularSelection from '../specific-selections/RectangularSelection.js';
import LinearSelection from '../specific-selections/LinearSelection.js';
import AxialSelectionConfig from '../specific-selections/AxialSelectionConfig.js';
import LinearSelectionConfig from '../specific-selections/LinearSelectionConfig.js';
import RectangularSelectionConfig from '../specific-selections/RectangularSelectionConfig.js';
import { Fragment } from 'react';
import { HexColorPicker as Picker } from 'react-colorful';
import styles from './SelectionConfig.module.css';
import { Btn } from '@h5web/lib';
import { isValidPositiveNumber } from '../utils.js';
import LabelledInput from '../small-components/LabelledInput.js';
import PolygonalSelection from '../specific-selections/PolygonalSelection.js';
import PolygonalSelectionConfig from '../specific-selections/PolygonalSelectionConfig.js';
// eslint-disable-next-line react-refresh/only-export-components
export const SELECTION_ICONS = {
    line: '\u2014',
    rectangle: '\u25ad',
    polyline: '\u299a',
    polygon: '\u2b21',
    circle: '\u25cb',
    ellipse: '\u2b2d',
    sector: '\u25d4',
    horizontalAxis: '\u2194',
    verticalAxis: '\u2195',
    unknown: ' ',
};
/**
 *
 * Renders the configuration options for a selection.
 * @param {SelectionConfigProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function SelectionConfig(props) {
    const { currentSelectionID, updateCurrentSelectionID, selections, updateSelections: updateSelection, hasBaton, } = props;
    let currentSelection = null;
    if (selections.length > 0) {
        const c = selections.find((s) => s.id === currentSelectionID) ?? selections[0];
        if (c) {
            currentSelection = c;
        }
    }
    /**
     *
     * Handles deletion of a selection.
     */
    function handleDeleteSelection() {
        if (!currentSelectionID)
            return;
        const selection = selections.find((s) => s.id === currentSelectionID);
        if (!selection)
            return;
        const lastSelection = getLastSelection(selections, currentSelectionID);
        updateSelection(selection, true, true);
        if (lastSelection) {
            updateCurrentSelectionID(lastSelection.id);
        }
    }
    const modeless = [];
    modeless.push(_jsx("h4", { children: getSelectionLabel(currentSelection, SELECTION_ICONS) }, "Selection"));
    if (currentSelection !== null) {
        const cSelection = currentSelection;
        const colour = (cSelection.colour ??
            ('defaultColour' in cSelection
                ? cSelection.defaultColour
                : '#000000'));
        modeless.push(_jsxs(Fragment, { children: [_jsx("div", { className: styles.colourLabel, style: { borderLeftColor: colour }, children: colour }, "colour text"), _jsx("br", {}, "colour spacer"), hasBaton && (_jsx(Picker, { color: colour, onChange: (c) => {
                        cSelection.colour = c;
                        updateSelection(cSelection);
                    } }, "colour picker"))] }, "colour"));
        modeless.push(_jsx(LabelledInput, { label: "name", input: cSelection.name, updateValue: (n) => {
                cSelection.name = n;
                updateSelection(cSelection);
            }, disabled: !hasBaton }, "name"));
        modeless.push(_jsx(LabelledInput, { label: "alpha", input: cSelection.alpha, updateValue: (a) => {
                if (a <= 1 && a >= 0) {
                    cSelection.alpha = a;
                    updateSelection(cSelection);
                }
            }, decimalPlaces: 2, isValid: (v) => isValidPositiveNumber(v, 1, true), disabled: !hasBaton }, "alpha"));
        if (AxialSelection.isShape(cSelection)) {
            modeless.push(AxialSelectionConfig({
                selection: cSelection,
                updateSelection,
                disabled: !hasBaton,
            }));
        }
        else if (LinearSelection.isShape(cSelection)) {
            modeless.push(LinearSelectionConfig({
                selection: cSelection,
                updateSelection,
                disabled: !hasBaton,
            }));
        }
        else if (RectangularSelection.isShape(cSelection)) {
            modeless.push(RectangularSelectionConfig({
                selection: cSelection,
                updateSelection,
                disabled: !hasBaton,
            }));
        }
        else if (PolygonalSelection.isShape(cSelection)) {
            modeless.push(PolygonalSelectionConfig({
                selection: cSelection,
                updateSelection,
                disabled: !hasBaton,
            }));
        }
        modeless.push(_jsx(Btn, { label: "Clear Selection", disabled: !hasBaton, onClick: () => {
                if (window.confirm('Clear selection?')) {
                    handleDeleteSelection();
                }
            } }, "clear selection"));
    }
    return Modeless({
        title: props.title,
        showModeless: props.showSelectionConfig,
        setShowModeless: props.updateShowSelectionConfig,
        children: modeless,
    });
}
export default SelectionConfig;
function getLastSelection(selections, currentSelectionID) {
    let lastSelection;
    if (!Object.hasOwn(selections, 'findLast')) {
        // workaround missing method
        const oSelections = selections.filter((s) => s.id !== currentSelectionID);
        const last = oSelections.length - 1;
        if (last >= 0) {
            lastSelection = oSelections[last];
        }
    }
    else {
        lastSelection = selections.findLast((s) => s.id !== currentSelectionID);
    }
    return lastSelection;
}
//# sourceMappingURL=SelectionConfig.js.map