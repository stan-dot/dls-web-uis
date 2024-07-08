import { jsx as _jsx } from "react/jsx-runtime";
import styles from '../selection-components/Modeless.module.css';
export function XButton({ callback, }) {
    return (_jsx("button", { onClick: callback, className: styles.close_button, children: "X" }));
}
//# sourceMappingURL=XButton.js.map