import type { ReactNode } from 'react';
/**
 *
 * The props for the `Modeless` component.
 * @interface {object} ModalProps
 * @member {string} title - The title of the modeless.
 * @member {ReactNode} [button] - The button to display.
 * @member {boolean} showModeless - If the modeless is shown.
 * @member {(s: boolean) => void} [setShowModeless] - Handles showModeless toggle.
 * @member {ReactNode} [children] - Any child components.
 */
interface ModelessProps {
    title: string;
    button?: ReactNode;
    showModeless: boolean;
    setShowModeless: (s: boolean) => void;
    children?: ReactNode;
}
/**
 *
 * Renders a modeless.
 * @param {ModelessProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function Modeless(props: ModelessProps): import("react/jsx-runtime").JSX.Element[];
export type { ModelessProps };
export default Modeless;
//# sourceMappingURL=Modeless.d.ts.map