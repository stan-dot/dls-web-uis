import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Draggable from 'react-draggable';
import { ToggleBtn } from '@h5web/lib';
import { useClickOutside, useKeyboardEvent } from '@react-hookz/web';
import { useRef, useState } from 'react';
import styles from './Modal.module.css';
import { XButton } from '../small-components/XButton.js';
/**
 *
 * Renders a modal component.
 * @param {ModalProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function Modal(props) {
    const rootRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [defaultPosition, setDefaultPosition] = useState({ x: 0, y: 0 });
    useClickOutside(rootRef, (e) => {
        e.stopPropagation(); // stop interactions outside modal
    });
    useKeyboardEvent('Escape', () => {
        setShowModal(false);
    });
    const toggleTitle = props.title;
    const toggleKey = toggleTitle + '-toggle';
    const toggle = props.button ? (_jsx("button", { title: toggleTitle, className: styles.btn, onClick: () => setShowModal(true), children: props.button }, toggleKey)) : (_jsx(ToggleBtn, { label: toggleTitle, icon: props.icon, onToggle: () => {
            setShowModal(true);
        }, value: false }, toggleKey));
    const modal = showModal ? (_jsx(Draggable, { handle: "strong", defaultPosition: defaultPosition, nodeRef: rootRef, onStop: (_e, data) => {
            setDefaultPosition({ x: data.x, y: data.y });
        }, children: _jsx("div", { hidden: !showModal, ref: rootRef, className: styles.modal, children: _jsxs("div", { className: styles.modal_content, onClick: (e) => e.stopPropagation(), children: [_jsx("strong", { className: "cursor", children: _jsx("div", { className: styles.modal_header, children: _jsxs("h4", { className: styles.modal_title, children: [toggleTitle, _jsx(XButton, { callback: () => setShowModal(false) })] }) }) }), _jsxs("div", { className: styles.modal_body, children: [" ", props.children, " "] }), _jsx("div", { className: styles.modal_footer })] }) }) }, toggleTitle)) : null;
    return [modal, toggle];
}
export default Modal;
//# sourceMappingURL=Modal.js.map