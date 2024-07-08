import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RgbVis } from '@h5web/lib';
import { useState } from 'react';
import { useToggle } from '@react-hookz/web';
import SelectionComponent from '../selection-components/SelectionComponent.js';
import { createInteractionsConfig, InteractionModeType } from '../utils.js';
import PlotToolbar from './PlotToolbar.js';
import { SelectionType } from '../specific-selections/utils.js';
/**
 *
 * Renders an image plot.
 * @param {ImagePlotProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function ImagePlot(props) {
    const [aspect, setAspect] = useState(props.aspect ?? 'equal');
    const [title, setTitle] = useState(props.axesParameters.title ?? '');
    const [xLabel, setXLabel] = useState(props.axesParameters.xLabel ?? 'x axis');
    const [yLabel, setYLabel] = useState(props.axesParameters.yLabel ?? 'y axis');
    const [showGrid, toggleShowGrid] = useToggle(true);
    const [mode, setMode] = useState(InteractionModeType.panAndWheelZoom);
    const interactionsConfig = createInteractionsConfig(mode);
    const [selectionType, setSelectionType] = useState(SelectionType.line);
    return (_jsxs("div", { style: {
            display: 'grid',
            position: 'relative',
        }, children: [_jsx(PlotToolbar, { showGrid: showGrid, toggleShowGrid: toggleShowGrid, title: title, setTitle: setTitle, mode: mode, setMode: setMode, xLabel: xLabel, setXLabel: setXLabel, yLabel: yLabel, setYLabel: setYLabel, batonProps: props.batonProps, aspect: aspect, setAspect: setAspect, selectionType: selectionType, setSelectionType: setSelectionType, values: props.values.data, selections: props.selections, updateSelections: props.addSelection }), _jsx(RgbVis, { dataArray: props.values, aspect: aspect, showGrid: showGrid, title: title, abscissaParams: {
                    label: xLabel,
                    value: props.axesParameters.xValues?.data,
                }, ordinateParams: {
                    label: yLabel,
                    value: props.axesParameters.yValues?.data,
                }, interactions: interactionsConfig, children: _jsx(SelectionComponent, { modifierKey: [], disabled: mode !== InteractionModeType.selectRegion, selectionType: selectionType, batonProps: props.batonProps, addSelection: props.addSelection, selections: props.selections }) })] }));
}
export default ImagePlot;
//# sourceMappingURL=ImagePlot.js.map