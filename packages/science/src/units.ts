import SIUnit from "./SIUnit";

export const CSPEED = new SIUnit(299792458, "m/s");
export const PLANCK = new SIUnit(6.62607015e-34, "J s");

export enum DistanceUnits {
  millimetre = "mm",
  micrometre = "um",
}

export enum EnergyUnits {
  electronVolts = "eV",
  kiloElectronVolts = "keV",
}

export enum WavelengthUnits {
  nanometers = "nm",
  angstroms = "angstrom",
}

export enum ReciprocalWavelengthUnits {
  nanmometres = "nm^-1",
  angstroms = `angstrom^-1`,
}

export enum AngleUnits {
  radians = "rad",
  degrees = "deg",
}

export enum TimeUnits {
  seconds = "s",
  milliseconds = "ms",
}

export function energyToWavelength(energy: SIUnit): SIUnit {
  const v = (PLANCK.value * CSPEED.value) / energy.value;
  return new SIUnit(v, WavelengthUnits.nanometers);
}
