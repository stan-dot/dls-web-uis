import type { ComponentType, ReactNode, SVGAttributes } from 'react';
type IIconType = ComponentType<SVGAttributes<SVGElement>>;
/**
 * The props for the `Modal` component.
 * @interface {object} ModalProps
 * @member {string} title - The title of the modal.
 * @member {IIcontype} [icon] - The icon to display.
 * @member {ReactNode} [button] - The button to display.
 * @member {ReactNode} [children] - Any child components.
 */
interface ModalProps {
    /** The title of the modal */
    title: string;
    /** The icon to display (optional) */
    icon?: IIconType;
    /** The button to display (optional) */
    button?: ReactNode;
    /** Any child components (optional) */
    children?: ReactNode;
}
/**
 *
 * Renders a modal component.
 * @param {ModalProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function Modal(props: ModalProps): (import("react/jsx-runtime").JSX.Element | null)[];
export type { IIconType, ModalProps };
export default Modal;
//# sourceMappingURL=Modal.d.ts.map