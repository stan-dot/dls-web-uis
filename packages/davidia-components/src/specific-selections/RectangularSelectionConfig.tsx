import LabelledInput from '../small-components/LabelledInput.js';
import { isNumber } from '../utils.js';
import type RectangularSelection from './RectangularSelection.js';
import {
  AngleInput,
  XInput,
  YInput,
} from '../selection-components/SelectionConfigComponents.js';
import { Fragment } from 'react';
import type { SelectionBase } from './utils.js';

/**
 * The props for the `RectangularSelectionConfig` component.
 * @interface {object} RectangularSelectionConfigProps
 * @member {RectangularSelection} selection - The rectangular selection to configure.
 * @member {(s: SelectionBase | null, b?: boolean, c?: boolean) => void} [updateSelection] - Handles update of selection.
 * @member {boolean} [disabled] - If disabled.
 */
interface RectangularSelectionConfigProps {
  /** The rectangular selection to configure */
  selection: RectangularSelection;
  /** Handles update of selection */
  updateSelection: (s: SelectionBase | null, b?: boolean, c?: boolean) => void;
  /** If disabled */
  disabled?: boolean;
}

/**
 *
 * Renders the configuration options for a rectangular selection.
 * @param {RectangularSelectionConfigProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function RectangularSelectionConfig(props: RectangularSelectionConfigProps) {
  const { selection, updateSelection, disabled } = props;

  return (
    <Fragment key="rectangle">
      <XInput
        selection={selection}
        updateSelection={updateSelection}
        disabled={disabled}
      />

      <YInput
        selection={selection}
        updateSelection={updateSelection}
        disabled={disabled}
      />

      <AngleInput
        selection={selection}
        updateSelection={updateSelection}
        disabled={disabled}
      />

      <LabelledInput<number>
        key="x length"
        label="x length"
        input={selection.lengths[0]}
        updateValue={(l: number) => {
          selection.lengths[0] = l;
          updateSelection(selection);
        }}
        decimalPlaces={8}
        isValid={(v) => isNumber(v)}
        disabled={disabled}
      />

      <LabelledInput<number>
        key="y length"
        label="y length"
        input={selection.lengths[1]}
        updateValue={(l: number) => {
          selection.lengths[1] = l;
          updateSelection(selection);
        }}
        decimalPlaces={8}
        isValid={(v) => isNumber(v)}
        disabled={disabled}
      />
    </Fragment>
  );
}

export type { RectangularSelectionConfigProps };
export default RectangularSelectionConfig;
