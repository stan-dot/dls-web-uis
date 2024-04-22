import { DistanceUnits, SIUnit } from "@repo/science";
import { Beamstop, SimpleVector2 } from "../types";
import { create } from "zustand";

export interface BeamstopStore extends Beamstop {
  updateCentre: (centre: Partial<SimpleVector2>) => void;
  updateDiameter: (newDiameter: number, newUnits: DistanceUnits) => void;
  updateDiameterUnits: (newUnits: DistanceUnits) => void;
  updateClearance: (newClearnace: number) => void;
  updateBeamstop: (presetBeamstop: Beamstop) => void;
}

export const useBeamstopStore = create<BeamstopStore>((set) => ({
  ...defaultConfig.beamstop,
  updateCentre: (newCentre: Partial<SimpleVector2>) =>
    set((state) => ({ centre: { ...state.centre, ...newCentre } })),
  updateDiameter: (newDiameter: number, newUnits: DistanceUnits) =>
    set({ diameter: new SIUnit(newDiameter, newUnits) }),
  updateDiameterUnits: (newUnits: DistanceUnits) =>
    set((state) => ({ diameter: state.diameter.to(newUnits) })),
  updateClearance: (newClearance: number) => set({ clearance: newClearance }),
  updateBeamstop: (presetBeamstop: Beamstop) => set(presetBeamstop),
}));
