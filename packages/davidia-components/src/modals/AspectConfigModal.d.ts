import { type Aspect } from '@h5web/lib';
import type { ReactNode } from 'react';
import type { IIconType } from './Modal.js';
/**
 * The props for the `AspectConfigModal` component.
 * @interface {object} AspectConfigModalProps
 * @member {string} title - The title of the modal and the label on the modal's button.
 * @member {IIconType} [icon] - The icon to display on the modal's button.
 * @member {Aspect} aspect - The current value of the aspect.
 * @member {(value: Aspect) => void} setAspect - The function to update aspect state.
 * @member {ReactNode} [children] - The children to render inside the modal.
 */
interface AspectConfigModalProps {
    /**
     * The title of the modal and the label on the modal's button */
    title: string;
    /**
     * The icon to display on the modal's button (optional) */
    icon?: IIconType;
    /**
     * The current value of the aspect */
    aspect: Aspect;
    /**
     * The function to update aspect state */
    setAspect: (value: Aspect) => void;
    /**
     * The children to render inside the modal (optional) */
    children?: ReactNode;
}
/**
 * Renders the configuration options for the aspect ratio.
 * @param {AspectConfigModalProps} props - The component props.
 * @returns {(JSX.Element | null)[]} {Modal} The rendered component.
 */
declare function AspectConfigModal(props: AspectConfigModalProps): (JSX.Element | null)[];
export type { AspectConfigModalProps };
export default AspectConfigModal;
//# sourceMappingURL=AspectConfigModal.d.ts.map