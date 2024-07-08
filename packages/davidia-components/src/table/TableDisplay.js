import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MatrixVis } from '@h5web/lib';
import { useState } from 'react';
import { TableToolbar } from './TableToolbar.js';
import { defaultWidth } from './tableConstants.js';
function calculateFormat(displayStyle, numberDigits) {
    const isStandard = displayStyle === 'standard';
    const options = {
        notation: displayStyle,
        maximumFractionDigits: isStandard ? Math.max(numberDigits, 0) : undefined,
        maximumSignificantDigits: isStandard
            ? undefined
            : Math.max(numberDigits, 1),
    };
    return new Intl.NumberFormat('en', options);
}
/**
 *
 * Renders a table display.
 * @param {TableDisplayProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function TableDisplay(props) {
    const [displayStyle, setDisplayStyle] = useState(props.displayParams?.displayType ?? 'standard');
    const [numberDigits, setNumberDigits] = useState(props.displayParams?.numberDigits ?? 2);
    const [cellWidth, setCellWidth] = useState(props.cellWidth);
    // note: derived state that changes on every render
    const numFmt = calculateFormat(displayStyle, numberDigits);
    const matrixCellFormatter = (val, _column) => {
        const numericType = typeof val === 'number' || typeof val === 'bigint';
        return numericType ? numFmt.format(val) : '';
    };
    return (_jsxs("div", { style: {
            display: 'grid',
            position: 'relative',
        }, children: [_jsx(TableToolbar, { cellWidth: cellWidth, setCellWidth: setCellWidth, displayStyle: displayStyle, updateDisplayStyle: setDisplayStyle, numberDigits: numberDigits, setNumberDigits: setNumberDigits }), _jsx(MatrixVis, { cellWidth: cellWidth ?? defaultWidth, dataArray: props.dataArray, formatter: matrixCellFormatter })] }));
}
export default TableDisplay;
//# sourceMappingURL=TableDisplay.js.map