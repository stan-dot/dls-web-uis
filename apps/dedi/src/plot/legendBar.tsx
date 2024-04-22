import {
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { PlotAxes, usePlotStore } from "./plotStore";
import ColorPickerPopover from "@repo/ui/color-picker-popover";

export default function LegendBar(): JSX.Element {
  const plotConfig = usePlotStore();

  return (
    <Card sx={{ height: 1, width: 1 }}>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6"> Legend</Typography>
          <Divider />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={plotConfig.detector}
                  onChange={(_, checked) =>
                    plotConfig.update({ detector: checked })
                  }
                />
              }
              label={
                <Stack direction={"row"}>
                  <ColorPickerPopover
                    color={plotConfig.detectorColor}
                    onChangeComplete={(color) =>
                      plotConfig.update({ detectorColor: color.rgb })
                    }
                  />
                  <Typography>Detector:</Typography>
                </Stack>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={plotConfig.cameraTube}
                  onChange={(_, checked) =>
                    plotConfig.update({ cameraTube: checked })
                  }
                />
              }
              label={
                <Stack direction={"row"}>
                  <ColorPickerPopover
                    color={plotConfig.cameraTubeColor}
                    onChangeComplete={(color) =>
                      plotConfig.update({ cameraTubeColor: color.rgb })
                    }
                  />
                  <Typography>Camera Tube:</Typography>
                </Stack>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={plotConfig.beamstop}
                  onChange={(_, checked) => {
                    plotConfig.update({ beamstop: checked });
                  }}
                />
              }
              label={
                <Stack direction={"row"}>
                  <ColorPickerPopover
                    color={plotConfig.beamstopColor}
                    onChangeComplete={(color) =>
                      plotConfig.update({ beamstopColor: color.rgb })
                    }
                  />
                  <Typography>Beamstop</Typography>
                </Stack>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={plotConfig.clearance}
                  onChange={(_, checked) => {
                    plotConfig.update({ clearance: checked });
                  }}
                />
              }
              label={
                <Stack direction={"row"}>
                  <ColorPickerPopover
                    color={plotConfig.clearanceColor}
                    onChangeComplete={(color) =>
                      plotConfig.update({ clearanceColor: color.rgb })
                    }
                  />
                  <Typography>Clearance</Typography>
                </Stack>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={plotConfig.visibleRange}
                  onChange={(_, checked) =>
                    plotConfig.update({ visibleRange: checked })
                  }
                />
              }
              label={
                <Stack direction={"row"}>
                  <ColorPickerPopover
                    color={plotConfig.visibleColor}
                    onChangeComplete={(color) =>
                      plotConfig.update({ visibleColor: color.rgb })
                    }
                  />
                  <Typography>Visible Range</Typography>
                </Stack>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={plotConfig.requestedRange}
                  onChange={(_, checked) =>
                    plotConfig.update({ requestedRange: checked })
                  }
                />
              }
              label={
                <Stack direction={"row"}>
                  <ColorPickerPopover
                    color={plotConfig.requestedRangeColor}
                    onChangeComplete={(color) =>
                      plotConfig.update({ requestedRangeColor: color.rgb })
                    }
                  />
                  <Typography>Requested Range</Typography>
                </Stack>
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={plotConfig.inaccessibleRange}
                  onChange={(_, checked) =>
                    plotConfig.update({ inaccessibleRange: checked })
                  }
                />
              }
              label={
                <Stack direction={"row"}>
                  <ColorPickerPopover
                    color={plotConfig.inaccessibleRangeColor}
                    onChangeComplete={(color) =>
                      plotConfig.update({ inaccessibleRangeColor: color.rgb })
                    }
                  />
                  <Typography>Inaccessible Range</Typography>
                </Stack>
              }
            />
          </FormGroup>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Axes:</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={plotConfig.plotAxes}
              name="radio-buttons-group"
              onChange={(event) =>
                plotConfig.update({ plotAxes: event.target.value as PlotAxes })
              }
            >
              <FormControlLabel
                value={PlotAxes.milimeter}
                control={<Radio />}
                label="Axes in mm"
              />
              <FormControlLabel
                value={PlotAxes.pixel}
                control={<Radio />}
                label="Axes in pixels"
              />
              <FormControlLabel
                value={PlotAxes.reciprocal}
                control={<Radio />}
                label="Axes in q(nm^-1)"
              />
            </RadioGroup>
          </FormControl>
          <Stack direction={"row"} spacing={1}></Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
