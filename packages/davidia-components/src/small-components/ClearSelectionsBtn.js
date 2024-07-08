import { jsx as _jsx } from "react/jsx-runtime";
import { Btn } from '@h5web/lib';
/**
 *
 * Renders a button to clear selections.
 * @param {ClearSelectionsBtnProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function ClearSelectionsBtn(props) {
    function handleDeleteSelection() {
        props.updateSelections(null, true, true);
        props.updateCurrentSelectionID(null);
    }
    return (_jsx(Btn, { label: "Clear all selections", onClick: () => {
            if (window.confirm('Clear all selections?')) {
                handleDeleteSelection();
            }
        }, disabled: props.disabled }));
}
export default ClearSelectionsBtn;
//# sourceMappingURL=ClearSelectionsBtn.js.map