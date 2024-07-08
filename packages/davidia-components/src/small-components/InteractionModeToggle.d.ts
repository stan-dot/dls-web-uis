import { InteractionModeType } from '../utils.js';
/**
 * The props for the `InteractionModeToggle` component.
 * @interface {object} InteractionModeToggleProps
 * @member {InteractionModeType} value - The interaction mode.
 * @member {(value: string) => void} onModeChange - Handles change of mode.
 * @member {boolean} hasBaton - If client holds baton.
 */
interface InteractionModeToggleProps {
    /** The interaction mode */
    value: InteractionModeType;
    /** Handles change of mode */
    onModeChange: (value: InteractionModeType) => void;
    /** If client holds baton */
    hasBaton: boolean;
}
/**
 *
 * Renders a toggle button for interaction mode.
 * @param {InteractionModeToggleProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function InteractionModeToggle({ value, onModeChange, hasBaton, }: InteractionModeToggleProps): import("react/jsx-runtime").JSX.Element;
export default InteractionModeToggle;
export type { InteractionModeToggleProps };
//# sourceMappingURL=InteractionModeToggle.d.ts.map