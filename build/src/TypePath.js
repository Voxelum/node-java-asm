"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * The path to a type argument, wildcard bound, array element type, or static
 * inner type within an enclosing type.
 *
 * @author Eric Bruneton
 */
const ByteVector_1 = require("./ByteVector");
class TypePath {
    /**
     * Creates a new type path.
     *
     * @param b
     * the byte array containing the type path in Java class file
     * format.
     * @param offset
     * the offset of the first byte of the type path in 'b'.
     */
    constructor(b, offset) {
        this.offset = 0;
        this.buf = b;
        this.offset = offset;
    }
    /**
     * Returns the length of this path.
     *
     * @return the length of this path.
     */
    getLength() {
        return this.buf[this.offset];
    }
    /**
     * Returns the value of the given step of this path.
     *
     * @param index
     * an index between 0 and {@link #getLength()}, exclusive.
     * @return {@link #ARRAY_ELEMENT ARRAY_ELEMENT}, {@link #INNER_TYPE
     * INNER_TYPE}, {@link #WILDCARD_BOUND WILDCARD_BOUND}, or
     * {@link #TYPE_ARGUMENT TYPE_ARGUMENT}.
     */
    getStep(index) {
        return this.buf[this.offset + 2 * index + 1];
    }
    /**
     * Returns the index of the type argument that the given step is stepping
     * into. This method should only be used for steps whose value is
     * {@link #TYPE_ARGUMENT TYPE_ARGUMENT}.
     *
     * @param index
     * an index between 0 and {@link #getLength()}, exclusive.
     * @return the index of the type argument that the given step is stepping
     * into.
     */
    getStepArgument(index) {
        return this.buf[this.offset + 2 * index + 2];
    }
    /**
     * Converts a type path in string form, in the format used by
     * {@link #toString()}, into a TypePath object.
     *
     * @param typePath
     * a type path in string form, in the format used by
     * {@link #toString()}. May be null or empty.
     * @return the corresponding TypePath object, or null if the path is empty.
     */
    static fromString(typePath) {
        if (typePath == null || typePath.length === 0) {
            return null;
        }
        let n = typePath.length;
        let out = new ByteVector_1.ByteVector(n);
        out.putByte(0);
        for (let i = 0; i < n;) {
            let c = typePath.charAt(i++);
            if (c === '[') {
                out.put11(TypePath.ARRAY_ELEMENT, 0);
            }
            else if (c === '.') {
                out.put11(TypePath.INNER_TYPE, 0);
            }
            else if (c === '*') {
                out.put11(TypePath.WILDCARD_BOUND, 0);
            }
            else if ((c).charCodeAt(0) >= ('0').charCodeAt(0) && (c).charCodeAt(0) <= ('9').charCodeAt(0)) {
                let typeArg = (c).charCodeAt(0) - ('0').charCodeAt(0);
                while ((i < n && ((c = typePath.charAt(i))).charCodeAt(0) >= ('0').charCodeAt(0) && (c).charCodeAt(0) <= ('9').charCodeAt(0))) {
                    typeArg = typeArg * 10 + (c).charCodeAt(0) - ('0').charCodeAt(0);
                    i += 1;
                }
                ;
                if (i < n && typePath.charAt(i) === ';') {
                    i += 1;
                }
                out.put11(TypePath.TYPE_ARGUMENT, typeArg);
            }
        }
        out.data[0] = (((out.length / 2 | 0)) | 0);
        return new TypePath(out.data, 0);
    }
    /**
     * Returns a string representation of this type path. {@link #ARRAY_ELEMENT
     * ARRAY_ELEMENT} steps are represented with '[', {@link #INNER_TYPE
     * INNER_TYPE} steps with '.', {@link #WILDCARD_BOUND WILDCARD_BOUND} steps
     * with '*' and {@link #TYPE_ARGUMENT TYPE_ARGUMENT} steps with their type
     * argument index in decimal form followed by ';'.
     */
    toString() {
        let length = this.getLength();
        let result;
        for (let i = 0; i < length; ++i) {
            switch ((this.getStep(i))) {
                case TypePath.ARRAY_ELEMENT:
                    result += '[';
                    break;
                case TypePath.INNER_TYPE:
                    result += '.';
                    break;
                case TypePath.WILDCARD_BOUND:
                    result += '*';
                    break;
                case TypePath.TYPE_ARGUMENT:
                    result += this.getStepArgument(i) + (';');
                    break;
                default:
                    result += ('_');
            }
        }
        return result.toString();
    }
}
/**
 * A type path step that steps into the element type of an array type. See
 * {@link #getStep getStep}.
 */
TypePath.ARRAY_ELEMENT = 0;
/**
 * A type path step that steps into the nested type of a class type. See
 * {@link #getStep getStep}.
 */
TypePath.INNER_TYPE = 1;
/**
 * A type path step that steps into the bound of a wildcard type. See
 * {@link #getStep getStep}.
 */
TypePath.WILDCARD_BOUND = 2;
/**
 * A type path step that steps into a type argument of a generic type. See
 * {@link #getStep getStep}.
 */
TypePath.TYPE_ARGUMENT = 3;
exports.TypePath = TypePath;
TypePath["__class"] = "TypePath";
