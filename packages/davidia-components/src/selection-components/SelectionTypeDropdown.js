import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SelectionType } from '../specific-selections/utils.js';
import { AiOutlineColumnHeight, AiOutlineColumnWidth } from 'react-icons/ai';
import { BiCircleQuarter } from 'react-icons/bi';
import { BsSlashLg } from 'react-icons/bs';
import { MdOutlinePolyline, MdOutlineRectangle } from 'react-icons/md';
import { TbCircle, TbOvalVertical, TbPolygon, TbQuestionMark, } from 'react-icons/tb';
import { Selector } from '@h5web/lib';
import styles from './SelectionTypeDropdown.module.css';
/**
 *
 * Renders a dropdown for choosing selection type.
 * @param {SelectionDropdownProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function SelectionTypeDropdown(props) {
    const { value, onSelectionTypeChange, options = [
        SelectionType.line,
        SelectionType.rectangle,
        SelectionType.horizontalAxis,
        SelectionType.verticalAxis,
        SelectionType.polygon,
        SelectionType.polyline,
    ], } = props;
    return (_jsx(Selector, { value: value, onChange: onSelectionTypeChange, options: options, optionComponent: SelectionTypeOption, disabled: props.disabled }));
}
const SELECTION_OPTIONS = {
    [SelectionType.line]: {
        Icon: BsSlashLg,
        label: 'Line',
    },
    [SelectionType.rectangle]: {
        Icon: MdOutlineRectangle,
        label: 'Rectangle',
    },
    [SelectionType.polyline]: {
        Icon: MdOutlinePolyline,
        label: 'Polyline',
    },
    [SelectionType.polygon]: {
        Icon: TbPolygon,
        label: 'Polygon',
    },
    [SelectionType.circle]: {
        Icon: TbCircle,
        label: 'Circle',
    },
    [SelectionType.ellipse]: {
        Icon: TbOvalVertical,
        label: 'Ellipse',
    },
    [SelectionType.sector]: {
        Icon: BiCircleQuarter,
        label: 'Sector',
    },
    [SelectionType.horizontalAxis]: {
        Icon: AiOutlineColumnWidth,
        label: 'Horizontal Axis',
    },
    [SelectionType.verticalAxis]: {
        Icon: AiOutlineColumnHeight,
        label: 'Vertical Axis',
    },
    [SelectionType.unknown]: {
        Icon: TbQuestionMark,
        label: 'Unknown',
    },
};
/**
 *
 * Renders a selection icon.
 * @param {{ option: SelectionType }} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function SelectionTypeOption(props) {
    const { option } = props;
    const { Icon, label } = SELECTION_OPTIONS[option];
    return (_jsxs("div", { className: styles.option, children: [_jsx(Icon, { className: styles.icon }), _jsx("span", { children: label })] }));
}
export default SelectionTypeDropdown;
//# sourceMappingURL=SelectionTypeDropdown.js.map