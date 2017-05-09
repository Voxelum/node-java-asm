/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * A visitor to visit a Java annotation. The methods of this class must be
 * called in the following order: ( <tt>visit</tt> | <tt>visitEnum</tt> |
 * <tt>visitAnnotation</tt> | <tt>visitArray</tt> )* <tt>visitEnd</tt>.
 * 
 * @author Eric Bruneton
 * @author Eugene Kuleshov
 */
import { Opcodes } from './Opcodes'

export abstract class AnnotationVisitor {
    /**
     * The ASM API version implemented by this visitor. The value of this field
     * must be one of {@link Opcodes#ASM4} or {@link Opcodes#ASM5}.
     */
    api: number;

    /**
     * The annotation visitor to which this visitor must delegate method calls.
     * May be null.
     */
    av: AnnotationVisitor;

    /**
     * Constructs a new {@link AnnotationVisitor}.
     * 
     * @param api
     * the ASM API version implemented by this visitor. Must be one
     * of {@link Opcodes#ASM4} or {@link Opcodes#ASM5}.
     * @param av
     * the annotation visitor to which this visitor must delegate
     * method calls. May be null.
     */
    public constructor(api: number, av: AnnotationVisitor = null) {
        this.api = 0;
        if (api !== Opcodes.ASM4 && api !== Opcodes.ASM5) {
            throw new Error();
        }
        this.api = api;
        this.av = av;
    }

    /**
     * Visits a primitive value of the annotation.
     * 
     * @param name
     * the value name.
     * @param value
     * the actual value, whose type must be {@link Byte},
     * {@link Boolean}, {@link Character}, {@link Short},
     * {@link Integer} , {@link Long}, {@link Float}, {@link Double},
     * {@link String} or {@link Type} of OBJECT or ARRAY sort. This
     * value can also be an array of byte, boolean, short, char, int,
     * long, float or double values (this is equivalent to using
     * {@link #visitArray visitArray} and visiting each array element
     * in turn, but is more convenient).
     */
    public visit(name: string, value: any) {
        if (this.av != null) {
            this.av.visit(name, value);
        }
    }

    /**
     * Visits an enumeration value of the annotation.
     * 
     * @param name
     * the value name.
     * @param desc
     * the class descriptor of the enumeration class.
     * @param value
     * the actual enumeration value.
     */
    public visitEnum(name: string, desc: string, value: string) {
        if (this.av != null) {
            this.av.visitEnum(name, desc, value);
        }
    }

    /**
     * Visits a nested annotation value of the annotation.
     * 
     * @param name
     * the value name.
     * @param desc
     * the class descriptor of the nested annotation class.
     * @return a visitor to visit the actual nested annotation value, or
     * <tt>null</tt> if this visitor is not interested in visiting this
     * nested annotation. <i>The nested annotation value must be fully
     * visited before calling other methods on this annotation
     * visitor</i>.
     */
    public visitAnnotation(name: string, desc: string): AnnotationVisitor {
        if (this.av != null) {
            return this.av.visitAnnotation(name, desc);
        }
        return null;
    }

    /**
     * Visits an array value of the annotation. Note that arrays of primitive
     * types (such as byte, boolean, short, char, int, long, float or double)
     * can be passed as value to {@link #visit visit}. This is what
     * {@link ClassReader} does.
     * 
     * @param name
     * the value name.
     * @return a visitor to visit the actual array value elements, or
     * <tt>null</tt> if this visitor is not interested in visiting these
     * values. The 'name' parameters passed to the methods of this
     * visitor are ignored. <i>All the array values must be visited
     * before calling other methods on this annotation visitor</i>.
     */
    public visitArray(name: string): AnnotationVisitor {
        if (this.av != null) {
            return this.av.visitArray(name);
        }
        return null;
    }

    /**
     * Visits the end of the annotation.
     */
    public visitEnd() {
        if (this.av != null) {
            this.av.visitEnd();
        }
    }
}
AnnotationVisitor["__class"] = "AnnotationVisitor";


