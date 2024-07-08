import { jsx as _jsx } from "react/jsx-runtime";
import LabelledInput from '../small-components/LabelledInput.js';
import Modal from '../modals/Modal.js';
/**
 *
 * Renders configuration options for plot title.
 * @param {TitleConfigModalProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export function TitleConfigModal(props) {
    return Modal({
        title: props.title,
        icon: props.icon,
        children: (_jsx(LabelledInput, { label: "title", input: props.label ?? '', updateValue: props.setLabel }, "title")),
    });
}
//# sourceMappingURL=TitleConfigModal.js.map