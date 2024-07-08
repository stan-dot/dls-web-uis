import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HeatmapVis, ScaleType, getVisDomain, } from '@h5web/lib';
import { useState } from 'react';
import { useToggle } from '@react-hookz/web';
import { createInteractionsConfig, InteractionModeType } from '../utils.js';
import PlotToolbar from './PlotToolbar.js';
import SelectionComponent from '../selection-components/SelectionComponent.js';
import { SelectionType } from '../specific-selections/utils.js';
/**
 *
 * Renders a heatmap plot.
 * @param {HeatmapPlotProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function HeatmapPlot(props) {
    const [aspect, setAspect] = useState(props.aspect ?? 'equal');
    const [colourMap, setColourMap] = useState(props.colourMap ?? 'Warm');
    const [invertColourMap, toggleInvertColourMap] = useToggle();
    const [showGrid, toggleShowGrid] = useToggle();
    const [title, setTitle] = useState(props.axesParameters.title ?? '');
    const [xLabel, setXLabel] = useState(props.axesParameters.xLabel ?? 'x axis');
    const [yLabel, setYLabel] = useState(props.axesParameters.yLabel ?? 'y axis');
    const [customDomain, setCustomDomain] = useState([null, null]);
    const [xScaleType, setXScaleType] = useState(props.axesParameters.xScale ?? ScaleType.Linear);
    const [yScaleType, setYScaleType] = useState(props.axesParameters.yScale ?? ScaleType.Linear);
    const [heatmapScaleType, setHeatmapScaleType] = useState(props.heatmapScale);
    const [mode, setMode] = useState(InteractionModeType.panAndWheelZoom);
    const interactionsConfig = createInteractionsConfig(mode);
    const [selectionType, setSelectionType] = useState(SelectionType.line);
    return (_jsxs("div", { style: {
            display: 'grid',
            position: 'relative',
        }, children: [_jsx(PlotToolbar, { showGrid: showGrid, toggleShowGrid: toggleShowGrid, title: title, setTitle: setTitle, mode: mode, setMode: setMode, xLabel: xLabel, setXLabel: setXLabel, xScaleType: xScaleType, setXScaleType: setXScaleType, yLabel: yLabel, setYLabel: setYLabel, batonProps: props.batonProps, yScaleType: yScaleType, setYScaleType: setYScaleType, aspect: aspect, setAspect: setAspect, selectionType: selectionType, setSelectionType: setSelectionType, dDomain: props.domain, dCustomDomain: customDomain, setDCustomDomain: setCustomDomain, values: props.values.data, dScaleType: heatmapScaleType, setDScaleType: setHeatmapScaleType, colourMap: colourMap, setColourMap: setColourMap, invertColourMap: invertColourMap, toggleInvertColourMap: toggleInvertColourMap, selections: props.selections, updateSelections: props.addSelection }), _jsx(HeatmapVis, { dataArray: props.values, domain: getVisDomain(customDomain, props.domain), colorMap: colourMap, invertColorMap: invertColourMap, scaleType: heatmapScaleType, aspect: aspect, showGrid: showGrid, title: title, abscissaParams: {
                    label: xLabel,
                    scaleType: xScaleType,
                    value: props.axesParameters.xValues?.data,
                }, ordinateParams: {
                    label: yLabel,
                    scaleType: yScaleType,
                    value: props.axesParameters.yValues?.data,
                }, interactions: interactionsConfig, children: _jsx(SelectionComponent, { modifierKey: [], batonProps: props.batonProps, disabled: mode !== InteractionModeType.selectRegion, selectionType: selectionType, addSelection: props.addSelection, selections: props.selections }) })] }));
}
export default HeatmapPlot;
//# sourceMappingURL=HeatmapPlot.js.map