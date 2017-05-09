/**
 * An {@link FieldVisitor} that generates Java fields in bytecode form.
 *
 * @author Eric Bruneton
 */
import { AnnotationVisitor } from './AnnotationVisitor';
import { Attribute } from './Attribute';
import { ByteVector } from './ByteVector';
import { ClassWriter } from './ClassWriter';
import { FieldVisitor } from './FieldVisitor';
import { TypePath } from './TypePath';
export declare class FieldWriter extends FieldVisitor {
    /**
     * The class writer to which this field must be added.
     */
    private cw;
    /**
     * Access flags of this field.
     */
    private access;
    /**
     * The index of the constant pool item that contains the name of this
     * method.
     */
    private name;
    /**
     * The index of the constant pool item that contains the descriptor of this
     * field.
     */
    private desc;
    /**
     * The index of the constant pool item that contains the signature of this
     * field.
     */
    private signature;
    /**
     * The index of the constant pool item that contains the constant value of
     * this field.
     */
    private value;
    /**
     * The runtime visible annotations of this field. May be <tt>null</tt>.
     */
    private anns;
    /**
     * The runtime invisible annotations of this field. May be <tt>null</tt>.
     */
    private ianns;
    /**
     * The runtime visible type annotations of this field. May be <tt>null</tt>.
     */
    private tanns;
    /**
     * The runtime invisible type annotations of this field. May be
     * <tt>null</tt>.
     */
    private itanns;
    /**
     * The non standard attributes of this field. May be <tt>null</tt>.
     */
    private attrs;
    /**
     * Constructs a new {@link FieldWriter}.
     *
     * @param cw
     * the class writer to which this field must be added.
     * @param access
     * the field's access flags (see {@link Opcodes}).
     * @param name
     * the field's name.
     * @param desc
     * the field's descriptor (see {@link Type}).
     * @param signature
     * the field's signature. May be <tt>null</tt>.
     * @param value
     * the field's constant value. May be <tt>null</tt>.
     */
    constructor(cw: ClassWriter, access: number, name: string, desc: string, signature: string, value: any);
    visitAnnotation(desc: string, visible: boolean): AnnotationVisitor;
    visitTypeAnnotation(typeRef: number, typePath: TypePath, desc: string, visible: boolean): AnnotationVisitor;
    visitAttribute(attr: Attribute): void;
    visitEnd(): void;
    /**
     * Returns the size of this field.
     *
     * @return the size of this field.
     */
    getSize(): number;
    /**
     * Puts the content of this field into the given byte vector.
     *
     * @param out
     * where the content of this field must be put.
     */
    put(out: ByteVector): void;
}
