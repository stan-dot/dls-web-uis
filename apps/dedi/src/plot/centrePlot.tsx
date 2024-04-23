import {
  DataToHtml,
  DefaultInteractions,
  ResetZoomButton,
  SvgElement,
  SvgLine,
  SvgRect,
  VisCanvas,
} from "@h5web/lib";
import { Card, CardContent, Stack } from "@mui/material";
import { Vector3 } from "three";
import { computeQrange } from "../calculations/qrange";
import ResultsBar from "../results/resultsBar";
import {
  useResultStore,
} from "../results/resultsStore";

import { SIRange } from "@repo/science";
import { SvgAxisAlignedEllipse } from "@repo/ui/svgs";
import { useBeamstopStore } from "../stores/beamstopStore";
import { useCameraTubeStore } from "../stores/cameraTubeStore";
import { DetectorParamsStore, useDetectorStore } from "../stores/detectorStore";
import { Beamstop, CameraTube, DetectorParams } from "../types";
import { Plotter } from "./Plotter";
import LegendBar from "./legendBar";
import { usePlotStore } from "./plotStore";
import { color2String, getDomains } from "./plotUtils";
import { createPlots, getRange, getReferencePoints, getRequestedRange, getScaleFactor, useBeamlineConfig } from "./useBeamlineConfig";

export default function CentrePlot(): JSX.Element {
  const plotConfig = usePlotStore();
  const beamlineConfig = useBeamlineConfig();

  // todo some form of destructuring notation {...state} might simplify this
  const detector = useDetectorStore<DetectorParams>((state: DetectorParamsStore) => {
    return {
      resolution: state.resolution,
      pixelSize: state.pixelSize,
    };
  });

  const beamstop = useBeamstopStore<Beamstop>((state) => {
    return {
      centre: state.centre,
      diameter: state.diameter,
      clearance: state.clearance,
    };
  });

  const cameraTube = useCameraTubeStore<CameraTube>((state) => {
    return { centre: state.centre, diameter: state.diameter };
  });

  const scaleFactor: number | null = getScaleFactor(beamlineConfig);

  const { ptMin, ptMax, visibleQRange, fullQRange } = computeQrange(
    detector,
    beamstop,
    cameraTube,
    beamlineConfig,
  );

  // todo move these 2 statements into the ResultsBar component
  //  as that's the only place that uses these
  const visibleQRangeUnits = SIRange.fromNumericRange(
    visibleQRange,
    "m^-1",
  ).to("nm^-1");

  console.log(visibleQRange);
  const fullQRangeUnits = SIRange.fromNumericRange(fullQRange, "m^-1").to(
    "nm^-1",
  );

  const { beamstopCentre, cameraTubeCentre, minPoint, maxPoint } =
    getReferencePoints(ptMin, ptMax, beamstop, cameraTube);

  const plotter = new Plotter(plotConfig.plotAxes, scaleFactor);

  const {
    plotDetector,
    plotBeamstop,
    plotClearance,
    plotCameraTube,
    plotVisibleRange,
  } = createPlots(
    plotter,
    beamstopCentre,
    beamstop,
    cameraTubeCentre,
    cameraTube,
    detector,
    minPoint,
    maxPoint,
  );

  // abstracting state logic away from the display logic
  const requestedRange = useResultStore<SIRange | null>(getRange());

  let plotRequestedRange = {
    start: new Vector3(0, 0),
    end: new Vector3(0, 0),
  };

  if (
    requestedRange &&
    beamlineConfig.cameraLength &&
    beamlineConfig.wavelength
  ) {
    plotRequestedRange = getRequestedRange(
      requestedRange,
      beamlineConfig,
      beamstopCentre,
      plotRequestedRange,
      plotter,
    );
  }

  console.log(plotDetector);

  const domains = getDomains(plotDetector);

  return (
    <>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" spacing={1}>
          <Card>
            <CardContent>
              <div
                style={{
                  display: "grid",
                  height: "60vh",
                  width: "65vh",
                  border: "solid black",
                }}
              >
                <VisCanvas
                  abscissaConfig={{
                    visDomain: [domains.xAxis.min, domains.xAxis.max],
                    showGrid: true,
                  }}
                  ordinateConfig={{
                    visDomain: [domains.yAxis.max, domains.yAxis.min],
                    showGrid: true,
                  }}
                >
                  <DefaultInteractions />
                  <ResetZoomButton />
                  <DataToHtml
                    points={[
                      plotBeamstop.centre,
                      plotBeamstop.endPointX,
                      plotBeamstop.endPointY,
                      plotClearance.centre,
                      plotClearance.endPointX,
                      plotClearance.endPointY,
                      plotCameraTube.centre,
                      plotCameraTube.endPointX,
                      plotCameraTube.endPointY,
                      plotDetector.lowerBound,
                      plotDetector.upperBound,
                      plotVisibleRange.start,
                      plotVisibleRange.end,
                      plotRequestedRange.start,
                      plotRequestedRange.end,
                    ]}
                  >
                    {(
                      beamstopCentre,
                      beamstopEndPointX,
                      beamstopEndPointY,
                      clearanceCentre,
                      clearnaceEndPointX,
                      clearenaceEndPointY,
                      cameraTubeCentre,
                      cameraTubeEndPointX,
                      cameraTubeEndPointY,
                      detectorLower,
                      detectorUpper,
                      visibleRangeStart,
                      visableRangeEnd,
                      requestedRangeStart,
                      requestedRangeEnd,
                    ) => (
                      <SvgElement>
                        {plotConfig.cameraTube && (
                          <SvgAxisAlignedEllipse
                            coords={[
                              cameraTubeCentre,
                              cameraTubeEndPointX,
                              cameraTubeEndPointY,
                            ]}
                            fill={color2String(plotConfig.cameraTubeColor)}
                            id="camera tube"
                          />
                        )}
                        {plotConfig.detector && (
                          <SvgRect
                            coords={[detectorLower, detectorUpper]}
                            fill={color2String(plotConfig.detectorColor)}
                            id="detector"
                          />
                        )}
                        {plotConfig.inaccessibleRange && (
                          <SvgLine
                            coords={[beamstopCentre, visibleRangeStart]}
                            stroke={color2String(
                              plotConfig.inaccessibleRangeColor,
                            )}
                            strokeWidth={3}
                            id="inaccessible"
                          />
                        )}
                        {plotConfig.clearance && (
                          <SvgAxisAlignedEllipse
                            coords={[
                              clearanceCentre,
                              clearnaceEndPointX,
                              clearenaceEndPointY,
                            ]}
                            fill={color2String(plotConfig.clearanceColor)}
                            id="clearance"
                          />
                        )}
                        {plotConfig.visibleRange && (
                          <SvgLine
                            coords={[visibleRangeStart, visableRangeEnd]}
                            stroke={color2String(plotConfig.visibleColor)}
                            strokeWidth={3}
                            id="visible"
                          />
                        )}
                        {plotConfig.requestedRange && (
                          <SvgLine
                            coords={[requestedRangeStart, requestedRangeEnd]}
                            stroke={color2String(
                              plotConfig.requestedRangeColor,
                            )}
                            strokeWidth={3}
                            id="requested"
                          />
                        )}
                        {plotConfig.beamstop && (
                          <SvgAxisAlignedEllipse
                            coords={[
                              beamstopCentre,
                              beamstopEndPointX,
                              beamstopEndPointY,
                            ]}
                            fill={color2String(plotConfig.beamstopColor)}
                            id="beamstop"
                          />
                        )}
                      </SvgElement>
                    )}
                  </DataToHtml>
                </VisCanvas>
              </div>
            </CardContent>
          </Card>
          {/* <Box flexGrow={1}> */}
          <div>
            <LegendBar />
          </div>
        </Stack>
        <ResultsBar
          visableQRange={visibleQRangeUnits}
          fullQrange={fullQRangeUnits}
        />
      </Stack>
    </>
  );
}
