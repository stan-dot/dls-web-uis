import { jsx as _jsx } from "react/jsx-runtime";
import afterFrame from 'afterframe';
import { useRef } from 'react';
import HeatmapPlot from './HeatmapPlot.js';
import ImagePlot from './ImagePlot.js';
import LinePlot from './LinePlot.js';
import ScatterPlot from './ScatterPlot.js';
import SurfacePlot from './SurfacePlot.js';
import TableDisplay from '../table/TableDisplay.js';
import { measureInteraction } from '../utils.js';
/**
 *
 * Renders a plot.
 * @param {AnyPlotProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function AnyPlot(props) {
    const interactionTime = useRef(0);
    const interaction = measureInteraction();
    afterFrame(() => {
        interactionTime.current = interaction.end();
    });
    if (!props.batonProps) {
        props = {
            ...props,
            batonProps: {
                uuid: '',
                batonUuid: '',
                others: [],
                hasBaton: true,
                requestBaton: () => { },
                approveBaton: (_s) => { },
            },
        };
    }
    if ('surfaceScale' in props) {
        return _jsx(SurfacePlot, { ...props });
    }
    else if ('heatmapScale' in props) {
        return _jsx(HeatmapPlot, { ...props });
    }
    else if ('values' in props) {
        return _jsx(ImagePlot, { ...props });
    }
    else if ('xData' in props) {
        return _jsx(ScatterPlot, { ...props });
    }
    else if ('cellWidth' in props) {
        return _jsx(TableDisplay, { ...props });
    }
    else if ('data' in props && props.data.length !== 0) {
        return _jsx(LinePlot, { ...props });
    }
    return null;
}
export default AnyPlot;
//# sourceMappingURL=AnyPlot.js.map