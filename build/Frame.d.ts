/**
 * Information about the input and output stack map frames of a basic block.
 *
 * @author Eric Bruneton
 */
import './ClassWriter';
import { ClassWriter } from "./ClassWriter";
import { Type } from "./Type";
import { Label } from "./Label";
import { Item } from "./Item";
export declare class Frame {
    static __static_initialized: boolean;
    static __static_initialize(): void;
    /**
     * Mask to get the dimension of a frame type. This dimension is a signed
     * integer between -8 and 7.
     */
    static DIM: number;
    /**
     * Constant to be added to a type to get a type with one more dimension.
     */
    static ARRAY_OF: number;
    /**
     * Constant to be added to a type to get a type with one less dimension.
     */
    static ELEMENT_OF: number;
    /**
     * Mask to get the kind of a frame type.
     *
     * @see #BASE
     * @see #LOCAL
     * @see #STACK
     */
    static KIND: number;
    /**
     * Flag used for LOCAL and STACK types. Indicates that if this type happens
     * to be a long or double type (during the computations of input frames),
     * then it must be set to TOP because the second word of this value has been
     * reused to store other data in the basic block. Hence the first word no
     * longer stores a valid long or double value.
     */
    static TOP_IF_LONG_OR_DOUBLE: number;
    /**
     * Mask to get the value of a frame type.
     */
    static VALUE: number;
    /**
     * Mask to get the kind of base types.
     */
    static BASE_KIND: number;
    /**
     * Mask to get the value of base types.
     */
    static BASE_VALUE: number;
    /**
     * Kind of the types that are not relative to an input stack map frame.
     */
    static BASE: number;
    /**
     * Base kind of the base reference types. The BASE_VALUE of such types is an
     * index into the type table.
     */
    static OBJECT: number;
    static OBJECT_$LI$(): number;
    /**
     * Base kind of the uninitialized base types. The BASE_VALUE of such types
     * in an index into the type table (the Item at that index contains both an
     * instruction offset and an internal class name).
     */
    static UNINITIALIZED: number;
    static UNINITIALIZED_$LI$(): number;
    /**
     * Kind of the types that are relative to the local variable types of an
     * input stack map frame. The value of such types is a local variable index.
     */
    static LOCAL: number;
    /**
     * Kind of the the types that are relative to the stack of an input stack
     * map frame. The value of such types is a position relatively to the top of
     * this stack.
     */
    static STACK: number;
    /**
     * The TOP type. This is a BASE type.
     */
    static TOP: number;
    static TOP_$LI$(): number;
    /**
     * The BOOLEAN type. This is a BASE type mainly used for array types.
     */
    static BOOLEAN: number;
    static BOOLEAN_$LI$(): number;
    /**
     * The BYTE type. This is a BASE type mainly used for array types.
     */
    static BYTE: number;
    static BYTE_$LI$(): number;
    /**
     * The CHAR type. This is a BASE type mainly used for array types.
     */
    static CHAR: number;
    static CHAR_$LI$(): number;
    /**
     * The SHORT type. This is a BASE type mainly used for array types.
     */
    static SHORT: number;
    static SHORT_$LI$(): number;
    /**
     * The INTEGER type. This is a BASE type.
     */
    static INTEGER: number;
    static INTEGER_$LI$(): number;
    /**
     * The FLOAT type. This is a BASE type.
     */
    static FLOAT: number;
    static FLOAT_$LI$(): number;
    /**
     * The DOUBLE type. This is a BASE type.
     */
    static DOUBLE: number;
    static DOUBLE_$LI$(): number;
    /**
     * The LONG type. This is a BASE type.
     */
    static LONG: number;
    static LONG_$LI$(): number;
    /**
     * The NULL type. This is a BASE type.
     */
    static NULL: number;
    static NULL_$LI$(): number;
    /**
     * The UNINITIALIZED_THIS type. This is a BASE type.
     */
    static UNINITIALIZED_THIS: number;
    static UNINITIALIZED_THIS_$LI$(): number;
    /**
     * The stack size variation corresponding to each JVM instruction. This
     * stack variation is equal to the size of the values produced by an
     * instruction, minus the size of the values consumed by this instruction.
     */
    static SIZE: number[];
    static SIZE_$LI$(): number[];
    static __static_initializer_0(): void;
    /**
     * The label (i.e. basic block) to which these input and output stack map
     * frames correspond.
     */
    owner: Label;
    /**
     * The input stack map frame locals.
     */
    inputLocals: number[];
    /**
     * The input stack map frame stack.
     */
    inputStack: number[];
    /**
     * The output stack map frame locals.
     */
    private outputLocals;
    /**
     * The output stack map frame stack.
     */
    private outputStack;
    /**
     * Relative size of the output stack. The exact semantics of this field
     * depends on the algorithm that is used.
     *
     * When only the maximum stack size is computed, this field is the size of
     * the output stack relatively to the top of the input stack.
     *
     * When the stack map frames are completely computed, this field is the
     * actual number of types in {@link #outputStack}.
     */
    outputStackTop: number;
    /**
     * Number of types that are initialized in the basic block.
     *
     * @see #initializations
     */
    private initializationCount;
    /**
     * The types that are initialized in the basic block. A constructor
     * invocation on an UNINITIALIZED or UNINITIALIZED_THIS type must replace
     * <i>every occurence</i> of this type in the local variables and in the
     * operand stack. This cannot be done during the first phase of the
     * algorithm since, during this phase, the local variables and the operand
     * stack are not completely computed. It is therefore necessary to store the
     * types on which constructors are invoked in the basic block, in order to
     * do this replacement during the second phase of the algorithm, where the
     * frames are fully computed. Note that this array can contain types that
     * are relative to input locals or to the input stack (see below for the
     * description of the algorithm).
     */
    private initializations;
    /**
     * Sets this frame to the given value.
     *
     * @param cw
     * the ClassWriter to which this label belongs.
     * @param nLocal
     * the number of local variables.
     * @param local
     * the local variable types. Primitive types are represented by
     * {@link Opcodes#TOP}, {@link Opcodes#INTEGER},
     * {@link Opcodes#FLOAT}, {@link Opcodes#LONG},
     * {@link Opcodes#DOUBLE},{@link Opcodes#NULL} or
     * {@link Opcodes#UNINITIALIZED_THIS} (long and double are
     * represented by a single element). Reference types are
     * represented by String objects (representing internal names),
     * and uninitialized types by Label objects (this label
     * designates the NEW instruction that created this uninitialized
     * value).
     * @param nStack
     * the number of operand stack elements.
     * @param stack
     * the operand stack types (same format as the "local" array).
     */
    set(cw?: any, nLocal?: any, local?: any, nStack?: any, stack?: any): any;
    /**
     * Converts types from the MethodWriter.visitFrame() format to the Frame
     * format.
     *
     * @param cw
     * the ClassWriter to which this label belongs.
     * @param nInput
     * the number of types to convert.
     * @param input
     * the types to convert. Primitive types are represented by
     * {@link Opcodes#TOP}, {@link Opcodes#INTEGER},
     * {@link Opcodes#FLOAT}, {@link Opcodes#LONG},
     * {@link Opcodes#DOUBLE},{@link Opcodes#NULL} or
     * {@link Opcodes#UNINITIALIZED_THIS} (long and double are
     * represented by a single element). Reference types are
     * represented by String objects (representing internal names),
     * and uninitialized types by Label objects (this label
     * designates the NEW instruction that created this uninitialized
     * value).
     * @param output
     * where to store the converted types.
     * @return the number of output elements.
     */
    private static convert(cw, nInput, input, output);
    /**
     * Sets this frame to the value of the given frame. WARNING: after this
     * method is called the two frames share the same data structures. It is
     * recommended to discard the given frame f to avoid unexpected side
     * effects.
     *
     * @param f
     * The new frame value.
     */
    set$Frame(f: Frame): void;
    /**
     * Returns the output frame local variable type at the given index.
     *
     * @param local
     * the index of the local that must be returned.
     * @return the output frame local variable type at the given index.
     */
    private get(local);
    /**
     * Sets the output frame local variable type at the given index.
     *
     * @param local
     * the index of the local that must be set.
     * @param type
     * the value of the local that must be set.
     */
    private set$int$int(local, type);
    /**
     * Pushes a new type onto the output frame stack.
     *
     * @param type
     * the type that must be pushed.
     */
    private push$int(type);
    /**
     * Pushes a new type onto the output frame stack.
     *
     * @param cw
     * the ClassWriter to which this label belongs.
     * @param desc
     * the descriptor of the type to be pushed. Can also be a method
     * descriptor (in this case this method pushes its return type
     * onto the output frame stack).
     */
    push(cw?: any, desc?: any): any;
    /**
     * Returns the int encoding of the given type.
     *
     * @param cw
     * the ClassWriter to which this label belongs.
     * @param desc
     * a type descriptor.
     * @return the int encoding of the given type.
     */
    private static type(cw, desc);
    /**
     * Pops a type from the output frame stack and returns its value.
     *
     * @return the type that has been popped from the output frame stack.
     */
    private pop$();
    /**
     * Pops the given number of types from the output frame stack.
     *
     * @param elements
     * the number of types that must be popped.
     */
    private pop$int(elements);
    /**
     * Pops a type from the output frame stack.
     *
     * @param desc
     * the descriptor of the type to be popped. Can also be a method
     * descriptor (in this case this method pops the types
     * corresponding to the method arguments).
     */
    pop(desc?: any): any;
    /**
     * Adds a new type to the list of types on which a constructor is invoked in
     * the basic block.
     *
     * @param var
     * a type on a which a constructor is invoked.
     */
    private init$int(__var);
    /**
     * Replaces the given type with the appropriate type if it is one of the
     * types on which a constructor is invoked in the basic block.
     *
     * @param cw
     * the ClassWriter to which this label belongs.
     * @param t
     * a type
     * @return t or, if t is one of the types on which a constructor is invoked
     * in the basic block, the type corresponding to this constructor.
     */
    init(cw?: any, t?: any): any;
    /**
     * Initializes the input frame of the first basic block from the method
     * descriptor.
     *
     * @param cw
     * the ClassWriter to which this label belongs.
     * @param access
     * the access flags of the method to which this label belongs.
     * @param args
     * the formal parameter types of this method.
     * @param maxLocals
     * the maximum number of local variables of this method.
     */
    initInputFrame(cw: ClassWriter, access: number, args: Type[], maxLocals: number): void;
    /**
     * Simulates the action of the given instruction on the output stack frame.
     *
     * @param opcode
     * the opcode of the instruction.
     * @param arg
     * the operand of the instruction, if any.
     * @param cw
     * the class writer to which this label belongs.
     * @param item
     * the operand of the instructions, if any.
     */
    execute(opcode: number, arg: number, cw: ClassWriter, item: Item): void;
    /**
     * Merges the input frame of the given basic block with the input and output
     * frames of this basic block. Returns <tt>true</tt> if the input frame of
     * the given label has been changed by this operation.
     *
     * @param cw
     * the ClassWriter to which this label belongs.
     * @param frame
     * the basic block whose input frame must be updated.
     * @param edge
     * the kind of the {@link Edge} between this label and 'label'.
     * See {@link Edge#info}.
     * @return <tt>true</tt> if the input frame of the given label has been
     * changed by this operation.
     */
    merge(cw: ClassWriter, frame: Frame, edge: number): boolean;
    /**
     * Merges the type at the given index in the given type array with the given
     * type. Returns <tt>true</tt> if the type array has been modified by this
     * operation.
     *
     * @param cw
     * the ClassWriter to which this label belongs.
     * @param t
     * the type with which the type array element must be merged.
     * @param types
     * an array of types.
     * @param index
     * the index of the type that must be merged in 'types'.
     * @return <tt>true</tt> if the type array has been modified by this
     * operation.
     */
    private static merge(cw, t, types, index);
    constructor();
}
