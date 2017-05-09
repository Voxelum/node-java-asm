/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * A dynamically extensible vector of bytes. This class is roughly equivalent to
 * a DataOutputStream on top of a ByteArrayOutputStream, but is more efficient.
 * 
 * @author Eric Bruneton
 */
export class ByteVector {
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
    public constructor(initialSize?: any) {
        if (((typeof initialSize === 'number') || initialSize === null)) {
            let __args = Array.prototype.slice.call(arguments);
            this.length = 0;
            (() => {
                // this.data = new Array(initialSize);
            })();
        } else if (initialSize === undefined) {
            let __args = Array.prototype.slice.call(arguments);
            this.length = 0;
            (() => {
                // this.data = new Array(64);
            })();
        } else throw new Error('invalid overload');
    }

    /**
     * Puts a byte into this byte vector. The byte vector is automatically
     * enlarged if necessary.
     * 
     * @param b
     * a byte.
     * @return this byte vector.
     */
    public putByte(b: number): ByteVector {
        let length: number = this.length;
        if (length + 1 > this.data.length) {
            this.enlarge(1);
        }
        this.data[length++] = (<number>b | 0);
        this.length = length;
        return this;
    }

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
    put11(b1: number, b2: number): ByteVector {
        let length: number = this.length;
        if (length + 2 > this.data.length) {
            this.enlarge(2);
        }
        let data: Buffer = this.data;
        data[length++] = (<number>b1 | 0);
        data[length++] = (<number>b2 | 0);
        this.length = length;
        return this;
    }

    /**
     * Puts a short into this byte vector. The byte vector is automatically
     * enlarged if necessary.
     * 
     * @param s
     * a short.
     * @return this byte vector.
     */
    public putShort(s: number): ByteVector {
        let length: number = this.length;
        if (length + 2 > this.data.length) {
            this.enlarge(2);
        }
        let data: Buffer = this.data;
        data[length++] = (<number>(s >>> 8) | 0);
        data[length++] = (<number>s | 0);
        this.length = length;
        return this;
    }

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
    put12(b: number, s: number): ByteVector {
        let length: number = this.length;
        if (length + 3 > this.data.length) {
            this.enlarge(3);
        }
        let data: Buffer = this.data;
        data[length++] = (<number>b | 0);
        data[length++] = (<number>(s >>> 8) | 0);
        data[length++] = (<number>s | 0);
        this.length = length;
        return this;
    }

    /**
     * Puts an int into this byte vector. The byte vector is automatically
     * enlarged if necessary.
     * 
     * @param i
     * an int.
     * @return this byte vector.
     */
    public putInt(i: number): ByteVector {
        let length: number = this.length;
        if (length + 4 > this.data.length) {
            this.enlarge(4);
        }
        let data: Buffer = this.data;
        data[length++] = (<number>(i >>> 24) | 0);
        data[length++] = (<number>(i >>> 16) | 0);
        data[length++] = (<number>(i >>> 8) | 0);
        data[length++] = (<number>i | 0);
        this.length = length;
        return this;
    }

    /**
     * Puts a long into this byte vector. The byte vector is automatically
     * enlarged if necessary.
     * 
     * @param l
     * a long.
     * @return this byte vector.
     */
    public putLong(l: number): ByteVector {
        let length: number = this.length;
        if (length + 8 > this.data.length) {
            this.enlarge(8);
        }
        let data: Buffer = this.data;
        let i: number = (<number>(l >>> 32) | 0);
        data[length++] = (<number>(i >>> 24) | 0);
        data[length++] = (<number>(i >>> 16) | 0);
        data[length++] = (<number>(i >>> 8) | 0);
        data[length++] = (<number>i | 0);
        i = (<number>l | 0);
        data[length++] = (<number>(i >>> 24) | 0);
        data[length++] = (<number>(i >>> 16) | 0);
        data[length++] = (<number>(i >>> 8) | 0);
        data[length++] = (<number>i | 0);
        this.length = length;
        return this;
    }

    /**
     * Puts an UTF8 string into this byte vector. The byte vector is
     * automatically enlarged if necessary.
     * 
     * @param s
     * a String whose UTF8 encoded length must be less than 65536.
     * @return this byte vector.
     */
    public putUTF8(s: string): ByteVector {
        let charLength: number = s.length;
        if (charLength > 65535) {
            throw new Error();
        }
        let len: number = this.length;
        if (len + 2 + charLength > this.data.length) {
            this.enlarge(2 + charLength);
        }
        let data: Buffer = this.data;
        data[len++] = (<number>(charLength >>> 8) | 0);
        data[len++] = (<number>charLength | 0);
        for (let i: number = 0; i < charLength; ++i) {
            let c: string = s.charAt(i);
            if ((c).charCodeAt(0) >= ('\u0001').charCodeAt(0) && (c).charCodeAt(0) <= ('\u007f').charCodeAt(0)) {
                data[len++] = (c).charCodeAt(0);
            } else {
                this.length = len;
                return this.encodeUTF8(s, i, 65535);
            }
        }
        this.length = len;
        return this;
    }

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
    encodeUTF8(s: string, i: number, maxByteLength: number): ByteVector {
        let charLength: number = s.length;
        let byteLength: number = i;
        let c: string;
        for (let j: number = i; j < charLength; ++j) {
            c = s.charAt(j);
            if ((c).charCodeAt(0) >= ('\u0001').charCodeAt(0) && (c).charCodeAt(0) <= ('\u007f').charCodeAt(0)) {
                byteLength++;
            } else if ((c).charCodeAt(0) > ('\u07ff').charCodeAt(0)) {
                byteLength += 3;
            } else {
                byteLength += 2;
            }
        }
        if (byteLength > maxByteLength) {
            throw new Error();
        }
        let start: number = this.length - i - 2;
        if (start >= 0) {
            this.data[start] = (<number>(byteLength >>> 8) | 0);
            this.data[start + 1] = (<number>byteLength | 0);
        }
        if (this.length + byteLength - i > this.data.length) {
            this.enlarge(byteLength - i);
        }
        let len: number = this.length;
        for (let j: number = i; j < charLength; ++j) {
            c = s.charAt(j);
            if ((c).charCodeAt(0) >= ('\u0001').charCodeAt(0) && (c).charCodeAt(0) <= ('\u007f').charCodeAt(0)) {
                this.data[len++] = (c).charCodeAt(0);
            } else if ((c).charCodeAt(0) > ('\u07ff').charCodeAt(0)) {
                this.data[len++] = (<number>(224 | (c).charCodeAt(0) >> 12 & 15) | 0);
                this.data[len++] = (<number>(128 | (c).charCodeAt(0) >> 6 & 63) | 0);
                this.data[len++] = (<number>(128 | (c).charCodeAt(0) & 63) | 0);
            } else {
                this.data[len++] = (<number>(192 | (c).charCodeAt(0) >> 6 & 31) | 0);
                this.data[len++] = (<number>(128 | (c).charCodeAt(0) & 63) | 0);
            }
        }
        this.length = len;
        return this;
    }

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
    public putByteArray(b: Buffer, off: number, len: number): ByteVector {
        if (this.length + len > this.data.length) {
            this.enlarge(len);
        }
        if (b != null) {
            for (let i = 0; i < len; i++) {
                this.data[i + this.length] = b[i + off];
            }
            // java.lang.System.arraycopy(b, off, this.data, this.length, len);
        }
        this.length += len;
        return this;
    }

    /**
     * Enlarge this byte vector so that it can receive n more bytes.
     * 
     * @param size
     * number of additional bytes that this byte vector should be
     * able to receive.
     */
    private enlarge(size: number) {
        let length1: number = 2 * this.data.length;
        let length2: number = this.length + size;
        this.data = Buffer.concat([this.data], length1 > length2 ? length1 : length2);
        // // java.lang.System.arraycopy(this.data, 0, newData, 0, this.length);
    }
}
ByteVector["__class"] = "ByteVector";



