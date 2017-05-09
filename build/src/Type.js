"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A Java field or method type. This class can be used to make it easier to
 * manipulate type and method descriptors.
 *
 * @author Eric Bruneton
 * @author Chris Nokleberg
 */
class Type {
    /**
     * Constructs a reference type.
     *
     * @param sort the sort of the reference type to be constructed.
     * @param buf  a buffer containing the descriptor of the previous type.
     * @param off  the offset of this descriptor in the previous buffer.
     * @param len  the length of this descriptor.
     */
    constructor(sort, buf, off, len) {
        this.sort = 0;
        this.off = 0;
        this.len = 0;
        this.sort = sort;
        this.buf = buf;
        this.off = off;
        this.len = len;
    }
    static VOID_TYPE_$LI$() { if (Type.VOID_TYPE == null)
        Type.VOID_TYPE = new Type(Type.VOID, null, (('V').charCodeAt(0) << 24) | (5 << 16), 1); return Type.VOID_TYPE; }
    ;
    static BOOLEAN_TYPE_$LI$() { if (Type.BOOLEAN_TYPE == null)
        Type.BOOLEAN_TYPE = new Type(Type.BOOLEAN, null, (('Z').charCodeAt(0) << 24) | (5 << 8) | 1, 1); return Type.BOOLEAN_TYPE; }
    ;
    static CHAR_TYPE_$LI$() { if (Type.CHAR_TYPE == null)
        Type.CHAR_TYPE = new Type(Type.CHAR, null, (('C').charCodeAt(0) << 24) | (6 << 8) | 1, 1); return Type.CHAR_TYPE; }
    ;
    static BYTE_TYPE_$LI$() { if (Type.BYTE_TYPE == null)
        Type.BYTE_TYPE = new Type(Type.BYTE, null, (('B').charCodeAt(0) << 24) | (5 << 8) | 1, 1); return Type.BYTE_TYPE; }
    ;
    static SHORT_TYPE_$LI$() { if (Type.SHORT_TYPE == null)
        Type.SHORT_TYPE = new Type(Type.SHORT, null, (('S').charCodeAt(0) << 24) | (7 << 8) | 1, 1); return Type.SHORT_TYPE; }
    ;
    static INT_TYPE_$LI$() { if (Type.INT_TYPE == null)
        Type.INT_TYPE = new Type(Type.INT, null, (('I').charCodeAt(0) << 24) | 1, 1); return Type.INT_TYPE; }
    ;
    static FLOAT_TYPE_$LI$() { if (Type.FLOAT_TYPE == null)
        Type.FLOAT_TYPE = new Type(Type.FLOAT, null, (('F').charCodeAt(0) << 24) | (2 << 16) | (2 << 8) | 1, 1); return Type.FLOAT_TYPE; }
    ;
    static LONG_TYPE_$LI$() { if (Type.LONG_TYPE == null)
        Type.LONG_TYPE = new Type(Type.LONG, null, (('J').charCodeAt(0) << 24) | (1 << 16) | (1 << 8) | 2, 1); return Type.LONG_TYPE; }
    ;
    static DOUBLE_TYPE_$LI$() { if (Type.DOUBLE_TYPE == null)
        Type.DOUBLE_TYPE = new Type(Type.DOUBLE, null, (('D').charCodeAt(0) << 24) | (3 << 16) | (3 << 8) | 2, 1); return Type.DOUBLE_TYPE; }
    ;
    /**
     * Returns the Java type corresponding to the given type descriptor.
     *
     * @param typeDescriptor a field or method type descriptor.
     * @return the Java type corresponding to the given type descriptor.
     */
    static getType$java_lang_String(typeDescriptor) {
        return Type.getType(/* toCharArray */ (typeDescriptor).split(''), 0);
    }
    /**
     * Returns the Java type corresponding to the given internal name.
     *
     * @param internalName an internal name.
     * @return the Java type corresponding to the given internal name.
     */
    static getObjectType(internalName) {
        let buf = (internalName).split('');
        return new Type(buf[0] === '[' ? Type.ARRAY : Type.OBJECT, buf, 0, buf.length);
    }
    /**
     * Returns the Java type corresponding to the given method descriptor.
     * Equivalent to <code>Type.getType(methodDescriptor)</code>.
     *
     * @param methodDescriptor a method descriptor.
     * @return the Java type corresponding to the given method descriptor.
     */
    static getMethodType(methodDescriptor) {
        return Type.getType(/* toCharArray */ (methodDescriptor).split(''), 0);
    }
    /**
     * Returns the Java types corresponding to the argument types of the given
     * method descriptor.
     *
     * @param methodDescriptor a method descriptor.
     * @return the Java types corresponding to the argument types of the given
     * method descriptor.
     */
    static getArgumentTypes(methodDescriptor) {
        let buf = (methodDescriptor).split('');
        let off = 1;
        let size = 0;
        while ((true)) {
            let car = buf[off++];
            if (car === ')') {
                break;
            }
            else if (car === 'L') {
                while ((buf[off++] !== ';')) {
                }
                ;
                ++size;
            }
            else if (car !== '[') {
                ++size;
            }
        }
        ;
        let args = new Array(size);
        off = 1;
        size = 0;
        while ((buf[off] !== ')')) {
            args[size] = Type.getType(buf, off);
            off += args[size].len + (args[size].sort === Type.OBJECT ? 2 : 0);
            size += 1;
        }
        ;
        return args;
    }
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
    static getArgumentsAndReturnSizes(desc) {
        let n = 1;
        let c = 1;
        while ((true)) {
            let car = desc.charAt(c++);
            if (car === ')') {
                car = desc.charAt(c);
                return n << 2 | (car === 'V' ? 0 : (car === 'D' || car === 'J' ? 2 : 1));
            }
            else if (car === 'L') {
                while ((desc.charAt(c++) !== ';')) {
                }
                ;
                n += 1;
            }
            else if (car === '[') {
                while (((car = desc.charAt(c)) === '[')) {
                    ++c;
                }
                ;
                if (car === 'D' || car === 'J') {
                    n -= 1;
                }
            }
            else if (car === 'D' || car === 'J') {
                n += 2;
            }
            else {
                n += 1;
            }
        }
        ;
    }
    /**
     * Returns the Java type corresponding to the given type descriptor. For
     * method descriptors, buf is supposed to contain nothing more than the
     * descriptor itself.
     *
     * @param buf a buffer containing a type descriptor.
     * @param off the offset of this descriptor in the previous buffer.
     * @return the Java type corresponding to the given type descriptor.
     */
    static getType(buf, off) {
        if (((buf != null && buf instanceof Array) || buf === null) && ((typeof off === 'number') || off === null)) {
            let __args = Array.prototype.slice.call(arguments);
            return (() => {
                let len;
                switch ((buf[off])) {
                    case 'V':
                        return Type.VOID_TYPE_$LI$();
                    case 'Z':
                        return Type.BOOLEAN_TYPE_$LI$();
                    case 'C':
                        return Type.CHAR_TYPE_$LI$();
                    case 'B':
                        return Type.BYTE_TYPE_$LI$();
                    case 'S':
                        return Type.SHORT_TYPE_$LI$();
                    case 'I':
                        return Type.INT_TYPE_$LI$();
                    case 'F':
                        return Type.FLOAT_TYPE_$LI$();
                    case 'J':
                        return Type.LONG_TYPE_$LI$();
                    case 'D':
                        return Type.DOUBLE_TYPE_$LI$();
                    case '[':
                        len = 1;
                        while ((buf[off + len] === '[')) {
                            ++len;
                        }
                        ;
                        if (buf[off + len] === 'L') {
                            ++len;
                            while ((buf[off + len] !== ';')) {
                                ++len;
                            }
                            ;
                        }
                        return new Type(Type.ARRAY, buf, off, len + 1);
                    case 'L':
                        len = 1;
                        while ((buf[off + len] !== ';')) {
                            ++len;
                        }
                        ;
                        return new Type(Type.OBJECT, buf, off + 1, len - 1);
                    default:
                        return new Type(Type.METHOD, buf, off, buf.length - off);
                }
            })();
        }
        else if (((typeof buf === 'string') || buf === null) && off === undefined) {
            return Type.getType$java_lang_String(buf);
        }
        else
            throw new Error('invalid overload');
    }
    /**
     * Returns the sort of this Java type.
     *
     * @return {@link #VOID VOID}, {@link #BOOLEAN BOOLEAN}, {@link #CHAR CHAR},
     * {@link #BYTE BYTE}, {@link #SHORT SHORT}, {@link #INT INT},
     * {@link #FLOAT FLOAT}, {@link #LONG LONG}, {@link #DOUBLE DOUBLE},
     * {@link #ARRAY ARRAY}, {@link #OBJECT OBJECT} or {@link #METHOD
     * METHOD}.
     */
    getSort() {
        return this.sort;
    }
    /**
     * Returns the internal name of the class corresponding to this object or
     * array type. The internal name of a class is its fully qualified name (as
     * returned by Class.getName(), where '.' are replaced by '/'. This method
     * should only be used for an object or array type.
     *
     * @return the internal name of the class corresponding to this object type.
     */
    getInternalName() {
        return ((str, index, len) => str.substring(index, index + len))((this.buf).join(''), this.off, this.len);
    }
    /**
     * Appends the descriptor corresponding to this Java type to the given
     * string buffer.
     *
     * @param buf the string buffer to which the descriptor must be appended.
     */
    getDescriptor(buf = '') {
        if (this.sort == Type.OBJECT) {
            buf += ('L');
            for (let i = 0; i < this.len; i++) {
                buf += this.buf[i + this.off];
            }
            // buf.append(this.buf, off, len);
            buf += (';');
        }
        else {
            for (let i = 0; i < this.len; i++) {
                buf += this.buf[i + this.off];
            }
            // buf.append(this.buf, this.off, this.len);
        }
    }
    /**
     * Returns the size of values of this type. This method must not be used for
     * method types.
     *
     * @return the size of values of this type, i.e., 2 for <tt>long</tt> and
     * <tt>double</tt>, 0 for <tt>void</tt> and 1 otherwise.
     */
    getSize() {
        return this.buf == null ? (this.off & 255) : 1;
    }
    /**
     * Tests if the given object is equal to this type.
     *
     * @param o the object to be compared to this type.
     * @return <tt>true</tt> if the given object is equal to this type.
     */
    equals(o) {
        if (this === o) {
            return true;
        }
        if (!(o != null && o instanceof Type)) {
            return false;
        }
        let t = o;
        if (this.sort !== t.sort) {
            return false;
        }
        if (this.sort >= Type.ARRAY) {
            if (this.len !== t.len) {
                return false;
            }
            for (let i = this.off, j = t.off, end = i + this.len; i < end; i++, j++) {
                if (this.buf[i] !== t.buf[j]) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * Returns a hash code value for this type.
     *
     * @return a hash code value for this type.
     */
    hashCode() {
        let hc = 13 * this.sort;
        if (this.sort >= Type.ARRAY) {
            for (let i = this.off, end = i + this.len; i < end; i++) {
                hc = 17 * (hc + (this.buf[i]).charCodeAt(0));
            }
        }
        return hc;
    }
    /**
     * Returns a string representation of this type.
     *
     * @return the descriptor of this type.
     */
    toString() {
        return this.getDescriptor();
    }
}
/**
* The sort of the <tt>void</tt> type. See {@link #getSort getSort}.
*/
Type.VOID = 0;
/**
 * The sort of the <tt>boolean</tt> type. See {@link #getSort getSort}.
 */
Type.BOOLEAN = 1;
/**
 * The sort of the <tt>char</tt> type. See {@link #getSort getSort}.
 */
Type.CHAR = 2;
/**
 * The sort of the <tt>byte</tt> type. See {@link #getSort getSort}.
 */
Type.BYTE = 3;
/**
 * The sort of the <tt>short</tt> type. See {@link #getSort getSort}.
 */
Type.SHORT = 4;
/**
 * The sort of the <tt>int</tt> type. See {@link #getSort getSort}.
 */
Type.INT = 5;
/**
 * The sort of the <tt>float</tt> type. See {@link #getSort getSort}.
 */
Type.FLOAT = 6;
/**
 * The sort of the <tt>long</tt> type. See {@link #getSort getSort}.
 */
Type.LONG = 7;
/**
 * The sort of the <tt>double</tt> type. See {@link #getSort getSort}.
 */
Type.DOUBLE = 8;
/**
 * The sort of array reference types. See {@link #getSort getSort}.
 */
Type.ARRAY = 9;
/**
 * The sort of object reference types. See {@link #getSort getSort}.
 */
Type.OBJECT = 10;
/**
 * The sort of method types. See {@link #getSort getSort}.
 */
Type.METHOD = 11;
exports.Type = Type;
Type["__class"] = "Type";
Type.DOUBLE_TYPE_$LI$();
Type.LONG_TYPE_$LI$();
Type.FLOAT_TYPE_$LI$();
Type.INT_TYPE_$LI$();
Type.SHORT_TYPE_$LI$();
Type.BYTE_TYPE_$LI$();
Type.CHAR_TYPE_$LI$();
Type.BOOLEAN_TYPE_$LI$();
Type.VOID_TYPE_$LI$();
