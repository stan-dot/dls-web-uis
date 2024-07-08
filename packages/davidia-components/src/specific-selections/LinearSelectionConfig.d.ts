import type LinearSelection from './LinearSelection.js';
import type { SelectionBase } from './utils.js';
/**
 * The props for the `LinearSelectionConfig` component.
 * @interface {object} LinearSelectionConfigProps
 * @member {LinearSelection} selection - The linear selection to configure.
 * @member {(s: SelectionBase | null, b?: boolean, c?: boolean) => void} updateSelection - Handle updating selection.
 * @member {boolean} [disabled] - If input is diabled.
 */
interface LinearSelectionConfigProps {
    /** The linear selection to configure */
    selection: LinearSelection;
    /** Handle updating selection */
    updateSelection: (s: SelectionBase | null, b?: boolean, c?: boolean) => void;
    /** If input is disabled (optional) */
    disabled?: boolean;
}
/**
 *
 * Renders the configuration options for a linear selection.
 * @param {LinearSelectionConfigProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function LinearSelectionConfig({ selection, updateSelection, disabled, }: LinearSelectionConfigProps): import("react/jsx-runtime").JSX.Element;
export default LinearSelectionConfig;
export type { LinearSelectionConfigProps };
//# sourceMappingURL=LinearSelectionConfig.d.ts.map