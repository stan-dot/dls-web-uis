import ndarray from 'ndarray';
import type { NdArray, TypedArray } from 'ndarray';
import concatRows from 'ndarray-concat-rows';
import cwise from 'cwise';
import { bin } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import type {
  Aspect,
  AxialSelectToZoomProps,
  ColorMap,
  DefaultInteractionsConfig,
  Domain,
  HistogramParams,
  PanProps,
  SelectToZoomProps,
  XAxisZoomProps,
  YAxisZoomProps,
  ZoomProps,
} from '@h5web/lib';

import type {
  AxesParameters,
  DAxesParameters,
  DLineData,
  MP_NDArray,
  TableDisplayParams,
} from './plots/AnyPlot.js';
import type { HeatmapData } from './plots/HeatmapPlot.js';
import type { SurfaceData } from './plots/SurfacePlot.js';
import type { ImageData } from './plots/ImagePlot.js';
import type { TableData } from './table/TableDisplay.js';
import type { LineData } from './plots/LinePlot.js';
import type { ScatterData } from './plots/ScatterPlot.js';

type NDT = NdArray<TypedArray>;
type MinMax = (x: NDT) => [number, number];

interface DScatterData {
  key: string;
  xData: NDT;
  yData: NDT;
  dataArray: NDT;
  domain: [number, number];
  colourMap?: ColorMap;
}

interface DSurfaceData {
  key: string;
  values: NDT;
  domain: [number, number];
  surface_scale: string;
  colourMap?: ColorMap;
}

interface DTableData {
  key: string;
  dataArray: NDT;
  cellWidth: number;
  displayParams?: TableDisplayParams;
}

interface DImageData {
  key: string;
  values: NDT;
  aspect?: Aspect;
}

interface DHeatmapData extends DImageData {
  domain: [number, number];
  heatmap_scale: string;
  colourMap?: ColorMap;
}

interface CwiseContext {
  min: number;
  max: number;
}

const nanMinMax = cwise({
  funcName: 'nanMinMax',
  args: ['array'],
  pre: function (this: CwiseContext) {
    this.min = Number.POSITIVE_INFINITY;
    this.max = Number.NEGATIVE_INFINITY;
  },
  body: function (this: CwiseContext, a: number) {
    if (!Number.isNaN(a)) {
      if (a < this.min) {
        this.min = a;
      }
      if (a > this.max) {
        this.max = a;
      }
    }
  },
  post: function (this: CwiseContext): [number, number] {
    if (this.min > this.max) {
      throw Error('No valid numbers were compared');
    }
    return [this.min, this.max];
  },
}) as MinMax;

function appendDLineData(
  line: DLineData | undefined,
  newPoints: DLineData | null | undefined
): DLineData {
  if (newPoints === undefined || newPoints === null) {
    if (line === undefined) {
      throw Error('Cannot call with both arguments falsy');
    }
    return line;
  }
  if (line === undefined) {
    return newPoints;
  }
  let x: NDT;
  const xLength = newPoints.x.size;
  const yLength = newPoints.y.size;
  if (xLength === yLength || xLength === yLength + 1) {
    // second clause for histogram edge values
    x = concatRows([line.x, newPoints.x]) as NDT;
  } else {
    console.log(
      `x ({$xLength}) and y ({$yLength}) axes must be same length`,
      newPoints
    );
    return line;
  }
  const y = concatRows([line.y, newPoints.y]) as NDT;
  const dx = nanMinMax(x);
  const dy = [
    Math.min(line.dy[0], newPoints.dy[0]),
    Math.max(line.dy[1], newPoints.dy[1]),
  ];
  return {
    colour: line.colour,
    x: x,
    dx: dx,
    y: y,
    dy: dy,
    line_on: line.line_on,
    point_size: line.point_size,
    default_indices: line.default_indices,
  } as DLineData;
}

function calculateMultiXDomain(multilineData: DLineData[]): Domain {
  console.log('calculating multi x domain ', multilineData);
  const mins = multilineData.map((l) => l.dx[0]);
  const maxs = multilineData.map((l) => l.dx[1]);
  if (mins.length == 1) {
    return [mins[0], maxs[0]];
  }
  return [Math.min(...mins), Math.max(...maxs)];
}

function calculateMultiYDomain(multilineData: DLineData[]): Domain {
  console.log('calculating multi y domain ', multilineData);
  const mins = multilineData.map((l) => l.dy[0]);
  const maxs = multilineData.map((l) => l.dy[1]);
  if (mins.length == 1) {
    return [mins[0], maxs[0]];
  }
  return [Math.min(...mins), Math.max(...maxs)];
}

function createDImageData(
  data: ImageData | HeatmapData
): DImageData | DHeatmapData {
  const ii = data.values;
  const i = createNdArray(ii);
  if (isHeatmapData(data)) {
    const hmData = data as HeatmapData;
    return {
      key: hmData.key,
      values: i[0],
      aspect: hmData.aspect ?? undefined,
      domain: hmData.domain,
      heatmap_scale: hmData.heatmap_scale,
      colourMap: hmData.colourMap,
    } as DHeatmapData;
  } else {
    return {
      key: data.key,
      values: i[0],
      aspect: data.aspect ?? undefined,
    } as DImageData;
  }
}

function createDSurfaceData(data: SurfaceData): DSurfaceData {
  const ii = data.values;
  const i = createNdArray(ii);
  const suData = data;
  return {
    key: suData.key,
    values: i[0],
    domain: suData.domain,
    surface_scale: suData.surface_scale,
    colourMap: suData.colourMap,
  } as DSurfaceData;
}

function createDTableData(data: TableData): DTableData {
  const ii = data.dataArray;
  const i = createNdArray(ii);
  return {
    key: data.key,
    dataArray: i[0],
    cellWidth: data.cellWidth,
    displayParams: data.displayParams,
  } as DTableData;
}

function createDAxesParameters(data: AxesParameters): DAxesParameters {
  let x = undefined;
  let y = undefined;
  if (data.x_values != undefined) {
    const xArray = createNdArray(data.x_values);
    x = xArray[0];
  }
  if (data.y_values != undefined) {
    const yArray = createNdArray(data.y_values);
    y = yArray[0];
  }
  return {
    xLabel: data.x_label,
    yLabel: data.y_label,
    xScale: data.x_scale,
    yScale: data.y_scale,
    title: data.title,
    xValues: x,
    yValues: y,
  } as DAxesParameters;
}

function createDLineData(data: LineData): DLineData | null {
  const xi = data.x;
  const x = createNdArray(xi, true);
  const yi = data.y;
  const y = createNdArray(yi, true);

  if (y[0].size == 0) {
    return null;
  }
  return {
    key: data.key,
    colour: data.colour,
    x: x[0],
    dx: x[1],
    y: y[0],
    dy: y[1],
    line_on: data.line_on,
    point_size: data.point_size,
  } as DLineData;
}

function createDScatterData(data: ScatterData): DScatterData {
  const ii = data.dataArray;
  const i = createNdArray(ii);
  const xi = data.xData;
  const x = createNdArray(xi);
  const yi = data.yData;
  const y = createNdArray(yi);

  return {
    key: data.key,
    xData: x[0],
    yData: y[0],
    dataArray: i[0],
    domain: data.domain,
    colourMap: data.colourMap,
  } as DScatterData;
}

type NdArrayMinMax = [NDT, [number, number]];

function createNdArray(a: MP_NDArray, minmax = false): NdArrayMinMax {
  if (a.shape.length === 0 || a.shape[0] === 0) {
    return [ndarray(new Int8Array()), [0, 0]] as NdArrayMinMax;
  }
  const dtype = a.dtype;
  if (dtype === '<i8' || dtype === '<u8') {
    if (!minmax) {
      const ba: BigInt64Array | BigUint64Array =
        dtype === '<i8'
          ? new BigInt64Array(a.data)
          : new BigUint64Array(a.data);
      const f = new Float64Array(ba);
      return [ndarray(f, a.shape), [0, 0]] as NdArrayMinMax;
    }
    const limit = BigInt(2) ** BigInt(64);
    const mb: [bigint, bigint] = [limit, -limit];
    const minMax = function (e: bigint): void {
      if (e < mb[0]) {
        mb[0] = e;
      }
      if (e > mb[1]) {
        mb[1] = e;
      }
    };
    let ba: BigInt64Array | BigUint64Array;
    if (dtype === '<i8') {
      const bi = new BigInt64Array(a.data);
      bi.forEach(minMax);
      ba = bi;
    } else {
      const bu = new BigUint64Array(a.data);
      bu.forEach(minMax);
      ba = bu;
    }
    const ptp = mb[1] - mb[0];
    if (mb[0] < -limit || mb[1] > limit) {
      throw Error(
        'Extrema of 64-bit integer array are too large to represent as float 64'
      );
    }
    if (ptp > Number.MAX_SAFE_INTEGER) {
      console.warn(
        '64-bit integer array has range too wide to preserve precision'
      );
    }
    const f = new Float64Array(ba);
    return [
      ndarray(f, a.shape),
      [Number(mb[0]), Number(mb[1])],
    ] as NdArrayMinMax;
  }

  let b: TypedArray;
  switch (dtype) {
    case '|i1':
      b = new Int8Array(a.data);
      break;
    case '<i2':
      b = new Int16Array(a.data);
      break;
    case '<i4':
      b = new Int32Array(a.data);
      break;
    case '|u1':
      b = new Uint8Array(a.data);
      break;
    case '<u2':
      b = new Uint16Array(a.data);
      break;
    case '<u4':
      b = new Uint32Array(a.data);
      break;
    case '<f4':
      b = new Float32Array(a.data);
      break;
    default:
    case '<f8':
      b = new Float64Array(a.data);
      break;
  }
  const nd = ndarray(b, a.shape);
  return [nd, minmax ? nanMinMax(nd) : [0, 0]] as NdArrayMinMax;
}

function isHeatmapData(
  obj: ImageData | HeatmapData | DImageData | DHeatmapData
): boolean {
  return 'domain' in obj && 'heatmap_scale' in obj;
}

function getAspectType(aspect: Aspect): string {
  if (aspect === 'equal' || aspect === 'auto') {
    return aspect;
  }
  return 'number';
}

function isNumber(value: string): [boolean, number] {
  const n = parseFloat(value);
  return [Number.isFinite(n), n];
}

function isValidNumber(
  value: string,
  lower: number, // inclusive, >=
  upper: number, // exclusive <
  upperInclusive?: boolean
): [boolean, number] {
  const n = parseFloat(value);
  return [
    Number.isFinite(n) &&
      n >= lower &&
      (upperInclusive ? n <= upper : n < upper),
    n,
  ];
}

function isValidPositiveNumber(
  value: string,
  upper: number, // exclusive <
  upperInclusive?: boolean
): [boolean, number] {
  const n = parseFloat(value);
  return [
    Number.isFinite(n) && n > 0 && (upperInclusive ? n <= upper : n < upper),
    n,
  ];
}

function createInteractionsConfig(
  mode: InteractionModeType
): DefaultInteractionsConfig {
  const isPan = mode === InteractionModeType.panAndWheelZoom;
  const isZoom = mode === InteractionModeType.selectToZoom;
  return {
    pan: isPan ? ({} as PanProps) : false,
    zoom: isPan ? ({} as ZoomProps) : false,
    xAxisZoom: isPan ? ({} as XAxisZoomProps) : false,
    yAxisZoom: isPan ? ({} as YAxisZoomProps) : false,
    selectToZoom: isZoom ? ({ modifierKey: [] } as SelectToZoomProps) : false,
    xSelectToZoom: isZoom
      ? ({ modifierKey: 'Alt' } as Omit<AxialSelectToZoomProps, 'axis'>)
      : false,
    ySelectToZoom: isZoom
      ? ({ modifierKey: 'Shift' } as Omit<AxialSelectToZoomProps, 'axis'>)
      : false,
  } as DefaultInteractionsConfig;
}

function createHistogramParams(
  values: TypedArray | undefined,
  domain: Domain | undefined,
  colourMap: ColorMap | undefined,
  invertColourMap: boolean | undefined
): HistogramParams | undefined {
  if (values && values.length != 0) {
    const localBin = bin();
    const localScale =
      domain === undefined ? null : scaleLinear().domain(domain).nice();
    const maxEdges = values.length;
    let localEdges = null;
    if (localScale !== null && maxEdges > 0) {
      localEdges = localScale.ticks(Math.min(maxEdges, 20));
      localBin.thresholds(localEdges);
    }

    const hist = localBin(values);
    const lengths = hist.map((b) => b.length);
    let edges;
    if (localEdges === null) {
      const nEdges = hist.map((b) => b.x0);
      nEdges.push(hist[hist.length - 1].x1);
      edges = nEdges.filter((e) => {
        return e !== undefined;
      });
      if (edges.length === 0 && lengths.length === 1) {
        lengths.pop();
      }
    } else {
      edges = localEdges;
    }

    return {
      values: lengths,
      bins: edges,
      colourMap: colourMap,
      invertColourMap: invertColourMap,
    } as HistogramParams;
  }
  return undefined;
}

function measureInteraction() {
  const startTimestamp = performance.now();
  return {
    end() {
      const time = performance.now() - startTimestamp;
      console.log(`The interaction took ${time}ms`);
      return time;
    },
  };
}

enum InteractionModeType {
  panAndWheelZoom = 'panAndWheelZoom',
  selectToZoom = 'selectToZoom',
  selectRegion = 'selectRegion',
}

export {
  appendDLineData,
  calculateMultiXDomain,
  calculateMultiYDomain,
  createDAxesParameters,
  createDLineData,
  createDImageData,
  createDScatterData,
  createDSurfaceData,
  createDTableData,
  createHistogramParams,
  createInteractionsConfig,
  getAspectType,
  InteractionModeType,
  isHeatmapData,
  isNumber,
  isValidNumber,
  isValidPositiveNumber,
  measureInteraction,
  nanMinMax,
};

export type { DHeatmapData, DImageData, DScatterData, DTableData };
