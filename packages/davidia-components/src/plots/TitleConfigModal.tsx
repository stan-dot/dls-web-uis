import LabelledInput from '../small-components/LabelledInput.js';
import type { IIconType } from '../modals/Modal.js';
import Modal from '../modals/Modal.js';

/**
 * The props for the `TitleConfigModal` component.
 * @interface {object} TitleConfigModalProps
 * @member {string} title - The modal title.
 * @member {IIconType} [icon] - The modal icon.
 * @member {string} [label] - The label.
 * @member {(value: string) => void} [setLabel] - Handles setting of label.
 */
interface TitleConfigModalProps {
  /** The modal title */
  title: string;
  /** The modal icon (optional) */
  icon?: IIconType;
  /** The label (optional) */
  label?: string;
  /** Handles setting of label */
  setLabel: (value: string) => void;
}
/**
 *
 * Renders configuration options for plot title.
 * @param {TitleConfigModalProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export function TitleConfigModal(props: TitleConfigModalProps) {
  return Modal({
    title: props.title,
    icon: props.icon,
    children: (
      <LabelledInput<string>
        key="title"
        label="title"
        input={props.label ?? ''}
        updateValue={props.setLabel} />
    ),
  });
}
