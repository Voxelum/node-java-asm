/// <reference types="node" />
export declare class TypePath {
    /**
     * A type path step that steps into the element type of an array type. See
     * {@link #getStep getStep}.
     */
    static ARRAY_ELEMENT: number;
    /**
     * A type path step that steps into the nested type of a class type. See
     * {@link #getStep getStep}.
     */
    static INNER_TYPE: number;
    /**
     * A type path step that steps into the bound of a wildcard type. See
     * {@link #getStep getStep}.
     */
    static WILDCARD_BOUND: number;
    /**
     * A type path step that steps into a type argument of a generic type. See
     * {@link #getStep getStep}.
     */
    static TYPE_ARGUMENT: number;
    /**
     * The byte array where the path is stored, in Java class file format.
     */
    buf: Buffer;
    /**
     * The offset of the first byte of the type path in 'b'.
     */
    offset: number;
    /**
     * Creates a new type path.
     *
     * @param b
     * the byte array containing the type path in Java class file
     * format.
     * @param offset
     * the offset of the first byte of the type path in 'b'.
     */
    constructor(b: Buffer, offset: number);
    /**
     * Returns the length of this path.
     *
     * @return the length of this path.
     */
    getLength(): number;
    /**
     * Returns the value of the given step of this path.
     *
     * @param index
     * an index between 0 and {@link #getLength()}, exclusive.
     * @return {@link #ARRAY_ELEMENT ARRAY_ELEMENT}, {@link #INNER_TYPE
     * INNER_TYPE}, {@link #WILDCARD_BOUND WILDCARD_BOUND}, or
     * {@link #TYPE_ARGUMENT TYPE_ARGUMENT}.
     */
    getStep(index: number): number;
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
    getStepArgument(index: number): number;
    /**
     * Converts a type path in string form, in the format used by
     * {@link #toString()}, into a TypePath object.
     *
     * @param typePath
     * a type path in string form, in the format used by
     * {@link #toString()}. May be null or empty.
     * @return the corresponding TypePath object, or null if the path is empty.
     */
    static fromString(typePath: string): TypePath;
    /**
     * Returns a string representation of this type path. {@link #ARRAY_ELEMENT
     * ARRAY_ELEMENT} steps are represented with '[', {@link #INNER_TYPE
     * INNER_TYPE} steps with '.', {@link #WILDCARD_BOUND WILDCARD_BOUND} steps
     * with '*' and {@link #TYPE_ARGUMENT TYPE_ARGUMENT} steps with their type
     * argument index in decimal form followed by ';'.
     */
    toString(): string;
}
