import type { ColorMap, CustomDomain, Domain } from '@h5web/lib';
import { ScaleType } from '@h5web/lib';
import type { TypedArray } from 'ndarray';
import type { ReactNode } from 'react';
import type { IIconType } from './Modal.js';
type EnumArray<T> = Array<T[keyof T]>;
/**
 * The props for the `AxisConfigModal` component.
 * @interface {object} AxisConfigModalProps
 * @member {string} title - The title of the modal.
 * @member {IIconType} [icon] - The icon to display in the modal.
 * @member {string} [label] - The label for the axis.
 * @member {(value: string) => void} [setLabel] - The function to call when the label is updated.
 * @member {S} [scaleType] - The type of scale to use for the axis.
 * @member {(value: S) => void} [setScaleType] - The function to call when the scale type is updated.
 * @member {EnumArray<S>} scaleOptions - The available scale options.
 * @member {ColorMap} [colourMap] - The color map for the axis.
 * @member {(value: ColorMap) => void} [setColourMap] - The function to call when the color map is updated.
 * @member {boolean} [invertColourMap] - A boolean value indicating whether to invert the color map.
 * @member {() => void} [toggleColourMapInversion] - The function to call when the color map inversion is toggled.
 * @member {Domain} [domain] - The domain for the axis.
 * @member {CustomDomain} [customDomain] - The custom domain for the axis.
 * @member {(value: CustomDomain) => void} [setCustomDomain] - The function to call when the custom domain is updated.
 * @member {TypedArray} [values] - The values for the axis.
 * @member {ReactNode} [children] - The children to render inside the modal.
 */
interface AxisConfigModalProps<S extends ScaleType> {
    /** The title of the modal */
    title: string;
    /** The icon to display in the modal (optional) */
    icon?: IIconType;
    /** The label for the axis (optional) */
    label?: string;
    /** The function to call when the label is updated (optional) */
    setLabel?: (value: string) => void;
    /** The type of scale to use for the axis (optional) */
    scaleType?: S;
    /** The function to call when the scale type is updated (optional) */
    setScaleType?: (value: S) => void;
    /** The available scale options */
    scaleOptions: EnumArray<S>;
    /** The color map for the axis (optional) */
    colourMap?: ColorMap;
    /** The function to call when the color map is updated (optional) */
    setColourMap?: (value: ColorMap) => void;
    /** A boolean value indicating whether to invert the color map (optional) */
    invertColourMap?: boolean;
    /** The function to call when the color map inversion is toggled (optional) */
    toggleColourMapInversion?: () => void;
    /** The domain for the axis (optional) */
    domain?: Domain;
    /** The custom domain for the axis (optional) */
    customDomain?: CustomDomain;
    /** The function to call when the custom domain is updated (optional) */
    setCustomDomain?: (value: CustomDomain) => void;
    /** The values for the axis (optional) */
    values?: TypedArray;
    /** The children to render inside the modal (optional) */
    children?: ReactNode;
}
/**
 * Renders the configuration options for an axis.
 * @param {AxisConfigModalProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 * @template S
 */
declare function AxisConfigModal<S extends ScaleType>(props: AxisConfigModalProps<S>): (import("react/jsx-runtime").JSX.Element | null)[];
export type { AxisConfigModalProps };
export default AxisConfigModal;
//# sourceMappingURL=AxisConfigModal.d.ts.map