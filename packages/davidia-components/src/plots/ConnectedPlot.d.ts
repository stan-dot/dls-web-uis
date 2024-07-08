import 'react-toastify/dist/ReactToastify.css';
import { type SelectionBase } from '../specific-selections/utils.js';
import type { TableData } from '../table/TableDisplay.js';
import type { AxesParameters } from './AnyPlot.js';
import type { ImageData } from './ImagePlot.js';
import type { LineData } from './LinePlot.js';
import type { ScatterData } from './ScatterPlot.js';
import type { SurfaceData } from './SurfacePlot.js';
type MsgType = 'status' | 'new_multiline_data' | 'append_line_data' | 'new_image_data' | 'new_scatter_data' | 'new_surface_data' | 'new_table_data' | 'new_selection_data' | 'append_selection_data' | 'baton_request' | 'baton_approval' | 'clear_selection_data' | 'clear_data' | 'client_new_selection' | 'client_update_selection';
type DecodedMessage = MultiLineDataMessage | AppendLineDataMessage | ImageDataMessage | ScatterDataMessage | SurfaceDataMessage | TableDataMessage | UpdateSelectionsMessage | SelectionsMessage | ClearSelectionsMessage | ClearPlotsMessage | BatonMessage | BatonApprovalRequestMessage;
type StatusType = 'ready' | 'busy';
/**
 * A plot message.
 * @interface {object} PlotMessage
 * @member {string} plot_id - The plot ID.
 * @member {MsgType} type - The message type.
 * @member {unknown} params - The message parameters.
 * @member {unknown} plot_config - The plot configuration.
 */
interface PlotMessage {
    /** The plot ID */
    plot_id: string;
    /** The message type */
    type: MsgType;
    /** The message parameters */
    params: unknown;
    /** The plot configureation */
    plot_config: unknown;
}
/**
 * A baton message.
 * @interface {object} BatonMessage
 * @member {string} baton - The uuid of the current baton holder.
 * @member {string[]} uuids - The uuids of all clients.
 */
interface BatonMessage {
    /** The uuid of the current baton holder */
    baton: string;
    /** The uuids of all the clients */
    uuids: string[];
}
/**
 * A baton approval request message.
 * @interface {object} BatonApprovalRequestMessage
 * @member {string} requester - The uuid of the client requesting the baton.
 */
interface BatonApprovalRequestMessage {
    /** The uuid of the client requesting the baton */
    requester: string;
}
/**
 * A selections message.
 * @interface {object} SelectionsMessage
 * @member {SelectionBase[]} set_selections - The selections.
 */
interface SelectionsMessage {
    /** The selections */
    set_selections: SelectionBase[];
}
/**
 * An update selections message.
 * @interface {object} UpdateSelectionsMessage
 * @member {SelectionBase[]} update_selections - The selections to update.
 */
interface UpdateSelectionsMessage {
    /** The selections to update */
    update_selections: SelectionBase[];
}
/**
 * A clear selections message.
 * @interface {object} ClearSelectionsMessage
 * @member {string[]} selection_ids - The selection IDs.
 */
interface ClearSelectionsMessage {
    /** The selection IDs */
    selection_ids: string[];
}
/**
 * A client selection message.
 * @interface {object} ClientSelectionMessage
 * @member {SelectionBase} selection - The selection.
 */
interface ClientSelectionMessage {
    /** The selection */
    selection: SelectionBase;
}
/**
 * A baton request message.
 * @interface {object} BatonRequestMessage
 * @member {string} uuid - The universally unique identifier.
 */
interface BatonRequestMessage {
    /** The universally unique identifier */
    uuid: string;
}
/**
 * A clear plots message.
 * @interface {object} ClearPlotsMessage
 * @member {string} plot_id - The plot ID.
 */
interface ClearPlotsMessage {
    /** The plot ID */
    plot_id: string;
}
/**
 * A data message.
 * @interface {object} DataMessage
 * @member {AxesParameters} axes_parameters - The axes parameters.
 */
interface DataMessage {
    /** The axes parameters */
    axes_parameters: AxesParameters;
}
/**
 * A multiline data message.
 * @interface {object} MultiLineDataMessage
 * @extends {DataMessage}
 * @member {LineData[]} ml_data - The multiline data.
 */
interface MultiLineDataMessage extends DataMessage {
    /** The multiline data */
    ml_data: LineData[];
}
/**
 * An append line data message.
 * @interface {object} AppendLineDataMessage
 * @extends {DataMessage}
 * @member {LineData[]} al_data - The line data to append.
 */
interface AppendLineDataMessage extends DataMessage {
    /** The line data to append */
    al_data: LineData[];
}
/**
 * An image data message.
 * @interface {object} ImageDataMessage
 * @extends {DataMessage}
 * @member {ImageData} im_data - The image data.
 */
interface ImageDataMessage extends DataMessage {
    /** The image data */
    im_data: ImageData;
}
/**
 * A scatter data message.
 * @interface {object} ScatterDataMessage
 * @extends {DataMessage}
 * @member {ScatterData} sc_data - The scatter data.
 */
interface ScatterDataMessage extends DataMessage {
    /** The scatter data */
    sc_data: ScatterData;
}
/**
 * A surface data message.
 * @interface {object} SurfaceDataMessage
 * @extends {DataMessage}
 * @member {SurfaceData} su_data - The surface data.
 */
interface SurfaceDataMessage extends DataMessage {
    /** The surface data */
    su_data: SurfaceData;
}
/**
 * A table data message.
 * @interface {object} TableDataMessage
 * @extends {DataMessage}
 * @member {TableData} ta_data - The table data.
 */
interface TableDataMessage extends DataMessage {
    /** The table data */
    ta_data: TableData;
}
/**
 * The props for the `ConnectedPlot` component.
 * @interface {object} ConnectedPlotProps
 * @member {string} plot_id - The plot ID.
 * @member {string} hostname - The hostname.
 * @member {string} port - The port.
 * @member {string} uuid - The uuid.
 */
interface ConnectedPlotProps {
    /** The plot ID */
    plot_id: string;
    /** The hostname */
    hostname: string;
    /** The port */
    port: string;
    /** The universally unique identifier */
    uuid: string;
}
/**
 *
 * Renders a connected plot.
 * @param {ConnectedPlotProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
declare function ConnectedPlot(props: ConnectedPlotProps): import("react/jsx-runtime").JSX.Element;
declare namespace ConnectedPlot {
    var defaultProps: ConnectedPlotProps;
}
export default ConnectedPlot;
export type { AppendLineDataMessage, BatonApprovalRequestMessage, BatonMessage, BatonRequestMessage, ClearPlotsMessage, ClearSelectionsMessage, ClientSelectionMessage, ConnectedPlotProps, DataMessage, DecodedMessage, ImageDataMessage, MsgType, MultiLineDataMessage, PlotMessage, ScatterDataMessage, SelectionsMessage, StatusType, SurfaceDataMessage, TableDataMessage, UpdateSelectionsMessage };
//# sourceMappingURL=ConnectedPlot.d.ts.map