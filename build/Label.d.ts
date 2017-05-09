/// <reference types="node" />
/**
 * A label represents a position in the bytecode of a method. Labels are used
 * for jump, goto, and switch instructions, and for try catch blocks. A label
 * designates the <i>instruction</i> that is just after. Note however that there
 * can be other elements between a label and the instruction it designates (such
 * as other labels, stack map frames, line numbers, etc.).
 *
 * @author Eric Bruneton
 */
import { Edge } from './Edge';
import { MethodWriter } from "./MethodWriter";
import { ByteVector } from "./ByteVector";
import { Frame } from "./Frame";
export declare class Label {
    /**
     * Indicates if this label is only used for debug attributes. Such a label
     * is not the start of a basic block, the target of a jump instruction, or
     * an exception handler. It can be safely ignored in control flow graph
     * analysis algorithms (for optimization purposes).
     */
    static DEBUG: number;
    /**
     * Indicates if the position of this label is known.
     */
    static RESOLVED: number;
    /**
     * Indicates if this label has been updated, after instruction resizing.
     */
    static RESIZED: number;
    /**
     * Indicates if this basic block has been pushed in the basic block stack.
     * See {@link MethodWriter#visitMaxs visitMaxs}.
     */
    static PUSHED: number;
    /**
     * Indicates if this label is the target of a jump instruction, or the start
     * of an exception handler.
     */
    static TARGET: number;
    /**
     * Indicates if a stack map frame must be stored for this label.
     */
    static STORE: number;
    /**
     * Indicates if this label corresponds to a reachable basic block.
     */
    static REACHABLE: number;
    /**
     * Indicates if this basic block ends with a JSR instruction.
     */
    static JSR: number;
    /**
     * Indicates if this basic block ends with a RET instruction.
     */
    static RET: number;
    /**
     * Indicates if this basic block is the start of a subroutine.
     */
    static SUBROUTINE: number;
    /**
     * Indicates if this subroutine basic block has been visited by a
     * visitSubroutine(null, ...) call.
     */
    static VISITED: number;
    /**
     * Indicates if this subroutine basic block has been visited by a
     * visitSubroutine(!null, ...) call.
     */
    static VISITED2: number;
    /**
     * Field used to associate user information to a label. Warning: this field
     * is used by the ASM tree package. In order to use it with the ASM tree
     * package you must override the
     * {@link org.objectweb.asm.tree.MethodNode#getLabelNode} method.
     */
    info: any;
    /**
     * Flags that indicate the status of this label.
     *
     * @see #DEBUG
     * @see #RESOLVED
     * @see #RESIZED
     * @see #PUSHED
     * @see #TARGET
     * @see #STORE
     * @see #REACHABLE
     * @see #JSR
     * @see #RET
     */
    status: number;
    /**
     * The line number corresponding to this label, if known. If there are
     * several lines, each line is stored in a separate label, all linked via
     * their next field (these links are created in ClassReader and removed just
     * before visitLabel is called, so that this does not impact the rest of the
     * code).
     */
    line: number;
    /**
     * The position of this label in the code, if known.
     */
    position: number;
    /**
     * Number of forward references to this label, times two.
     */
    private referenceCount;
    /**
     * Informations about forward references. Each forward reference is
     * described by two consecutive integers in this array: the first one is the
     * position of the first byte of the bytecode instruction that contains the
     * forward reference, while the second is the position of the first byte of
     * the forward reference itself. In fact the sign of the first integer
     * indicates if this reference uses 2 or 4 bytes, and its absolute value
     * gives the position of the bytecode instruction. This array is also used
     * as a bitset to store the subroutines to which a basic block belongs. This
     * information is needed in {@linked MethodWriter#visitMaxs}, after all
     * forward references have been resolved. Hence the same array can be used
     * for both purposes without problems.
     */
    private srcAndRefPositions;
    /**
     * Start of the output stack relatively to the input stack. The exact
     * semantics of this field depends on the algorithm that is used.
     *
     * When only the maximum stack size is computed, this field is the number of
     * elements in the input stack.
     *
     * When the stack map frames are completely computed, this field is the
     * offset of the first output stack element relatively to the top of the
     * input stack. This offset is always negative or null. A null offset means
     * that the output stack must be appended to the input stack. A -n offset
     * means that the first n output stack elements must replace the top n input
     * stack elements, and that the other elements must be appended to the input
     * stack.
     */
    inputStackTop: number;
    /**
     * Maximum height reached by the output stack, relatively to the top of the
     * input stack. This maximum is always positive or null.
     */
    outputStackMax: number;
    /**
     * Information about the input and output stack map frames of this basic
     * block. This field is only used when {@link ClassWriter#COMPUTE_FRAMES}
     * option is used.
     */
    frame: Frame;
    /**
     * The successor of this label, in the order they are visited. This linked
     * list does not include labels used for debug info only. If
     * {@link ClassWriter#COMPUTE_FRAMES} option is used then, in addition, it
     * does not contain successive labels that denote the same bytecode position
     * (in this case only the first label appears in this list).
     */
    successor: Label;
    /**
     * The successors of this node in the control flow graph. These successors
     * are stored in a linked list of {@link Edge Edge} objects, linked to each
     * other by their {@link Edge#next} field.
     */
    successors: Edge;
    /**
     * The next basic block in the basic block stack. This stack is used in the
     * main loop of the fix point algorithm used in the second step of the
     * control flow analysis algorithms. It is also used in
     * {@link #visitSubroutine} to avoid using a recursive method, and in
     * ClassReader to temporarily store multiple source lines for a label.
     *
     * @see MethodWriter#visitMaxs
     */
    next: Label;
    /**
     * Constructs a new label.
     */
    constructor();
    /**
     * Returns the offset corresponding to this label. This offset is computed
     * from the start of the method's bytecode. <i>This method is intended for
     * {@link Attribute} sub classes, and is normally not needed by class
     * generators or adapters.</i>
     *
     * @return the offset corresponding to this label.
     * @throws IllegalStateException
     * if this label is not resolved yet.
     */
    getOffset(): number;
    /**
     * Puts a reference to this label in the bytecode of a method. If the
     * position of the label is known, the offset is computed and written
     * directly. Otherwise, a null offset is written and a new forward reference
     * is declared for this label.
     *
     * @param owner
     * the code writer that calls this method.
     * @param out
     * the bytecode of the method.
     * @param source
     * the position of first byte of the bytecode instruction that
     * contains this label.
     * @param wideOffset
     * <tt>true</tt> if the reference must be stored in 4 bytes, or
     * <tt>false</tt> if it must be stored with 2 bytes.
     * @throws IllegalArgumentException
     * if this label has not been created by the given code writer.
     */
    put(owner: MethodWriter, out: ByteVector, source: number, wideOffset: boolean): void;
    /**
     * Adds a forward reference to this label. This method must be called only
     * for a true forward reference, i.e. only if this label is not resolved
     * yet. For backward references, the offset of the reference can be, and
     * must be, computed and stored directly.
     *
     * @param sourcePosition
     * the position of the referencing instruction. This position
     * will be used to compute the offset of this forward reference.
     * @param referencePosition
     * the position where the offset for this forward reference must
     * be stored.
     */
    private addReference(sourcePosition, referencePosition);
    /**
     * Resolves all forward references to this label. This method must be called
     * when this label is added to the bytecode of the method, i.e. when its
     * position becomes known. This method fills in the blanks that where left
     * in the bytecode by each forward reference previously added to this label.
     *
     * @param owner
     * the code writer that calls this method.
     * @param position
     * the position of this label in the bytecode.
     * @param data
     * the bytecode of the method.
     * @return <tt>true</tt> if a blank that was left for this label was to
     * small to store the offset. In such a case the corresponding jump
     * instruction is replaced with a pseudo instruction (using unused
     * opcodes) using an unsigned two bytes offset. These pseudo
     * instructions will be replaced with standard bytecode instructions
     * with wider offsets (4 bytes instead of 2), in ClassReader.
     * @throws IllegalArgumentException
     * if this label has already been resolved, or if it has not
     * been created by the given code writer.
     */
    resolve(owner: MethodWriter, position: number, data: Buffer): boolean;
    /**
     * Returns the first label of the series to which this label belongs. For an
     * isolated label or for the first label in a series of successive labels,
     * this method returns the label itself. For other labels it returns the
     * first label of the series.
     *
     * @return the first label of the series to which this label belongs.
     */
    getFirst(): Label;
    /**
     * Returns true is this basic block belongs to the given subroutine.
     *
     * @param id
     * a subroutine id.
     * @return true is this basic block belongs to the given subroutine.
     */
    inSubroutine(id: number): boolean;
    /**
     * Returns true if this basic block and the given one belong to a common
     * subroutine.
     *
     * @param block
     * another basic block.
     * @return true if this basic block and the given one belong to a common
     * subroutine.
     */
    inSameSubroutine(block: Label): boolean;
    /**
     * Marks this basic block as belonging to the given subroutine.
     *
     * @param id
     * a subroutine id.
     * @param nbSubroutines
     * the total number of subroutines in the method.
     */
    addToSubroutine(id: number, nbSubroutines: number): void;
    /**
     * Finds the basic blocks that belong to a given subroutine, and marks these
     * blocks as belonging to this subroutine. This method follows the control
     * flow graph to find all the blocks that are reachable from the current
     * block WITHOUT following any JSR target.
     *
     * @param JSR
     * a JSR block that jumps to this subroutine. If this JSR is not
     * null it is added to the successor of the RET blocks found in
     * the subroutine.
     * @param id
     * the id of this subroutine.
     * @param nbSubroutines
     * the total number of subroutines in the method.
     */
    visitSubroutine(JSR: Label, id: number, nbSubroutines: number): void;
    /**
     * Returns a string representation of this label.
     *
     * @return a string representation of this label.
     */
    toString(): string;
}
