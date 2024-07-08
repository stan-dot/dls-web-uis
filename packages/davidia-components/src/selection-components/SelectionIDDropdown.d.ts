import type { SelectionBase } from '../specific-selections/utils.js';
/**
 *
 * The props for the `SelectionIDDropdown` component.
 * @interface SelectionIDDropdownProps
 * @member {SelectionBase[]} selections - The selections.
 * @member {string | null} selectionID - The ID of the highlighted selection.
 * @member {(s: string) => void} onSelectionIDChange - Function that handles change in chosen selection ID.
 * @member {string[]} [options] - The selections from which to choose.
 */
interface SelectionIDDropdownProps {
    /** The selections */
    selections: SelectionBase[];
    /** The ID of the highlighted selection */
    selectionID: string | null;
    /** Function that handles change in chosen selection ID */
    onSelectionIDChange: (s: string) => void;
    /** The selections from which to choose */
    options?: string[];
}
/**
 *
 * Renders a dropdown for choosing selection.
 * @param {SelectionIDDropdownProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function SelectionIDDropdown(props: SelectionIDDropdownProps): import("react/jsx-runtime").JSX.Element;
export default SelectionIDDropdown;
export type { SelectionIDDropdownProps };
//# sourceMappingURL=SelectionIDDropdown.d.ts.map