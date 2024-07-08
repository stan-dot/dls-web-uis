import type PolygonalSelection from './PolygonalSelection.js';
import type { SelectionBase } from './utils.js';
/**
 * The props for the `PolygonalSelectionConfig` component.
 * @interface {object} PolygonalSelectionConfigProps
 * @member {PolygonalSelection} selection - The polygonal selection to configure.
 * @member {(s: SelectionBase | null, b?: boolean, c?: boolean) => void} [updateSelection] - Handles update of selection.
 * @member {boolean} [disabled] - If disabled.
 */
interface PolygonalSelectionConfigProps {
    /** The polygonal selection to configure */
    selection: PolygonalSelection;
    /** Handles update of selection */
    updateSelection: (s: SelectionBase | null, b?: boolean, c?: boolean) => void;
    /** If disabled */
    disabled?: boolean;
}
/**
 *
 * Renders configuration for polygonal selection.
 * @param {PolygonalSelectionConfigProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function PolygonalSelectionConfig(props: PolygonalSelectionConfigProps): import("react/jsx-runtime").JSX.Element;
export type { PolygonalSelectionConfigProps };
export default PolygonalSelectionConfig;
//# sourceMappingURL=PolygonalSelectionConfig.d.ts.map