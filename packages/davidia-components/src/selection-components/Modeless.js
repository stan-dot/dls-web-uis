import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Draggable from 'react-draggable';
import { useKeyboardEvent } from '@react-hookz/web';
import { useRef, useState } from 'react';
import styles from './Modeless.module.css';
import { XButton } from '../small-components/XButton.js';
/**
 *
 * Renders a modeless.
 * @param {ModelessProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function Modeless(props) {
    const rootRef = useRef(null);
    const [defaultPosition, setDefaultPosition] = useState({ x: 0, y: 0 });
    useKeyboardEvent('Escape', () => props.setShowModeless(false));
    const handleStop = (_e, data) => {
        setDefaultPosition({ x: data.x, y: data.y });
    };
    if (!props.showModeless)
        return [];
    return [
        _jsx(Draggable, { handle: "strong", defaultPosition: defaultPosition, nodeRef: rootRef, onStop: handleStop, children: _jsx("div", { hidden: !props.showModeless, ref: rootRef, className: styles.modeless, children: _jsxs("div", { className: styles.modeless_content, onClick: (e) => e.stopPropagation(), children: [_jsx("strong", { className: "cursor", children: _jsx("div", { className: styles.modeless_header, children: _jsxs("h4", { className: styles.modeless_title, children: [props.title, _jsx(XButton, { callback: () => props.setShowModeless(false) })] }) }) }), _jsx("div", { className: styles.modeless_body, children: props.children }), _jsx("div", { className: styles.modeless_footer })] }) }) }, props.title),
    ];
}
export default Modeless;
//# sourceMappingURL=Modeless.js.map