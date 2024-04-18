import { SimpleVector2 } from "../types";


export interface CameraTubeStore extends CircularDevice {
  updateCentre: (centre: Partial<SimpleVector2>) => void;
  updateDiameterUnits: (newUnits: DistanceUnits) => void;
  updateCameraTube: (presetCameraTube: CircularDevice) => void;
}

export const useCameraTubeStore = create<CameraTubeStore>((set) => ({
  ...defaultConfig.cameraTube,
  updateCentre: (newCentre: Partial<SimpleVector2>) =>
    set((state) => ({ centre: { ...state.centre, ...newCentre } })),
  updateDiameterUnits: (newUnits: DistanceUnits) =>
    set((state) => ({ diameter: state.diameter.to(newUnits) })),
  updateCameraTube: (presetCameraTube: CircularDevice) => set(presetCameraTube),
}));
