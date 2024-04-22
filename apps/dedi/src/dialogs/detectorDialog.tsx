import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SIUnit } from '@repo/science/SIUnit';
import { useState } from "react";
import { useDetectorStore } from "../stores/detectorStore";
import DetectorTable from "./detectorTable";

type DetectorDialogState = {
  resolutionHeight: number;
  resolutionWidth: number;
  pixelHeight: number;
  pixelWidth: number;
  name: string;
};

const initialState: DetectorDialogState = {
  resolutionHeight: 0,
  resolutionWidth: 0,
  pixelHeight: 0,
  pixelWidth: 0,
  name: ""
}

type DetectorDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleOpen: () => void;
};

export default function DetectorDialog({ isOpen, handleClose, handleOpen }: DetectorDialogProps): JSX.Element {
  const detectorStore = useDetectorStore();
  const [state, setState] = useState<DetectorDialogState>(initialState)

  const handleSubmit = () => {
    if (
      state.resolutionHeight &&
      state.resolutionWidth &&
      state.pixelHeight &&
      state.pixelWidth &&
      state.name
    ) {
      detectorStore.addNewDetector(name, {
        resolution: { height: state.resolutionHeight, width: state.resolutionWidth },
        pixelSize: {
          height: new SIUnit(state.pixelHeight, "mm"),
          width: new SIUnit(state.pixelWidth, "mm"),
        },
      });
    }

    handleClose();
  };

  return (
    <Dialog open={isOpen} keepMounted onClose={handleClose}>
      <DialogTitle>{"Detectors"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <DetectorTable />
          <Typography>Add new Detector</Typography>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="name"
                onChange={(event) => setState({ ...state, name: event.target.value })}
                variant="outlined"
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <Typography>Resolution:</Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="number"
                label="width"
                onChange={(event) =>
                  setState({ ...state, resolutionWidth: parseFloat(event.target.value) })
                }
                size="small"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="number"
                label="height"
                onChange={(event) =>
                  setState({ ...state, resolutionHeight: parseFloat(event.target.value) })
                }
                size="small"
              />
            </Grid>
            <Grid item xs={4}>
              <Typography> Pixel Size:</Typography>
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="number"
                label="x"
                onChange={(event) =>
                  setState({ ...state, pixelWidth: parseFloat(event.target.value) })
                }
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">mm</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                type="number"
                label="y"
                onChange={(event) =>
                  setState({ ...state, pixelHeight: parseFloat(event.target.value) })
                }
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">mm</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="outlined">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
