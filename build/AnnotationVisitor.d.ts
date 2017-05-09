export declare abstract class AnnotationVisitor {
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
    constructor(api: number, av?: AnnotationVisitor);
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
    visit(name: string, value: any): void;
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
    visitEnum(name: string, desc: string, value: string): void;
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
    visitAnnotation(name: string, desc: string): AnnotationVisitor;
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
    visitArray(name: string): AnnotationVisitor;
    /**
     * Visits the end of the annotation.
     */
    visitEnd(): void;
}
