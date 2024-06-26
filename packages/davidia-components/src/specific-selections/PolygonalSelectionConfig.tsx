import type PolygonalSelection from './PolygonalSelection.js';
import {
  PointXInput,
  PointYInput,
} from '../selection-components/SelectionConfigComponents.js';
import type { SelectionBase } from './utils.js';

import styles from './PolygonalSelectionConfig.module.css';

/**
 * The props for the `PolygonalSelectionConfig` component.
 * @interface {object} PolygonalSelectionConfigProps
 * @member {PolygonalSelection} selection - The polygonal selection to configure.
 * @member {(s: SelectionBase | null, b?: boolean, c?: boolean) => void} [updateSelection] - Handles update of selection.
 * @member {boolean} [disabled] - If disabled.
 */
interface PolygonalSelectionConfigProps {
  /** The polygonal selection to configure */
  selection: PolygonalSelection;
  /** Handles update of selection */
  updateSelection: (s: SelectionBase | null, b?: boolean, c?: boolean) => void;
  /** If disabled */
  disabled?: boolean;
}

/**
 *
 * Renders configuration for polygonal selection.
 * @param {PolygonalSelectionConfigProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function PolygonalSelectionConfig(props: PolygonalSelectionConfigProps) {
  const { selection, updateSelection, disabled } = props;

  /**
   *
   * Updates a point.
   * @param {[number, number]} p - new coordinates for the point.
   * @param {number} i - index of point.
   * @returns {JSX.Element} The rendered component.
   */
  function updatePoint(p: [number, number], i: number) {
    selection.points[i] = p;
    updateSelection(selection);
  }

  const xyInputs = selection.points.map((p, i) => {
    return [
      <PointXInput
        key={`px${i}`}
        i={i}
        point={p}
        updatePoint={(np) => updatePoint(np, i)}
        disabled={disabled}
      />,
      <PointYInput
        key={`py${i}`}
        i={i}
        point={p}
        updatePoint={(np) => updatePoint(np, i)}
        disabled={disabled}
      />,
    ];
  });

  return (
    <div key="polygon" className={styles.scrollContainer}>
      {xyInputs.flat()}
    </div>
  );
}

export type { PolygonalSelectionConfigProps };
export default PolygonalSelectionConfig;
