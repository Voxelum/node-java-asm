/**
 * A Java field or method type. This class can be used to make it easier to
 * manipulate type and method descriptors.
 *
 * @author Eric Bruneton
 * @author Chris Nokleberg
 */
export declare class Type {
    /**
    * The sort of the <tt>void</tt> type. See {@link #getSort getSort}.
    */
    static VOID: number;
    /**
     * The sort of the <tt>boolean</tt> type. See {@link #getSort getSort}.
     */
    static BOOLEAN: number;
    /**
     * The sort of the <tt>char</tt> type. See {@link #getSort getSort}.
     */
    static CHAR: number;
    /**
     * The sort of the <tt>byte</tt> type. See {@link #getSort getSort}.
     */
    static BYTE: number;
    /**
     * The sort of the <tt>short</tt> type. See {@link #getSort getSort}.
     */
    static SHORT: number;
    /**
     * The sort of the <tt>int</tt> type. See {@link #getSort getSort}.
     */
    static INT: number;
    /**
     * The sort of the <tt>float</tt> type. See {@link #getSort getSort}.
     */
    static FLOAT: number;
    /**
     * The sort of the <tt>long</tt> type. See {@link #getSort getSort}.
     */
    static LONG: number;
    /**
     * The sort of the <tt>double</tt> type. See {@link #getSort getSort}.
     */
    static DOUBLE: number;
    /**
     * The sort of array reference types. See {@link #getSort getSort}.
     */
    static ARRAY: number;
    /**
     * The sort of object reference types. See {@link #getSort getSort}.
     */
    static OBJECT: number;
    /**
     * The sort of method types. See {@link #getSort getSort}.
     */
    static METHOD: number;
    /**
     * The <tt>void</tt> type.
     */
    static VOID_TYPE: Type;
    static VOID_TYPE_$LI$(): Type;
    /**
     * The <tt>boolean</tt> type.
     */
    static BOOLEAN_TYPE: Type;
    static BOOLEAN_TYPE_$LI$(): Type;
    /**
     * The <tt>char</tt> type.
     */
    static CHAR_TYPE: Type;
    static CHAR_TYPE_$LI$(): Type;
    /**
     * The <tt>byte</tt> type.
     */
    static BYTE_TYPE: Type;
    static BYTE_TYPE_$LI$(): Type;
    /**
     * The <tt>short</tt> type.
     */
    static SHORT_TYPE: Type;
    static SHORT_TYPE_$LI$(): Type;
    /**
     * The <tt>int</tt> type.
     */
    static INT_TYPE: Type;
    static INT_TYPE_$LI$(): Type;
    /**
     * The <tt>float</tt> type.
     */
    static FLOAT_TYPE: Type;
    static FLOAT_TYPE_$LI$(): Type;
    /**
     * The <tt>long</tt> type.
     */
    static LONG_TYPE: Type;
    static LONG_TYPE_$LI$(): Type;
    /**
     * The <tt>double</tt> type.
     */
    static DOUBLE_TYPE: Type;
    static DOUBLE_TYPE_$LI$(): Type;
    /**
     * The sort of this Java type.
     */
    private sort;
    /**
     * A buffer containing the internal name of this Java type. This field is
     * only used for reference types.
     */
    private buf;
    /**
     * The offset of the internal name of this Java type in {@link #buf buf} or,
     * for primitive types, the size, descriptor and getOpcode offsets for this
     * type (byte 0 contains the size, byte 1 the descriptor, byte 2 the offset
     * for IALOAD or IASTORE, byte 3 the offset for all other instructions).
     */
    private off;
    /**
     * The length of the internal name of this Java type.
     */
    private len;
    /**
     * Constructs a reference type.
     *
     * @param sort the sort of the reference type to be constructed.
     * @param buf  a buffer containing the descriptor of the previous type.
     * @param off  the offset of this descriptor in the previous buffer.
     * @param len  the length of this descriptor.
     */
    constructor(sort: number, buf: string[], off: number, len: number);
    /**
     * Returns the Java type corresponding to the given type descriptor.
     *
     * @param typeDescriptor a field or method type descriptor.
     * @return the Java type corresponding to the given type descriptor.
     */
    static getType$java_lang_String(typeDescriptor: string): Type;
    /**
     * Returns the Java type corresponding to the given internal name.
     *
     * @param internalName an internal name.
     * @return the Java type corresponding to the given internal name.
     */
    static getObjectType(internalName: string): Type;
    /**
     * Returns the Java type corresponding to the given method descriptor.
     * Equivalent to <code>Type.getType(methodDescriptor)</code>.
     *
     * @param methodDescriptor a method descriptor.
     * @return the Java type corresponding to the given method descriptor.
     */
    static getMethodType(methodDescriptor: string): Type;
    /**
     * Returns the Java types corresponding to the argument types of the given
     * method descriptor.
     *
     * @param methodDescriptor a method descriptor.
     * @return the Java types corresponding to the argument types of the given
     * method descriptor.
     */
    static getArgumentTypes(methodDescriptor: string): Type[];
    /**
     * Computes the size of the arguments and of the return value of a method.
     *
     * @param desc the descriptor of a method.
     * @return the size of the arguments of the method (plus one for the
     * implicit this argument), argSize, and the size of its return
     * value, retSize, packed into a single int i =
     * <tt>(argSize &lt;&lt; 2) | retSize</tt> (argSize is therefore equal to
     * <tt>i &gt;&gt; 2</tt>, and retSize to <tt>i &amp; 0x03</tt>).
     */
    static getArgumentsAndReturnSizes(desc: string): number;
    /**
     * Returns the Java type corresponding to the given type descriptor. For
     * method descriptors, buf is supposed to contain nothing more than the
     * descriptor itself.
     *
     * @param buf a buffer containing a type descriptor.
     * @param off the offset of this descriptor in the previous buffer.
     * @return the Java type corresponding to the given type descriptor.
     */
    static getType(buf?: any, off?: any): any;
    /**
     * Returns the sort of this Java type.
     *
     * @return {@link #VOID VOID}, {@link #BOOLEAN BOOLEAN}, {@link #CHAR CHAR},
     * {@link #BYTE BYTE}, {@link #SHORT SHORT}, {@link #INT INT},
     * {@link #FLOAT FLOAT}, {@link #LONG LONG}, {@link #DOUBLE DOUBLE},
     * {@link #ARRAY ARRAY}, {@link #OBJECT OBJECT} or {@link #METHOD
     * METHOD}.
     */
    getSort(): number;
    /**
     * Returns the internal name of the class corresponding to this object or
     * array type. The internal name of a class is its fully qualified name (as
     * returned by Class.getName(), where '.' are replaced by '/'. This method
     * should only be used for an object or array type.
     *
     * @return the internal name of the class corresponding to this object type.
     */
    getInternalName(): string;
    /**
     * Appends the descriptor corresponding to this Java type to the given
     * string buffer.
     *
     * @param buf the string buffer to which the descriptor must be appended.
     */
    getDescriptor(buf?: any): any;
    /**
     * Returns the size of values of this type. This method must not be used for
     * method types.
     *
     * @return the size of values of this type, i.e., 2 for <tt>long</tt> and
     * <tt>double</tt>, 0 for <tt>void</tt> and 1 otherwise.
     */
    getSize(): number;
    /**
     * Tests if the given object is equal to this type.
     *
     * @param o the object to be compared to this type.
     * @return <tt>true</tt> if the given object is equal to this type.
     */
    equals(o: any): boolean;
    /**
     * Returns a hash code value for this type.
     *
     * @return a hash code value for this type.
     */
    hashCode(): number;
    /**
     * Returns a string representation of this type.
     *
     * @return the descriptor of this type.
     */
    toString(): string;
}
