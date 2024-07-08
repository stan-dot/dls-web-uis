import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DomainControls } from '@h5web/lib';
import styles from './DomainConfig.module.css';
/**
 *
 * Renders controls to edit domain.
 * @param {DomainToolsProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export function DomainTools({ id, domainProps, children, }) {
    return (_jsx("div", { id: id, className: styles.tools, role: "dialog", "aria-label": "Edit domain", children: _jsxs("div", { className: styles.toolsInner, children: [children, _jsx(DomainControls, { ...domainProps })] }) }));
}
//# sourceMappingURL=DomainTools.js.map