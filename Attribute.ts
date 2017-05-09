/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * A non standard class, field, method or code attribute.
 * 
 * @author Eric Bruneton
 * @author Eugene Kuleshov
 */
import { Label } from "./Label";
import { ClassReader } from "./ClassReader";
import { ClassWriter } from "./ClassWriter";
import { ByteVector } from "./ByteVector";

export class Attribute {
    /**
     * The type of this attribute.
     */
    public type: string;

    /**
     * The raw value of this attribute, used only for unknown attributes.
     */
    value: Buffer;

    /**
     * The next attribute in this attribute list. May be <tt>null</tt>.
     */
    next: Attribute;

    /**
     * Constructs a new empty attribute.
     * 
     * @param type
     * the type of the attribute.
     */
    constructor(type: string) {
        this.type = type;
    }

    /**
     * Returns <tt>true</tt> if this type of attribute is unknown. The default
     * implementation of this method always returns <tt>true</tt>.
     * 
     * @return <tt>true</tt> if this type of attribute is unknown.
     */
    public isUnknown(): boolean {
        return true;
    }

    /**
     * Returns <tt>true</tt> if this type of attribute is a code attribute.
     * 
     * @return <tt>true</tt> if this type of attribute is a code attribute.
     */
    public isCodeAttribute(): boolean {
        return false;
    }

    /**
     * Returns the labels corresponding to this attribute.
     * 
     * @return the labels corresponding to this attribute, or <tt>null</tt> if
     * this attribute is not a code attribute that contains labels.
     */
    getLabels(): Label[] {
        return null;
    }

    /**
     * Reads a {@link #type type} attribute. This method must return a
     * <i>new</i> {@link Attribute} object, of type {@link #type type},
     * corresponding to the <tt>len</tt> bytes starting at the given offset, in
     * the given class reader.
     * 
     * @param cr
     * the class that contains the attribute to be read.
     * @param off
     * index of the first byte of the attribute's content in
     * {@link ClassReader#b cr.b}. The 6 attribute header bytes,
     * containing the type and the length of the attribute, are not
     * taken into account here.
     * @param len
     * the length of the attribute's content.
     * @param buf
     * buffer to be used to call {@link ClassReader#readUTF8
     * readUTF8}, {@link ClassReader#readClass(int,char[]) readClass}
     * or {@link ClassReader#readConst readConst}.
     * @param codeOff
     * index of the first byte of code's attribute content in
     * {@link ClassReader#b cr.b}, or -1 if the attribute to be read
     * is not a code attribute. The 6 attribute header bytes,
     * containing the type and the length of the attribute, are not
     * taken into account here.
     * @param labels
     * the labels of the method's code, or <tt>null</tt> if the
     * attribute to be read is not a code attribute.
     * @return a <i>new</i> {@link Attribute} object corresponding to the given
     * bytes.
     */
    read(cr: ClassReader, off: number, len: number, buf: number[], codeOff: number, labels: Label[]): Attribute {
        let attr: Attribute = new Attribute(this.type);
        attr.value = cr.buf.slice(0, len);
        // java.lang.System.arraycopy(cr.b, off, attr.value, 0, len);
        return attr;
    }

    /**
     * Returns the byte array form of this attribute.
     * 
     * @param cw
     * the class to which this attribute must be added. This
     * parameter can be used to add to the constant pool of this
     * class the items that corresponds to this attribute.
     * @param code
     * the bytecode of the method corresponding to this code
     * attribute, or <tt>null</tt> if this attribute is not a code
     * attributes.
     * @param len
     * the length of the bytecode of the method corresponding to this
     * code attribute, or <tt>null</tt> if this attribute is not a
     * code attribute.
     * @param maxStack
     * the maximum stack size of the method corresponding to this
     * code attribute, or -1 if this attribute is not a code
     * attribute.
     * @param maxLocals
     * the maximum number of local variables of the method
     * corresponding to this code attribute, or -1 if this attribute
     * is not a code attribute.
     * @return the byte array form of this attribute.
     */
    write(cw: ClassWriter, code: Buffer, len: number, maxStack: number, maxLocals: number): ByteVector {
        let v: ByteVector = new ByteVector();
        v.data = this.value;
        v.length = this.value.length;
        return v;
    }

    /**
     * Returns the length of the attribute list that begins with this attribute.
     * 
     * @return the length of the attribute list that begins with this attribute.
     */
    getCount(): number {
        let count: number = 0;
        let attr: Attribute = this;
        while ((attr != null)) {
            count += 1;
            attr = attr.next;
        };
        return count;
    }

    /**
     * Returns the size of all the attributes in this attribute list.
     * 
     * @param cw
     * the class writer to be used to convert the attributes into
     * byte arrays, with the {@link #write write} method.
     * @param code
     * the bytecode of the method corresponding to these code
     * attributes, or <tt>null</tt> if these attributes are not code
     * attributes.
     * @param len
     * the length of the bytecode of the method corresponding to
     * these code attributes, or <tt>null</tt> if these attributes
     * are not code attributes.
     * @param maxStack
     * the maximum stack size of the method corresponding to these
     * code attributes, or -1 if these attributes are not code
     * attributes.
     * @param maxLocals
     * the maximum number of local variables of the method
     * corresponding to these code attributes, or -1 if these
     * attributes are not code attributes.
     * @return the size of all the attributes in this attribute list. This size
     * includes the size of the attribute headers.
     */
    getSize(cw: ClassWriter, code: Buffer, len: number, maxStack: number, maxLocals: number): number {
        let attr: Attribute = this;
        let size: number = 0;
        while ((attr != null)) {
            cw.newUTF8(attr.type);
            size += attr.write(cw, code, len, maxStack, maxLocals).length + 6;
            attr = attr.next;
        };
        return size;
    }

    /**
     * Writes all the attributes of this attribute list in the given byte
     * vector.
     * 
     * @param cw
     * the class writer to be used to convert the attributes into
     * byte arrays, with the {@link #write write} method.
     * @param code
     * the bytecode of the method corresponding to these code
     * attributes, or <tt>null</tt> if these attributes are not code
     * attributes.
     * @param len
     * the length of the bytecode of the method corresponding to
     * these code attributes, or <tt>null</tt> if these attributes
     * are not code attributes.
     * @param maxStack
     * the maximum stack size of the method corresponding to these
     * code attributes, or -1 if these attributes are not code
     * attributes.
     * @param maxLocals
     * the maximum number of local variables of the method
     * corresponding to these code attributes, or -1 if these
     * attributes are not code attributes.
     * @param out
     * where the attributes must be written.
     */
    put(cw: ClassWriter, code: Buffer, len: number, maxStack: number, maxLocals: number, out: ByteVector) {
        let attr: Attribute = this;
        while ((attr != null)) {
            let b: ByteVector = attr.write(cw, code, len, maxStack, maxLocals);
            out.putShort(cw.newUTF8(attr.type)).putInt(b.length);
            out.putByteArray(b.data, 0, b.length);
            attr = attr.next;
        };
    }
}
Attribute["__class"] = "Attribute";



