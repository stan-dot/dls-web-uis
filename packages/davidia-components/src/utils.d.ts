import type { NdArray, TypedArray } from 'ndarray';
import type { Aspect, ColorMap, DefaultInteractionsConfig, Domain, HistogramParams } from '@h5web/lib';
import type { AxesParameters, DAxesParameters, DLineData, TableDisplayParams } from './plots/AnyPlot.js';
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
declare const nanMinMax: MinMax;
declare function appendDLineData(line: DLineData | undefined, newPoints: DLineData | null | undefined): DLineData;
declare function calculateMultiXDomain(multilineData: DLineData[]): Domain;
declare function calculateMultiYDomain(multilineData: DLineData[]): Domain;
declare function createDImageData(data: ImageData | HeatmapData): DImageData | DHeatmapData;
declare function createDSurfaceData(data: SurfaceData): DSurfaceData;
declare function createDTableData(data: TableData): DTableData;
declare function createDAxesParameters(data: AxesParameters): DAxesParameters;
declare function createDLineData(data: LineData): DLineData | null;
declare function createDScatterData(data: ScatterData): DScatterData;
declare function isHeatmapData(obj: ImageData | HeatmapData | DImageData | DHeatmapData): boolean;
declare function getAspectType(aspect: Aspect): string;
declare function isNumber(value: string): [boolean, number];
declare function isValidNumber(value: string, lower: number, // inclusive, >=
upper: number, // exclusive <
upperInclusive?: boolean): [boolean, number];
declare function isValidPositiveNumber(value: string, upper: number, // exclusive <
upperInclusive?: boolean): [boolean, number];
declare function createInteractionsConfig(mode: InteractionModeType): DefaultInteractionsConfig;
declare function createHistogramParams(values: TypedArray | undefined, domain: Domain | undefined, colourMap: ColorMap | undefined, invertColourMap: boolean | undefined): HistogramParams | undefined;
declare function measureInteraction(): {
    end(): number;
};
declare enum InteractionModeType {
    panAndWheelZoom = "panAndWheelZoom",
    selectToZoom = "selectToZoom",
    selectRegion = "selectRegion"
}
export { appendDLineData, calculateMultiXDomain, calculateMultiYDomain, createDAxesParameters, createDLineData, createDImageData, createDScatterData, createDSurfaceData, createDTableData, createHistogramParams, createInteractionsConfig, getAspectType, InteractionModeType, isHeatmapData, isNumber, isValidNumber, isValidPositiveNumber, measureInteraction, nanMinMax, };
export type { DHeatmapData, DImageData, DScatterData, DTableData };
//# sourceMappingURL=utils.d.ts.map