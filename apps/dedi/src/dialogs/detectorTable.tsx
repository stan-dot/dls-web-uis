import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { DetectorParams } from "../types";

interface DetectorTableRow {
  name: string;
  resolution_height: number;
  resolution_width: number;
  pixel_height: number;
  pixel_width: number;
}

function createData(name: string, detector: DetectorParams): DetectorTableRow {
  return {
    name: name,
    resolution_height: detector.resolution.height,
    resolution_width: detector.resolution.width,
    pixel_height: detector.pixelSize.height.toNumber("mm"),
    pixel_width: detector.pixelSize.width.toNumber("mm"),
  };
}

export default function DetectorTable() {
  const displayArray: DetectorTableRow[] = [];
  // todo think about persistence, maybe in cookies. why not just a global context?
  for (const [key, value] of Object.entries(detectorList)) {
    displayArray.push(createData(key, value));
  }

  const columns: GridColDef[] = [
    { field: "name", headerName: "name", flex: 1 },
    { field: "resolution_height", headerName: "resolution height", flex: 1 },
    { field: "resolution_width", headerName: "resolution width", flex: 1 },
    { field: "pixel_height", headerName: "pixel height", flex: 1 },
    { field: "pixel_width", headerName: "pixel width", flex: 1 },
  ];

  return (
    <DataGrid
      autoHeight
      rows={displayArray}
      getRowId={(row: DetectorTableRow) => row.name}
      columns={columns}
      components={{ Toolbar: GridToolbar }}
      sx={{ border: 0 }}
      disableSelectionOnClick
    />
  );
}
