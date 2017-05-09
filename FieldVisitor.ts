/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * A visitor to visit a Java field. The methods of this class must be called in
 * the following order: ( <tt>visitAnnotation</tt> |
 * <tt>visitTypeAnnotation</tt> | <tt>visitAttribute</tt> )* <tt>visitEnd</tt>.
 * 
 * @author Eric Bruneton
 */
import { Opcodes } from './Opcodes'
import { TypePath } from './TypePath'
import { AnnotationVisitor } from './AnnotationVisitor'
import { Attribute } from './Attribute'

export abstract class FieldVisitor {
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
    public constructor(api: number, fv: FieldVisitor = null) {
        this.api = 0;
        if (api !== Opcodes.ASM4 && api !== Opcodes.ASM5) {
            throw new Error();
        }
        this.api = api;
        this.fv = fv;
    }

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
    public visitAnnotation(desc: string, visible: boolean): AnnotationVisitor {
        if (this.fv != null) {
            return this.fv.visitAnnotation(desc, visible);
        }
        return null;
    }

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
    public visitTypeAnnotation(typeRef: number, typePath: TypePath, desc: string, visible: boolean): AnnotationVisitor {
        if (this.api < Opcodes.ASM5) {
            throw new Error();
        }
        if (this.fv != null) {
            return this.fv.visitTypeAnnotation(typeRef, typePath, desc, visible);
        }
        return null;
    }

    /**
     * Visits a non standard attribute of the field.
     * 
     * @param attr
     * an attribute.
     */
    public visitAttribute(attr: Attribute) {
        if (this.fv != null) {
            this.fv.visitAttribute(attr);
        }
    }

    /**
     * Visits the end of the field. This method, which is the last one to be
     * called, is used to inform the visitor that all the annotations and
     * attributes of the field have been visited.
     */
    public visitEnd() {
        if (this.fv != null) {
            this.fv.visitEnd();
        }
    }
}
FieldVisitor["__class"] = "FieldVisitor";



