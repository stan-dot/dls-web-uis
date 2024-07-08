import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ScaleType, ScatterVis, getVisDomain, } from '@h5web/lib';
import { useToggle } from '@react-hookz/web';
import { useState } from 'react';
import PlotToolbar from './PlotToolbar.js';
import SelectionComponent from '../selection-components/SelectionComponent.js';
import { SelectionType } from '../specific-selections/utils.js';
import { createInteractionsConfig, InteractionModeType } from '../utils.js';
/**
 *
 * Renders a scatter plot.
 * @param {ScatterPlotProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function ScatterPlot(props) {
    const abscissaValue = props.axesParameters.xValues?.data ?? props.xData.data;
    const ordinateValue = props.axesParameters.yValues?.data ?? props.yData.data;
    const [colourMap, setColourMap] = useState(props.colourMap ?? 'Viridis');
    const [showGrid, toggleShowGrid] = useToggle();
    const [title, setTitle] = useState(props.axesParameters.title ?? '');
    const [xLabel, setXLabel] = useState(props.axesParameters.xLabel ?? 'x axis');
    const [yLabel, setYLabel] = useState(props.axesParameters.yLabel ?? 'y axis');
    console.log('props are', props);
    console.log('props.axesParameters.xLabel is', props.axesParameters.xLabel);
    console.log('xLabel is', xLabel);
    const [xScaleType, setXScaleType] = useState(props.axesParameters.xScale ?? ScaleType.Linear);
    const [yScaleType, setYScaleType] = useState(props.axesParameters.yScale ?? ScaleType.Linear);
    const [invertColourMap, toggleInvertColourMap] = useToggle();
    const [dCustomDomain, setDCustomDomain] = useState([
        null,
        null,
    ]);
    const [mode, setMode] = useState(InteractionModeType.panAndWheelZoom);
    const interactionsConfig = createInteractionsConfig(mode);
    const [selectionType, setSelectionType] = useState(SelectionType.line);
    return (_jsxs("div", { style: {
            display: 'grid',
            position: 'relative',
        }, children: [_jsx(PlotToolbar, { showGrid: showGrid, toggleShowGrid: toggleShowGrid, title: title, setTitle: setTitle, mode: mode, setMode: setMode, xLabel: xLabel, setXLabel: setXLabel, xScaleType: xScaleType, setXScaleType: setXScaleType, yLabel: yLabel, setYLabel: setYLabel, batonProps: props.batonProps, yScaleType: yScaleType, setYScaleType: setYScaleType, dDomain: props.domain, dCustomDomain: dCustomDomain, setDCustomDomain: setDCustomDomain, colourMap: colourMap, setColourMap: setColourMap, invertColourMap: invertColourMap, toggleInvertColourMap: toggleInvertColourMap, selectionType: selectionType, setSelectionType: setSelectionType, selections: props.selections, updateSelections: props.addSelection }), _jsx(ScatterVis, { abscissaParams: {
                    label: xLabel,
                    value: abscissaValue,
                    scaleType: xScaleType,
                }, colorMap: colourMap, title: title, invertColorMap: invertColourMap, dataArray: props.dataArray, domain: getVisDomain(dCustomDomain, props.domain), ordinateParams: {
                    label: yLabel,
                    value: ordinateValue,
                    scaleType: yScaleType,
                }, showGrid: showGrid, interactions: interactionsConfig, children: _jsx(SelectionComponent, { modifierKey: [], batonProps: props.batonProps, disabled: mode !== InteractionModeType.selectRegion, selectionType: selectionType, addSelection: props.addSelection, selections: props.selections }) })] }));
}
export default ScatterPlot;
//# sourceMappingURL=ScatterPlot.js.map