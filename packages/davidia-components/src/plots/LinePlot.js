import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CurveType, DataCurve, DefaultInteractions, GlyphType, ResetZoomButton, ScaleType, TooltipMesh, VisCanvas, getVisDomain, } from '@h5web/lib';
import { useState } from 'react';
import { useToggle } from '@react-hookz/web';
import PlotToolbar from './PlotToolbar.js';
import SelectionComponent from '../selection-components/SelectionComponent.js';
import { SelectionType } from '../specific-selections/utils.js';
import { createInteractionsConfig, InteractionModeType } from '../utils.js';
/**
 *
 * Creates and renders a data curve.
 * @param {DLineData} d - Line data.
 * @param {number} i - Number of data curve.
 * @returns {JSX.Element} The rendered component.
 */
function createDataCurve(d, i) {
    const COLOURLIST = [
        'rgb(0, 0, 0)',
        'rgb(230, 159, 0)',
        'rgb(86, 180, 233)',
        'rgb(0, 158, 115)',
        'rgb(240, 228, 66)',
        'rgb(0, 114, 178)',
        'rgb(213, 94, 0)',
        'rgb(204, 121, 167)',
    ];
    let visible = true;
    let curveType = CurveType.LineAndGlyphs;
    if (!d.point_size) {
        d.point_size = 0;
        if (d.line_on) {
            curveType = CurveType.LineOnly;
        }
        else {
            visible = false;
        }
    }
    else if (!d.line_on) {
        curveType = CurveType.GlyphsOnly;
    }
    const colour = d.colour ?? COLOURLIST[i % COLOURLIST.length] ?? 'gray';
    return (_jsx(DataCurve, { abscissas: d.x.data, ordinates: d.y.data, color: colour, curveType: curveType, glyphType: GlyphType.Circle, glyphSize: d.point_size, visible: visible }, `data_curve_${i}`));
}
/**
 *
 * Renders a line plot.
 * @param {LinePlotProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function LinePlot(props) {
    const [xCustomDomain, setXCustomDomain] = useState([
        null,
        null,
    ]);
    const [yCustomDomain, setYCustomDomain] = useState([
        null,
        null,
    ]);
    const [showGrid, toggleShowGrid] = useToggle();
    const [title, setTitle] = useState(props.axesParameters.title ?? '');
    const [xLabel, setXLabel] = useState(props.axesParameters.xLabel ?? 'x axis');
    const [yLabel, setYLabel] = useState(props.axesParameters.yLabel ?? 'y axis');
    const [xScaleType, setXScaleType] = useState(props.axesParameters.xScale ?? ScaleType.Linear);
    const [yScaleType, setYScaleType] = useState(props.axesParameters.yScale ?? ScaleType.Linear);
    const tooltipText = (x, y) => {
        return (_jsxs("p", { children: [x.toPrecision(8), ", ", y.toPrecision(8)] }));
    };
    const [mode, setMode] = useState(InteractionModeType.panAndWheelZoom);
    const interactionsConfig = createInteractionsConfig(mode);
    const [selectionType, setSelectionType] = useState(SelectionType.line);
    return (_jsxs("div", { style: {
            display: 'grid',
            position: 'relative',
        }, children: [_jsx(PlotToolbar, { showGrid: showGrid, toggleShowGrid: toggleShowGrid, title: title, setTitle: setTitle, mode: mode, setMode: setMode, xDomain: props.xDomain, xCustomDomain: xCustomDomain, setXCustomDomain: setXCustomDomain, xLabel: xLabel, setXLabel: setXLabel, xScaleType: xScaleType, setXScaleType: setXScaleType, yDomain: props.yDomain, yCustomDomain: yCustomDomain, setYCustomDomain: setYCustomDomain, yLabel: yLabel, setYLabel: setYLabel, batonProps: props.batonProps, yScaleType: yScaleType, setYScaleType: setYScaleType, selectionType: selectionType, setSelectionType: setSelectionType, selections: props.selections, updateSelections: props.addSelection }), _jsxs(VisCanvas, { title: title, abscissaConfig: {
                    visDomain: getVisDomain(xCustomDomain, props.xDomain),
                    showGrid: showGrid,
                    scaleType: xScaleType,
                    label: xLabel,
                    nice: true,
                }, ordinateConfig: {
                    visDomain: getVisDomain(yCustomDomain, props.yDomain),
                    showGrid: showGrid,
                    scaleType: yScaleType,
                    label: yLabel,
                    nice: true,
                }, children: [_jsx(DefaultInteractions, { ...interactionsConfig }), props.data.map((d, index) => createDataCurve(d, index)), _jsx(TooltipMesh, { renderTooltip: tooltipText }), _jsx(ResetZoomButton, {}), props.addSelection && (_jsx(SelectionComponent, { modifierKey: [], batonProps: props.batonProps, disabled: mode !== InteractionModeType.selectRegion, selectionType: selectionType, addSelection: props.addSelection, selections: props.selections }))] })] }));
}
export default LinePlot;
//# sourceMappingURL=LinePlot.js.map