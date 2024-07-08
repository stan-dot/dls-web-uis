import { type MP_NDArray, type TableDisplayParams, type TableDisplayProps } from '../plots/AnyPlot.js';
/**
 *
 * Represents table data.
 * @interface TableData
 * @member {string} key - The key.
 * @member {MP_NDArray} values - The table data values.
 * @member {number} cellWidth - The individual cell width.
 * @member {TableDisplayParams} [displayParams] - The table display parameters.
 */
interface TableData {
    key: string;
    dataArray: MP_NDArray;
    cellWidth: number;
    displayParams?: TableDisplayParams;
}
/**
 *
 * Renders a table display.
 * @param {TableDisplayProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function TableDisplay(props: TableDisplayProps): import("react/jsx-runtime").JSX.Element;
export default TableDisplay;
export type { TableData };
//# sourceMappingURL=TableDisplay.d.ts.map