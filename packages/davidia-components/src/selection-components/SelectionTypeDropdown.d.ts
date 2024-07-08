import { SelectionType } from '../specific-selections/utils.js';
/**
 *
 * The props for the `SelectionDropdown` component.
 * @interface SelectionDropdownProps
 * @member {SelectionType} value - The chosen selection type.
 * @member {(selectionType: SelectionType) => void} onSelectionTypeChange - Function that handles change in chosen selection type.
 * @member {boolean} disabled - If component is disabled.
 * @member {SelectionType[]} [options] - The set of selection type options that are available in the dropdown.
 */
interface SelectionDropdownProps {
    /** The chosen selection type */
    value: SelectionType;
    /** Function that handles change in chosen selection type */
    onSelectionTypeChange: (selectionType: SelectionType) => void;
    /** If component is disabled */
    disabled: boolean;
    /** The set of selection type options that are available in the dropdown */
    options?: SelectionType[];
}
/**
 *
 * Renders a dropdown for choosing selection type.
 * @param {SelectionDropdownProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function SelectionTypeDropdown(props: SelectionDropdownProps): import("react/jsx-runtime").JSX.Element;
export default SelectionTypeDropdown;
export type { SelectionDropdownProps };
//# sourceMappingURL=SelectionTypeDropdown.d.ts.map