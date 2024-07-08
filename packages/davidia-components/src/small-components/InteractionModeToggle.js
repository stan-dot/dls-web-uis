import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { IoShapesOutline } from 'react-icons/io5';
import { TbZoomInArea, TbZoomPan } from 'react-icons/tb';
import { ToggleGroup } from '@h5web/lib';
import { InteractionModeType } from '../utils.js';
/**
 *
 * Renders a toggle button for interaction mode.
 * @param {InteractionModeToggleProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function InteractionModeToggle({ value, onModeChange, hasBaton, }) {
    // todo what does this do? when does it run from the user point of view?
    useEffect(() => {
        if (!hasBaton && value === InteractionModeType.selectRegion) {
            onModeChange(InteractionModeType.panAndWheelZoom);
        }
    }, [value, onModeChange, hasBaton]);
    return (_jsx(_Fragment, { children: _jsxs(ToggleGroup, { role: "radiogroup", ariaLabel: "mode", value: value, onChange: (v) => onModeChange(v), children: [_jsx(ToggleGroup.Btn, { label: decodeURI('pan & wheel zoom%0A      alt: x-only%0A     shift: y-only'), iconOnly: true, icon: TbZoomPan, value: InteractionModeType.panAndWheelZoom }), _jsx(ToggleGroup.Btn, { label: decodeURI('select to zoom%0A   alt: x-only%0A  shift: y-only'), iconOnly: true, icon: TbZoomInArea, value: InteractionModeType.selectToZoom }), _jsx("div", { style: {
                        pointerEvents: hasBaton ? 'inherit' : 'auto',
                        display: 'inline-flex',
                    }, title: hasBaton ? '' : 'need baton', children: _jsx(ToggleGroup.Btn, { label: "select region", iconOnly: true, icon: IoShapesOutline, value: InteractionModeType.selectRegion, disabled: !hasBaton }) })] }) }));
}
export default InteractionModeToggle;
//# sourceMappingURL=InteractionModeToggle.js.map