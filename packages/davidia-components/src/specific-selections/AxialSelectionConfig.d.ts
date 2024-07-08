import type AxialSelection from './AxialSelection.js';
import type { SelectionBase } from './utils.js';
/**
 * The props for the `AxialSelectionConfig` component.
 * @interface {object} AxialSelectionConfigProps
 * @member {AxialSelection} selection - The axial selection to configure.
 * @member {(s: SelectionBase | null, b?: boolean, c?: boolean) => void} updateSelection - The function to call to update the selections state.
 * @member {boolean} [disabled] - Indicates whether the component is disabled.
 */
interface AxialSelectionConfigProps {
    /** The axial selection to configure */
    selection: AxialSelection;
    /** The function to call to update the selections state */
    updateSelection: (s: SelectionBase | null, b?: boolean, c?: boolean) => void;
    /** Indicates whether the component is disabled (optional) */
    disabled?: boolean;
}
/**
 * Renders the configuration options for an axial selection.
 * @param {AxialSelectionConfigProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function AxialSelectionConfig(props: AxialSelectionConfigProps): import("react/jsx-runtime").JSX.Element;
export type { AxialSelectionConfigProps };
export default AxialSelectionConfig;
//# sourceMappingURL=AxialSelectionConfig.d.ts.map