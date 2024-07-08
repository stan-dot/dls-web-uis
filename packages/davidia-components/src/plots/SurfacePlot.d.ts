import { type ColorMap, Domain } from '@h5web/lib';
import type { MP_NDArray, SurfacePlotProps } from './AnyPlot.js';
/**
 *
 * Represents surface data.
 * @interface SurfaceData
 * @member {string} key - The key.
 * @member {MP_NDArray} values - The surface data values.
 * @member {Domain} domain - The surface data domain.
 * @member {string} surface_scale - The surface data scale.
 * @member {ColorMap} colourMap - The surface colour map.
 */
interface SurfaceData {
    /** The key */
    key: string;
    /** The surface data values */
    values: MP_NDArray;
    /** The surface data domain */
    domain: Domain;
    /** The surface data scale */
    surface_scale: string;
    /** The surface colour map */
    colourMap: ColorMap;
}
/**
 *
 * Renders a surface plot.
 * @param {SurfacePlotProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function SurfacePlot(props: SurfacePlotProps): import("react/jsx-runtime").JSX.Element;
export default SurfacePlot;
export type { SurfaceData };
//# sourceMappingURL=SurfacePlot.d.ts.map