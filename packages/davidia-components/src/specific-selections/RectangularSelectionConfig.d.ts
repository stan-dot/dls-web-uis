import type RectangularSelection from './RectangularSelection.js';
import type { SelectionBase } from './utils.js';
/**
 * The props for the `RectangularSelectionConfig` component.
 * @interface {object} RectangularSelectionConfigProps
 * @member {RectangularSelection} selection - The rectangular selection to configure.
 * @member {(s: SelectionBase | null, b?: boolean, c?: boolean) => void} [updateSelection] - Handles update of selection.
 * @member {boolean} [disabled] - If disabled.
 */
interface RectangularSelectionConfigProps {
    /** The rectangular selection to configure */
    selection: RectangularSelection;
    /** Handles update of selection */
    updateSelection: (s: SelectionBase | null, b?: boolean, c?: boolean) => void;
    /** If disabled */
    disabled?: boolean;
}
/**
 *
 * Renders the configuration options for a rectangular selection.
 * @param {RectangularSelectionConfigProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function RectangularSelectionConfig(props: RectangularSelectionConfigProps): import("react/jsx-runtime").JSX.Element;
export type { RectangularSelectionConfigProps };
export default RectangularSelectionConfig;
//# sourceMappingURL=RectangularSelectionConfig.d.ts.map