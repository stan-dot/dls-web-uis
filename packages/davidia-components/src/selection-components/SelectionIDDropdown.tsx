import Select, {
  CSSObjectWithLabel,
  GroupBase,
  OptionProps,
  StylesConfig,
} from 'react-select';
import { SELECTION_ICONS } from './SelectionConfig.js';
import { getSelectionLabelFromID } from '../specific-selections/utils.js';
import type { SelectionBase } from '../specific-selections/utils.js';

/**
 *
 * Represents selection options.
 * @interface SelectionOption
 * @member {string} value - The selection option value.
 * @member {string} label - The selection option label.
 * @member {string} bgcolour - The displayed background colour.
 */
interface SelectionOption {
  /** The selection option value */
  value: string;
  /** The selection option label */
  label: string;
  /** The displayed background colour */
  bgcolour: string;
}

/**
 *
 * The props for the `SelectionIDDropdown` component.
 * @interface SelectionIDDropdownProps
 * @member {SelectionBase[]} selections - The selections.
 * @member {string | null} selectionID - The ID of the highlighted selection.
 * @member {(s: string) => void} onSelectionIDChange - Function that handles change in chosen selection ID.
 * @member {string[]} [options] - The selections from which to choose.
 */
interface SelectionIDDropdownProps {
  /** The selections */
  selections: SelectionBase[];
  /** The ID of the highlighted selection */
  selectionID: string | null;
  /** Function that handles change in chosen selection ID */
  onSelectionIDChange: (s: string) => void;
  /** The selections from which to choose */
  options?: string[];
}

/**
 *
 * Renders a dropdown for choosing selection.
 * @param {SelectionIDDropdownProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function SelectionIDDropdown(props: SelectionIDDropdownProps) {
  const {
    selectionID,
    onSelectionIDChange,
    options = props.selections.map((s) => s.id),
  } = props;

  if (selectionID === '' && props.selections.length > 0) {
    console.log(
      'Setting selectionID to default selection: ',
      props.selections[0]
    );
    const firstSelection: SelectionBase | undefined = props.selections[0];
    if (firstSelection) {
      onSelectionIDChange(firstSelection.id);
    }
  }

  const defaultColour = '#ffffff';

  /**
   *
   * Returns selection colour for a given selection id.
   * @param {string} i - The selection ID.
   * @returns {string | null} The selection colour.
   */
  function getSelectionColour(i: string) {
    const selection = props.selections.find((s) => s.id === i);
    return selection?.colour ?? defaultColour;
  }

  const selectStyles: StylesConfig<
    SelectionOption,
    boolean,
    GroupBase<SelectionOption>
  > = {
    option: (
      base: CSSObjectWithLabel,
      props: OptionProps<SelectionOption, boolean, GroupBase<SelectionOption>>
    ) =>
      ({
        ...base,
        // eslint-disable-next-line react/prop-types
        backgroundColor: props.data.bgcolour,
      }) as CSSObjectWithLabel,
  };

  const optionsArr = options.map(
    (s) =>
      ({
        value: s,
        label: getSelectionLabelFromID(props.selections, s, SELECTION_ICONS),
        bgcolour: getSelectionColour(s),
      }) as SelectionOption
  );

  return (
    <Select<SelectionOption>
      styles={selectStyles}
      value={
        {
          value: selectionID,
          label: getSelectionLabelFromID(
            props.selections,
            selectionID,
            SELECTION_ICONS
          ),
          bgcolour: getSelectionColour(selectionID ?? ''),
        } as SelectionOption
      }
      options={optionsArr}
      onChange={(selectedOption) => {
        if (selectedOption !== null) {
          onSelectionIDChange(selectedOption.value);
        }
      }}
    />
  );
}

export default SelectionIDDropdown;
export type { SelectionIDDropdownProps };
