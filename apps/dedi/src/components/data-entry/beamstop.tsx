import {
  Stack,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useBeamstopStore } from "../../stores/beamstopStore";
import { useDetectorStore } from "../../stores/detectorStore";


export default function BeamStopDataEntry(): JSX.Element {
  const beamstop = useBeamstopStore();

  const handleX = (event: React.ChangeEvent<HTMLInputElement>) => {
    beamstop.updateCentre({
      x: parseFloat(event.target.value),
    });
  };

  const handleY = (event: React.ChangeEvent<HTMLInputElement>) => {
    beamstop.updateCentre({
      y: parseFloat(event.target.value),
    });
  };

  const handleClearance = (event: React.ChangeEvent<HTMLInputElement>) => {
    beamstop.updateClearance(parseFloat(event.target.value));
  };

  const detector = useDetectorStore();

  const centreDetector = () => {
    beamstop.updateCentre({
      x: detector.resolution.width / 2,
      y: detector.resolution.height / 2,
    });
  };

  const centreTopEdge = () => {
    beamstop.updateCentre({ x: detector.resolution.width / 2, y: 0 });
  };

  return (
    <Stack spacing={1}>
      <Typography variant="h6"> Beamstop </Typography>
      <Stack direction={"row"}>
        <Typography flexGrow={1}>
          {" "}
          Diameter: {beamstop.diameter.toNumber()}{" "}
        </Typography>
        <FormControl>
          <InputLabel>units </InputLabel>
          <Select
            size="small"
            label="units"
            value={beamstop.diameter.formatUnits()}
            onChange={(event) =>
              beamstop.updateDiameterUnits(event.target.value as DistanceUnits)
            }
          >
            <MenuItem value={DistanceUnits.millimetre}>{"mm"}</MenuItem>
            <MenuItem value={DistanceUnits.micrometre}>
              {"\u03bc" + "m"}
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Typography>Position:</Typography>
      <Stack direction={"row"} spacing={2}>
        <TextField
          type="number"
          size="small"
          label="x"
          value={beamstop.centre.x}
          onChange={handleX}
          InputProps={{
            endAdornment: <InputAdornment position="end">px</InputAdornment>,
          }}
        />
        <Button size="small" variant="outlined" onClick={centreDetector}>
          Centre detector
        </Button>
      </Stack>
      <Stack direction={"row"} spacing={1}>
        <TextField
          type="number"
          size="small"
          label="y"
          value={beamstop.centre.y}
          onChange={handleY}
          InputProps={{
            endAdornment: <InputAdornment position="end">px</InputAdornment>,
          }}
        />
        <Button size="small" variant="outlined" onClick={centreTopEdge}>
          Centre top edge
        </Button>
      </Stack>
      <Stack direction="row">
        <TextField
          type="number"
          size="small"
          label="clearance"
          value={beamstop.clearance}
          onChange={handleClearance}
          InputProps={{
            endAdornment: <InputAdornment position="end">px</InputAdornment>,
          }}
        />
      </Stack>
    </Stack>
  );
}
