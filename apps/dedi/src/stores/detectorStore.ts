import { create } from "zustand";
import { DetectorParams } from "../types";
import { DistanceUnits } from "@repo/science/units";

export interface DetectorParamsStore {
  currentDetectorName: string;
  detectorList: Record<string, DetectorParams>;
  updateDetectorParams: (newDetectorParams: string) => void;
  updatePixelUnits: (newUnits: DistanceUnits) => void;
  addNewDetectorParams: (name: string, detector: DetectorParams) => void;
}

export const useDetectorStore = create<DetectorParamsStore>((set) => ({
  currentDetectorName: defaultConfig.detector,
  ...detectorList[defaultConfig.detector],
  detectorList: detectorList,
  updateDetectorParams: (newDetectorParams: string) =>
    set((state) => ({
      ...state.detectorList[newDetectorParams],
      currentDetectorName: newDetectorParams,
    })),
  updatePixelUnits: (newUnits: DistanceUnits) =>
    set((state) => ({
      pixelSize: {
        height: state.pixelSize.height.to(newUnits as string),
        width: state.pixelSize.width.to(newUnits as string),
      },
    })),
  addNewDetectorParams: (name: string, detector: DetectorParams) => {
    detectorList[name] = detector;
  },
}));
