import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useVisCanvasContext } from '@h5web/lib';
import { useMemo } from 'react';
import { Vector3 } from 'three';
import { useThree } from '@react-three/fiber';
import MulticlickSelectionTool from './MulticlickSelectionTool.js';
import { SelectionType, getClicks, makeShapes, pointsToSelection, pointsToShape, validateHtml, } from '../specific-selections/utils.js';
/**
 *
 * Renders a selection component.
 * @param {SelectionComponentProps} props - The component props.
 * @returns {JSX.Element | null} The rendered component.
 */
function SelectionComponent(props) {
    const { disabled = false, selectionType = SelectionType.rectangle, selections, addSelection, batonProps, } = props;
    const alpha = 0.3;
    const { canvasBox, dataToHtml } = useVisCanvasContext();
    const size = canvasBox.size;
    const shapes = useMemo(() => {
        return makeShapes(size, selections, batonProps?.hasBaton ?? true, addSelection);
    }, [size, selections, addSelection, batonProps?.hasBaton]);
    const camera = useThree((state) => state.camera);
    const isFlipped = useMemo(() => {
        const o = dataToHtml(camera, new Vector3(0, 0));
        const v = dataToHtml(camera, new Vector3(1, 1)).sub(o);
        return [v.x < 0, v.y < 0];
    }, [camera, dataToHtml]);
    const clicks = getClicks(selectionType);
    return (_jsxs(_Fragment, { children: [addSelection && (batonProps?.hasBaton ?? true) && !disabled && (_jsx(MulticlickSelectionTool, { modifierKey: props.modifierKey, validate: ({ html }) => validateHtml(html, selectionType), onValidSelection: ({ data }) => {
                    const s = pointsToSelection(selections, selectionType, data, alpha);
                    return addSelection(s);
                }, minPoints: clicks[0], maxPoints: clicks[1], children: ({ html }, _, isValid) => pointsToShape(selectionType, html, isFlipped, alpha, size, isValid ? undefined : '#cc6677' // orangered,
                ) })), shapes] }));
}
export default SelectionComponent;
//# sourceMappingURL=SelectionComponent.js.map