/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * An {@link AnnotationVisitor} that generates annotations in bytecode form.
 * 
 * @author Eric Bruneton
 * @author Eugene Kuleshov
 */

import { ClassWriter } from "./ClassWriter";
import { AnnotationVisitor } from "./AnnotationVisitor";
import { ByteVector } from "./ByteVector";
import { Opcodes } from "./Opcodes";
import { Item } from "./Item";
import { TypePath } from "./TypePath";

export class AnnotationWriter extends AnnotationVisitor {
    /**
     * The class writer to which this annotation must be added.
     */
    private cw: ClassWriter;

    /**
     * The number of values in this annotation.
     */
    private size: number;

    /**
     * <tt>true<tt> if values are named, <tt>false</tt> otherwise. Annotation
     * writers used for annotation default and annotation arrays use unnamed
     * values.
     */
    private named: boolean;

    /**
     * The annotation values in bytecode form. This byte vector only contains
     * the values themselves, i.e. the number of values must be stored as a
     * unsigned short just before these bytes.
     */
    private bv: ByteVector;

    /**
     * The byte vector to be used to store the number of values of this
     * annotation. See {@link #bv}.
     */
    private parent: ByteVector;

    /**
     * Where the number of values of this annotation must be stored in
     * {@link #parent}.
     */
    private offset: number;

    /**
     * Next annotation writer. This field is used to store annotation lists.
     */
    next: AnnotationWriter;

    /**
     * Previous annotation writer. This field is used to store annotation lists.
     */
    prev: AnnotationWriter;

    /**
     * Constructs a new {@link AnnotationWriter}.
     * 
     * @param cw
     * the class writer to which this annotation must be added.
     * @param named
     * <tt>true<tt> if values are named, <tt>false</tt> otherwise.
     * @param bv
     * where the annotation values must be stored.
     * @param parent
     * where the number of annotation values must be stored.
     * @param offset
     * where in <tt>parent</tt> the number of annotation values must
     * be stored.
     */
    constructor(cw: ClassWriter, named: boolean, bv: ByteVector, parent: ByteVector, offset: number) {
        super(Opcodes.ASM5);
        this.size = 0;
        this.named = false;
        this.offset = 0;
        this.cw = cw;
        this.named = named;
        this.bv = bv;
        this.parent = parent;
        this.offset = offset;
    }

    public visit(name: string, value: any) {
        throw new Error('not supported')
        // ++this.size;
        // if (this.named) {
        //     this.bv.putShort(this.cw.newUTF8(name));
        // }
        // if (typeof value === 'string') {
        //     this.bv.put12(('s').charCodeAt(0), this.cw.newUTF8(<string>value));
        // } else if (typeof value === 'number') {
        //     this.bv.put12(('B').charCodeAt(0), this.cw.newInteger((<number>value).byteValue()).index);
        // } else if (typeof value === 'boolean') {
        //     let v: number = (<boolean>value).booleanValue() ? 1 : 0;
        //     this.bv.put12(('Z').charCodeAt(0), this.cw.newInteger(v).index);
        // } else if (typeof value === 'string') {
        //     this.bv.put12(('C').charCodeAt(0), this.cw.newInteger(((<string>value).charValue()).charCodeAt(0)).index);
        // } else if (typeof value === 'number') {
        //     this.bv.put12(('S').charCodeAt(0), this.cw.newInteger((<number>value).shortValue()).index);
        // } else if (value != null && value instanceof Type) {
        //     this.bv.put12(('c').charCodeAt(0), this.cw.newUTF8((<Type>value).getDescriptor()));
        // } else if (value != null && value instanceof Array) {
        //     let v: number[] = <number[]>value;
        //     this.bv.put12(('[').charCodeAt(0), v.length);
        //     for (let i: number = 0; i < v.length; i++) {
        //         this.bv.put12(('B').charCodeAt(0), this.cw.newInteger(v[i]).index);
        //     }
        // } else if (value != null && value instanceof Array) {
        //     let v: boolean[] = <boolean[]>value;
        //     this.bv.put12(('[').charCodeAt(0), v.length);
        //     for (let i: number = 0; i < v.length; i++) {
        //         this.bv.put12(('Z').charCodeAt(0), this.cw.newInteger(v[i] ? 1 : 0).index);
        //     }
        // } else if (value != null && value instanceof Array) {
        //     let v: number[] = <number[]>value;
        //     this.bv.put12(('[').charCodeAt(0), v.length);
        //     for (let i: number = 0; i < v.length; i++) {
        //         this.bv.put12(('S').charCodeAt(0), this.cw.newInteger(v[i]).index);
        //     }
        // } else if (value != null && value instanceof Array) {
        //     let v: string[] = <string[]>value;
        //     this.bv.put12(('[').charCodeAt(0), v.length);
        //     for (let i: number = 0; i < v.length; i++) {
        //         this.bv.put12(('C').charCodeAt(0), this.cw.newInteger((v[i]).charCodeAt(0)).index);
        //     }
        // } else if (value != null && value instanceof Array) {
        //     let v: number[] = <number[]>value;
        //     this.bv.put12(('[').charCodeAt(0), v.length);
        //     for (let i: number = 0; i < v.length; i++) {
        //         this.bv.put12(('I').charCodeAt(0), this.cw.newInteger(v[i]).index);
        //     }
        // } else if (value != null && value instanceof Array) {
        //     let v: number[] = <number[]>value;
        //     this.bv.put12(('[').charCodeAt(0), v.length);
        //     for (let i: number = 0; i < v.length; i++) {
        //         this.bv.put12(('J').charCodeAt(0), this.cw.newLong(v[i]).index);
        //     }
        // } else if (value != null && value instanceof Array) {
        //     let v: number[] = <number[]>value;
        //     this.bv.put12(('[').charCodeAt(0), v.length);
        //     for (let i: number = 0; i < v.length; i++) {
        //         this.bv.put12(('F').charCodeAt(0), this.cw.newFloat(v[i]).index);
        //     }
        // } else if (value != null && value instanceof Array) {
        //     let v: number[] = <number[]>value;
        //     this.bv.put12(('[').charCodeAt(0), v.length);
        //     for (let i: number = 0; i < v.length; i++) {
        //         this.bv.put12(('D').charCodeAt(0), this.cw.newDouble(v[i]).index);
        //     }
        // } else {
        //     let i: Item = this.cw.newConstItem(value);
        //     this.bv.put12((".s.IFJDCS".charAt(i.type)).charCodeAt(0), i.index);
        // }
    }

    public visitEnum(name: string, desc: string, value: string) {
        ++this.size;
        if (this.named) {
            this.bv.putShort(this.cw.newUTF8(name));
        }
        this.bv.put12(('e').charCodeAt(0), this.cw.newUTF8(desc)).putShort(this.cw.newUTF8(value));
    }

    public visitAnnotation(name: string, desc: string): AnnotationVisitor {
        ++this.size;
        if (this.named) {
            this.bv.putShort(this.cw.newUTF8(name));
        }
        this.bv.put12(('@').charCodeAt(0), this.cw.newUTF8(desc)).putShort(0);
        return new AnnotationWriter(this.cw, true, this.bv, this.bv, this.bv.length - 2);
    }

    public visitArray(name: string): AnnotationVisitor {
        ++this.size;
        if (this.named) {
            this.bv.putShort(this.cw.newUTF8(name));
        }
        this.bv.put12(('[').charCodeAt(0), 0);
        return new AnnotationWriter(this.cw, false, this.bv, this.bv, this.bv.length - 2);
    }

    public visitEnd() {
        if (this.parent != null) {
            let data: Buffer = this.parent.data;
            data[this.offset] = (<number>(this.size >>> 8) | 0);
            data[this.offset + 1] = (<number>this.size | 0);
        }
    }

    /**
     * Returns the size of this annotation writer list.
     * 
     * @return the size of this annotation writer list.
     */
    getSize(): number {
        let size: number = 0;
        let aw: AnnotationWriter = this;
        while ((aw != null)) {
            size += aw.bv.length;
            aw = aw.next;
        };
        return size;
    }

    /**
     * Puts the annotations of this annotation writer list into the given byte
     * vector.
     * 
     * @param out
     * where the annotations must be put.
     */
    put(out: ByteVector) {
        let n: number = 0;
        let size: number = 2;
        let aw: AnnotationWriter = this;
        let last: AnnotationWriter = null;
        while ((aw != null)) {
            ++n;
            size += aw.bv.length;
            aw.visitEnd();
            aw.prev = last;
            last = aw;
            aw = aw.next;
        };
        out.putInt(size);
        out.putShort(n);
        aw = last;
        while ((aw != null)) {
            out.putByteArray(aw.bv.data, 0, aw.bv.length);
            aw = aw.prev;
        };
    }

    /**
     * Puts the given annotation lists into the given byte vector.
     * 
     * @param panns
     * an array of annotation writer lists.
     * @param off
     * index of the first annotation to be written.
     * @param out
     * where the annotations must be put.
     */
    static put(panns: AnnotationWriter[], off: number, out: ByteVector) {
        let size: number = 1 + 2 * (panns.length - off);
        for (let i: number = off; i < panns.length; ++i) {
            size += panns[i] == null ? 0 : panns[i].getSize();
        }
        out.putInt(size).putByte(panns.length - off);
        for (let i: number = off; i < panns.length; ++i) {
            let aw: AnnotationWriter = panns[i];
            let last: AnnotationWriter = null;
            let n: number = 0;
            while ((aw != null)) {
                ++n;
                aw.visitEnd();
                aw.prev = last;
                last = aw;
                aw = aw.next;
            };
            out.putShort(n);
            aw = last;
            while ((aw != null)) {
                out.putByteArray(aw.bv.data, 0, aw.bv.length);
                aw = aw.prev;
            };
        }
    }

    /**
     * Puts the given type reference and type path into the given bytevector.
     * LOCAL_VARIABLE and RESOURCE_VARIABLE target types are not supported.
     * 
     * @param typeRef
     * a reference to the annotated type. See {@link TypeReference}.
     * @param typePath
     * the path to the annotated type argument, wildcard bound, array
     * element type, or static inner type within 'typeRef'. May be
     * <tt>null</tt> if the annotation targets 'typeRef' as a whole.
     * @param out
     * where the type reference and type path must be put.
     */
    static putTarget(typeRef: number, typePath: TypePath, out: ByteVector) {
        switch ((typeRef >>> 24)) {
            case 0:
            case 1:
            case 22:
                out.putShort(typeRef >>> 16);
                break;
            case 19:
            case 20:
            case 21:
                out.putByte(typeRef >>> 24);
                break;
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
                out.putInt(typeRef);
                break;
            default:
                out.put12(typeRef >>> 24, (typeRef & 16776960) >> 8);
                break;
        }
        if (typePath == null) {
            out.putByte(0);
        } else {
            let length: number = typePath.buf[typePath.offset] * 2 + 1;
            out.putByteArray(typePath.buf, typePath.offset, length);
        }
    }
}
AnnotationWriter["__class"] = "AnnotationWriter";



