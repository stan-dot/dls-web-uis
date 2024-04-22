import { create } from "zustand";
import { CameraTube, SimpleVector2 } from "../types";
import { DistanceUnits } from "@repo/science/units";

export interface CameraTubeStore extends CameraTube {
  updateCentre: (centre: Partial<SimpleVector2>) => void;
  updateDiameterUnits: (newUnits: DistanceUnits) => void;
  updateCameraTube: (presetCameraTube: CameraTube) => void;
}

export const useCameraTubeStore = create<CameraTubeStore>((set) => ({
  ...defaultConfig.cameraTube,
  updateCentre: (newCentre: Partial<SimpleVector2>) =>
    set((state) => ({ centre: { ...state.centre, ...newCentre } })),
  updateDiameterUnits: (newUnits: DistanceUnits) =>
    set((state) => ({ diameter: state.diameter.to(newUnits) })),
  updateCameraTube: (presetCameraTube: CameraTube) => set(presetCameraTube),
}));
