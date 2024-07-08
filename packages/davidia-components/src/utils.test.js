import ndarray from 'ndarray';
import { randomLcg, randomNormal, randomUniform } from 'd3-random';
import { appendDLineData, calculateMultiXDomain, calculateMultiYDomain, createDAxesParameters, createDImageData, createDLineData, createDScatterData, createDTableData, createHistogramParams, isHeatmapData, isValidPositiveNumber, nanMinMax, } from './utils.js';
import { describe, expect, it, test } from 'vitest';
function isNumberArray(arr) {
    if (Array.isArray(arr) &&
        arr.length > 0 &&
        arr.every((value) => {
            return typeof value === 'number';
        })) {
        return true;
    }
    return false;
}
function compare_arrays(result, expected) {
    expect(result.length).toEqual(expected.length);
    result
        .map((r, i) => [r, expected[i]])
        .forEach((p) => expect(p[0]).toBeCloseTo(p[1], 8));
}
function compare_objects(result, expected) {
    const keys = Object.keys(result);
    for (const k of keys) {
        const e = expected[k];
        const r = result[k];
        if (isNumberArray(e)) {
            compare_arrays(e, r);
        }
        else {
            expect(r).toStrictEqual(e);
        }
    }
}
describe('checks isHeatmapData', () => {
    it.each([
        [
            {
                key: 'A',
                values: ndarray(new Int8Array()),
                domain: [-3, 8],
                heatmap_scale: 'linear',
            },
            true,
        ],
        [{ key: 'B', values: ndarray(new Int8Array()), domain: [4, 12] }, false],
        [
            { key: 'C', values: ndarray(new Int8Array()), heatmap_scale: 'linear' },
            false,
        ],
        [{ key: 'D', values: ndarray(new Int8Array()) }, false],
    ])('calls isHeatmapData on %p expecting %p', (data, expected) => {
        expect(isHeatmapData(data)).toBe(expected);
    });
});
describe('checks nanMinMax', () => {
    it.each([
        [ndarray(new Int8Array([2, 4])), [2, 4]],
        [ndarray(new Int8Array([-4, 6, 12])), [-4, 12]],
        [ndarray(new Int8Array([-3, -3, -3, -3])), [-3, -3]],
        [ndarray(new Float32Array([NaN, 12, NaN, NaN])), [12, 12]],
        [ndarray(new Float32Array([-7, NaN, 0])), [-7, 0]],
    ])('calls nanMinMax on %p expecting %p', (arr, expected) => {
        expect(nanMinMax(arr)).toStrictEqual(expected);
    });
    it('should throw if no valid numbers in array', () => {
        const errRegex = /No valid numbers were compared/;
        expect(() => nanMinMax(ndarray(new Float32Array([NaN, NaN, NaN])))).toThrow(errRegex);
        expect(() => nanMinMax(ndarray(new Int8Array([])))).toThrow(errRegex);
    });
});
describe('checks createDTableData', () => {
    const a = {
        nd: true,
        dtype: '<u2',
        shape: [2, 3],
        data: new Uint16Array([10, 20, 30, 40, 50, 60]).buffer,
    };
    const b = ndarray(new Uint16Array([10, 20, 30, 40, 50, 60]), [2, 3]);
    it.each([
        [
            { key: 'A', dataArray: a, cellWidth: 4.5 },
            {
                key: 'A',
                dataArray: b,
                cellWidth: 4.5,
                displayParams: undefined,
            },
        ],
        [
            {
                key: 'B',
                dataArray: a,
                cellWidth: 5,
                displayParams: undefined,
            },
            {
                key: 'B',
                dataArray: b,
                cellWidth: 5,
                displayParams: undefined,
            },
        ],
        [
            {
                key: 'C',
                dataArray: a,
                cellWidth: 5,
                displayParams: { displayType: 'scientific' },
            },
            {
                key: 'C',
                dataArray: b,
                cellWidth: 5,
                displayParams: { displayType: 'scientific' },
            },
        ],
        [
            {
                key: 'D',
                dataArray: a,
                cellWidth: 5,
                displayParams: { displayType: 'scientific', numberDigits: undefined },
            },
            {
                key: 'D',
                dataArray: b,
                cellWidth: 5,
                displayParams: { displayType: 'scientific', numberDigits: undefined },
            },
        ],
        [
            {
                key: 'E',
                dataArray: a,
                cellWidth: 5,
                displayParams: { displayType: 'standard', numberDigits: 6 },
            },
            {
                key: 'E',
                dataArray: b,
                cellWidth: 5,
                displayParams: { displayType: 'standard', numberDigits: 6 },
            },
        ],
        [
            {
                key: 'F',
                dataArray: {
                    nd: true,
                    dtype: '<f4',
                    shape: [3, 2],
                    data: new Float32Array([-2.8, 14.1, -76, 0, 1, 12]).buffer,
                },
                cellWidth: 5,
            },
            {
                key: 'F',
                dataArray: ndarray(new Float32Array([-2.8, 14.1, -76, 0, 1, 12]), [3, 2]),
                cellWidth: 5,
                displayParams: undefined,
            },
        ],
        [
            {
                key: 'G',
                dataArray: {
                    nd: false,
                    dtype: '<f4',
                    shape: [3],
                    data: new Float32Array([-2.8, 14.1, -76]).buffer,
                },
                cellWidth: 5,
            },
            {
                key: 'G',
                dataArray: ndarray(new Float32Array([-2.8, 14.1, -76]), [3]),
                cellWidth: 5,
                displayParams: undefined,
            },
        ],
        [
            {
                key: 'H',
                dataArray: {
                    nd: true,
                    dtype: '<f4',
                    shape: [0],
                    data: new Float32Array([]).buffer,
                },
                cellWidth: 5,
            },
            {
                key: 'H',
                dataArray: ndarray(new Int8Array()),
                cellWidth: 5,
                displayParams: undefined,
            },
        ],
    ])('calls createDTableData on %p expecting %p', (data, expected) => {
        expect(createDTableData(data)).toStrictEqual(expected);
    });
});
describe('checks createDScatterData', () => {
    const a = {
        nd: true,
        dtype: '|i1',
        shape: [3],
        data: new Int8Array([-4, -2, 0]).buffer,
    };
    const b = {
        nd: true,
        dtype: '|i1',
        shape: [3],
        data: new Int8Array([4, 8, 12]).buffer,
    };
    const c = {
        nd: true,
        dtype: '<f4',
        shape: [3],
        data: new Float32Array([120, 19.1, -4.7]).buffer,
    };
    const d = ndarray(new Int8Array([-4, -2, 0]), [3]);
    const e = ndarray(new Int8Array([4, 8, 12]), [3]);
    const f = ndarray(new Float32Array([120, 19.1, -4.7]), [3]);
    it.each([
        [
            {
                key: 'A',
                colourMap: undefined,
                xData: a,
                yData: b,
                dataArray: c,
                domain: [-4.7, 120],
            },
            {
                key: 'A',
                colourMap: undefined,
                xData: d,
                yData: e,
                dataArray: f,
                domain: [-4.7, 120],
            },
        ],
    ])('calls createDScatterData on %p expecting %p', (data, expected) => {
        expect(createDScatterData(data)).toStrictEqual(expected);
    });
});
describe('checks createDImageData', () => {
    it.each([
        [
            {
                aspect: 'equal',
                key: 'A',
                values: {
                    nd: true,
                    dtype: '<u2',
                    shape: [3, 2],
                    data: new Uint16Array([10, 20, 30, 40, 50, 60]).buffer,
                },
            },
            {
                aspect: 'equal',
                key: 'A',
                values: ndarray(new Uint16Array([10, 20, 30, 40, 50, 60]), [3, 2]),
            },
        ],
        [
            {
                colourMap: 'Viridis',
                key: 'B',
                values: {
                    nd: true,
                    dtype: '<u2',
                    shape: [3, 2],
                    data: new Uint16Array([10, 20, 30, 40, 50, 60]).buffer,
                },
                domain: [10, 60],
                heatmap_scale: 'log',
            },
            {
                aspect: undefined,
                colourMap: 'Viridis',
                key: 'B',
                values: ndarray(new Uint16Array([10, 20, 30, 40, 50, 60]), [3, 2]),
                domain: [10, 60],
                heatmap_scale: 'log',
            },
        ],
    ])('calls createDImageData on %p expecting %p', (data, expected) => {
        expect(createDImageData(data)).toStrictEqual(expected);
    });
});
describe('checks createDLineData', () => {
    const a = {
        nd: true,
        dtype: '<u2',
        shape: [3, 2],
        data: new Uint16Array([10, 20, 30, 40, 50, 60]).buffer,
    };
    const b = {
        nd: true,
        dtype: '<f4',
        shape: [3, 2],
        data: new Float32Array([120, 19.1, -4, 0, 12, 5]).buffer,
    };
    const c = {
        nd: true,
        dtype: '<f4',
        shape: [0],
        data: new Float32Array([]).buffer,
    };
    const d = ndarray(new Uint16Array([10, 20, 30, 40, 50, 60]), [3, 2]);
    const e = ndarray(new Float32Array([120, 19.1, -4, 0, 12, 5]), [3, 2]);
    it.each([
        [
            {
                key: 'A',
                colour: 'red',
                x: a,
                y: b,
                line_on: false,
                point_size: 6,
            },
            {
                key: 'A',
                colour: 'red',
                x: d,
                dx: [10, 60],
                y: e,
                dy: [-4, 120],
                line_on: false,
                point_size: 6,
            },
        ],
        [
            {
                key: 'B',
                colour: 'red',
                x: {
                    nd: true,
                    dtype: '<u2',
                    shape: [0],
                    data: new Uint16Array([]).buffer,
                },
                y: a,
                line_on: false,
                point_size: 6,
            },
            {
                key: 'B',
                colour: 'red',
                x: ndarray(new Int8Array(), [0]),
                dx: [0, 0],
                y: d,
                dy: [10, 60],
                line_on: false,
                point_size: 6,
            },
        ],
    ])('calls createDLineData on %p expecting %p', (data, expected) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const result = createDLineData(data);
        compare_objects(result, expected);
    });
    test('calls createDLineData expecting null', () => {
        const data = {
            key: 'B',
            colour: 'red',
            x: a,
            y: c,
            line_on: false,
            point_size: 6,
        };
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const result = createDLineData(data);
        expect(result).toBe(null);
    });
});
describe('checks createDAxesParameters', () => {
    const a = {
        nd: true,
        dtype: '<u2',
        shape: [6, 1],
        data: new Uint16Array([10, 20, 30, 40, 50, 60]).buffer,
    };
    const b = {
        nd: true,
        dtype: '<f4',
        shape: [6, 1],
        data: new Float32Array([120, 19.1, -4, 0, 12, 5]).buffer,
    };
    const c = {
        nd: true,
        dtype: '<f4',
        shape: [0],
        data: new Float32Array([]).buffer,
    };
    const d = ndarray(new Uint16Array([10, 20, 30, 40, 50, 60]), [6, 1]);
    const e = ndarray(new Float32Array([120, 19.1, -4, 0, 12, 5]), [6, 1]);
    it.each([
        [
            {
                x_label: 'x axis',
                y_label: 'y axis',
                x_scale: 'linear',
                y_scale: 'log',
                x_values: a,
                y_values: b,
                title: 'plot A',
            },
            {
                xLabel: 'x axis',
                yLabel: 'y axis',
                xScale: 'linear',
                yScale: 'log',
                xValues: d,
                yValues: e,
                title: 'plot A',
            },
        ],
        [
            {
                x_label: 'x axis',
                y_label: 'y axis',
                x_scale: 'linear',
                y_scale: 'log',
                x_values: c,
                y_values: b,
                title: 'plot B',
            },
            {
                xLabel: 'x axis',
                yLabel: 'y axis',
                xScale: 'linear',
                yScale: 'log',
                xValues: ndarray(new Int8Array()),
                yValues: e,
                title: 'plot B',
            },
        ],
        [
            {
                y_label: 'y axis',
                x_scale: 'linear',
                y_values: b,
            },
            {
                xLabel: undefined,
                yLabel: 'y axis',
                xScale: 'linear',
                yScale: undefined,
                xValues: undefined,
                yValues: e,
                title: undefined,
            },
        ],
        [
            {
                x_label: 'x axis',
                y_label: undefined,
                x_values: a,
                y_values: b,
                title: 'plot D',
            },
            {
                xLabel: 'x axis',
                yLabel: undefined,
                xScale: undefined,
                yScale: undefined,
                xValues: d,
                yValues: e,
                title: 'plot D',
            },
        ],
        [
            {},
            {
                xLabel: undefined,
                yLabel: undefined,
                xScale: undefined,
                yScale: undefined,
                xValues: undefined,
                yValues: undefined,
                title: undefined,
            },
        ],
    ])('calls createDAxesParameters on %p expecting %p', (data, expected) => {
        const result = createDAxesParameters(data);
        compare_objects(result, expected);
    });
});
describe('checks calculateMultiXDomain', () => {
    const a = {
        key: 'A',
        x: ndarray(new Uint16Array([10, 20, 30, 40, 50, 60])),
        dx: [10, 60],
        y: ndarray(new Float32Array([120, 19.1, -4, 0, 12, 5])),
        dy: [-4, 120],
        line_on: false,
    };
    const b = {
        key: 'B',
        x: ndarray(new Uint16Array([0, 0, 0, 0, 0, 0])),
        dx: [0, 0],
        y: ndarray(new Float32Array([120, 19.1, -4, 0, 12, 5])),
        dy: [-4, 120],
        line_on: false,
    };
    it.each([
        [[a, a, a], [10, 60]],
        [[b, b, b], [0, 0]],
        [[b, a, b], [0, 60]],
    ])('calls calculateMultiXDomain on %p expecting %p', (data, expected) => {
        const result = calculateMultiXDomain(data);
        compare_arrays(result, expected);
    });
});
describe('checks calculateMultiYDomain', () => {
    const a = {
        key: 'A',
        x: ndarray(new Uint16Array([10, 20, 30, 40, 50, 60])),
        dx: [10, 60],
        y: ndarray(new Float32Array([120, 19.1, -4, 0, 12, 5])),
        dy: [-4, 120],
        line_on: false,
    };
    const b = {
        key: 'B',
        x: ndarray(new Uint16Array([0, 0, 0, 0, 0, 0])),
        dx: [0, 0],
        y: ndarray(new Uint16Array([0, 0, 0, 0, 0, 0])),
        dy: [0, 0],
        line_on: false,
    };
    it.each([
        [[a, a, a], [-4, 120]],
        [[b, b, b], [0, 0]],
        [[b, a, b], [-4, 120]],
    ])('calls calculateMultiYDomain on %p expecting %p', (data, expected) => {
        const result = calculateMultiYDomain(data);
        compare_arrays(result, expected);
    });
});
describe('checks appendDLineData', () => {
    const lineA = {
        key: 'A',
        colour: 'red',
        x: ndarray(new Uint32Array([0, 1, 2, 3, 4, 5])),
        dx: [0, 5],
        y: ndarray(new Float64Array([120, 19.1, -4, 0, 12, 5])),
        dy: [-4, 120],
        line_on: true,
        default_indices: true,
    };
    const lineB = {
        key: 'B',
        colour: 'blue',
        x: ndarray(new Int8Array([14, 15, 16, 17, 18, 19])),
        dx: [14, 19],
        y: ndarray(new Float32Array([150, 0, -43, -40, 0, 70])),
        dy: [-43, 150],
        line_on: false,
        default_indices: false,
    };
    const lineB_wrong_length = {
        key: 'B',
        colour: 'green',
        x: ndarray(new Int8Array([14, 15, 16])),
        dx: [14, 19],
        y: ndarray(new Float32Array([150, 0, -43, -40, 0, 70])),
        dy: [-43, 150],
        line_on: false,
        default_indices: true,
    };
    const lineC = {
        key: 'A',
        colour: 'red',
        x: ndarray(new Float64Array([0, 1, 2, 3, 4, 5, 14, 15, 16, 17, 18, 19])),
        dx: [0, 19],
        y: ndarray(new Float64Array([120, 19.1, -4, 0, 12, 5, 150, 0, -43, -40, 0, 70])),
        dy: [-43, 150],
        line_on: true,
        point_size: undefined,
        default_indices: true,
    };
    it.each([
        [lineA, lineB, lineC],
        [undefined, lineB, lineB],
        [lineA, null, lineA],
        [lineA, undefined, lineA],
        [lineA, lineB_wrong_length, lineA],
    ])('calls appendDLineData on %p and %p expecting %p', (line, newPoints, expected) => {
        const result = appendDLineData(line, newPoints);
        compare_objects(result, expected);
    });
});
describe('checks isValidPositiveNumber', () => {
    it.each([
        ['3.2', 10, false, true, 3.2],
        ['-3.5', 10, false, false, -3.5],
        ['13.8', 10, false, false, 13.8],
        ['3.2e12', 1e13, false, true, 3.2e12],
        ['hello', 10, false, false, Number.NaN],
        ['10', 10, false, false, 10],
        ['10', 10, true, true, 10],
        ['10', 10, undefined, false, 10],
        ['3.2', 10, true, true, 3.2],
        ['-3.5', 10, true, false, -3.5],
        ['13.8', 10, true, false, 13.8],
        ['3.2e12', 1e13, true, true, 3.2e12],
        ['hello', 10, true, false, Number.NaN],
    ])('calls isValidPositiveNumber', (t, u, inclusive, eb, ev) => {
        const r = isValidPositiveNumber(t, u, inclusive);
        expect(r[0]).toStrictEqual(eb);
        expect(r[1]).toStrictEqual(ev);
    });
});
describe('checks createHistogramParams', () => {
    const random0 = randomNormal.source(randomLcg(0.83750164))(9, 1.4);
    const random1 = randomNormal.source(randomLcg(0.52523564))(6, 2.1);
    const random2 = randomUniform.source(randomLcg(0.26834955))(-20, 60);
    const random3 = randomUniform.source(randomLcg(0.143241789))(-5, -4);
    const normalArr0 = Float32Array.from({ length: 40 }, () => random0() * 40);
    const normalArr1 = Float32Array.from({ length: 40 }, () => random1() * 12);
    const uniformArr0 = Float32Array.from({ length: 65 }, () => random2() * 65);
    const uniformArr1 = Float32Array.from({ length: 65 }, () => random3() * 65);
    it.each([
        [
            new Uint8Array([4, 4, 4, 7, 10, 12]),
            undefined,
            {
                values: [3, 1, 0, 1, 1],
                bins: [4, 6, 8, 10, 12, 14],
                colourMap: undefined,
                invertColourMap: undefined,
            },
        ],
        [
            new Uint16Array([0, 0, 0, 0, 8000, 12]),
            undefined,
            {
                values: [5, 0, 0, 0, 1],
                bins: [0, 2000, 4000, 6000, 8000, 10000],
                colourMap: undefined,
                invertColourMap: undefined,
            },
        ],
        [
            new Float32Array([-12.2, -6, 14, 70, 8000, -50]),
            undefined,
            {
                values: [3, 2, 0, 0, 0, 1],
                bins: [-2000, 0, 2000, 4000, 6000, 8000, 10000],
                colourMap: undefined,
                invertColourMap: undefined,
            },
        ],
        [
            normalArr0,
            [200, 500],
            {
                values: [1, 0, 0, 1, 3, 6, 3, 4, 6, 5, 3, 2, 5, 1, 0, 0],
                bins: [
                    200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460,
                    480, 500,
                ],
                colourMap: undefined,
                invertColourMap: undefined,
            },
        ],
        [
            normalArr1,
            [20, 120],
            {
                values: [2, 1, 1, 2, 3, 4, 1, 0, 3, 2, 4, 3, 3, 1, 1, 2, 3, 1, 2, 1, 0],
                bins: [
                    20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
                    105, 110, 115, 120,
                ],
                colourMap: undefined,
                invertColourMap: undefined,
            },
        ],
        [new Uint16Array([]), undefined, undefined],
        [undefined, undefined, undefined],
        [
            uniformArr0,
            [-1500, 4000],
            {
                values: [
                    1, 2, 2, 2, 5, 1, 2, 3, 1, 1, 4, 6, 2, 1, 3, 7, 2, 1, 3, 2, 3, 1, 4,
                    1, 0, 3, 2,
                ],
                bins: [
                    -1400, -1200, -1000, -800, -600, -400, -200, 0, 200, 400, 600, 800,
                    1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000,
                    3200, 3400, 3600, 3800, 4000,
                ],
                colourMap: undefined,
                invertColourMap: undefined,
            },
        ],
        [
            uniformArr1,
            [-330, -260],
            {
                values: [6, 4, 3, 8, 7, 1, 6, 3, 6, 4, 8, 6, 3],
                bins: [
                    -330, -325, -320, -315, -310, -305, -300, -295, -290, -285, -280,
                    -275, -270, -265, -260,
                ],
                colourMap: undefined,
                invertColourMap: undefined,
            },
        ],
    ])('calls createHistogramParams', (values, domain, expected) => {
        const r = createHistogramParams(values, domain, undefined, undefined);
        if (expected !== undefined && r !== undefined) {
            let diff = expected.values.length - r.values.length;
            if (diff > 0) {
                const nv = [...r.values];
                while (diff-- > 0) {
                    nv.push(0);
                }
                r.values = nv;
            }
        }
        expect(r).toStrictEqual(expected);
    });
});
//# sourceMappingURL=utils.test.js.map