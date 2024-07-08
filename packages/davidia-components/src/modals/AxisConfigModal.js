import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ColorMapOption, ColorMapSelector, ScaleSelector, } from '@h5web/lib';
import DomainConfig from '../domain/DomainConfig.js';
import LabelledInput from '../small-components/LabelledInput.js';
import Modal from './Modal.js';
import { createHistogramParams } from '../utils.js';
/**
 * Renders the configuration options for an axis.
 * @param {AxisConfigModalProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 * @template S
 */
function AxisConfigModal(props) {
    const label_input = props.label && props.setLabel && (_jsx(LabelledInput, { label: "label", input: props.label, updateValue: props.setLabel, enableEnterKey: false }, "label"));
    const scale_selector = props.scaleType && props.setScaleType && (_jsx(ScaleSelector, { label: "scale", value: props.scaleType, onScaleChange: props.setScaleType, options: props.scaleOptions }));
    const colour_map_selector = props.colourMap &&
        props.setColourMap &&
        props.invertColourMap !== undefined &&
        props.toggleColourMapInversion !== undefined && (_jsx(ColorMapSelector, { value: props.colourMap, onValueChange: props.setColourMap, invert: props.invertColourMap, onInversionChange: props.toggleColourMapInversion }));
    const histo_function = props.values && props.domain
        ? () => createHistogramParams(props.values, props.domain, props.colourMap, props.invertColourMap)
        : undefined;
    const domain_selector = props.domain &&
        props.customDomain &&
        props.scaleType &&
        props.setCustomDomain && (_jsx(DomainConfig, { dataDomain: props.domain, customDomain: props.customDomain, scaleType: props.scaleType, onCustomDomainChange: props.setCustomDomain, histogramFunction: histo_function }));
    return Modal({
        title: props.title,
        icon: props.icon,
        button: props.colourMap ? (_jsx(ColorMapOption, { option: props.colourMap })) : null,
        children: (_jsxs(_Fragment, { children: [label_input, scale_selector, colour_map_selector, domain_selector, props.children] })),
    });
}
export default AxisConfigModal;
//# sourceMappingURL=AxisConfigModal.js.map