import Modeless from './Modeless.js';
import type BaseSelection from './BaseSelection.js';
import { getSelectionLabel } from '../specific-selections/utils.js';
import AxialSelection from '../specific-selections/AxialSelection.js';
import RectangularSelection from '../specific-selections/RectangularSelection.js';
import LinearSelection from '../specific-selections/LinearSelection.js';
import AxialSelectionConfig from '../specific-selections/AxialSelectionConfig.js';
import LinearSelectionConfig from '../specific-selections/LinearSelectionConfig.js';
import RectangularSelectionConfig from '../specific-selections/RectangularSelectionConfig.js';
import { Fragment } from 'react';
import { HexColorPicker as Picker } from 'react-colorful';
import styles from './SelectionConfig.module.css';
import { Btn, type CustomDomain, type Domain } from '@h5web/lib';
import { isValidPositiveNumber } from '../utils.js';
import LabelledInput from '../small-components/LabelledInput.js';
import PolygonalSelection from '../specific-selections/PolygonalSelection.js';
import PolygonalSelectionConfig from '../specific-selections/PolygonalSelectionConfig.js';
import type { IIconType } from '../modals/Modal.js';
import type { SelectionBase } from '../specific-selections/utils.js';

// eslint-disable-next-line react-refresh/only-export-components
export const SELECTION_ICONS = {
  line: '\u2014',
  rectangle: '\u25ad',
  polyline: '\u299a',
  polygon: '\u2b21',
  circle: '\u25cb',
  ellipse: '\u2b2d',
  sector: '\u25d4',
  horizontalAxis: '\u2194',
  verticalAxis: '\u2195',
  unknown: ' ',
};

/**
 * The props for the `SelectionConfig` component.
 * @interface {object} SelectionConfigProps
 * @member {string} title - The modal title.
 * @member {BaseSelection[]} selections - The current selections.
 * @member {(s: SelectionBase | null, b?: boolean, c?: boolean) => void} updateSelections - Handles updating selections.
 * @member {string | null} currentSelectionID - The ID of the current selection.
 * @member {(s: string | null) => void} updateCurrentSelectionID - Handles updating current selection ID.
 * @member {SelectionType} showSelectionConfig - If the selection config is shown.
 * @member {(s: boolean) => void} updateShowSelectionConfig - Handles updating showSelectionConfig.
 * @member {boolean} hasBaton - If has control of the baton.
 * @member {IIConType} [icon] - The icon.
 * @member {string} [label] - The label.
 * @member {Domain} [domain] - The data domain.
 * @member {CustomDomain} [customDomain] - The custom data domain.
 */
interface SelectionConfigProps {
  /** The modal title */
  title: string;
  /** The current selections */
  selections: BaseSelection[];
  /** Handles updating selections */
  updateSelections: (s: SelectionBase | null, b?: boolean, c?: boolean) => void;
  /** The ID of the current selection (optional) */
  currentSelectionID: string | null;
  /** Handles updating current selection ID */
  updateCurrentSelectionID: (s: string | null) => void;
  /** If the selection config is shown */
  showSelectionConfig: boolean;
  /** Handles updating showSelectionConfig */
  updateShowSelectionConfig: (s: boolean) => void;
  /** If has control of the baton */
  hasBaton: boolean;
  /** The icon (optional) */
  icon?: IIconType;
  /** The label (optional) */
  label?: string;
  /** The data domain (optional) */
  domain?: Domain;
  /** The custom data domain (optional) */
  customDomain?: CustomDomain;
}

/**
 *
 * Renders the configuration options for a selection.
 * @param {SelectionConfigProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function SelectionConfig(props: SelectionConfigProps) {
  const {
    currentSelectionID,
    updateCurrentSelectionID,
    selections,
    updateSelections: updateSelection,
    hasBaton,
  } = props;
  let currentSelection: BaseSelection | null = null;
  if (selections.length > 0) {
    const c =
      selections.find((s) => s.id === currentSelectionID) ?? selections[0];
    if (c) {
      currentSelection = c;
    }
  }

  /**
   *
   * Handles deletion of a selection.
   */
  function handleDeleteSelection(): void {
    if (!currentSelectionID) return;

    const selection: BaseSelection | undefined = selections.find((s) => s.id === currentSelectionID);
    if (!selection) return;

    const lastSelection: BaseSelection | undefined = getLastSelection(selections, currentSelectionID);
    updateSelection(selection, true, true);
    if (lastSelection) {
      updateCurrentSelectionID(lastSelection.id);
    }
  }

  const modeless = [];
  modeless.push(
    <h4 key="Selection">
      {getSelectionLabel(currentSelection, SELECTION_ICONS)}
    </h4>
  );
  if (currentSelection !== null) {
    const cSelection: BaseSelection = currentSelection;
    const colour = (cSelection.colour ??
      ('defaultColour' in cSelection
        ? cSelection.defaultColour
        : '#000000')) as string;

    modeless.push(
      <Fragment key="colour">
        <div
          key="colour text"
          className={styles.colourLabel}
          style={{ borderLeftColor: colour }}
        >
          {colour}
        </div>
        <br key="colour spacer" />
        {hasBaton && (
          <Picker
            key="colour picker"
            color={colour}
            onChange={(c: string) => {
              cSelection.colour = c;
              updateSelection(cSelection);
            }}
          />
        )}
      </Fragment>
    );
    modeless.push(
      <LabelledInput<string>
        key="name"
        label="name"
        input={cSelection.name}
        updateValue={(n: string) => {
          cSelection.name = n;
          updateSelection(cSelection);
        }}
        disabled={!hasBaton}
      />
    );
    modeless.push(
      <LabelledInput<number>
        key="alpha"
        label="alpha"
        input={cSelection.alpha}
        updateValue={(a: number) => {
          if (a <= 1 && a >= 0) {
            cSelection.alpha = a;
            updateSelection(cSelection);
          }
        }}
        decimalPlaces={2}
        isValid={(v) => isValidPositiveNumber(v, 1, true)}
        disabled={!hasBaton}
      />
    );
    if (AxialSelection.isShape(cSelection as SelectionBase)) {
      modeless.push(
        AxialSelectionConfig({
          selection: cSelection as AxialSelection,
          updateSelection,
          disabled: !hasBaton,
        })
      );
    } else if (LinearSelection.isShape(cSelection as SelectionBase)) {
      modeless.push(
        LinearSelectionConfig({
          selection: cSelection as LinearSelection,
          updateSelection,
          disabled: !hasBaton,
        })
      );
    } else if (RectangularSelection.isShape(cSelection as SelectionBase)) {
      modeless.push(
        RectangularSelectionConfig({
          selection: cSelection as RectangularSelection,
          updateSelection,
          disabled: !hasBaton,
        })
      );
    } else if (PolygonalSelection.isShape(cSelection as SelectionBase)) {
      modeless.push(
        PolygonalSelectionConfig({
          selection: cSelection as PolygonalSelection,
          updateSelection,
          disabled: !hasBaton,
        })
      );
    }

    modeless.push(
      <Btn
        key="clear selection"
        label="Clear Selection"
        disabled={!hasBaton}
        onClick={() => {
          if (window.confirm('Clear selection?')) {
            handleDeleteSelection();
          }
        }}
      />
    );
  }

  return Modeless({
    title: props.title,
    showModeless: props.showSelectionConfig,
    setShowModeless: props.updateShowSelectionConfig,
    children: modeless,
  });
}

export default SelectionConfig;
export type { SelectionConfigProps };

function getLastSelection(selections: BaseSelection[], currentSelectionID: string) {
  let lastSelection: BaseSelection | undefined;

  if (!Object.hasOwn(selections, 'findLast')) {
    // workaround missing method
    const oSelections = selections.filter(
      (s) => s.id !== currentSelectionID
    );
    const last = oSelections.length - 1;
    if (last >= 0) {
      lastSelection = oSelections[last];
    }
  } else {
    lastSelection = selections.findLast(
      (s) => s.id !== currentSelectionID
    );
  }
  return lastSelection;
}

