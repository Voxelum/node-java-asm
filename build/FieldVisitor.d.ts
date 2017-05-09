import { TypePath } from './TypePath';
import { AnnotationVisitor } from './AnnotationVisitor';
import { Attribute } from './Attribute';
export declare abstract class FieldVisitor {
    /**
     * The ASM API version implemented by this visitor. The value of this field
     * must be one of {@link Opcodes#ASM4} or {@link Opcodes#ASM5}.
     */
    api: number;
    /**
     * The field visitor to which this visitor must delegate method calls. May
     * be null.
     */
    fv: FieldVisitor;
    /**
     * Constructs a new {@link FieldVisitor}.
     *
     * @param api
     * the ASM API version implemented by this visitor. Must be one
     * of {@link Opcodes#ASM4} or {@link Opcodes#ASM5}.
     * @param fv
     * the field visitor to which this visitor must delegate method
     * calls. May be null.
     */
    constructor(api: number, fv?: FieldVisitor);
    /**
     * Visits an annotation of the field.
     *
     * @param desc
     * the class descriptor of the annotation class.
     * @param visible
     * <tt>true</tt> if the annotation is visible at runtime.
     * @return a visitor to visit the annotation values, or <tt>null</tt> if
     * this visitor is not interested in visiting this annotation.
     */
    visitAnnotation(desc: string, visible: boolean): AnnotationVisitor;
    /**
     * Visits an annotation on the type of the field.
     *
     * @param typeRef
     * a reference to the annotated type. The sort of this type
     * reference must be {@link TypeReference#FIELD FIELD}. See
     * {@link TypeReference}.
     * @param typePath
     * the path to the annotated type argument, wildcard bound, array
     * element type, or static inner type within 'typeRef'. May be
     * <tt>null</tt> if the annotation targets 'typeRef' as a whole.
     * @param desc
     * the class descriptor of the annotation class.
     * @param visible
     * <tt>true</tt> if the annotation is visible at runtime.
     * @return a visitor to visit the annotation values, or <tt>null</tt> if
     * this visitor is not interested in visiting this annotation.
     */
    visitTypeAnnotation(typeRef: number, typePath: TypePath, desc: string, visible: boolean): AnnotationVisitor;
    /**
     * Visits a non standard attribute of the field.
     *
     * @param attr
     * an attribute.
     */
    visitAttribute(attr: Attribute): void;
    /**
     * Visits the end of the field. This method, which is the last one to be
     * called, is used to inform the visitor that all the annotations and
     * attributes of the field have been visited.
     */
    visitEnd(): void;
}
