import {
  type ColorMap,
  type ColorScaleType,
  type CustomDomain,
  Domain,
  SurfaceVis,
  Separator,
  ToggleBtn,
  getVisDomain,
} from '@h5web/lib';
import { useToggle } from '@react-hookz/web';
import { ArcballControls } from '@react-three/drei';
import { useState } from 'react';

import { GridDots } from '@repo/ui/svgs'

import PlotToolbar from './PlotToolbar.js';
import type { IIconType } from '../modals/Modal.js';
import type { MP_NDArray, SurfacePlotProps } from './AnyPlot.js';

/**
 *
 * Represents surface data.
 * @interface SurfaceData
 * @member {string} key - The key.
 * @member {MP_NDArray} values - The surface data values.
 * @member {Domain} domain - The surface data domain.
 * @member {string} surface_scale - The surface data scale.
 * @member {ColorMap} colourMap - The surface colour map.
 */
interface SurfaceData {
  /** The key */
  key: string;
  /** The surface data values */
  values: MP_NDArray;
  /** The surface data domain */
  domain: Domain;
  /** The surface data scale */
  surface_scale: string;
  /** The surface colour map */
  colourMap: ColorMap;
}

/**
 *
 * Renders a surface plot.
 * @param {SurfacePlotProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function SurfacePlot(props: SurfacePlotProps) {
  const [colourMap, setColourMap] = useState<ColorMap>(
    props.colourMap ?? 'Warm'
  );
  const [invertColourMap, toggleInvertColourMap] = useToggle();
  const [showGrid, toggleShowGrid] = useToggle();
  const [title, setTitle] = useState(props.axesParameters.title ?? '');
  const [xLabel, setXLabel] = useState(props.axesParameters.xLabel ?? 'x axis');
  const [yLabel, setYLabel] = useState(props.axesParameters.yLabel ?? 'y axis');
  const [customDomain, setCustomDomain] = useState<CustomDomain>([null, null]);
  const [showPoints, toggleShowPoints] = useToggle();
  const [surfaceScaleType, setSurfaceScaleType] = useState<ColorScaleType>(
    props.surfaceScale
  );

  return (
    <div
      style={{
        display: 'grid',
        position: 'relative',
      }}
    >
      <PlotToolbar
        showGrid={showGrid}
        toggleShowGrid={toggleShowGrid}
        title={title}
        setTitle={setTitle}
        xLabel={xLabel}
        setXLabel={setXLabel}
        yLabel={yLabel}
        setYLabel={setYLabel}
        batonProps={props.batonProps}
        dDomain={props.domain}
        dCustomDomain={customDomain}
        setDCustomDomain={setCustomDomain}
        values={props.values.data}
        dScaleType={surfaceScaleType}
        setDScaleType={setSurfaceScaleType}
        colourMap={colourMap}
        setColourMap={setColourMap}
        invertColourMap={invertColourMap}
        toggleInvertColourMap={toggleInvertColourMap}
      >
        <ToggleBtn
          key="show points"
          label="show points"
          icon={GridDots as IIconType} // todo this import is problematic for icons
          iconOnly
          value={showPoints}
          onToggle={toggleShowPoints}
        />
        <Separator />
      </PlotToolbar>
      <SurfaceVis
        dataArray={props.values}
        domain={getVisDomain(customDomain, props.domain)}
        colorMap={colourMap}
        invertColorMap={invertColourMap}
        scaleType={surfaceScaleType}
        showPoints={showPoints}
      >
        <ArcballControls /> // todo this is problematic for drei imports
      </SurfaceVis>
    </div>
  );
}

export default SurfacePlot;
export type { SurfaceData };
