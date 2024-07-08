import { jsx as _jsx } from "react/jsx-runtime";
import Select from 'react-select';
import { SELECTION_ICONS } from './SelectionConfig.js';
import { getSelectionLabelFromID } from '../specific-selections/utils.js';
/**
 *
 * Renders a dropdown for choosing selection.
 * @param {SelectionIDDropdownProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function SelectionIDDropdown(props) {
    const { selectionID, onSelectionIDChange, options = props.selections.map((s) => s.id), } = props;
    if (selectionID === '' && props.selections.length > 0) {
        console.log('Setting selectionID to default selection: ', props.selections[0]);
        const firstSelection = props.selections[0];
        if (firstSelection) {
            onSelectionIDChange(firstSelection.id);
        }
    }
    const defaultColour = '#ffffff';
    /**
     *
     * Returns selection colour for a given selection id.
     * @param {string} i - The selection ID.
     * @returns {string | null} The selection colour.
     */
    function getSelectionColour(i) {
        const selection = props.selections.find((s) => s.id === i);
        return selection?.colour ?? defaultColour;
    }
    const selectStyles = {
        option: (base, props) => ({
            ...base,
            // eslint-disable-next-line react/prop-types
            backgroundColor: props.data.bgcolour,
        }),
    };
    const optionsArr = options.map((s) => ({
        value: s,
        label: getSelectionLabelFromID(props.selections, s, SELECTION_ICONS),
        bgcolour: getSelectionColour(s),
    }));
    return (_jsx(Select, { styles: selectStyles, value: {
            value: selectionID,
            label: getSelectionLabelFromID(props.selections, selectionID, SELECTION_ICONS),
            bgcolour: getSelectionColour(selectionID ?? ''),
        }, options: optionsArr, onChange: (selectedOption) => {
            if (selectedOption !== null) {
                onSelectionIDChange(selectedOption.value);
            }
        } }));
}
export default SelectionIDDropdown;
//# sourceMappingURL=SelectionIDDropdown.js.map