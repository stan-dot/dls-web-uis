import { type ModifierKey } from '@h5web/lib';
import { SelectionType } from '../specific-selections/utils.js';
import type { BatonProps, PlotSelectionProps } from '../plots/AnyPlot.js';
/**
 * The props for the `SelectionComponent` component.
 * @interface {object} SelectionComponentProps
 * @extends {PlotSelectionProps}
 * @member {SelectionType} [selectionType] - The selection type.
 * @member {ModifierKey | ModifierKey[]} modifierKey - The modifier key(s).
 * @member {BatonProps} [batonProps] - The baton props.
 * @member {boolean} [disabled] - If disabled.
 */
interface SelectionComponentProps extends PlotSelectionProps {
    /** The selection type (optional) */
    selectionType?: SelectionType;
    /** The modifier key(s) */
    modifierKey: ModifierKey | ModifierKey[];
    /** The baton props */
    batonProps?: BatonProps;
    /** If disabled (optional) */
    disabled?: boolean;
}
/**
 *
 * Renders a selection component.
 * @param {SelectionComponentProps} props - The component props.
 * @returns {JSX.Element | null} The rendered component.
 */
declare function SelectionComponent(props: SelectionComponentProps): import("react/jsx-runtime").JSX.Element;
export type { SelectionComponentProps };
export default SelectionComponent;
//# sourceMappingURL=SelectionComponent.d.ts.map