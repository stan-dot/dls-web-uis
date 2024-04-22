import {
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
  Autocomplete,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
import React from "react";
import { useBeamlineConfigStore } from "../../stores/beamlineconfigStore";
import { useBeamstopStore } from "../../stores/beamstopStore";
import { useCameraTubeStore } from "../../stores/cameraTubeStore";
import { useDetectorStore } from "../../stores/detectorStore";
import BeampropertiesDataEntry from "./beamProperties";
import BeamStopDataEntry from "./beamstop";
import CameraTubeDataEntry from "./cameraTube";
import { beamlineConfigDict } from "../../config/beamlines";
import { BeamlineParams } from "../../types";
import PresetDialog from "../../dialogs/presetDialog";
import DetectorDialog from "../../dialogs/detectorDialog";


/**
 * React component which represents the side bar for data entry
 * @returns
 */
export default function DataSideBar(): JSX.Element {
  const detector = useDetectorStore();
  const detectorList = useDetectorStore((state) => state.detectorList);
  const beamlineConfig = useBeamlineConfigStore();

  const updateBeamstop = useBeamstopStore((state) => state.updateBeamstop);
  const updateCameraTube = useCameraTubeStore(
    (state) => state.updateCameraTube,
  );
  const updateBeamlineConfig = useBeamlineConfigStore((state) => state.update);
  const updateDetector = useDetectorStore((state) => state.updateDetector);

  const handlePreset = (preset: string) => {
    const { beamstop, cameraTube, detector, ...beamlineConfig } =
      beamlineConfigDict[preset] as BeamlineParams;
    updateDetector(detector);
    updateBeamstop(beamstop);
    updateCameraTube(cameraTube);
    updateBeamlineConfig(beamlineConfig);
    updateBeamlineConfig({ preset: preset });
  };

  const [openDetector, setOpenDetector] = React.useState(false);

  const handleClickOpenDetector = () => {
    setOpenDetector(true);
  };

  const handleCloseDetector = () => {
    setOpenDetector(false);
  };

  const [openPreset, setOpenPreset] = React.useState(false);

  const handleClickOpenPreset = () => {
    setOpenPreset(true);
  };

  const handleClosePreset = () => {
    setOpenPreset(false);
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6">Preset</Typography>
          <Stack direction={"row"} spacing={2}>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={Object.keys(presetList)}
              value={beamlineConfig.preset}
              sx={{ width: 300, color: "white" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="choose beamline preset"
                  sx={{ color: "white" }}
                />
              )}
              onChange={(_, value) => {
                value ? handlePreset(value) : {};
              }}
            />
            <Button variant="outlined" onClick={handleClickOpenPreset}>
              Add beamline
            </Button>
            <PresetDialog
              open={openPreset}
              handleClose={handleClosePreset}
              handleOpen={handleClickOpenPreset}
            />
          </Stack>
          <Typography variant="h6">Detector</Typography>
          <Stack direction={"row"} spacing={2}>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={Object.keys(detectorList)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="choose detector type" />
              )}
              value={detector.currentDetectorName}
              onChange={(_, value) => {
                value ? detector.updateDetector(value) : {};
              }}
            />
            <Button variant="outlined" onClick={handleClickOpenDetector}>
              {" "}
              Add detector
            </Button>
            <DetectorDialog
              isOpen={openDetector}
              handleClose={handleCloseDetector}
              handleOpen={handleClickOpenDetector}
            />
          </Stack>

          <Typography>
            Resolution (hxw): {detector.resolution.height} x{" "}
            {detector.resolution.width}
          </Typography>
          <Stack direction="row">
            <Typography flexGrow={2}>
              Pixel size: {detector.pixelSize.height.toString()} x{" "}
              {detector.pixelSize.width.toString()}
            </Typography>
            <FormControl>
              <InputLabel>units</InputLabel>
              <Select
                size="small"
                label="units"
                value={detector.pixelSize.height.formatUnits()}
                onChange={(event) =>
                  detector.updatePixelUnits(event.target.value as DistanceUnits)
                }
              >
                <MenuItem value={DistanceUnits.millimetre}>
                  {DistanceUnits.millimetre} x {DistanceUnits.millimetre}
                </MenuItem>
                <MenuItem value={DistanceUnits.micrometre}>
                  {"\u03BC" + "m"} x {"\u03BC" + "m"}
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Divider />
          <BeamStopDataEntry />
          <Divider />
          <CameraTubeDataEntry />
          <Divider />
          <BeampropertiesDataEntry />
        </Stack>
      </CardContent>
    </Card>
  );
}
