import { Aspect } from '@h5web/lib';
import type { ImagePlotProps, MP_NDArray } from './AnyPlot.js';
/**
 * Represents image data.
 * @interface {object} ImageData
 * @member {string} key - The key.
 * @member {MP_NDArray} values - The image data values.
 * @member {Aspect} aspect - The aspect ratio.
 */
interface ImageData {
    /** The key */
    key: string;
    /** The image data values */
    values: MP_NDArray;
    /** The aspect ratio (optional) */
    aspect?: Aspect;
}
/**
 *
 * Renders an image plot.
 * @param {ImagePlotProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function ImagePlot(props: ImagePlotProps): import("react/jsx-runtime").JSX.Element;
export default ImagePlot;
export type { ImageData };
//# sourceMappingURL=ImagePlot.d.ts.map