import { type ColorMap, Domain } from '@h5web/lib';
import type { ImageData } from './ImagePlot.js';
import type { HeatmapPlotProps } from './AnyPlot.js';
/**
 * Represents heatmap data.
 * @interface {object} HeatmapData
 * @extends {ImageData}
 * @member {Domain} domain - The heatmap data domain.
 * @member {string} heatmap_scale - The heatmap scale.
 * @member {ColorMap} colourMap - The colour map.
 */
interface HeatmapData extends ImageData {
    /** The heatmap data domain */
    domain: Domain;
    /** The heatmap scale */
    heatmap_scale: string;
    /** The colour map */
    colourMap: ColorMap;
}
/**
 *
 * Renders a heatmap plot.
 * @param {HeatmapPlotProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function HeatmapPlot(props: HeatmapPlotProps): import("react/jsx-runtime").JSX.Element;
export default HeatmapPlot;
export type { HeatmapData };
//# sourceMappingURL=HeatmapPlot.d.ts.map