import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SurfaceVis, Separator, ToggleBtn, getVisDomain, } from '@h5web/lib';
import { useToggle } from '@react-hookz/web';
import { ArcballControls } from '@react-three/drei';
import { useState } from 'react';
import { GridDots } from '@repo/ui/svgs';
import PlotToolbar from './PlotToolbar.js';
/**
 *
 * Renders a surface plot.
 * @param {SurfacePlotProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function SurfacePlot(props) {
    const [colourMap, setColourMap] = useState(props.colourMap ?? 'Warm');
    const [invertColourMap, toggleInvertColourMap] = useToggle();
    const [showGrid, toggleShowGrid] = useToggle();
    const [title, setTitle] = useState(props.axesParameters.title ?? '');
    const [xLabel, setXLabel] = useState(props.axesParameters.xLabel ?? 'x axis');
    const [yLabel, setYLabel] = useState(props.axesParameters.yLabel ?? 'y axis');
    const [customDomain, setCustomDomain] = useState([null, null]);
    const [showPoints, toggleShowPoints] = useToggle();
    const [surfaceScaleType, setSurfaceScaleType] = useState(props.surfaceScale);
    return (_jsxs("div", { style: {
            display: 'grid',
            position: 'relative',
        }, children: [_jsxs(PlotToolbar, { showGrid: showGrid, toggleShowGrid: toggleShowGrid, title: title, setTitle: setTitle, xLabel: xLabel, setXLabel: setXLabel, yLabel: yLabel, setYLabel: setYLabel, batonProps: props.batonProps, dDomain: props.domain, dCustomDomain: customDomain, setDCustomDomain: setCustomDomain, values: props.values.data, dScaleType: surfaceScaleType, setDScaleType: setSurfaceScaleType, colourMap: colourMap, setColourMap: setColourMap, invertColourMap: invertColourMap, toggleInvertColourMap: toggleInvertColourMap, children: [_jsx(ToggleBtn, { label: "show points", icon: GridDots, iconOnly: true, value: showPoints, onToggle: toggleShowPoints }, "show points"), _jsx(Separator, {})] }), _jsxs(SurfaceVis, { dataArray: props.values, domain: getVisDomain(customDomain, props.domain), colorMap: colourMap, invertColorMap: invertColourMap, scaleType: surfaceScaleType, showPoints: showPoints, children: [_jsx(ArcballControls, {}) // todo this is problematic for drei imports
                    , " // todo this is problematic for drei imports"] })] }));
}
export default SurfacePlot;
//# sourceMappingURL=SurfacePlot.js.map