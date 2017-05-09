/// <reference types="long" />
export declare const SHORT_MIN = -32768;
export declare const SHORT_MAX = 32768;
export declare function intBitsToFloat(bits: number): number;
export declare function floatToIntBits(bits: number): number;
import * as Long from 'long';
export declare function longBitsToDouble(bits: Long): number;
export declare function doubleToLongBits(double: number): Long;
