/**
 * An {@link AnnotationVisitor} that generates annotations in bytecode form.
 *
 * @author Eric Bruneton
 * @author Eugene Kuleshov
 */
import { ClassWriter } from "./ClassWriter";
import { AnnotationVisitor } from "./AnnotationVisitor";
import { ByteVector } from "./ByteVector";
import { TypePath } from "./TypePath";
export declare class AnnotationWriter extends AnnotationVisitor {
    /**
     * The class writer to which this annotation must be added.
     */
    private cw;
    /**
     * The number of values in this annotation.
     */
    private size;
    /**
     * <tt>true<tt> if values are named, <tt>false</tt> otherwise. Annotation
     * writers used for annotation default and annotation arrays use unnamed
     * values.
     */
    private named;
    /**
     * The annotation values in bytecode form. This byte vector only contains
     * the values themselves, i.e. the number of values must be stored as a
     * unsigned short just before these bytes.
     */
    private bv;
    /**
     * The byte vector to be used to store the number of values of this
     * annotation. See {@link #bv}.
     */
    private parent;
    /**
     * Where the number of values of this annotation must be stored in
     * {@link #parent}.
     */
    private offset;
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
    constructor(cw: ClassWriter, named: boolean, bv: ByteVector, parent: ByteVector, offset: number);
    visit(name: string, value: any): void;
    visitEnum(name: string, desc: string, value: string): void;
    visitAnnotation(name: string, desc: string): AnnotationVisitor;
    visitArray(name: string): AnnotationVisitor;
    visitEnd(): void;
    /**
     * Returns the size of this annotation writer list.
     *
     * @return the size of this annotation writer list.
     */
    getSize(): number;
    /**
     * Puts the annotations of this annotation writer list into the given byte
     * vector.
     *
     * @param out
     * where the annotations must be put.
     */
    put(out: ByteVector): void;
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
    static put(panns: AnnotationWriter[], off: number, out: ByteVector): void;
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
    static putTarget(typeRef: number, typePath: TypePath, out: ByteVector): void;
}
