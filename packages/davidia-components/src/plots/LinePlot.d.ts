import type { LinePlotProps, MP_NDArray } from './AnyPlot.js';
/**
 * Represents line data.
 * @interface {object} LineData
 * @member {string} key - The key.
 * @member {string} [colour] - The line colour.
 * @member {MP_NDArray} x - The x data.
 * @member {MP_NDArray} y - The y data.
 * @member {boolean} line_on - If line is visible.
 * @member {number} [point_size] - The data point size.
 */
interface LineData {
    /** The key */
    key: string;
    /** The line colour (optional) */
    colour?: string;
    /** The x data */
    x: MP_NDArray;
    /** The y data */
    y: MP_NDArray;
    /** If line is visible */
    line_on: boolean;
    /** The data point size (optional) */
    point_size?: number;
}
/**
 *
 * Renders a line plot.
 * @param {LinePlotProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function LinePlot(props: LinePlotProps): import("react/jsx-runtime").JSX.Element;
export default LinePlot;
export type { LineData };
//# sourceMappingURL=LinePlot.d.ts.map