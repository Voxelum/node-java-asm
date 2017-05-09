/// <reference types="node" />
/**
 * A dynamically extensible vector of bytes. This class is roughly equivalent to
 * a DataOutputStream on top of a ByteArrayOutputStream, but is more efficient.
 *
 * @author Eric Bruneton
 */
export declare class ByteVector {
    /**
     * The content of this vector.
     */
    data: Buffer;
    /**
     * Actual number of bytes in this vector.
     */
    length: number;
    /**
     * Constructs a new {@link ByteVector ByteVector} with the given initial
     * size.
     *
     * @param initialSize
     * the initial size of the byte vector to be constructed.
     */
    constructor(initialSize?: number);
    /**
     * Puts a byte into this byte vector. The byte vector is automatically
     * enlarged if necessary.
     *
     * @param b
     * a byte.
     * @return this byte vector.
     */
    putByte(b: number): ByteVector;
    /**
     * Puts two bytes into this byte vector. The byte vector is automatically
     * enlarged if necessary.
     *
     * @param b1
     * a byte.
     * @param b2
     * another byte.
     * @return this byte vector.
     */
    put11(b1: number, b2: number): ByteVector;
    /**
     * Puts a short into this byte vector. The byte vector is automatically
     * enlarged if necessary.
     *
     * @param s
     * a short.
     * @return this byte vector.
     */
    putShort(s: number): ByteVector;
    /**
     * Puts a byte and a short into this byte vector. The byte vector is
     * automatically enlarged if necessary.
     *
     * @param b
     * a byte.
     * @param s
     * a short.
     * @return this byte vector.
     */
    put12(b: number, s: number): ByteVector;
    /**
     * Puts an int into this byte vector. The byte vector is automatically
     * enlarged if necessary.
     *
     * @param i
     * an int.
     * @return this byte vector.
     */
    putInt(i: number): ByteVector;
    /**
     * Puts a long into this byte vector. The byte vector is automatically
     * enlarged if necessary.
     *
     * @param l
     * a long.
     * @return this byte vector.
     */
    putLong(l: number): ByteVector;
    /**
     * Puts an UTF8 string into this byte vector. The byte vector is
     * automatically enlarged if necessary.
     *
     * @param s
     * a String whose UTF8 encoded length must be less than 65536.
     * @return this byte vector.
     */
    putUTF8(s: string): ByteVector;
    /**
     * Puts an UTF8 string into this byte vector. The byte vector is
     * automatically enlarged if necessary. The string length is encoded in two
     * bytes before the encoded characters, if there is space for that (i.e. if
     * this.length - i - 2 >= 0).
     *
     * @param s
     * the String to encode.
     * @param i
     * the index of the first character to encode. The previous
     * characters are supposed to have already been encoded, using
     * only one byte per character.
     * @param maxByteLength
     * the maximum byte length of the encoded string, including the
     * already encoded characters.
     * @return this byte vector.
     */
    encodeUTF8(s: string, i: number, maxByteLength: number): ByteVector;
    /**
     * Puts an array of bytes into this byte vector. The byte vector is
     * automatically enlarged if necessary.
     *
     * @param b
     * an array of bytes. May be <tt>null</tt> to put <tt>len</tt>
     * null bytes into this byte vector.
     * @param off
     * index of the fist byte of b that must be copied.
     * @param len
     * number of bytes of b that must be copied.
     * @return this byte vector.
     */
    putByteArray(b: Buffer, off: number, len: number): ByteVector;
    /**
     * Enlarge this byte vector so that it can receive n more bytes.
     *
     * @param size
     * number of additional bytes that this byte vector should be
     * able to receive.
     */
    private enlarge(size);
}
