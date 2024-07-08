import ndarray from 'ndarray';
import concatRows from 'ndarray-concat-rows';
import cwise from 'cwise';
import { bin } from 'd3-array';
import { scaleLinear } from 'd3-scale';
const nanMinMax = cwise({
    funcName: 'nanMinMax',
    args: ['array'],
    pre: function () {
        this.min = Number.POSITIVE_INFINITY;
        this.max = Number.NEGATIVE_INFINITY;
    },
    body: function (a) {
        if (!Number.isNaN(a)) {
            if (a < this.min) {
                this.min = a;
            }
            if (a > this.max) {
                this.max = a;
            }
        }
    },
    post: function () {
        if (this.min > this.max) {
            throw Error('No valid numbers were compared');
        }
        return [this.min, this.max];
    },
});
function appendDLineData(line, newPoints) {
    if (newPoints === undefined || newPoints === null) {
        if (line === undefined) {
            throw Error('Cannot call with both arguments falsy');
        }
        return line;
    }
    if (line === undefined) {
        return newPoints;
    }
    let x;
    const xLength = newPoints.x.size;
    const yLength = newPoints.y.size;
    if (xLength === yLength || xLength === yLength + 1) {
        // second clause for histogram edge values
        x = concatRows([line.x, newPoints.x]);
    }
    else {
        console.log(`x ({$xLength}) and y ({$yLength}) axes must be same length`, newPoints);
        return line;
    }
    const y = concatRows([line.y, newPoints.y]);
    const dx = nanMinMax(x);
    const dy = [
        Math.min(line.dy[0], newPoints.dy[0]),
        Math.max(line.dy[1], newPoints.dy[1]),
    ];
    return {
        colour: line.colour,
        x: x,
        dx: dx,
        y: y,
        dy: dy,
        line_on: line.line_on,
        point_size: line.point_size,
        default_indices: line.default_indices,
    };
}
function calculateMultiXDomain(multilineData) {
    console.log('calculating multi x domain ', multilineData);
    const mins = multilineData.map((l) => l.dx[0]);
    const maxs = multilineData.map((l) => l.dx[1]);
    if (mins.length == 1) {
        return [mins[0], maxs[0]];
    }
    return [Math.min(...mins), Math.max(...maxs)];
}
function calculateMultiYDomain(multilineData) {
    console.log('calculating multi y domain ', multilineData);
    const mins = multilineData.map((l) => l.dy[0]);
    const maxs = multilineData.map((l) => l.dy[1]);
    if (mins.length == 1) {
        return [mins[0], maxs[0]];
    }
    return [Math.min(...mins), Math.max(...maxs)];
}
function createDImageData(data) {
    const ii = data.values;
    const i = createNdArray(ii);
    if (isHeatmapData(data)) {
        const hmData = data;
        return {
            key: hmData.key,
            values: i[0],
            aspect: hmData.aspect ?? undefined,
            domain: hmData.domain,
            heatmap_scale: hmData.heatmap_scale,
            colourMap: hmData.colourMap,
        };
    }
    else {
        return {
            key: data.key,
            values: i[0],
            aspect: data.aspect ?? undefined,
        };
    }
}
function createDSurfaceData(data) {
    const ii = data.values;
    const i = createNdArray(ii);
    const suData = data;
    return {
        key: suData.key,
        values: i[0],
        domain: suData.domain,
        surface_scale: suData.surface_scale,
        colourMap: suData.colourMap,
    };
}
function createDTableData(data) {
    const ii = data.dataArray;
    const i = createNdArray(ii);
    return {
        key: data.key,
        dataArray: i[0],
        cellWidth: data.cellWidth,
        displayParams: data.displayParams,
    };
}
function createDAxesParameters(data) {
    let x = undefined;
    let y = undefined;
    if (data.x_values != undefined) {
        const xArray = createNdArray(data.x_values);
        x = xArray[0];
    }
    if (data.y_values != undefined) {
        const yArray = createNdArray(data.y_values);
        y = yArray[0];
    }
    return {
        xLabel: data.x_label,
        yLabel: data.y_label,
        xScale: data.x_scale,
        yScale: data.y_scale,
        title: data.title,
        xValues: x,
        yValues: y,
    };
}
function createDLineData(data) {
    const xi = data.x;
    const x = createNdArray(xi, true);
    const yi = data.y;
    const y = createNdArray(yi, true);
    if (y[0].size == 0) {
        return null;
    }
    return {
        key: data.key,
        colour: data.colour,
        x: x[0],
        dx: x[1],
        y: y[0],
        dy: y[1],
        line_on: data.line_on,
        point_size: data.point_size,
    };
}
function createDScatterData(data) {
    const ii = data.dataArray;
    const i = createNdArray(ii);
    const xi = data.xData;
    const x = createNdArray(xi);
    const yi = data.yData;
    const y = createNdArray(yi);
    return {
        key: data.key,
        xData: x[0],
        yData: y[0],
        dataArray: i[0],
        domain: data.domain,
        colourMap: data.colourMap,
    };
}
function createNdArray(a, minmax = false) {
    if (a.shape.length === 0 || a.shape[0] === 0) {
        return [ndarray(new Int8Array()), [0, 0]];
    }
    const dtype = a.dtype;
    if (dtype === '<i8' || dtype === '<u8') {
        if (!minmax) {
            const ba = dtype === '<i8'
                ? new BigInt64Array(a.data)
                : new BigUint64Array(a.data);
            const f = new Float64Array(ba);
            return [ndarray(f, a.shape), [0, 0]];
        }
        const limit = BigInt(2) ** BigInt(64);
        const mb = [limit, -limit];
        const minMax = function (e) {
            if (e < mb[0]) {
                mb[0] = e;
            }
            if (e > mb[1]) {
                mb[1] = e;
            }
        };
        let ba;
        if (dtype === '<i8') {
            const bi = new BigInt64Array(a.data);
            bi.forEach(minMax);
            ba = bi;
        }
        else {
            const bu = new BigUint64Array(a.data);
            bu.forEach(minMax);
            ba = bu;
        }
        const ptp = mb[1] - mb[0];
        if (mb[0] < -limit || mb[1] > limit) {
            throw Error('Extrema of 64-bit integer array are too large to represent as float 64');
        }
        if (ptp > Number.MAX_SAFE_INTEGER) {
            console.warn('64-bit integer array has range too wide to preserve precision');
        }
        const f = new Float64Array(ba);
        return [
            ndarray(f, a.shape),
            [Number(mb[0]), Number(mb[1])],
        ];
    }
    let b;
    switch (dtype) {
        case '|i1':
            b = new Int8Array(a.data);
            break;
        case '<i2':
            b = new Int16Array(a.data);
            break;
        case '<i4':
            b = new Int32Array(a.data);
            break;
        case '|u1':
            b = new Uint8Array(a.data);
            break;
        case '<u2':
            b = new Uint16Array(a.data);
            break;
        case '<u4':
            b = new Uint32Array(a.data);
            break;
        case '<f4':
            b = new Float32Array(a.data);
            break;
        default:
        case '<f8':
            b = new Float64Array(a.data);
            break;
    }
    const nd = ndarray(b, a.shape);
    return [nd, minmax ? nanMinMax(nd) : [0, 0]];
}
function isHeatmapData(obj) {
    return 'domain' in obj && 'heatmap_scale' in obj;
}
function getAspectType(aspect) {
    if (aspect === 'equal' || aspect === 'auto') {
        return aspect;
    }
    return 'number';
}
function isNumber(value) {
    const n = parseFloat(value);
    return [Number.isFinite(n), n];
}
function isValidNumber(value, lower, // inclusive, >=
upper, // exclusive <
upperInclusive) {
    const n = parseFloat(value);
    return [
        Number.isFinite(n) &&
            n >= lower &&
            (upperInclusive ? n <= upper : n < upper),
        n,
    ];
}
function isValidPositiveNumber(value, upper, // exclusive <
upperInclusive) {
    const n = parseFloat(value);
    return [
        Number.isFinite(n) && n > 0 && (upperInclusive ? n <= upper : n < upper),
        n,
    ];
}
function createInteractionsConfig(mode) {
    const isPan = mode === InteractionModeType.panAndWheelZoom;
    const isZoom = mode === InteractionModeType.selectToZoom;
    return {
        pan: isPan ? {} : false,
        zoom: isPan ? {} : false,
        xAxisZoom: isPan ? {} : false,
        yAxisZoom: isPan ? {} : false,
        selectToZoom: isZoom ? { modifierKey: [] } : false,
        xSelectToZoom: isZoom
            ? { modifierKey: 'Alt' }
            : false,
        ySelectToZoom: isZoom
            ? { modifierKey: 'Shift' }
            : false,
    };
}
function createHistogramParams(values, domain, colourMap, invertColourMap) {
    if (values && values.length != 0) {
        const localBin = bin();
        const localScale = domain === undefined ? null : scaleLinear().domain(domain).nice();
        const maxEdges = values.length;
        let localEdges = null;
        if (localScale !== null && maxEdges > 0) {
            localEdges = localScale.ticks(Math.min(maxEdges, 20));
            localBin.thresholds(localEdges);
        }
        const hist = localBin(values);
        const lengths = hist.map((b) => b.length);
        let edges;
        if (localEdges === null) {
            const nEdges = hist.map((b) => b.x0);
            nEdges.push(hist[hist.length - 1].x1);
            edges = nEdges.filter((e) => {
                return e !== undefined;
            });
            if (edges.length === 0 && lengths.length === 1) {
                lengths.pop();
            }
        }
        else {
            edges = localEdges;
        }
        return {
            values: lengths,
            bins: edges,
            colourMap: colourMap,
            invertColourMap: invertColourMap,
        };
    }
    return undefined;
}
function measureInteraction() {
    const startTimestamp = performance.now();
    return {
        end() {
            const time = performance.now() - startTimestamp;
            console.log(`The interaction took ${time}ms`);
            return time;
        },
    };
}
var InteractionModeType;
(function (InteractionModeType) {
    InteractionModeType["panAndWheelZoom"] = "panAndWheelZoom";
    InteractionModeType["selectToZoom"] = "selectToZoom";
    InteractionModeType["selectRegion"] = "selectRegion";
})(InteractionModeType || (InteractionModeType = {}));
export { appendDLineData, calculateMultiXDomain, calculateMultiYDomain, createDAxesParameters, createDLineData, createDImageData, createDScatterData, createDSurfaceData, createDTableData, createHistogramParams, createInteractionsConfig, getAspectType, InteractionModeType, isHeatmapData, isNumber, isValidNumber, isValidPositiveNumber, measureInteraction, nanMinMax, };
//# sourceMappingURL=utils.js.map