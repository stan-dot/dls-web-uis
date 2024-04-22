import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { beamlineConfigDict } from "../config/beamlines";
import { BeamlineParams } from "../types";

interface BeamlineTableRow {
  name: string;
  detector: string;
  angle: number;
  cameraLength: number | null;
  minWavelength: number;
  maxWavelength: number;
  minCameraLength: number;
  maxCameraLength: number;
  cameraLengthStep: number;
}

function createData(name: string, beamline: BeamlineParams): BeamlineTableRow {
  return {
    name: name,
    detector: beamline.detectorName,
    angle: beamline.angle.toNumber("deg"),
    cameraLength: beamline.cameraLength,
    minWavelength: beamline.minWavelength.toNumber("nm"),
    maxWavelength: beamline.maxWavelength.toNumber("nm"),
    minCameraLength: beamline.minCameraLength.toNumber("m"),
    maxCameraLength: beamline.maxCameraLength.toNumber("m"),
    cameraLengthStep: beamline.cameraLengthStep.toNumber("m"),
  };
}

export default function BeamlineTable() {
  const displayArray: BeamlineTableRow[] = [];
  for (const [key, value] of Object.entries(beamlineConfigDict)) {
    displayArray.push(createData(key, value));
  }

  const columns: GridColDef[] = [
    { field: "name", headerName: "name", flex: 1 },
    { field: "detector", headerName: "detector", flex: 1 },
    { field: "angle", headerName: "angle", flex: 1 },
    { field: "cameraLength", headerName: "cameraLength", flex: 1 },
    { field: "minWavelength", headerName: "min wavelength", flex: 1 },
    { field: "maxWavelength", headerName: "max wavelength", flex: 1 },
    { field: "minCameraLength", headerName: "min camera length", flex: 1 },
    { field: "maxCameraLength", headerName: "max camera length", flex: 1 },
    { field: "cameraLengthStep", headerName: "camera length step", flex: 1 },
  ];

  return (
    <DataGrid
      autoHeight
      rows={displayArray}
      getRowId={(row: BeamlineTableRow) => row.name}
      columns={columns}
      slots={{ toolbar: GridToolbar }}
      sx={{ border: 0 }}
      disableRowSelectionOnClick
    />
  );
}
