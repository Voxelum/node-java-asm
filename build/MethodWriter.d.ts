/**
 * A {@link MethodVisitor} that generates methods in bytecode form. Each visit
 * method of this class appends the bytecode corresponding to the visited
 * instruction to a byte vector, in the order these methods are called.
 *
 * @author Eric Bruneton
 * @author Eugene Kuleshov
 */
import { MethodVisitor } from './MethodVisitor';
import { ByteVector } from "./ByteVector";
import { Attribute } from "./Attribute";
import { AnnotationVisitor } from "./AnnotationVisitor";
import { Label } from "./Label";
import { TypePath } from "./TypePath";
import { ClassWriter } from "./ClassWriter";
import { Handle } from "./Handle";
export declare class MethodWriter extends MethodVisitor {
    /**
     * Pseudo access flag used to denote constructors.
     */
    static ACC_CONSTRUCTOR: number;
    /**
     * Frame has exactly the same locals as the previous stack map frame and
     * number of stack items is zero.
     */
    static SAME_FRAME: number;
    /**
     * Frame has exactly the same locals as the previous stack map frame and
     * number of stack items is 1
     */
    static SAME_LOCALS_1_STACK_ITEM_FRAME: number;
    /**
     * Reserved for future use
     */
    static RESERVED: number;
    /**
     * Frame has exactly the same locals as the previous stack map frame and
     * number of stack items is 1. Offset is bigger then 63;
     */
    static SAME_LOCALS_1_STACK_ITEM_FRAME_EXTENDED: number;
    /**
     * Frame where current locals are the same as the locals in the previous
     * frame, except that the k last locals are absent. The value of k is given
     * by the formula 251-frame_type.
     */
    static CHOP_FRAME: number;
    /**
     * Frame has exactly the same locals as the previous stack map frame and
     * number of stack items is zero. Offset is bigger then 63;
     */
    static SAME_FRAME_EXTENDED: number;
    /**
     * Frame where current locals are the same as the locals in the previous
     * frame, except that k additional locals are defined. The value of k is
     * given by the formula frame_type-251.
     */
    static APPEND_FRAME: number;
    /**
     * Full frame
     */
    static FULL_FRAME: number;
    /**
     * Indicates that the stack map frames must be recomputed from scratch. In
     * this case the maximum stack size and number of local variables is also
     * recomputed from scratch.
     *
     * @see #compute
     */
    static FRAMES: number;
    /**
     * Indicates that the stack map frames of type F_INSERT must be computed.
     * The other frames are not (re)computed. They should all be of type F_NEW
     * and should be sufficient to compute the content of the F_INSERT frames,
     * together with the bytecode instructions between a F_NEW and a F_INSERT
     * frame - and without any knowledge of the type hierarchy (by definition of
     * F_INSERT).
     *
     * @see #compute
     */
    static INSERTED_FRAMES: number;
    /**
     * Indicates that the maximum stack size and number of local variables must
     * be automatically computed.
     *
     * @see #compute
     */
    static MAXS: number;
    /**
     * Indicates that nothing must be automatically computed.
     *
     * @see #compute
     */
    static NOTHING: number;
    /**
     * The class writer to which this method must be added.
     */
    cw: ClassWriter;
    /**
     * Access flags of this method.
     */
    private access;
    /**
     * The index of the constant pool item that contains the name of this
     * method.
     */
    private name;
    /**
     * The index of the constant pool item that contains the descriptor of this
     * method.
     */
    private desc;
    /**
     * The descriptor of this method.
     */
    private descriptor;
    /**
     * The signature of this method.
     */
    signature: string;
    /**
     * If not zero, indicates that the code of this method must be copied from
     * the ClassReader associated to this writer in <code>cw.cr</code>. More
     * precisely, this field gives the index of the first byte to copied from
     * <code>cw.cr.b</code>.
     */
    classReaderOffset: number;
    /**
     * If not zero, indicates that the code of this method must be copied from
     * the ClassReader associated to this writer in <code>cw.cr</code>. More
     * precisely, this field gives the number of bytes to copied from
     * <code>cw.cr.b</code>.
     */
    classReaderLength: number;
    /**
     * Number of exceptions that can be thrown by this method.
     */
    exceptionCount: number;
    /**
     * The exceptions that can be thrown by this method. More precisely, this
     * array contains the indexes of the constant pool items that contain the
     * internal names of these exception classes.
     */
    exceptions: number[];
    /**
     * The annotation default attribute of this method. May be <tt>null</tt>.
     */
    private annd;
    /**
     * The runtime visible annotations of this method. May be <tt>null</tt>.
     */
    private anns;
    /**
     * The runtime invisible annotations of this method. May be <tt>null</tt>.
     */
    private ianns;
    /**
     * The runtime visible type annotations of this method. May be <tt>null</tt>
     * .
     */
    private tanns;
    /**
     * The runtime invisible type annotations of this method. May be
     * <tt>null</tt>.
     */
    private itanns;
    /**
     * The runtime visible parameter annotations of this method. May be
     * <tt>null</tt>.
     */
    private panns;
    /**
     * The runtime invisible parameter annotations of this method. May be
     * <tt>null</tt>.
     */
    private ipanns;
    /**
     * The number of synthetic parameters of this method.
     */
    private synthetics;
    /**
     * The non standard attributes of the method.
     */
    private attrs;
    /**
     * The bytecode of this method.
     */
    private code;
    /**
     * Maximum stack size of this method.
     */
    private maxStack;
    /**
     * Maximum number of local variables for this method.
     */
    private maxLocals;
    /**
     * Number of local variables in the current stack map frame.
     */
    private currentLocals;
    /**
     * Number of stack map frames in the StackMapTable attribute.
     */
    private frameCount;
    /**
     * The StackMapTable attribute.
     */
    private stackMap;
    /**
     * The offset of the last frame that was written in the StackMapTable
     * attribute.
     */
    private previousFrameOffset;
    /**
     * The last frame that was written in the StackMapTable attribute.
     *
     * @see #frame
     */
    private previousFrame;
    /**
     * The current stack map frame. The first element contains the offset of the
     * instruction to which the frame corresponds, the second element is the
     * number of locals and the third one is the number of stack elements. The
     * local variables start at index 3 and are followed by the operand stack
     * values. In summary frame[0] = offset, frame[1] = nLocal, frame[2] =
     * nStack, frame[3] = nLocal. All types are encoded as integers, with the
     * same format as the one used in {@link Label}, but limited to BASE types.
     */
    private frame;
    /**
     * Number of elements in the exception handler list.
     */
    private handlerCount;
    /**
     * The first element in the exception handler list.
     */
    private firstHandler;
    /**
     * The last element in the exception handler list.
     */
    private lastHandler;
    /**
     * Number of entries in the MethodParameters attribute.
     */
    private methodParametersCount;
    /**
     * The MethodParameters attribute.
     */
    private methodParameters;
    /**
     * Number of entries in the LocalVariableTable attribute.
     */
    private localVarCount;
    /**
     * The LocalVariableTable attribute.
     */
    private localVar;
    /**
     * Number of entries in the LocalVariableTypeTable attribute.
     */
    private localVarTypeCount;
    /**
     * The LocalVariableTypeTable attribute.
     */
    private localVarType;
    /**
     * Number of entries in the LineNumberTable attribute.
     */
    private lineNumberCount;
    /**
     * The LineNumberTable attribute.
     */
    private lineNumber;
    /**
     * The start offset of the last visited instruction.
     */
    private lastCodeOffset;
    /**
     * The runtime visible type annotations of the code. May be <tt>null</tt>.
     */
    private ctanns;
    /**
     * The runtime invisible type annotations of the code. May be <tt>null</tt>.
     */
    private ictanns;
    /**
     * The non standard attributes of the method's code.
     */
    private cattrs;
    /**
     * The number of subroutines in this method.
     */
    private subroutines;
    /**
     * Indicates what must be automatically computed.
     *
     * @see #FRAMES
     * @see #INSERTED_FRAMES
     * @see #MAXS
     * @see #NOTHING
     */
    private compute;
    /**
     * A list of labels. This list is the list of basic blocks in the method,
     * i.e. a list of Label objects linked to each other by their
     * {@link Label#successor} field, in the order they are visited by
     * {@link MethodVisitor#visitLabel}, and starting with the first basic
     * block.
     */
    private labels;
    /**
     * The previous basic block.
     */
    private previousBlock;
    /**
     * The current basic block.
     */
    private currentBlock;
    /**
     * The (relative) stack size after the last visited instruction. This size
     * is relative to the beginning of the current basic block, i.e., the true
     * stack size after the last visited instruction is equal to the
     * {@link Label#inputStackTop beginStackSize} of the current basic block
     * plus <tt>stackSize</tt>.
     */
    private stackSize;
    /**
     * The (relative) maximum stack size after the last visited instruction.
     * This size is relative to the beginning of the current basic block, i.e.,
     * the true maximum stack size after the last visited instruction is equal
     * to the {@link Label#inputStackTop beginStackSize} of the current basic
     * block plus <tt>stackSize</tt>.
     */
    private maxStackSize;
    /**
     * Constructs a new {@link MethodWriter}.
     *
     * @param cw
     * the class writer in which the method must be added.
     * @param access
     * the method's access flags (see {@link Opcodes}).
     * @param name
     * the method's name.
     * @param desc
     * the method's descriptor (see {@link Type}).
     * @param signature
     * the method's signature. May be <tt>null</tt>.
     * @param exceptions
     * the internal names of the method's exceptions. May be
     * <tt>null</tt>.
     * @param compute
     * Indicates what must be automatically computed (see #compute).
     */
    constructor(cw: ClassWriter, access: number, name: string, desc: string, signature: string, exceptions: string[], compute: number);
    visitParameter(name: string, access: number): void;
    visitAnnotationDefault(): AnnotationVisitor;
    visitAnnotation(desc: string, visible: boolean): AnnotationVisitor;
    visitTypeAnnotation(typeRef: number, typePath: TypePath, desc: string, visible: boolean): AnnotationVisitor;
    visitParameterAnnotation(parameter: number, desc: string, visible: boolean): AnnotationVisitor;
    visitAttribute(attr: Attribute): void;
    visitCode(): void;
    visitFrame(type?: any, nLocal?: any, local?: any, nStack?: any, stack?: any): any;
    visitInsn(opcode: number): void;
    visitIntInsn(opcode: number, operand: number): void;
    visitVarInsn(opcode: number, __var: number): void;
    visitTypeInsn(opcode: number, type: string): void;
    visitFieldInsn(opcode: number, owner: string, name: string, desc: string): void;
    visitMethodInsn(opcode?: any, owner?: any, name?: any, desc?: any, itf?: any): any;
    visitInvokeDynamicInsn(name: string, desc: string, bsm: Handle, ...bsmArgs: any[]): void;
    visitJumpInsn(opcode: number, label: Label): void;
    visitLabel(label: Label): void;
    visitLdcInsn(cst: any): void;
    visitIincInsn(__var: number, increment: number): void;
    visitTableSwitchInsn(min: number, max: number, dflt: Label, ...labels: Label[]): void;
    visitLookupSwitchInsn(dflt: Label, keys: number[], labels: Label[]): void;
    private visitSwitchInsn(dflt, labels);
    visitMultiANewArrayInsn(desc: string, dims: number): void;
    visitInsnAnnotation(typeRef: number, typePath: TypePath, desc: string, visible: boolean): AnnotationVisitor;
    visitTryCatchBlock(start: Label, end: Label, handler: Label, type: string): void;
    visitTryCatchAnnotation(typeRef: number, typePath: TypePath, desc: string, visible: boolean): AnnotationVisitor;
    visitLocalVariable(name: string, desc: string, signature: string, start: Label, end: Label, index: number): void;
    visitLocalVariableAnnotation(typeRef: number, typePath: TypePath, start: Label[], end: Label[], index: number[], desc: string, visible: boolean): AnnotationVisitor;
    visitLineNumber(line: number, start: Label): void;
    visitMaxs(maxStack: number, maxLocals: number): void;
    visitEnd(): void;
    /**
     * Adds a successor to the {@link #currentBlock currentBlock} block.
     *
     * @param info
     * information about the control flow edge to be added.
     * @param successor
     * the successor block to be added to the current block.
     */
    private addSuccessor(info, successor);
    /**
     * Ends the current basic block. This method must be used in the case where
     * the current basic block does not have any successor.
     */
    private noSuccessor();
    /**
     * Visits a frame that has been computed from scratch.
     *
     * @param f
     * the frame that must be visited.
     */
    private visitFrame$Frame(f);
    /**
     * Visit the implicit first frame of this method.
     */
    private visitImplicitFirstFrame();
    /**
     * Starts the visit of a stack map frame.
     *
     * @param offset
     * the offset of the instruction to which the frame corresponds.
     * @param nLocal
     * the number of local variables in the frame.
     * @param nStack
     * the number of stack elements in the frame.
     * @return the index of the next element to be written in this frame.
     */
    private startFrame(offset, nLocal, nStack);
    /**
     * Checks if the visit of the current frame {@link #frame} is finished, and
     * if yes, write it in the StackMapTable attribute.
     */
    private endFrame();
    /**
     * Compress and writes the current frame {@link #frame} in the StackMapTable
     * attribute.
     */
    private writeFrame();
    /**
     * Writes some types of the current frame {@link #frame} into the
     * StackMapTableAttribute. This method converts types from the format used
     * in {@link Label} to the format used in StackMapTable attributes. In
     * particular, it converts type table indexes to constant pool indexes.
     *
     * @param start
     * index of the first type in {@link #frame} to write.
     * @param end
     * index of last type in {@link #frame} to write (exclusive).
     */
    private writeFrameTypes(start, end);
    private writeFrameType(type);
    /**
     * Returns the size of the bytecode of this method.
     *
     * @return the size of the bytecode of this method.
     */
    getSize(): number;
    /**
     * Puts the bytecode of this method in the given byte vector.
     *
     * @param out
     * the byte vector into which the bytecode of this method must be
     * copied.
     */
    put(out: ByteVector): void;
}
