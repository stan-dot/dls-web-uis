import { create } from "zustand";
import { DetectorParams } from "../types";
import { DistanceUnits } from "@repo/science/units";
import { beamlineConfigDict } from "../config/beamlines";
import { detectorConfigDict } from "../config/detectors";

export interface DetectorParamsStore {
  currentDetectorName: string;
  detectorList: Record<string, DetectorParams>;
  updateDetectorParams: (newDetectorParams: string) => void;
  updatePixelUnits: (newUnits: DistanceUnits) => void;
  addNewDetectorParams: (name: string, detector: DetectorParams) => void;
}

const defaultConfig = beamlineConfigDict[0]!;

export const useDetectorStore = create<DetectorParamsStore>((set) => ({
  currentDetectorName: defaultConfig.detectorName,
  ...detectorConfigDict[defaultConfig.detectorName],
  detectorList: detectorConfigDict,
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
    detectorConfigDict[name] = detector;
  },
}));
