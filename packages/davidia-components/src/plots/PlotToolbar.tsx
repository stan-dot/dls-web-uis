import {
  type Aspect,
  AXIS_SCALE_TYPES,
  type AxisScaleType,
  COLOR_SCALE_TYPES,
  type ColorMap,
  type ColorScaleType,
  type CustomDomain,
  type Domain,
  GridToggler,
  Separator,
  Toolbar,
} from '@h5web/lib';
import type { TypedArray } from 'ndarray';
import type { ReactNode } from 'react';
import { Fragment, useEffect, useState } from 'react';

import AspectConfigModal from '../modals/AspectConfigModal.js';
import AxisConfigModal from '../modals/AxisConfigModal.js';
import type BaseSelection from '../selection-components/BaseSelection.js';
import { BatonConfigModal } from '../modals/BatonConfigModal.js';
import ClearSelectionsBtn from '../small-components/ClearSelectionsBtn.js';
import InteractionModeToggle from '../small-components/InteractionModeToggle.js';
import type { IIconType } from '../modals/Modal.js';
import SelectionTypeDropdown from '../selection-components/SelectionTypeDropdown.js';
import type {
  SelectionBase,
  SelectionType,
} from '../specific-selections/utils.js';
import SelectionConfig from '../selection-components/SelectionConfig.js';
import SelectionIDDropdown from '../selection-components/SelectionIDDropdown.js';
import type { BatonProps } from './AnyPlot.js';
import { InteractionModeType } from '../utils.js';
import { TitleConfigModal } from './TitleConfigModal.js';

/**
 * The props for the `PlotToolbar` component.
 * @param {boolean} showGrid - If the grid should be shown.
 * @param {() => void} toggleShowGrid - Toggles the grid.
 * @param {string} title - The title.
 * @param {(t:string) => void} setTitle - A function that sets the title.
 * @param {InteractionModeType} [mode] - The mode.
 * @param {(m:InteractionModeType) => void} [setMode] - An optional function that sets the mode.
 * @param {Domain} [xDomain] - A domain value for the x-axis.
 * @param {CustomDomain} [xCustomDomain] - A custom domain value for the x-axis.
 * @param {(d: CustomDomain) => void} [setXCustomDomain] - A function that sets the custom domain value for the x-axis.
 * @param {string} xLabel - The label for the x-axis.
 * @param {(l: string) => void} setXLabel - A function that sets the label for the x-axis.
 * @param {AxisScaleType} [xScaleType] - An axis scale type for the x-axis.
 * @param {(s: AxisScaleType) => void} [setXScaleType] - An optional function that sets the axis scale type for the x-axis.
 * @param {Domain} [yDomain] - A domain value for the y-axis.
 * @param {CustomDomain} [yCustomDomain] - A custom domain value for the y-axis.
 * @param {(d: CustomDomain) => void} [setYCustomDomain] - A function that sets the custom domain value for the y-axis.
 * @param {string} yLabel - The label for the y-axis.
 * @param {(l: string) => void} setYLabel - Function that sets the label for the y-axis.
 * @param {BatonProps} [batonProps] - The baton properties.
 * @param {AxisScaleType} [yScaleType] - Axis scale type for the y-axis.
 * @param {(s: AxisScaleType) => void} [setYScaleType] - A function that sets the axis scale type for the y-axis.
 * @param {Aspect} [aspect] - An aspect value.
 * @param {(a: Aspect) => void} [setAspect] - A function that sets the aspect value.
 * @param {SelectionType} [selectionType] - Selection type.
 * @param {(s: SelectionType) => void} [setSelectionType] - Function that sets the selection type.
 * @param {Domain} [dDomain] - Domain value for the d-axis.
 * @param {CustomDomain} [dCustomDomain] - Custom domain value for the d-axis.
 * @param {(d: CustomDomain) => void} [setDCustomDomain] - Sets the custom domain value for the d-axis.
 * @param {TypedArray} [values] - Values.
 * @param {ColorScaleType} [dScaleType] - The color scale type for the d-axis.
 * @param {(s: ColorScaleType) => void} [setDScaleType] - Sets the color scale type for the d-axis.
 * @param {ColorMap} [colourMap] - The color map.
 * @param {(c: ColorMap) => void} [setColourMap] - A function that sets the color map.
 * @param {boolean} invertColourMap - Whether to invert the color map.
 * @param {() => void} toggleInvertColourMap - A function that toggles the color map inversion.
 * @param {SelectionBase[]} [selections] - Selections.
 * @param {(s: SelectionBase | null, b?: boolean, c?: boolean ) => void} [updateSelections] - A function that updates the selections.
 * @param {reactNode} [children] - Any child components.
 */
interface PlotToolbarProps {
  /** If the grid should be shown */
  showGrid: boolean;
  /** Toggles the grid */
  toggleShowGrid: () => void;
  /** The title */
  title: string;
  /** A function that sets the title */
  setTitle: (t: string) => void;
  /** The mode (optional) */
  mode?: InteractionModeType;
  /** An optional function that sets the mode */
  setMode?: (m: InteractionModeType) => void;
  /** A domain value for the x-axis (optional) */
  xDomain?: Domain;
  /** A custom domain value for the x-axis (optional) */
  xCustomDomain?: CustomDomain;
  /** A function that sets the custom domain value for the x-axis (optional) */
  setXCustomDomain?: (d: CustomDomain) => void;
  /** The label for the x-axis */
  xLabel: string;
  /** A function that sets the label for the x-axis */
  setXLabel: (l: string) => void;
  /** An axis scale type for the x-axis (optional) */
  xScaleType?: AxisScaleType;
  /** An optional function that sets the axis scale type for the x-axis */
  setXScaleType?: (s: AxisScaleType) => void;
  /** A domain value for the y-axis (optional) */
  yDomain?: Domain;
  /** A custom domain value for the y-axis (optional) */
  yCustomDomain?: CustomDomain;
  /** A function that sets the custom domain value for the y-axis (optional) */
  setYCustomDomain?: (d: CustomDomain) => void;
  /** The label for the y-axis */
  yLabel: string;
  /** A function that sets the label for the y-axis */
  setYLabel: (l: string) => void;
  /** The baton properties */
  batonProps?: BatonProps;
  /** An axis scale type for the y-axis (optional) */
  yScaleType?: AxisScaleType;
  /** A function that sets the axis scale type for the y-axis (optional) */
  setYScaleType?: (s: AxisScaleType) => void;
  /** An aspect value (optional) */
  aspect?: Aspect;
  /** A function that sets the aspect value (optional) */
  setAspect?: (a: Aspect) => void;
  /** A selection type (optional) */
  selectionType?: SelectionType;
  /** A function that sets the selection type (optional) */
  setSelectionType?: (s: SelectionType) => void;
  /** A domain value for the d-axis (optional) */
  dDomain?: Domain;
  /** A custom domain value for the d-axis (optional) */
  dCustomDomain?: CustomDomain;
  /** A function that sets the custom domain value for the d-axis (optional) */
  setDCustomDomain?: (d: CustomDomain) => void;
  /** Values (optional) */
  values?: TypedArray;
  /** A color scale type for the d-axis (optional) */
  dScaleType?: ColorScaleType;
  /** A function that sets the color scale type for the d-axis (optional) */
  setDScaleType?: (s: ColorScaleType) => void;
  /** A color map (optional) */
  colourMap?: ColorMap;
  /** A function that sets the color map (optional) */
  setColourMap?: (c: ColorMap) => void;
  /** Whether to invert the color map */
  invertColourMap?: boolean;
  /** A function that toggles the color map inversion */
  toggleInvertColourMap?: () => void;
  /** Selections (optional) */
  selections?: SelectionBase[];
  /** A function that updates the selections (optional) */
  updateSelections?: (
    s: SelectionBase | null,
    b?: boolean,
    c?: boolean
  ) => void;
  /** Any child components (optional) */
  children?: ReactNode;
}

/**
 *
 * Renders a plot toolbar.
 * @param {PlotToolbarProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function PlotToolbar(props: PlotToolbarProps) {
  const firstSelection =
    props.selections && props.selections.length > 0 && props.selections.at(-1)
      ? props.selections.at(-1)!.id
      : null;
  const [currentSelectionID, setCurrentSelectionID] = useState<string | null>(
    firstSelection
  );
  const [showSelectionConfig, setShowSelectionConfig] = useState(false);

  /**
   *
   * Sets fixed and asDashed properties of selection to true.
   * @param {SelectionBase} s - The selection to modify.
   */
  function enableSelection(s: SelectionBase) {
    s.fixed = true;
    s.asDashed = true;
  }

  /**
   *
   * Sets fixed and asDashed properties of selection to false.
   * @param {SelectionBase} s - The selection to modify.
   */
  function disableSelection(s: SelectionBase) {
    s.fixed = false;
    s.asDashed = false;
  }

  useEffect(() => {
    props.selections?.map((s) => disableSelection(s));
    if (showSelectionConfig) {
      const selection = props.selections?.find(
        (s) => s.id === currentSelectionID
      );
      if (selection) {
        enableSelection(selection);
      }
    }
  }, [currentSelectionID, props.selections, showSelectionConfig]);

  useEffect(() => {
    if (
      currentSelectionID === null &&
      props.selections &&
      props.selections.length > 0
    ) {
      const selection = props.selections[props.selections.length - 1];
      if (selection) {
        setCurrentSelectionID(selection.id);
      }
    }
  }, [props.selections, currentSelectionID]);

  const modals = [
    AxisConfigModal<AxisScaleType>({
      title: 'X axis',
      icon: TbAxisX as IIconType,
      label: props.xLabel,
      setLabel: props.setXLabel,
      scaleType: props.xScaleType,
      scaleOptions: AXIS_SCALE_TYPES,
      setScaleType: props.setXScaleType,
      domain: props.xDomain,
      customDomain: props.xCustomDomain,
      setCustomDomain: props.setXCustomDomain,
    }),
    AxisConfigModal<AxisScaleType>({
      title: 'Y axis',
      icon: TbAxisY as IIconType,
      label: props.yLabel,
      setLabel: props.setYLabel,
      scaleType: props.yScaleType,
      scaleOptions: AXIS_SCALE_TYPES,
      setScaleType: props.setYScaleType,
      domain: props.yDomain,
      customDomain: props.yCustomDomain,
      setCustomDomain: props.setYCustomDomain,
    }),
  ];
  if (props.aspect !== undefined && props.setAspect !== undefined) {
    modals.push(
      AspectConfigModal({
        title: 'Aspect ratio',
        icon: MdAspectRatio as IIconType,
        aspect: props.aspect,
        setAspect: props.setAspect,
      })
    );
  }
  modals.push(
    TitleConfigModal({
      title: 'Set title',
      icon: BsCardHeading as IIconType,
      label: props.title,
      setLabel: props.setTitle,
    })
  );

  let selectionConfig = null;
  if (props.selections !== undefined && props.updateSelections !== undefined) {
    selectionConfig = SelectionConfig({
      title: 'Selections',
      selections: props.selections as BaseSelection[],
      updateSelections: props.updateSelections,
      currentSelectionID: currentSelectionID,
      updateCurrentSelectionID: setCurrentSelectionID,
      icon: MdOutlineShapeLine as IIconType,
      domain: props.dDomain,
      customDomain: props.dCustomDomain,
      showSelectionConfig: showSelectionConfig,
      updateShowSelectionConfig: setShowSelectionConfig,
      hasBaton: props.batonProps?.hasBaton ?? true,
    });
  } else {
    console.log(
      'props.selections are: ',
      props.selections,
      ' props.updateSelections is: ',
      props.updateSelections
    );
  }

  const bareModals = [];
  const overflows = [];
  modals.forEach((m) => {
    if (m[0]) bareModals.push(m[0]);
    if (m[1]) overflows.push(m[1]);
  });

  if (
    props.selectionType !== undefined &&
    props.setSelectionType !== undefined
  ) {
    bareModals.push(
      <SelectionTypeDropdown
        key="Selection type"
        value={props.selectionType}
        onSelectionTypeChange={props.setSelectionType}
        disabled={props.mode !== InteractionModeType.selectRegion}
      />
    );
  }

  if (props.colourMap !== undefined) {
    const a = AxisConfigModal<ColorScaleType>({
      title: 'Colour mapping',
      scaleType: props.dScaleType,
      setScaleType: props.setDScaleType,
      scaleOptions: COLOR_SCALE_TYPES,
      colourMap: props.colourMap,
      setColourMap: props.setColourMap,
      invertColourMap: props.invertColourMap,
      toggleColourMapInversion: props.toggleInvertColourMap,
      domain: props.dDomain,
      customDomain: props.dCustomDomain,
      setCustomDomain: props.setDCustomDomain,
      values: props.values,
    });
    a.forEach((m) => {
      if (m) bareModals.push(m);
    });
    bareModals.push(<Separator key="Colour mapping separator" />);
  }

  if (props.batonProps) {
    overflows.push(
      <GridToggler
        key="Grid toggle"
        value={props.showGrid}
        onToggle={props.toggleShowGrid}
      />
    );
    const b = BatonConfigModal(props.batonProps);
    if (b[0]) bareModals.push(b[0]);
    if (b[1]) overflows.push(b[1]);
  }

  /**
   *
   * Sets fixed and asDashed properties of selection to true.
   * @param {string} i - The selection id.
   */
  function onSelectionIDChange(i: string) {
    const selection = props.selections?.find((s) => s.id === i);
    if (selection !== undefined) {
      setCurrentSelectionID(i);
      if (props.updateSelections) {
        props.updateSelections(selection);
        console.log('updated selections: ', props.selections);
      }
    }
    setShowSelectionConfig(true);
  }

  if (props.selections) {
    overflows.push(
      <SelectionIDDropdown
        key="ID dropdown"
        selections={props.selections}
        selectionID={currentSelectionID}
        onSelectionIDChange={onSelectionIDChange}
      />
    );
  }

  if (
    props.selections &&
    props.selections.length > 0 &&
    props.updateSelections
  ) {
    overflows.push(
      <ClearSelectionsBtn
        key="Clear all selections"
        selections={props.selections as BaseSelection[]}
        updateSelections={props.updateSelections}
        currentSelectionID={currentSelectionID}
        updateCurrentSelectionID={setCurrentSelectionID}
        disabled={!(props.batonProps?.hasBaton ?? true)}
      ></ClearSelectionsBtn>
    );
  }

  return (
    <Toolbar overflowChildren={overflows}>
      {props.mode && props.setMode ? (
        <InteractionModeToggle
          key="Interaction toggle"
          value={props.mode}
          onModeChange={props.setMode}
          hasBaton={props.batonProps?.hasBaton ?? true}
        />
      ) : null}
      <Separator key="Interaction separator" />
      {bareModals}
      selectionConfig &&
      {<Fragment key="Selection config">{selectionConfig}</Fragment>}
      {props.children}
    </Toolbar>
  );
}

export type { PlotToolbarProps };
export default PlotToolbar;
