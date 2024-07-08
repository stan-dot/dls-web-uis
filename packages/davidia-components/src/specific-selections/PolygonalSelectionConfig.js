import { jsx as _jsx } from "react/jsx-runtime";
import { PointXInput, PointYInput, } from '../selection-components/SelectionConfigComponents.js';
import styles from './PolygonalSelectionConfig.module.css';
/**
 *
 * Renders configuration for polygonal selection.
 * @param {PolygonalSelectionConfigProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function PolygonalSelectionConfig(props) {
    const { selection, updateSelection, disabled } = props;
    /**
     *
     * Updates a point.
     * @param {[number, number]} p - new coordinates for the point.
     * @param {number} i - index of point.
     * @returns {JSX.Element} The rendered component.
     */
    function updatePoint(p, i) {
        selection.points[i] = p;
        updateSelection(selection);
    }
    const xyInputs = selection.points.map((p, i) => {
        return [
            _jsx(PointXInput, { i: i, point: p, updatePoint: (np) => updatePoint(np, i), disabled: disabled }, `px${i}`),
            _jsx(PointYInput, { i: i, point: p, updatePoint: (np) => updatePoint(np, i), disabled: disabled }, `py${i}`),
        ];
    });
    return (_jsx("div", { className: styles.scrollContainer, children: xyInputs.flat() }, "polygon"));
}
export default PolygonalSelectionConfig;
//# sourceMappingURL=PolygonalSelectionConfig.js.map