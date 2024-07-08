import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { HiCursorClick } from 'react-icons/hi';
import Modal from './Modal.js';
import { Btn } from '@h5web/lib';
import { useMemo } from 'react';
/**
 *
 * Renders the configuration options for the baton.
 * @export
 * @param {BatonProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export function BatonConfigModal(props) {
    const { batonUuid, uuid, others, hasBaton } = props;
    const oUuids = useMemo(() => {
        return others.map((o) => (batonUuid == o ? o + '*' : o));
    }, [batonUuid, others]);
    return Modal({
        title: 'Baton Info',
        icon: HiCursorClick,
        children: (_jsxs("div", { style: { lineHeight: '80%' }, children: [_jsx("p", { children: _jsxs("strong", { children: ["Client (", hasBaton ? uuid + '*' : uuid, ")"] }) }), !hasBaton && oUuids.length > 0 && (_jsxs(_Fragment, { children: [_jsxs("p", { children: ["Other client", oUuids.length > 1 ? 's' : ''] }), oUuids.map((o) => batonUuid && batonUuid + '*' == o ? (_jsx("div", { title: "Request baton", children: _jsx(Btn, { label: o, onClick: () => props.requestBaton() }) }, batonUuid)) : (_jsx("p", { children: o }, o)))] })), batonUuid &&
                    hasBaton &&
                    others.map((o) => (_jsx("div", { title: "Pass baton on", children: _jsx(Btn, { label: o, onClick: () => props.approveBaton(o) }, o) }, o)))] })),
    });
}
//# sourceMappingURL=BatonConfigModal.js.map