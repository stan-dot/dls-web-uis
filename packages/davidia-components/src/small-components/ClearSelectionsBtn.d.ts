import type BaseSelection from '../selection-components/BaseSelection.js';
import type { SelectionBase } from '../index.js';
/**
 * The props for the `ClearSelectionsBtn` component.
 * @interface {object} ClearSelectionsBtnProps
 * @member {BaseSelection[]} selections - The current selections.
 * @member {(s: SelectionBase | null, b?: boolean, c?: boolean) => void} updateSelections - The function to call to update the selections state.
 * @member {string | null} currentSelectionID - The ID of the current selection.
 * @member {(s: string | null) => void} updateCurrentSelectionID - The function to call to update the current selection ID.
 * @member {boolean} [disabled] - Indicates whether the component is disabled.
 */
interface ClearSelectionsBtnProps {
    /** The current selections */
    selections: BaseSelection[];
    /** The function to call to update the selections state */
    updateSelections: (s: SelectionBase | null, b?: boolean, d?: boolean) => void;
    /** The ID of the current selection */
    currentSelectionID: string | null;
    /** The function to call to update the current selection ID */
    updateCurrentSelectionID: (s: string | null) => void;
    /** Indicates whether the component is disabled (optional) */
    disabled?: boolean;
}
/**
 *
 * Renders a button to clear selections.
 * @param {ClearSelectionsBtnProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function ClearSelectionsBtn(props: ClearSelectionsBtnProps): JSX.Element;
export type { ClearSelectionsBtnProps };
export default ClearSelectionsBtn;
//# sourceMappingURL=ClearSelectionsBtn.d.ts.map