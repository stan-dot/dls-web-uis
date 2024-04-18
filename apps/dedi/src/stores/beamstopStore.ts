export interface BeamstopStore extends Beamstop {
  updateCentre: (centre: Partial<SimpleVector2>) => void;
  updateDiameter: (newDiameter: number, newUnits: DistanceUnits) => void;
  updateDiameterUnits: (newUnits: DistanceUnits) => void;
  updateClearance: (newClearnace: number | null) => void;
  updateBeamstop: (presetBeamstop: Beamstop) => void;
}

export const useBeamstopStore = create<BeamstopStore>((set) => ({
  ...defaultConfig.beamstop,
  updateCentre: (newCentre: Partial<SimpleVector2>) =>
    set((state) => ({ centre: { ...state.centre, ...newCentre } })),
  updateDiameter: (newDiameter: number, newUnits: DistanceUnits) =>
    set({ diameter: unit(newDiameter, newUnits) }),
  updateDiameterUnits: (newUnits: DistanceUnits) =>
    set((state) => ({ diameter: state.diameter.to(newUnits) })),
  updateClearance: (newClearnace: number | null) =>
    set({ clearance: newClearnace }),
  updateBeamstop: (presetBeamstop: Beamstop) => set(presetBeamstop),
}));
