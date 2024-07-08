import type BaseSelection from './BaseSelection.js';
import { type CustomDomain, type Domain } from '@h5web/lib';
import type { IIconType } from '../modals/Modal.js';
import type { SelectionBase } from '../specific-selections/utils.js';
export declare const SELECTION_ICONS: {
    line: string;
    rectangle: string;
    polyline: string;
    polygon: string;
    circle: string;
    ellipse: string;
    sector: string;
    horizontalAxis: string;
    verticalAxis: string;
    unknown: string;
};
/**
 * The props for the `SelectionConfig` component.
 * @interface {object} SelectionConfigProps
 * @member {string} title - The modal title.
 * @member {BaseSelection[]} selections - The current selections.
 * @member {(s: SelectionBase | null, b?: boolean, c?: boolean) => void} updateSelections - Handles updating selections.
 * @member {string | null} currentSelectionID - The ID of the current selection.
 * @member {(s: string | null) => void} updateCurrentSelectionID - Handles updating current selection ID.
 * @member {SelectionType} showSelectionConfig - If the selection config is shown.
 * @member {(s: boolean) => void} updateShowSelectionConfig - Handles updating showSelectionConfig.
 * @member {boolean} hasBaton - If has control of the baton.
 * @member {IIConType} [icon] - The icon.
 * @member {string} [label] - The label.
 * @member {Domain} [domain] - The data domain.
 * @member {CustomDomain} [customDomain] - The custom data domain.
 */
interface SelectionConfigProps {
    /** The modal title */
    title: string;
    /** The current selections */
    selections: BaseSelection[];
    /** Handles updating selections */
    updateSelections: (s: SelectionBase | null, b?: boolean, c?: boolean) => void;
    /** The ID of the current selection (optional) */
    currentSelectionID: string | null;
    /** Handles updating current selection ID */
    updateCurrentSelectionID: (s: string | null) => void;
    /** If the selection config is shown */
    showSelectionConfig: boolean;
    /** Handles updating showSelectionConfig */
    updateShowSelectionConfig: (s: boolean) => void;
    /** If has control of the baton */
    hasBaton: boolean;
    /** The icon (optional) */
    icon?: IIconType;
    /** The label (optional) */
    label?: string;
    /** The data domain (optional) */
    domain?: Domain;
    /** The custom data domain (optional) */
    customDomain?: CustomDomain;
}
/**
 *
 * Renders the configuration options for a selection.
 * @param {SelectionConfigProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function SelectionConfig(props: SelectionConfigProps): import("react/jsx-runtime").JSX.Element[];
export default SelectionConfig;
export type { SelectionConfigProps };
//# sourceMappingURL=SelectionConfig.d.ts.map