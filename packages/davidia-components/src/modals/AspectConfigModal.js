import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ToggleGroup } from '@h5web/lib';
import { useState } from 'react';
import LabelledInput from '../small-components/LabelledInput.js';
import Modal from './Modal.js';
import styles from './Modal.module.css';
import { getAspectType, isValidPositiveNumber } from '../utils.js';
/**
 * Renders the configuration options for the aspect ratio.
 * @param {AspectConfigModalProps} props - The component props.
 * @returns {(JSX.Element | null)[]} {Modal} The rendered component.
 */
function AspectConfigModal(props) {
    const initialType = getAspectType(props.aspect);
    const [aspectType, setAspectType] = useState(initialType);
    const [aspectRatio, setAspectRatio] = useState(initialType === 'number' ? props.aspect : 2);
    function handleAspectTypeChange(val) {
        setAspectType(val);
        if (val === 'number') {
            props.setAspect(aspectRatio);
        }
        else {
            props.setAspect(val);
        }
    }
    return Modal({
        title: props.title,
        icon: props.icon,
        children: (_jsxs(_Fragment, { children: [_jsx("div", { className: styles.aspect, children: _jsx(LabelledInput, { disabled: aspectType !== 'number', label: "aspect ratio", input: aspectRatio, isValid: (v) => isValidPositiveNumber(v, 10), inputAttribs: {
                            name: 'digits',
                            pattern: '^\\d+|\\d+.\\d*$',
                            size: 3,
                        }, updateValue: (v) => {
                            props.setAspect(v);
                            setAspectRatio(v);
                        }, submitLabel: "update ratio" }, "0") }), _jsxs("div", { className: styles.aspect, children: [_jsxs(ToggleGroup, { role: "radiogroup", ariaLabel: "aspect", value: aspectType, onChange: handleAspectTypeChange, children: [_jsx(ToggleGroup.Btn, { label: "number", value: "number" }), _jsx(ToggleGroup.Btn, { label: "auto", value: "auto" }), _jsx(ToggleGroup.Btn, { label: "equal", value: "equal" })] }), props.children] })] })),
    });
}
export default AspectConfigModal;
//# sourceMappingURL=AspectConfigModal.js.map