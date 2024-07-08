import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AXIS_SCALE_TYPES, COLOR_SCALE_TYPES, GridToggler, Separator, Toolbar, } from '@h5web/lib';
import { Fragment, useEffect, useState } from 'react';
import AspectConfigModal from '../modals/AspectConfigModal.js';
import AxisConfigModal from '../modals/AxisConfigModal.js';
import { BatonConfigModal } from '../modals/BatonConfigModal.js';
import ClearSelectionsBtn from '../small-components/ClearSelectionsBtn.js';
import InteractionModeToggle from '../small-components/InteractionModeToggle.js';
import SelectionTypeDropdown from '../selection-components/SelectionTypeDropdown.js';
import SelectionConfig from '../selection-components/SelectionConfig.js';
import SelectionIDDropdown from '../selection-components/SelectionIDDropdown.js';
import { InteractionModeType } from '../utils.js';
import { TitleConfigModal } from './TitleConfigModal.js';
/**
 *
 * Renders a plot toolbar.
 * @param {PlotToolbarProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function PlotToolbar(props) {
    const firstSelection = props.selections && props.selections.length > 0 && props.selections.at(-1)
        ? props.selections.at(-1).id
        : null;
    const [currentSelectionID, setCurrentSelectionID] = useState(firstSelection);
    const [showSelectionConfig, setShowSelectionConfig] = useState(false);
    /**
     *
     * Sets fixed and asDashed properties of selection to true.
     * @param {SelectionBase} s - The selection to modify.
     */
    function enableSelection(s) {
        s.fixed = true;
        s.asDashed = true;
    }
    /**
     *
     * Sets fixed and asDashed properties of selection to false.
     * @param {SelectionBase} s - The selection to modify.
     */
    function disableSelection(s) {
        s.fixed = false;
        s.asDashed = false;
    }
    useEffect(() => {
        props.selections?.map((s) => disableSelection(s));
        if (showSelectionConfig) {
            const selection = props.selections?.find((s) => s.id === currentSelectionID);
            if (selection) {
                enableSelection(selection);
            }
        }
    }, [currentSelectionID, props.selections, showSelectionConfig]);
    useEffect(() => {
        if (currentSelectionID === null &&
            props.selections &&
            props.selections.length > 0) {
            const selection = props.selections[props.selections.length - 1];
            if (selection) {
                setCurrentSelectionID(selection.id);
            }
        }
    }, [props.selections, currentSelectionID]);
    const modals = [
        AxisConfigModal({
            title: 'X axis',
            icon: TbAxisX,
            label: props.xLabel,
            setLabel: props.setXLabel,
            scaleType: props.xScaleType,
            scaleOptions: AXIS_SCALE_TYPES,
            setScaleType: props.setXScaleType,
            domain: props.xDomain,
            customDomain: props.xCustomDomain,
            setCustomDomain: props.setXCustomDomain,
        }),
        AxisConfigModal({
            title: 'Y axis',
            icon: TbAxisY,
            label: props.yLabel,
            setLabel: props.setYLabel,
            scaleType: props.yScaleType,
            scaleOptions: AXIS_SCALE_TYPES,
            setScaleType: props.setYScaleType,
            domain: props.yDomain,
            customDomain: props.yCustomDomain,
            setCustomDomain: props.setYCustomDomain,
        }),
    ];
    if (props.aspect !== undefined && props.setAspect !== undefined) {
        modals.push(AspectConfigModal({
            title: 'Aspect ratio',
            icon: MdAspectRatio,
            aspect: props.aspect,
            setAspect: props.setAspect,
        }));
    }
    modals.push(TitleConfigModal({
        title: 'Set title',
        icon: BsCardHeading,
        label: props.title,
        setLabel: props.setTitle,
    }));
    let selectionConfig = null;
    if (props.selections !== undefined && props.updateSelections !== undefined) {
        selectionConfig = SelectionConfig({
            title: 'Selections',
            selections: props.selections,
            updateSelections: props.updateSelections,
            currentSelectionID: currentSelectionID,
            updateCurrentSelectionID: setCurrentSelectionID,
            icon: MdOutlineShapeLine,
            domain: props.dDomain,
            customDomain: props.dCustomDomain,
            showSelectionConfig: showSelectionConfig,
            updateShowSelectionConfig: setShowSelectionConfig,
            hasBaton: props.batonProps?.hasBaton ?? true,
        });
    }
    else {
        console.log('props.selections are: ', props.selections, ' props.updateSelections is: ', props.updateSelections);
    }
    const bareModals = [];
    const overflows = [];
    modals.forEach((m) => {
        if (m[0])
            bareModals.push(m[0]);
        if (m[1])
            overflows.push(m[1]);
    });
    if (props.selectionType !== undefined &&
        props.setSelectionType !== undefined) {
        bareModals.push(_jsx(SelectionTypeDropdown, { value: props.selectionType, onSelectionTypeChange: props.setSelectionType, disabled: props.mode !== InteractionModeType.selectRegion }, "Selection type"));
    }
    if (props.colourMap !== undefined) {
        const a = AxisConfigModal({
            title: 'Colour mapping',
            scaleType: props.dScaleType,
            setScaleType: props.setDScaleType,
            scaleOptions: COLOR_SCALE_TYPES,
            colourMap: props.colourMap,
            setColourMap: props.setColourMap,
            invertColourMap: props.invertColourMap,
            toggleColourMapInversion: props.toggleInvertColourMap,
            domain: props.dDomain,
            customDomain: props.dCustomDomain,
            setCustomDomain: props.setDCustomDomain,
            values: props.values,
        });
        a.forEach((m) => {
            if (m)
                bareModals.push(m);
        });
        bareModals.push(_jsx(Separator, {}, "Colour mapping separator"));
    }
    if (props.batonProps) {
        overflows.push(_jsx(GridToggler, { value: props.showGrid, onToggle: props.toggleShowGrid }, "Grid toggle"));
        const b = BatonConfigModal(props.batonProps);
        if (b[0])
            bareModals.push(b[0]);
        if (b[1])
            overflows.push(b[1]);
    }
    /**
     *
     * Sets fixed and asDashed properties of selection to true.
     * @param {string} i - The selection id.
     */
    function onSelectionIDChange(i) {
        const selection = props.selections?.find((s) => s.id === i);
        if (selection !== undefined) {
            setCurrentSelectionID(i);
            if (props.updateSelections) {
                props.updateSelections(selection);
                console.log('updated selections: ', props.selections);
            }
        }
        setShowSelectionConfig(true);
    }
    if (props.selections) {
        overflows.push(_jsx(SelectionIDDropdown, { selections: props.selections, selectionID: currentSelectionID, onSelectionIDChange: onSelectionIDChange }, "ID dropdown"));
    }
    if (props.selections &&
        props.selections.length > 0 &&
        props.updateSelections) {
        overflows.push(_jsx(ClearSelectionsBtn, { selections: props.selections, updateSelections: props.updateSelections, currentSelectionID: currentSelectionID, updateCurrentSelectionID: setCurrentSelectionID, disabled: !(props.batonProps?.hasBaton ?? true) }, "Clear all selections"));
    }
    return (_jsxs(Toolbar, { overflowChildren: overflows, children: [props.mode && props.setMode ? (_jsx(InteractionModeToggle, { value: props.mode, onModeChange: props.setMode, hasBaton: props.batonProps?.hasBaton ?? true }, "Interaction toggle")) : null, _jsx(Separator, {}, "Interaction separator"), bareModals, "selectionConfig &&", _jsx(Fragment, { children: selectionConfig }, "Selection config"), props.children] }));
}
export default PlotToolbar;
//# sourceMappingURL=PlotToolbar.js.map