import { type ColorMap, Domain } from '@h5web/lib';
import type { MP_NDArray, ScatterPlotProps } from './AnyPlot.js';
/**
 * Represents scatter data.
 * @interface {object} ScatterData
 * @member {string} key - The key.
 * @member {MP_NDArray} xData - The x data.
 * @member {MP_NDArray} yData - The y data.
 * @member {MP_NDArray} dataArray - The z data.
 * @member {Domain} domain - The z data domain.
 * @member {ColorMap} [colourMap] - The colour map.
 */
interface ScatterData {
    /** The key */
    key: string;
    /** The x data */
    xData: MP_NDArray;
    /** The y data */
    yData: MP_NDArray;
    /** The z data */
    dataArray: MP_NDArray;
    /** The z data domain */
    domain: Domain;
    /** The colour map */
    colourMap?: ColorMap;
}
/**
 *
 * Renders a scatter plot.
 * @param {ScatterPlotProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function ScatterPlot(props: ScatterPlotProps): import("react/jsx-runtime").JSX.Element;
export default ScatterPlot;
export type { ScatterData };
//# sourceMappingURL=ScatterPlot.d.ts.map