import { type Aspect, type AxisScaleType, type ColorMap, type ColorScaleType, type CustomDomain, type Domain } from '@h5web/lib';
import type { TypedArray } from 'ndarray';
import type { ReactNode } from 'react';
import type { SelectionBase, SelectionType } from '../specific-selections/utils.js';
import type { BatonProps } from './AnyPlot.js';
import { InteractionModeType } from '../utils.js';
/**
 * The props for the `PlotToolbar` component.
 * @param {boolean} showGrid - If the grid should be shown.
 * @param {() => void} toggleShowGrid - Toggles the grid.
 * @param {string} title - The title.
 * @param {(t:string) => void} setTitle - A function that sets the title.
 * @param {InteractionModeType} [mode] - The mode.
 * @param {(m:InteractionModeType) => void} [setMode] - An optional function that sets the mode.
 * @param {Domain} [xDomain] - A domain value for the x-axis.
 * @param {CustomDomain} [xCustomDomain] - A custom domain value for the x-axis.
 * @param {(d: CustomDomain) => void} [setXCustomDomain] - A function that sets the custom domain value for the x-axis.
 * @param {string} xLabel - The label for the x-axis.
 * @param {(l: string) => void} setXLabel - A function that sets the label for the x-axis.
 * @param {AxisScaleType} [xScaleType] - An axis scale type for the x-axis.
 * @param {(s: AxisScaleType) => void} [setXScaleType] - An optional function that sets the axis scale type for the x-axis.
 * @param {Domain} [yDomain] - A domain value for the y-axis.
 * @param {CustomDomain} [yCustomDomain] - A custom domain value for the y-axis.
 * @param {(d: CustomDomain) => void} [setYCustomDomain] - A function that sets the custom domain value for the y-axis.
 * @param {string} yLabel - The label for the y-axis.
 * @param {(l: string) => void} setYLabel - Function that sets the label for the y-axis.
 * @param {BatonProps} [batonProps] - The baton properties.
 * @param {AxisScaleType} [yScaleType] - Axis scale type for the y-axis.
 * @param {(s: AxisScaleType) => void} [setYScaleType] - A function that sets the axis scale type for the y-axis.
 * @param {Aspect} [aspect] - An aspect value.
 * @param {(a: Aspect) => void} [setAspect] - A function that sets the aspect value.
 * @param {SelectionType} [selectionType] - Selection type.
 * @param {(s: SelectionType) => void} [setSelectionType] - Function that sets the selection type.
 * @param {Domain} [dDomain] - Domain value for the d-axis.
 * @param {CustomDomain} [dCustomDomain] - Custom domain value for the d-axis.
 * @param {(d: CustomDomain) => void} [setDCustomDomain] - Sets the custom domain value for the d-axis.
 * @param {TypedArray} [values] - Values.
 * @param {ColorScaleType} [dScaleType] - The color scale type for the d-axis.
 * @param {(s: ColorScaleType) => void} [setDScaleType] - Sets the color scale type for the d-axis.
 * @param {ColorMap} [colourMap] - The color map.
 * @param {(c: ColorMap) => void} [setColourMap] - A function that sets the color map.
 * @param {boolean} invertColourMap - Whether to invert the color map.
 * @param {() => void} toggleInvertColourMap - A function that toggles the color map inversion.
 * @param {SelectionBase[]} [selections] - Selections.
 * @param {(s: SelectionBase | null, b?: boolean, c?: boolean ) => void} [updateSelections] - A function that updates the selections.
 * @param {reactNode} [children] - Any child components.
 */
interface PlotToolbarProps {
    /** If the grid should be shown */
    showGrid: boolean;
    /** Toggles the grid */
    toggleShowGrid: () => void;
    /** The title */
    title: string;
    /** A function that sets the title */
    setTitle: (t: string) => void;
    /** The mode (optional) */
    mode?: InteractionModeType;
    /** An optional function that sets the mode */
    setMode?: (m: InteractionModeType) => void;
    /** A domain value for the x-axis (optional) */
    xDomain?: Domain;
    /** A custom domain value for the x-axis (optional) */
    xCustomDomain?: CustomDomain;
    /** A function that sets the custom domain value for the x-axis (optional) */
    setXCustomDomain?: (d: CustomDomain) => void;
    /** The label for the x-axis */
    xLabel: string;
    /** A function that sets the label for the x-axis */
    setXLabel: (l: string) => void;
    /** An axis scale type for the x-axis (optional) */
    xScaleType?: AxisScaleType;
    /** An optional function that sets the axis scale type for the x-axis */
    setXScaleType?: (s: AxisScaleType) => void;
    /** A domain value for the y-axis (optional) */
    yDomain?: Domain;
    /** A custom domain value for the y-axis (optional) */
    yCustomDomain?: CustomDomain;
    /** A function that sets the custom domain value for the y-axis (optional) */
    setYCustomDomain?: (d: CustomDomain) => void;
    /** The label for the y-axis */
    yLabel: string;
    /** A function that sets the label for the y-axis */
    setYLabel: (l: string) => void;
    /** The baton properties */
    batonProps?: BatonProps;
    /** An axis scale type for the y-axis (optional) */
    yScaleType?: AxisScaleType;
    /** A function that sets the axis scale type for the y-axis (optional) */
    setYScaleType?: (s: AxisScaleType) => void;
    /** An aspect value (optional) */
    aspect?: Aspect;
    /** A function that sets the aspect value (optional) */
    setAspect?: (a: Aspect) => void;
    /** A selection type (optional) */
    selectionType?: SelectionType;
    /** A function that sets the selection type (optional) */
    setSelectionType?: (s: SelectionType) => void;
    /** A domain value for the d-axis (optional) */
    dDomain?: Domain;
    /** A custom domain value for the d-axis (optional) */
    dCustomDomain?: CustomDomain;
    /** A function that sets the custom domain value for the d-axis (optional) */
    setDCustomDomain?: (d: CustomDomain) => void;
    /** Values (optional) */
    values?: TypedArray;
    /** A color scale type for the d-axis (optional) */
    dScaleType?: ColorScaleType;
    /** A function that sets the color scale type for the d-axis (optional) */
    setDScaleType?: (s: ColorScaleType) => void;
    /** A color map (optional) */
    colourMap?: ColorMap;
    /** A function that sets the color map (optional) */
    setColourMap?: (c: ColorMap) => void;
    /** Whether to invert the color map */
    invertColourMap?: boolean;
    /** A function that toggles the color map inversion */
    toggleInvertColourMap?: () => void;
    /** Selections (optional) */
    selections?: SelectionBase[];
    /** A function that updates the selections (optional) */
    updateSelections?: (s: SelectionBase | null, b?: boolean, c?: boolean) => void;
    /** Any child components (optional) */
    children?: ReactNode;
}
/**
 *
 * Renders a plot toolbar.
 * @param {PlotToolbarProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function PlotToolbar(props: PlotToolbarProps): import("react/jsx-runtime").JSX.Element;
export type { PlotToolbarProps };
export default PlotToolbar;
//# sourceMappingURL=PlotToolbar.d.ts.map