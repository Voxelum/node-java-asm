"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let int8 = new Int8Array(4);
let int32 = new Int32Array(int8.buffer, 0, 1);
let float32 = new Float32Array(int8.buffer, 0, 1);
exports.SHORT_MIN = -32768;
exports.SHORT_MAX = 32768;
function intBitsToFloat(bits) {
    int32[0] = bits;
    return float32[0];
}
exports.intBitsToFloat = intBitsToFloat;
function floatToIntBits(bits) {
    float32[0] = bits;
    return int32[0];
}
exports.floatToIntBits = floatToIntBits;
let int16 = new Int16Array(4);
let int64 = new Int32Array(int16.buffer, 0, 2);
let float64 = new Float64Array(int16.buffer, 0, 1);
const Long = require("long");
function longBitsToDouble(bits) {
    int64[0] = bits.high;
    int64[1] = bits.low;
    return float64[0];
}
exports.longBitsToDouble = longBitsToDouble;
function doubleToLongBits(double) {
    float64[0] = double;
    return new Long(int64[1], int64[0]);
}
exports.doubleToLongBits = doubleToLongBits;
