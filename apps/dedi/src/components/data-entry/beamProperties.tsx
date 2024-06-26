import {
  Stack,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  InputAdornment,
} from "@mui/material";

import { useBeamlineConfigStore } from "../../stores/beamlineconfigStore";
import { AngleUnits, EnergyUnits, WavelengthUnits, wavelengthToEnergy } from "@repo/science/units";
import { SIUnit } from "@repo/science";

/**
 * A function to process numeric texbox inputs in a consistant way.
 * @param input input string from the texbox
 * @returns a valid float or null
 */
export const parseNumericInput = (input: string): number | null => {
  const output = parseFloat(input.trim());

  if (!output && output != 0) {
    return null;
  }
  return output;
};

// todo consider splitting this into components
export default function BeampropertiesDataEntry() {
  const beamlineConfig = useBeamlineConfigStore();

  const handleAngleUnits = (event: SelectChangeEvent<AngleUnits>) => {
    beamlineConfig.updateAngleUnits(event.target.value as AngleUnits);
  };
  const handleAngle = (event: React.ChangeEvent<HTMLInputElement>) => {
    beamlineConfig.updateAngle(
      parseNumericInput(event.target.value),
      beamlineConfig.angle.formatUnits() as AngleUnits,
    );
  };

  const handleWavelength = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWavelength = parseNumericInput(event.target.value);
    if (newWavelength === null) return;
    beamlineConfig.updateWavelength(
      newWavelength,
      beamlineConfig.wavelength.formatUnits() as WavelengthUnits,
    );
    const w:SIUnit = new SIUnit(newWavelength ?? NaN, beamlineConfig.wavelength.formatUnits());
    const newEnergy = wavelengthToEnergy( w,);
    beamlineConfig.updateEnergy(
      newEnergy.to(beamlineConfig.energy.formatUnits()).toNumber(),
      beamlineConfig.energy.formatUnits() as EnergyUnits,
    );
  };

  const handleWavelengthUnits = (event: SelectChangeEvent<WavelengthUnits>) => {
    beamlineConfig.updateWavelengthUnits(event.target.value as WavelengthUnits);
  };

  const handleEnergy = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEnergy = parseNumericInput(event.target.value);
    beamlineConfig.updateEnergy(
      newEnergy,
      beamlineConfig.energy.formatUnits() as EnergyUnits,
    );
    const newWavelength = energy2WavelengthConverter(
      unit(newEnergy ?? NaN, beamlineConfig.energy.formatUnits()),
    );
    beamlineConfig.updateWavelength(
      newWavelength.to(beamlineConfig.wavelength.formatUnits()).toNumber(),
      beamlineConfig.wavelength.formatUnits() as WavelengthUnits,
    );
  };

  const handleEnergyUnits = (event: SelectChangeEvent<EnergyUnits>) => {
    beamlineConfig.updateEnergyUnits(event.target.value as EnergyUnits);
  };

  const handleCameraLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    beamlineConfig.updateCameraLength(parseNumericInput(event.target.value));
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Beam properties</Typography>
      {/* ENERGY */}
      <Stack direction={"row"} spacing={1}>
        <TextField
          type="number"
          size="small"
          label="energy"
          value={beamlineConfig.userEnergy}
          onChange={handleEnergy}
        />
        <FormControl>
          <InputLabel>units</InputLabel>
          <Select
            size="small"
            label="units"
            value={beamlineConfig.energy.formatUnits() as EnergyUnits}
            onChange={handleEnergyUnits}
          >
            <MenuItem value={EnergyUnits.electronVolts}>
              {EnergyUnits.electronVolts}
            </MenuItem>
            <MenuItem value={EnergyUnits.kiloElectronVolts}>
              {EnergyUnits.kiloElectronVolts}
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {/* WAVELENGTH */}
      <Stack direction={"row"} spacing={1}>
        <TextField
          type="number"
          size="small"
          label="wavelength"
          value={beamlineConfig.userWavelength}
          onChange={handleWavelength}
        />
        <FormControl>
          <InputLabel>units</InputLabel>
          <Select
            size="small"
            label="units"
            value={beamlineConfig.wavelength.formatUnits() as WavelengthUnits}
            onChange={handleWavelengthUnits}
          >
            <MenuItem value={WavelengthUnits.nanometers}>
              {WavelengthUnits.nanometers}
            </MenuItem>
            <MenuItem value={WavelengthUnits.angstroms}>{"\u212B"}</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Typography>
        Minimum allowed wavelength: {beamlineConfig.minWavelength.toString()}
      </Typography>
      <Typography>
        Maximum allowed wavelength: {beamlineConfig.maxWavelength.toString()}
      </Typography>
      <Stack direction="row" spacing={1}>
        <TextField
          type="number"
          size="small"
          label="camera length"
          value={beamlineConfig.cameraLength ?? ""}
          InputProps={{
            inputProps: {
              max: beamlineConfig.maxCameraLength.toNumber(),
              min: beamlineConfig.minCameraLength.toNumber(),
              step: beamlineConfig.cameraLengthStep.toNumber(),
            },
            endAdornment: <InputAdornment position="end">m</InputAdornment>,
          }}
          onChange={handleCameraLength}
        />
      </Stack>
      {/* ANGLE */}
      <Stack direction="row" spacing={1}>
        <TextField
          type="number"
          size="small"
          label="angle"
          defaultValue={""}
          value={beamlineConfig.userAngle ?? ""}
          onChange={handleAngle}
        />
        <FormControl>
          <InputLabel>units</InputLabel>
          <Select
            size="small"
            label="units"
            value={beamlineConfig.angle.formatUnits() as AngleUnits}
            onChange={handleAngleUnits}
          >
            <MenuItem value={AngleUnits.radians}>{AngleUnits.radians}</MenuItem>
            <MenuItem value={AngleUnits.degrees}>{AngleUnits.degrees}</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Stack>
  );
}
