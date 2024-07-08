import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import afterFrame from 'afterframe';
import { decode, encode } from 'messagepack';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReadyState, useSocketIO } from 'react-use-websocket';
import { recreateSelection, } from '../specific-selections/utils.js';
import { appendDLineData, calculateMultiXDomain, calculateMultiYDomain, createDAxesParameters, createDImageData, createDLineData, createDScatterData, createDSurfaceData, createDTableData, isHeatmapData, measureInteraction, } from '../utils.js';
import AnyPlot from './AnyPlot.js';
const defaultAxesParameters = {
    xScale: undefined,
    yScale: undefined,
    xLabel: undefined,
    yLabel: undefined,
    xValues: undefined,
    yValues: undefined,
    title: undefined,
};
/**
 *
 * Renders a connected plot.
 * @param {ConnectedPlotProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
function ConnectedPlot(props) {
    const [plotProps, setPlotProps] = useState();
    const [lineData, setLineData] = useState([]);
    const [lineAxes, setLineAxes] = useState(defaultAxesParameters);
    const [selections, setSelections] = useState([]);
    const interactionTime = useRef(0);
    const plotID = props.plot_id;
    const uuid = props.uuid;
    const plotServerURL = `ws://${props.hostname}:${props.port}/plot/${uuid}/${plotID}`;
    console.log('plotserver url', plotServerURL);
    const { sendMessage, lastMessage, readyState, getWebSocket } = useSocketIO(plotServerURL, {
        onOpen: () => {
            console.log(`${plotID}: WebSocket connected`);
        },
        onClose: () => {
            console.log(`${plotID}: WebSocket disconnected`);
        },
        reconnectAttempts: 5,
        reconnectInterval: 10000,
    });
    const send_client_message = useCallback((type, message) => {
        console.log(`${plotID}: sending ${String(message)}`);
        const status = {
            plot_id: plotID,
            type,
            params: message,
            plot_config: {},
        };
        sendMessage(encode(status));
    }, [plotID, sendMessage]);
    const send_status_message = useCallback((message) => {
        send_client_message('status', message);
    }, [send_client_message]);
    const send_baton_request_message = () => {
        send_client_message('baton_request', uuid);
    };
    const approve_baton_request = (uuid) => {
        send_client_message('baton_approval', uuid);
    };
    const [batonProps, setBatonProps] = useState({
        plotID,
        uuid: uuid,
        batonUuid: null,
        others: [],
        hasBaton: false,
        requestBaton: send_baton_request_message,
        approveBaton: approve_baton_request,
    });
    useEffect(() => {
        if (readyState === ReadyState.OPEN) {
            const socket = getWebSocket();
            if (socket && socket.binaryType !== 'arraybuffer') {
                socket.binaryType = 'arraybuffer';
                console.log(`${plotID}: WebSocket set binaryType`);
            }
            send_status_message('ready');
        }
    }, [getWebSocket, plotID, readyState, send_status_message]);
    const clear_all_data = () => {
        clear_line_data();
        console.log(`${plotID}: data cleared`, lineData, lineAxes);
    };
    const clear_line_data = () => {
        setLineData([]);
        setLineAxes(defaultAxesParameters);
        setPlotProps(null);
        setSelections([]);
    };
    useEffect(() => {
        return () => {
            toast(batonProps.hasBaton ? 'Baton lost' : 'Baton gained', {
                toastId: String(batonProps.hasBaton),
                position: 'bottom-center',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
        };
    }, [batonProps.hasBaton]);
    const receive_baton_approval_request = (message) => {
        const Approve = () => {
            const handleClick = () => {
                approve_baton_request(message.requester);
            };
            return (_jsx("div", { children: _jsxs("h3", { children: ["Baton requested from ", message.requester, " ", _jsx("br", {}), _jsx("button", { onClick: handleClick, children: "Approve" })] }) }));
        };
        toast(_jsx(Approve, {}), {
            toastId: message.requester,
            position: 'bottom-center',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    };
    const isNewSelection = useRef(false);
    const updateSelections = (selection, broadcast = true, clear = false) => {
        let id = null;
        if (!selection) {
            if (clear) {
                setSelections([]);
            }
        }
        else {
            id = selection.id;
            if (clear) {
                setSelections((prevSelections) => prevSelections.filter((s) => s.id !== id));
            }
            else {
                setSelections((prevSelections) => {
                    const old = prevSelections.findIndex((s) => s.id === id);
                    isNewSelection.current = old === -1;
                    if (isNewSelection.current) {
                        return [...prevSelections, selection];
                    }
                    const all = [...prevSelections];
                    console.debug('Replacing', all[old], 'with', selection);
                    all[old] = selection;
                    return all;
                });
            }
        }
        if (broadcast) {
            if (clear) {
                send_client_message('clear_selection_data', {
                    selection_ids: id ? [id] : [],
                });
            }
            else {
                send_client_message(isNewSelection.current
                    ? 'client_new_selection'
                    : 'client_update_selection', {
                    axes_parameters: defaultAxesParameters,
                    selection,
                });
            }
        }
    };
    const set_line_data = (multiline_data, line_axes_params) => {
        const xDomain = calculateMultiXDomain(multiline_data);
        const yDomain = calculateMultiYDomain(multiline_data);
        console.log(`${plotID}: setting line state with domains`, xDomain, yDomain);
        const axes_params = line_axes_params ?? lineAxes;
        setLineData(multiline_data);
        setLineAxes(axes_params);
        setPlotProps({
            data: multiline_data,
            xDomain,
            yDomain,
            axesParameters: axes_params,
            addSelection: updateSelections,
            selections,
            batonProps,
        });
    };
    const append_multiline_data = (message) => {
        const newPointsData = message.al_data.map((l) => createDLineData(l));
        console.log(`${plotID}: appending line data`, newPointsData);
        const l = Math.max(lineData.length, newPointsData.length);
        const newLineData = [];
        for (let i = 0; i < l; i++) {
            newLineData.push(appendDLineData(lineData[i], newPointsData[i]));
        }
        set_line_data(newLineData);
    };
    const plot_multiline_data = (message) => {
        const axes_parameters = createDAxesParameters(message.axes_parameters);
        const multilineData = message.ml_data
            .map((l) => createDLineData(l))
            .filter((d) => d !== null);
        console.log(`${plotID}: new line data`, multilineData);
        set_line_data(multilineData, axes_parameters);
    };
    const plot_new_image_data = (message) => {
        const imageData = createDImageData(message.im_data);
        console.log(`${plotID}: new image data`, imageData);
        const imageAxesParams = createDAxesParameters(message.axes_parameters);
        if (isHeatmapData(imageData)) {
            const heatmapData = imageData;
            setPlotProps({
                values: heatmapData.values,
                aspect: heatmapData.aspect,
                domain: heatmapData.domain,
                heatmapScale: heatmapData.heatmap_scale,
                colourMap: heatmapData.colourMap,
                axesParameters: imageAxesParams,
                addSelection: updateSelections,
                selections,
                batonProps,
            });
        }
        else {
            setPlotProps({
                values: imageData.values,
                aspect: imageData.aspect,
                axesParameters: imageAxesParams,
                addSelection: updateSelections,
                selections,
                batonProps,
            });
        }
    };
    const plot_new_scatter_data = (message) => {
        const scatterData = createDScatterData(message.sc_data);
        console.log(`${plotID}: new scatter data`, scatterData);
        const scatterAxesParams = createDAxesParameters(message.axes_parameters);
        setPlotProps({
            xData: scatterData.xData,
            yData: scatterData.yData,
            dataArray: scatterData.dataArray,
            domain: scatterData.domain,
            colourMap: scatterData.colourMap,
            axesParameters: scatterAxesParams,
            addSelection: updateSelections,
            selections,
            batonProps,
        });
    };
    const plot_new_surface_data = (message) => {
        const surfaceData = createDSurfaceData(message.su_data);
        console.log(`${plotID}: new surface data`, surfaceData);
        const surfaceAxesParams = createDAxesParameters(message.axes_parameters);
        setPlotProps({
            values: surfaceData.values,
            domain: surfaceData.domain,
            colourMap: surfaceData.colourMap,
            surfaceScale: surfaceData.surface_scale,
            axesParameters: surfaceAxesParams,
            addSelection: updateSelections,
            selections,
            batonProps,
        });
    };
    const display_new_table_data = (message) => {
        const tableData = createDTableData(message.ta_data);
        console.log(`${plotID}: new table data`, tableData);
        setPlotProps({
            cellWidth: tableData.cellWidth,
            dataArray: tableData.dataArray,
            displayParams: tableData.displayParams,
            addSelection: updateSelections,
            selections: [],
            batonProps,
        });
    };
    const update_selections = (message) => {
        const updated_selections = message.update_selections
            .map((s) => recreateSelection(s))
            .filter((s) => s !== null);
        console.log(`${plotID}: update selections`, updated_selections);
        setSelections((prevSelections) => {
            const ns = [...prevSelections];
            for (const s of updated_selections) {
                const id = s.id;
                const old = ns.findIndex((n) => n.id === id);
                if (old === -1) {
                    ns.push(s);
                }
                else {
                    ns[old] = s;
                }
            }
            return ns;
        });
    };
    const clear_selections = (message) => {
        const ids = message.selection_ids;
        console.log(`${plotID}: clear selections`, ids);
        if (ids.length === 0) {
            setSelections(() => []);
        }
        else {
            setSelections((prevSelections) => {
                const ns = [];
                for (const s of prevSelections) {
                    if (!ids.includes(s.id)) {
                        ns.push(s);
                    }
                }
                return ns;
            });
        }
    };
    const set_selections = (message) => {
        const new_selections = message.set_selections
            .map((s) => recreateSelection(s))
            .filter((s) => s !== null);
        console.log(`${plotID}: new selections`, new_selections);
        setSelections(new_selections);
    };
    const update_baton = (message) => {
        console.log(plotID, ': updating baton with msg: ', message, 'for', uuid);
        const baton = message.baton;
        setBatonProps({
            ...batonProps,
            batonUuid: baton,
            others: message.uuids.filter((u) => u !== uuid),
            hasBaton: baton === uuid,
        });
    };
    const showSelections = useRef(false);
    const updateBaton = useRef(false);
    useEffect(() => {
        if (!lastMessage)
            return;
        if (readyState !== ReadyState.OPEN) {
            console.log(`${plotID}: still not open`);
        }
        if (!lastMessage.payload)
            return;
        // eslint-disable-next-line
        const decoded_message = decode(lastMessage.payload);
        console.log(`${plotID}: decoded_message`, decoded_message, typeof decoded_message);
        const interaction = measureInteraction();
        afterFrame.default(() => {
            interactionTime.current = interaction.end();
        });
        let report = true;
        showSelections.current = true;
        updateBaton.current = false;
        if ('ml_data' in decoded_message) {
            console.log('data type is multiline data');
            plot_multiline_data(decoded_message);
        }
        else if ('al_data' in decoded_message) {
            console.log('data type is new line data to append');
            append_multiline_data(decoded_message);
        }
        else if ('im_data' in decoded_message) {
            console.log('data type is new image data');
            plot_new_image_data(decoded_message);
        }
        else if ('sc_data' in decoded_message) {
            console.log('data type is new scatter data');
            plot_new_scatter_data(decoded_message);
        }
        else if ('su_data' in decoded_message) {
            showSelections.current = false;
            console.log('data type is new surface data');
            plot_new_surface_data(decoded_message);
        }
        else if ('ta_data' in decoded_message) {
            showSelections.current = false;
            console.log('data type is new table data');
            display_new_table_data(decoded_message);
        }
        else if ('update_selections' in decoded_message) {
            update_selections(decoded_message);
        }
        else if ('selection_ids' in decoded_message) {
            clear_selections(decoded_message);
        }
        else if ('set_selections' in decoded_message) {
            set_selections(decoded_message);
        }
        else if ('baton' in decoded_message) {
            update_baton(decoded_message);
            updateBaton.current = true;
        }
        else if ('requester' in decoded_message) {
            receive_baton_approval_request(decoded_message);
        }
        else if ('plot_id' in decoded_message) {
            clear_all_data();
        }
        else {
            report = false;
            console.log(`${plotID}: new message type unknown`);
        }
        if (report) {
            send_status_message(`ready ${interactionTime.current}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastMessage, plotID]);
    if (!readyState || readyState === ReadyState.UNINSTANTIATED) {
        return _jsx("h2", { children: "Waiting for plot server connection" });
    }
    if (readyState === ReadyState.CLOSING) {
        return _jsx("h2", { children: "Closing plot server connection" });
    }
    if (readyState === ReadyState.CLOSED) {
        return _jsx("h2", { children: "Plot server connection closed" });
    }
    if (!plotProps) {
        return _jsx("h2", { children: "Awaiting command from plot server" });
    }
    console.log(`${plotID}: selections`, selections.length);
    let currentProps = plotProps;
    if (updateBaton.current) {
        currentProps = { ...currentProps, batonProps };
    }
    if (showSelections.current) {
        currentProps = { ...currentProps, selections };
    }
    console.log(`${plotID}: plotprops`, plotProps, typeof plotProps);
    console.log(`${plotID}: selections`, selections.length);
    return _jsx(AnyPlot, { ...currentProps });
}
ConnectedPlot.defaultProps = {
    plot_id: 'plot_0',
    hostname: '127.0.0.1',
    port: '8000',
};
export default ConnectedPlot;
//# sourceMappingURL=ConnectedPlot.js.map