"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * Information about the input and output stack map frames of a basic block.
 *
 * @author Eric Bruneton
 */
require("./ClassWriter");
const Opcodes_1 = require("./Opcodes");
const ClassWriter_1 = require("./ClassWriter");
const MethodWriter_1 = require("./MethodWriter");
const Type_1 = require("./Type");
class Frame {
    constructor() {
        this.outputStackTop = 0;
        this.initializationCount = 0;
    }
    static __static_initialize() { if (!Frame.__static_initialized) {
        Frame.__static_initialized = true;
        Frame.__static_initializer_0();
    } }
    static OBJECT_$LI$() { Frame.__static_initialize(); if (Frame.OBJECT == null)
        Frame.OBJECT = Frame.BASE | 7340032; return Frame.OBJECT; }
    ;
    static UNINITIALIZED_$LI$() { Frame.__static_initialize(); if (Frame.UNINITIALIZED == null)
        Frame.UNINITIALIZED = Frame.BASE | 8388608; return Frame.UNINITIALIZED; }
    ;
    static TOP_$LI$() { Frame.__static_initialize(); if (Frame.TOP == null)
        Frame.TOP = Frame.BASE | 0; return Frame.TOP; }
    ;
    static BOOLEAN_$LI$() { Frame.__static_initialize(); if (Frame.BOOLEAN == null)
        Frame.BOOLEAN = Frame.BASE | 9; return Frame.BOOLEAN; }
    ;
    static BYTE_$LI$() { Frame.__static_initialize(); if (Frame.BYTE == null)
        Frame.BYTE = Frame.BASE | 10; return Frame.BYTE; }
    ;
    static CHAR_$LI$() { Frame.__static_initialize(); if (Frame.CHAR == null)
        Frame.CHAR = Frame.BASE | 11; return Frame.CHAR; }
    ;
    static SHORT_$LI$() { Frame.__static_initialize(); if (Frame.SHORT == null)
        Frame.SHORT = Frame.BASE | 12; return Frame.SHORT; }
    ;
    static INTEGER_$LI$() { Frame.__static_initialize(); if (Frame.INTEGER == null)
        Frame.INTEGER = Frame.BASE | 1; return Frame.INTEGER; }
    ;
    static FLOAT_$LI$() { Frame.__static_initialize(); if (Frame.FLOAT == null)
        Frame.FLOAT = Frame.BASE | 2; return Frame.FLOAT; }
    ;
    static DOUBLE_$LI$() { Frame.__static_initialize(); if (Frame.DOUBLE == null)
        Frame.DOUBLE = Frame.BASE | 3; return Frame.DOUBLE; }
    ;
    static LONG_$LI$() { Frame.__static_initialize(); if (Frame.LONG == null)
        Frame.LONG = Frame.BASE | 4; return Frame.LONG; }
    ;
    static NULL_$LI$() { Frame.__static_initialize(); if (Frame.NULL == null)
        Frame.NULL = Frame.BASE | 5; return Frame.NULL; }
    ;
    static UNINITIALIZED_THIS_$LI$() { Frame.__static_initialize(); if (Frame.UNINITIALIZED_THIS == null)
        Frame.UNINITIALIZED_THIS = Frame.BASE | 6; return Frame.UNINITIALIZED_THIS; }
    ;
    static SIZE_$LI$() { Frame.__static_initialize(); return Frame.SIZE; }
    ;
    static __static_initializer_0() {
        let i;
        let b = new Array(202);
        let s = "EFFFFFFFFGGFFFGGFFFEEFGFGFEEEEEEEEEEEEEEEEEEEEDEDEDDDDDCDCDEEEEEEEEEEEEEEEEEEEEBABABBBBDCFFFGGGEDCDCDCDCDCDCDCDCDCDCEEEEDDDDDDDCDCDCEFEFDDEEFFDEDEEEBDDBBDDDDDDCCCCCCCCEFEDDDCDCDEEEEEEEEEEFEEEEEEDDEEDDEE";
        for (i = 0; i < b.length; ++i) {
            b[i] = (s.charAt(i)).charCodeAt(0) - ('E').charCodeAt(0);
        }
        Frame.SIZE = b;
    }
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
    set(cw, nLocal, local, nStack, stack) {
        if (((cw != null && cw instanceof ClassWriter_1.ClassWriter) || cw === null) && ((typeof nLocal === 'number') || nLocal === null) && ((local != null && local instanceof Array) || local === null) && ((typeof nStack === 'number') || nStack === null) && ((stack != null && stack instanceof Array) || stack === null)) {
            let __args = Array.prototype.slice.call(arguments);
            return (() => {
                let i = Frame.convert(cw, nLocal, local, this.inputLocals);
                while ((i < local.length)) {
                    this.inputLocals[i++] = Frame.TOP_$LI$();
                }
                ;
                let nStackTop = 0;
                for (let j = 0; j < nStack; ++j) {
                    if (stack[j] === Opcodes_1.Opcodes.LONG || stack[j] === Opcodes_1.Opcodes.DOUBLE) {
                        ++nStackTop;
                    }
                }
                this.inputStack = new Array(nStack + nStackTop);
                Frame.convert(cw, nStack, stack, this.inputStack);
                this.outputStackTop = 0;
                this.initializationCount = 0;
            })();
        }
        else if (((typeof cw === 'number') || cw === null) && ((typeof nLocal === 'number') || nLocal === null) && local === undefined && nStack === undefined && stack === undefined) {
            return this.set$int$int(cw, nLocal);
        }
        else if (((cw != null && cw instanceof Frame) || cw === null) && nLocal === undefined && local === undefined && nStack === undefined && stack === undefined) {
            return this.set$Frame(cw);
        }
        else
            throw new Error('invalid overload');
    }
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
    static convert(cw, nInput, input, output) {
        let i = 0;
        for (let j = 0; j < nInput; ++j) {
            if (typeof input[j] === 'number') {
                output[i++] = Frame.BASE | (input[j] | 0);
                if (input[j] === Opcodes_1.Opcodes.LONG || input[j] === Opcodes_1.Opcodes.DOUBLE) {
                    output[i++] = Frame.TOP_$LI$();
                }
            }
            else if (typeof input[j] === 'string') {
                output[i++] = Frame.type(cw, Type_1.Type.getObjectType(input[j]).getDescriptor());
            }
            else {
                output[i++] = Frame.UNINITIALIZED_$LI$() | cw.addUninitializedType("", input[j].position);
            }
        }
        return i;
    }
    /**
     * Sets this frame to the value of the given frame. WARNING: after this
     * method is called the two frames share the same data structures. It is
     * recommended to discard the given frame f to avoid unexpected side
     * effects.
     *
     * @param f
     * The new frame value.
     */
    set$Frame(f) {
        this.inputLocals = f.inputLocals;
        this.inputStack = f.inputStack;
        this.outputLocals = f.outputLocals;
        this.outputStack = f.outputStack;
        this.outputStackTop = f.outputStackTop;
        this.initializationCount = f.initializationCount;
        this.initializations = f.initializations;
    }
    /**
     * Returns the output frame local variable type at the given index.
     *
     * @param local
     * the index of the local that must be returned.
     * @return the output frame local variable type at the given index.
     */
    get(local) {
        if (this.outputLocals == null || local >= this.outputLocals.length) {
            return Frame.LOCAL | local;
        }
        else {
            let type = this.outputLocals[local];
            if (type === 0) {
                type = this.outputLocals[local] = Frame.LOCAL | local;
            }
            return type;
        }
    }
    /**
     * Sets the output frame local variable type at the given index.
     *
     * @param local
     * the index of the local that must be set.
     * @param type
     * the value of the local that must be set.
     */
    set$int$int(local, type) {
        if (this.outputLocals == null) {
            this.outputLocals = new Array(10);
        }
        let n = this.outputLocals.length;
        if (local >= n) {
            let t = new Array(Math.max(local + 1, 2 * n));
            for (let i = 0; i < n; i++) {
                t[i] = this.outputLocals[i];
            }
            // java.lang.System.arraycopy(this.outputLocals, 0, t, 0, n);
            this.outputLocals = t;
        }
        this.outputLocals[local] = type;
    }
    /**
     * Pushes a new type onto the output frame stack.
     *
     * @param type
     * the type that must be pushed.
     */
    push$int(type) {
        if (this.outputStack == null) {
            this.outputStack = new Array(10);
        }
        let n = this.outputStack.length;
        if (this.outputStackTop >= n) {
            let t = new Array(Math.max(this.outputStackTop + 1, 2 * n));
            for (let i = 0; i < n; i++) {
                t[i] = this.outputStack[i];
            }
            // java.lang.System.arraycopy(this.outputStack, 0, t, 0, n);
            this.outputStack = t;
        }
        this.outputStack[this.outputStackTop++] = type;
        let top = this.owner.inputStackTop + this.outputStackTop;
        if (top > this.owner.outputStackMax) {
            this.owner.outputStackMax = top;
        }
    }
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
    push(cw, desc) {
        if (((cw != null && cw instanceof ClassWriter_1.ClassWriter) || cw === null) && ((typeof desc === 'string') || desc === null)) {
            let __args = Array.prototype.slice.call(arguments);
            return (() => {
                let type = Frame.type(cw, desc);
                if (type !== 0) {
                    this.push(type);
                    if (type === Frame.LONG_$LI$() || type === Frame.DOUBLE_$LI$()) {
                        this.push(Frame.TOP_$LI$());
                    }
                }
            })();
        }
        else if (((typeof cw === 'number') || cw === null) && desc === undefined) {
            return this.push$int(cw);
        }
        else
            throw new Error('invalid overload');
    }
    /**
     * Returns the int encoding of the given type.
     *
     * @param cw
     * the ClassWriter to which this label belongs.
     * @param desc
     * a type descriptor.
     * @return the int encoding of the given type.
     */
    static type(cw, desc) {
        let t;
        let index = desc.charAt(0) === '(' ? desc.indexOf(')') + 1 : 0;
        switch ((desc.charAt(index))) {
            case 'V':
                return 0;
            case 'Z':
            case 'C':
            case 'B':
            case 'S':
            case 'I':
                return Frame.INTEGER_$LI$();
            case 'F':
                return Frame.FLOAT_$LI$();
            case 'J':
                return Frame.LONG_$LI$();
            case 'D':
                return Frame.DOUBLE_$LI$();
            case 'L':
                t = desc.substring(index + 1, desc.length - 1);
                return Frame.OBJECT_$LI$() | cw.addType(t);
            default:
                let data;
                let dims = index + 1;
                while ((desc.charAt(dims) === '[')) {
                    ++dims;
                }
                ;
                switch ((desc.charAt(dims))) {
                    case 'Z':
                        data = Frame.BOOLEAN_$LI$();
                        break;
                    case 'C':
                        data = Frame.CHAR_$LI$();
                        break;
                    case 'B':
                        data = Frame.BYTE_$LI$();
                        break;
                    case 'S':
                        data = Frame.SHORT_$LI$();
                        break;
                    case 'I':
                        data = Frame.INTEGER_$LI$();
                        break;
                    case 'F':
                        data = Frame.FLOAT_$LI$();
                        break;
                    case 'J':
                        data = Frame.LONG_$LI$();
                        break;
                    case 'D':
                        data = Frame.DOUBLE_$LI$();
                        break;
                    default:
                        t = desc.substring(dims + 1, desc.length - 1);
                        data = Frame.OBJECT_$LI$() | cw.addType(t);
                }
                return (dims - index) << 28 | data;
        }
    }
    /**
     * Pops a type from the output frame stack and returns its value.
     *
     * @return the type that has been popped from the output frame stack.
     */
    pop$() {
        if (this.outputStackTop > 0) {
            return this.outputStack[--this.outputStackTop];
        }
        else {
            return Frame.STACK | -(--this.owner.inputStackTop);
        }
    }
    /**
     * Pops the given number of types from the output frame stack.
     *
     * @param elements
     * the number of types that must be popped.
     */
    pop$int(elements) {
        if (this.outputStackTop >= elements) {
            this.outputStackTop -= elements;
        }
        else {
            this.owner.inputStackTop -= elements - this.outputStackTop;
            this.outputStackTop = 0;
        }
    }
    /**
     * Pops a type from the output frame stack.
     *
     * @param desc
     * the descriptor of the type to be popped. Can also be a method
     * descriptor (in this case this method pops the types
     * corresponding to the method arguments).
     */
    pop(desc) {
        if (((typeof desc === 'string') || desc === null)) {
            let __args = Array.prototype.slice.call(arguments);
            return (() => {
                let c = desc.charAt(0);
                if (c === '(') {
                    this.pop((Type_1.Type.getArgumentsAndReturnSizes(desc) >> 2) - 1);
                }
                else if (c === 'J' || c === 'D') {
                    this.pop(2);
                }
                else {
                    this.pop(1);
                }
            })();
        }
        else if (((typeof desc === 'number') || desc === null)) {
            return this.pop$int(desc);
        }
        else if (desc === undefined) {
            return this.pop$();
        }
        else
            throw new Error('invalid overload');
    }
    /**
     * Adds a new type to the list of types on which a constructor is invoked in
     * the basic block.
     *
     * @param var
     * a type on a which a constructor is invoked.
     */
    init$int(__var) {
        if (this.initializations == null) {
            this.initializations = new Array(2);
        }
        let n = this.initializations.length;
        if (this.initializationCount >= n) {
            let t = new Array(Math.max(this.initializationCount + 1, 2 * n));
            for (let i = 0; i < n; i++) {
                t[i] = this.initializations[i];
            }
            // java.lang.System.arraycopy(this.initializations, 0, t, 0, n);
            this.initializations = t;
        }
        this.initializations[this.initializationCount++] = __var;
    }
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
    init(cw, t) {
        if (((cw != null && cw instanceof ClassWriter_1.ClassWriter) || cw === null) && ((typeof t === 'number') || t === null)) {
            let __args = Array.prototype.slice.call(arguments);
            return (() => {
                let s;
                if (t === Frame.UNINITIALIZED_THIS_$LI$()) {
                    s = Frame.OBJECT_$LI$() | cw.addType(cw.thisName);
                }
                else if ((t & (Frame.DIM | Frame.BASE_KIND)) === Frame.UNINITIALIZED_$LI$()) {
                    let type = cw.typeTable[t & Frame.BASE_VALUE].strVal1;
                    s = Frame.OBJECT_$LI$() | cw.addType(type);
                }
                else {
                    return t;
                }
                for (let j = 0; j < this.initializationCount; ++j) {
                    let u = this.initializations[j];
                    let dim = u & Frame.DIM;
                    let kind = u & Frame.KIND;
                    if (kind === Frame.LOCAL) {
                        u = dim + this.inputLocals[u & Frame.VALUE];
                    }
                    else if (kind === Frame.STACK) {
                        u = dim + this.inputStack[this.inputStack.length - (u & Frame.VALUE)];
                    }
                    if (t === u) {
                        return s;
                    }
                }
                return t;
            })();
        }
        else if (((typeof cw === 'number') || cw === null) && t === undefined) {
            return this.init$int(cw);
        }
        else
            throw new Error('invalid overload');
    }
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
    initInputFrame(cw, access, args, maxLocals) {
        this.inputLocals = new Array(maxLocals);
        this.inputStack = new Array(0);
        let i = 0;
        if ((access & Opcodes_1.Opcodes.ACC_STATIC) === 0) {
            if ((access & MethodWriter_1.MethodWriter.ACC_CONSTRUCTOR) === 0) {
                this.inputLocals[i++] = Frame.OBJECT_$LI$() | cw.addType(cw.thisName);
            }
            else {
                this.inputLocals[i++] = Frame.UNINITIALIZED_THIS_$LI$();
            }
        }
        for (let j = 0; j < args.length; ++j) {
            let t = Frame.type(cw, args[j].getDescriptor());
            this.inputLocals[i++] = t;
            if (t === Frame.LONG_$LI$() || t === Frame.DOUBLE_$LI$()) {
                this.inputLocals[i++] = Frame.TOP_$LI$();
            }
        }
        while ((i < maxLocals)) {
            this.inputLocals[i++] = Frame.TOP_$LI$();
        }
        ;
    }
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
    execute(opcode, arg, cw, item) {
        let t1;
        let t2;
        let t3;
        let t4;
        switch ((opcode)) {
            case Opcodes_1.Opcodes.NOP:
            case Opcodes_1.Opcodes.INEG:
            case Opcodes_1.Opcodes.LNEG:
            case Opcodes_1.Opcodes.FNEG:
            case Opcodes_1.Opcodes.DNEG:
            case Opcodes_1.Opcodes.I2B:
            case Opcodes_1.Opcodes.I2C:
            case Opcodes_1.Opcodes.I2S:
            case Opcodes_1.Opcodes.GOTO:
            case Opcodes_1.Opcodes.RETURN:
                break;
            case Opcodes_1.Opcodes.ACONST_NULL:
                this.push(Frame.NULL_$LI$());
                break;
            case Opcodes_1.Opcodes.ICONST_M1:
            case Opcodes_1.Opcodes.ICONST_0:
            case Opcodes_1.Opcodes.ICONST_1:
            case Opcodes_1.Opcodes.ICONST_2:
            case Opcodes_1.Opcodes.ICONST_3:
            case Opcodes_1.Opcodes.ICONST_4:
            case Opcodes_1.Opcodes.ICONST_5:
            case Opcodes_1.Opcodes.BIPUSH:
            case Opcodes_1.Opcodes.SIPUSH:
            case Opcodes_1.Opcodes.ILOAD:
                this.push(Frame.INTEGER_$LI$());
                break;
            case Opcodes_1.Opcodes.LCONST_0:
            case Opcodes_1.Opcodes.LCONST_1:
            case Opcodes_1.Opcodes.LLOAD:
                this.push(Frame.LONG_$LI$());
                this.push(Frame.TOP_$LI$());
                break;
            case Opcodes_1.Opcodes.FCONST_0:
            case Opcodes_1.Opcodes.FCONST_1:
            case Opcodes_1.Opcodes.FCONST_2:
            case Opcodes_1.Opcodes.FLOAD:
                this.push(Frame.FLOAT_$LI$());
                break;
            case Opcodes_1.Opcodes.DCONST_0:
            case Opcodes_1.Opcodes.DCONST_1:
            case Opcodes_1.Opcodes.DLOAD:
                this.push(Frame.DOUBLE_$LI$());
                this.push(Frame.TOP_$LI$());
                break;
            case Opcodes_1.Opcodes.LDC:
                switch ((item.type)) {
                    case ClassWriter_1.ClassWriter.INT:
                        this.push(Frame.INTEGER_$LI$());
                        break;
                    case ClassWriter_1.ClassWriter.LONG:
                        this.push(Frame.LONG_$LI$());
                        this.push(Frame.TOP_$LI$());
                        break;
                    case ClassWriter_1.ClassWriter.FLOAT:
                        this.push(Frame.FLOAT_$LI$());
                        break;
                    case ClassWriter_1.ClassWriter.DOUBLE:
                        this.push(Frame.DOUBLE_$LI$());
                        this.push(Frame.TOP_$LI$());
                        break;
                    case ClassWriter_1.ClassWriter.CLASS:
                        this.push(Frame.OBJECT_$LI$() | cw.addType("java/lang/Class"));
                        break;
                    case ClassWriter_1.ClassWriter.STR:
                        this.push(Frame.OBJECT_$LI$() | cw.addType("java/lang/String"));
                        break;
                    case ClassWriter_1.ClassWriter.MTYPE:
                        this.push(Frame.OBJECT_$LI$() | cw.addType("java/lang/invoke/MethodType"));
                        break;
                    default:
                        this.push(Frame.OBJECT_$LI$() | cw.addType("java/lang/invoke/MethodHandle"));
                }
                break;
            case Opcodes_1.Opcodes.ALOAD:
                this.push(this.get(arg));
                break;
            case Opcodes_1.Opcodes.IALOAD:
            case Opcodes_1.Opcodes.BALOAD:
            case Opcodes_1.Opcodes.CALOAD:
            case Opcodes_1.Opcodes.SALOAD:
                this.pop(2);
                this.push(Frame.INTEGER_$LI$());
                break;
            case Opcodes_1.Opcodes.LALOAD:
            case Opcodes_1.Opcodes.D2L:
                this.pop(2);
                this.push(Frame.LONG_$LI$());
                this.push(Frame.TOP_$LI$());
                break;
            case Opcodes_1.Opcodes.FALOAD:
                this.pop(2);
                this.push(Frame.FLOAT_$LI$());
                break;
            case Opcodes_1.Opcodes.DALOAD:
            case Opcodes_1.Opcodes.L2D:
                this.pop(2);
                this.push(Frame.DOUBLE_$LI$());
                this.push(Frame.TOP_$LI$());
                break;
            case Opcodes_1.Opcodes.AALOAD:
                this.pop(1);
                t1 = this.pop();
                this.push(Frame.ELEMENT_OF + t1);
                break;
            case Opcodes_1.Opcodes.ISTORE:
            case Opcodes_1.Opcodes.FSTORE:
            case Opcodes_1.Opcodes.ASTORE:
                t1 = this.pop();
                this.set(arg, t1);
                if (arg > 0) {
                    t2 = this.get(arg - 1);
                    if (t2 === Frame.LONG_$LI$() || t2 === Frame.DOUBLE_$LI$()) {
                        this.set(arg - 1, Frame.TOP_$LI$());
                    }
                    else if ((t2 & Frame.KIND) !== Frame.BASE) {
                        this.set(arg - 1, t2 | Frame.TOP_IF_LONG_OR_DOUBLE);
                    }
                }
                break;
            case Opcodes_1.Opcodes.LSTORE:
            case Opcodes_1.Opcodes.DSTORE:
                this.pop(1);
                t1 = this.pop();
                this.set(arg, t1);
                this.set(arg + 1, Frame.TOP_$LI$());
                if (arg > 0) {
                    t2 = this.get(arg - 1);
                    if (t2 === Frame.LONG_$LI$() || t2 === Frame.DOUBLE_$LI$()) {
                        this.set(arg - 1, Frame.TOP_$LI$());
                    }
                    else if ((t2 & Frame.KIND) !== Frame.BASE) {
                        this.set(arg - 1, t2 | Frame.TOP_IF_LONG_OR_DOUBLE);
                    }
                }
                break;
            case Opcodes_1.Opcodes.IASTORE:
            case Opcodes_1.Opcodes.BASTORE:
            case Opcodes_1.Opcodes.CASTORE:
            case Opcodes_1.Opcodes.SASTORE:
            case Opcodes_1.Opcodes.FASTORE:
            case Opcodes_1.Opcodes.AASTORE:
                this.pop(3);
                break;
            case Opcodes_1.Opcodes.LASTORE:
            case Opcodes_1.Opcodes.DASTORE:
                this.pop(4);
                break;
            case Opcodes_1.Opcodes.POP:
            case Opcodes_1.Opcodes.IFEQ:
            case Opcodes_1.Opcodes.IFNE:
            case Opcodes_1.Opcodes.IFLT:
            case Opcodes_1.Opcodes.IFGE:
            case Opcodes_1.Opcodes.IFGT:
            case Opcodes_1.Opcodes.IFLE:
            case Opcodes_1.Opcodes.IRETURN:
            case Opcodes_1.Opcodes.FRETURN:
            case Opcodes_1.Opcodes.ARETURN:
            case Opcodes_1.Opcodes.TABLESWITCH:
            case Opcodes_1.Opcodes.LOOKUPSWITCH:
            case Opcodes_1.Opcodes.ATHROW:
            case Opcodes_1.Opcodes.MONITORENTER:
            case Opcodes_1.Opcodes.MONITOREXIT:
            case Opcodes_1.Opcodes.IFNULL:
            case Opcodes_1.Opcodes.IFNONNULL:
                this.pop(1);
                break;
            case Opcodes_1.Opcodes.POP2:
            case Opcodes_1.Opcodes.IF_ICMPEQ:
            case Opcodes_1.Opcodes.IF_ICMPNE:
            case Opcodes_1.Opcodes.IF_ICMPLT:
            case Opcodes_1.Opcodes.IF_ICMPGE:
            case Opcodes_1.Opcodes.IF_ICMPGT:
            case Opcodes_1.Opcodes.IF_ICMPLE:
            case Opcodes_1.Opcodes.IF_ACMPEQ:
            case Opcodes_1.Opcodes.IF_ACMPNE:
            case Opcodes_1.Opcodes.LRETURN:
            case Opcodes_1.Opcodes.DRETURN:
                this.pop(2);
                break;
            case Opcodes_1.Opcodes.DUP:
                t1 = this.pop();
                this.push(t1);
                this.push(t1);
                break;
            case Opcodes_1.Opcodes.DUP_X1:
                t1 = this.pop();
                t2 = this.pop();
                this.push(t1);
                this.push(t2);
                this.push(t1);
                break;
            case Opcodes_1.Opcodes.DUP_X2:
                t1 = this.pop();
                t2 = this.pop();
                t3 = this.pop();
                this.push(t1);
                this.push(t3);
                this.push(t2);
                this.push(t1);
                break;
            case Opcodes_1.Opcodes.DUP2:
                t1 = this.pop();
                t2 = this.pop();
                this.push(t2);
                this.push(t1);
                this.push(t2);
                this.push(t1);
                break;
            case Opcodes_1.Opcodes.DUP2_X1:
                t1 = this.pop();
                t2 = this.pop();
                t3 = this.pop();
                this.push(t2);
                this.push(t1);
                this.push(t3);
                this.push(t2);
                this.push(t1);
                break;
            case Opcodes_1.Opcodes.DUP2_X2:
                t1 = this.pop();
                t2 = this.pop();
                t3 = this.pop();
                t4 = this.pop();
                this.push(t2);
                this.push(t1);
                this.push(t4);
                this.push(t3);
                this.push(t2);
                this.push(t1);
                break;
            case Opcodes_1.Opcodes.SWAP:
                t1 = this.pop();
                t2 = this.pop();
                this.push(t1);
                this.push(t2);
                break;
            case Opcodes_1.Opcodes.IADD:
            case Opcodes_1.Opcodes.ISUB:
            case Opcodes_1.Opcodes.IMUL:
            case Opcodes_1.Opcodes.IDIV:
            case Opcodes_1.Opcodes.IREM:
            case Opcodes_1.Opcodes.IAND:
            case Opcodes_1.Opcodes.IOR:
            case Opcodes_1.Opcodes.IXOR:
            case Opcodes_1.Opcodes.ISHL:
            case Opcodes_1.Opcodes.ISHR:
            case Opcodes_1.Opcodes.IUSHR:
            case Opcodes_1.Opcodes.L2I:
            case Opcodes_1.Opcodes.D2I:
            case Opcodes_1.Opcodes.FCMPL:
            case Opcodes_1.Opcodes.FCMPG:
                this.pop(2);
                this.push(Frame.INTEGER_$LI$());
                break;
            case Opcodes_1.Opcodes.LADD:
            case Opcodes_1.Opcodes.LSUB:
            case Opcodes_1.Opcodes.LMUL:
            case Opcodes_1.Opcodes.LDIV:
            case Opcodes_1.Opcodes.LREM:
            case Opcodes_1.Opcodes.LAND:
            case Opcodes_1.Opcodes.LOR:
            case Opcodes_1.Opcodes.LXOR:
                this.pop(4);
                this.push(Frame.LONG_$LI$());
                this.push(Frame.TOP_$LI$());
                break;
            case Opcodes_1.Opcodes.FADD:
            case Opcodes_1.Opcodes.FSUB:
            case Opcodes_1.Opcodes.FMUL:
            case Opcodes_1.Opcodes.FDIV:
            case Opcodes_1.Opcodes.FREM:
            case Opcodes_1.Opcodes.L2F:
            case Opcodes_1.Opcodes.D2F:
                this.pop(2);
                this.push(Frame.FLOAT_$LI$());
                break;
            case Opcodes_1.Opcodes.DADD:
            case Opcodes_1.Opcodes.DSUB:
            case Opcodes_1.Opcodes.DMUL:
            case Opcodes_1.Opcodes.DDIV:
            case Opcodes_1.Opcodes.DREM:
                this.pop(4);
                this.push(Frame.DOUBLE_$LI$());
                this.push(Frame.TOP_$LI$());
                break;
            case Opcodes_1.Opcodes.LSHL:
            case Opcodes_1.Opcodes.LSHR:
            case Opcodes_1.Opcodes.LUSHR:
                this.pop(3);
                this.push(Frame.LONG_$LI$());
                this.push(Frame.TOP_$LI$());
                break;
            case Opcodes_1.Opcodes.IINC:
                this.set(arg, Frame.INTEGER_$LI$());
                break;
            case Opcodes_1.Opcodes.I2L:
            case Opcodes_1.Opcodes.F2L:
                this.pop(1);
                this.push(Frame.LONG_$LI$());
                this.push(Frame.TOP_$LI$());
                break;
            case Opcodes_1.Opcodes.I2F:
                this.pop(1);
                this.push(Frame.FLOAT_$LI$());
                break;
            case Opcodes_1.Opcodes.I2D:
            case Opcodes_1.Opcodes.F2D:
                this.pop(1);
                this.push(Frame.DOUBLE_$LI$());
                this.push(Frame.TOP_$LI$());
                break;
            case Opcodes_1.Opcodes.F2I:
            case Opcodes_1.Opcodes.ARRAYLENGTH:
            case Opcodes_1.Opcodes.INSTANCEOF:
                this.pop(1);
                this.push(Frame.INTEGER_$LI$());
                break;
            case Opcodes_1.Opcodes.LCMP:
            case Opcodes_1.Opcodes.DCMPL:
            case Opcodes_1.Opcodes.DCMPG:
                this.pop(4);
                this.push(Frame.INTEGER_$LI$());
                break;
            case Opcodes_1.Opcodes.JSR:
            case Opcodes_1.Opcodes.RET:
                throw new Error("JSR/RET are not supported with computeFrames option");
            case Opcodes_1.Opcodes.GETSTATIC:
                this.push(cw, item.strVal3);
                break;
            case Opcodes_1.Opcodes.PUTSTATIC:
                this.pop(item.strVal3);
                break;
            case Opcodes_1.Opcodes.GETFIELD:
                this.pop(1);
                this.push(cw, item.strVal3);
                break;
            case Opcodes_1.Opcodes.PUTFIELD:
                this.pop(item.strVal3);
                this.pop();
                break;
            case Opcodes_1.Opcodes.INVOKEVIRTUAL:
            case Opcodes_1.Opcodes.INVOKESPECIAL:
            case Opcodes_1.Opcodes.INVOKESTATIC:
            case Opcodes_1.Opcodes.INVOKEINTERFACE:
                this.pop(item.strVal3);
                if (opcode !== Opcodes_1.Opcodes.INVOKESTATIC) {
                    t1 = this.pop();
                    if (opcode === Opcodes_1.Opcodes.INVOKESPECIAL && item.strVal2.charAt(0) === '<') {
                        this.init(t1);
                    }
                }
                this.push(cw, item.strVal3);
                break;
            case Opcodes_1.Opcodes.INVOKEDYNAMIC:
                this.pop(item.strVal2);
                this.push(cw, item.strVal2);
                break;
            case Opcodes_1.Opcodes.NEW:
                this.push(Frame.UNINITIALIZED_$LI$() | cw.addUninitializedType(item.strVal1, arg));
                break;
            case Opcodes_1.Opcodes.NEWARRAY:
                this.pop();
                switch ((arg)) {
                    case Opcodes_1.Opcodes.T_BOOLEAN:
                        this.push(Frame.ARRAY_OF | Frame.BOOLEAN_$LI$());
                        break;
                    case Opcodes_1.Opcodes.T_CHAR:
                        this.push(Frame.ARRAY_OF | Frame.CHAR_$LI$());
                        break;
                    case Opcodes_1.Opcodes.T_BYTE:
                        this.push(Frame.ARRAY_OF | Frame.BYTE_$LI$());
                        break;
                    case Opcodes_1.Opcodes.T_SHORT:
                        this.push(Frame.ARRAY_OF | Frame.SHORT_$LI$());
                        break;
                    case Opcodes_1.Opcodes.T_INT:
                        this.push(Frame.ARRAY_OF | Frame.INTEGER_$LI$());
                        break;
                    case Opcodes_1.Opcodes.T_FLOAT:
                        this.push(Frame.ARRAY_OF | Frame.FLOAT_$LI$());
                        break;
                    case Opcodes_1.Opcodes.T_DOUBLE:
                        this.push(Frame.ARRAY_OF | Frame.DOUBLE_$LI$());
                        break;
                    default:
                        this.push(Frame.ARRAY_OF | Frame.LONG_$LI$());
                        break;
                }
                break;
            case Opcodes_1.Opcodes.ANEWARRAY:
                let s = item.strVal1;
                this.pop();
                if (s.charAt(0) === '[') {
                    this.push(cw, '[' + s);
                }
                else {
                    this.push(Frame.ARRAY_OF | Frame.OBJECT_$LI$() | cw.addType(s));
                }
                break;
            case Opcodes_1.Opcodes.CHECKCAST:
                s = item.strVal1;
                this.pop();
                if (s.charAt(0) === '[') {
                    this.push(cw, s);
                }
                else {
                    this.push(Frame.OBJECT_$LI$() | cw.addType(s));
                }
                break;
            default:
                this.pop(arg);
                this.push(cw, item.strVal1);
                break;
        }
    }
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
    merge(cw, frame, edge) {
        let changed = false;
        let i;
        let s;
        let dim;
        let kind;
        let t;
        let nLocal = this.inputLocals.length;
        let nStack = this.inputStack.length;
        if (frame.inputLocals == null) {
            frame.inputLocals = new Array(nLocal);
            changed = true;
        }
        for (i = 0; i < nLocal; ++i) {
            if (this.outputLocals != null && i < this.outputLocals.length) {
                s = this.outputLocals[i];
                if (s === 0) {
                    t = this.inputLocals[i];
                }
                else {
                    dim = s & Frame.DIM;
                    kind = s & Frame.KIND;
                    if (kind === Frame.BASE) {
                        t = s;
                    }
                    else {
                        if (kind === Frame.LOCAL) {
                            t = dim + this.inputLocals[s & Frame.VALUE];
                        }
                        else {
                            t = dim + this.inputStack[nStack - (s & Frame.VALUE)];
                        }
                        if ((s & Frame.TOP_IF_LONG_OR_DOUBLE) !== 0 && (t === Frame.LONG_$LI$() || t === Frame.DOUBLE_$LI$())) {
                            t = Frame.TOP_$LI$();
                        }
                    }
                }
            }
            else {
                t = this.inputLocals[i];
            }
            if (this.initializations != null) {
                t = this.init(cw, t);
            }
            changed = changed || Frame.merge(cw, t, frame.inputLocals, i);
        }
        if (edge > 0) {
            for (i = 0; i < nLocal; ++i) {
                t = this.inputLocals[i];
                changed = changed || Frame.merge(cw, t, frame.inputLocals, i);
            }
            if (frame.inputStack == null) {
                frame.inputStack = new Array(1);
                changed = true;
            }
            changed = changed || Frame.merge(cw, edge, frame.inputStack, 0);
            return changed;
        }
        let nInputStack = this.inputStack.length + this.owner.inputStackTop;
        if (frame.inputStack == null) {
            frame.inputStack = new Array(nInputStack + this.outputStackTop);
            changed = true;
        }
        for (i = 0; i < nInputStack; ++i) {
            t = this.inputStack[i];
            if (this.initializations != null) {
                t = this.init(cw, t);
            }
            changed = changed || Frame.merge(cw, t, frame.inputStack, i);
        }
        for (i = 0; i < this.outputStackTop; ++i) {
            s = this.outputStack[i];
            dim = s & Frame.DIM;
            kind = s & Frame.KIND;
            if (kind === Frame.BASE) {
                t = s;
            }
            else {
                if (kind === Frame.LOCAL) {
                    t = dim + this.inputLocals[s & Frame.VALUE];
                }
                else {
                    t = dim + this.inputStack[nStack - (s & Frame.VALUE)];
                }
                if ((s & Frame.TOP_IF_LONG_OR_DOUBLE) !== 0 && (t === Frame.LONG_$LI$() || t === Frame.DOUBLE_$LI$())) {
                    t = Frame.TOP_$LI$();
                }
            }
            if (this.initializations != null) {
                t = this.init(cw, t);
            }
            changed = changed || Frame.merge(cw, t, frame.inputStack, nInputStack + i);
        }
        return changed;
    }
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
    static merge(cw, t, types, index) {
        let u = types[index];
        if (u === t) {
            return false;
        }
        if ((t & ~Frame.DIM) === Frame.NULL_$LI$()) {
            if (u === Frame.NULL_$LI$()) {
                return false;
            }
            t = Frame.NULL_$LI$();
        }
        if (u === 0) {
            types[index] = t;
            return true;
        }
        let v;
        if ((u & Frame.BASE_KIND) === Frame.OBJECT_$LI$() || (u & Frame.DIM) !== 0) {
            if (t === Frame.NULL_$LI$()) {
                return false;
            }
            else if ((t & (Frame.DIM | Frame.BASE_KIND)) === (u & (Frame.DIM | Frame.BASE_KIND))) {
                if ((u & Frame.BASE_KIND) === Frame.OBJECT_$LI$()) {
                    v = (t & Frame.DIM) | Frame.OBJECT_$LI$() | cw.getMergedType(t & Frame.BASE_VALUE, u & Frame.BASE_VALUE);
                }
                else {
                    let vdim = Frame.ELEMENT_OF + (u & Frame.DIM);
                    v = vdim | Frame.OBJECT_$LI$() | cw.addType("java/lang/Object");
                }
            }
            else if ((t & Frame.BASE_KIND) === Frame.OBJECT_$LI$() || (t & Frame.DIM) !== 0) {
                let tdim = (((t & Frame.DIM) === 0 || (t & Frame.BASE_KIND) === Frame.OBJECT_$LI$()) ? 0 : Frame.ELEMENT_OF) + (t & Frame.DIM);
                let udim = (((u & Frame.DIM) === 0 || (u & Frame.BASE_KIND) === Frame.OBJECT_$LI$()) ? 0 : Frame.ELEMENT_OF) + (u & Frame.DIM);
                v = Math.min(tdim, udim) | Frame.OBJECT_$LI$() | cw.addType("java/lang/Object");
            }
            else {
                v = Frame.TOP_$LI$();
            }
        }
        else if (u === Frame.NULL_$LI$()) {
            v = (t & Frame.BASE_KIND) === Frame.OBJECT_$LI$() || (t & Frame.DIM) !== 0 ? t : Frame.TOP_$LI$();
        }
        else {
            v = Frame.TOP_$LI$();
        }
        if (u !== v) {
            types[index] = v;
            return true;
        }
        return false;
    }
}
Frame.__static_initialized = false;
/**
 * Mask to get the dimension of a frame type. This dimension is a signed
 * integer between -8 and 7.
 */
Frame.DIM = -268435456;
/**
 * Constant to be added to a type to get a type with one more dimension.
 */
Frame.ARRAY_OF = 268435456;
/**
 * Constant to be added to a type to get a type with one less dimension.
 */
Frame.ELEMENT_OF = -268435456;
/**
 * Mask to get the kind of a frame type.
 *
 * @see #BASE
 * @see #LOCAL
 * @see #STACK
 */
Frame.KIND = 251658240;
/**
 * Flag used for LOCAL and STACK types. Indicates that if this type happens
 * to be a long or double type (during the computations of input frames),
 * then it must be set to TOP because the second word of this value has been
 * reused to store other data in the basic block. Hence the first word no
 * longer stores a valid long or double value.
 */
Frame.TOP_IF_LONG_OR_DOUBLE = 8388608;
/**
 * Mask to get the value of a frame type.
 */
Frame.VALUE = 8388607;
/**
 * Mask to get the kind of base types.
 */
Frame.BASE_KIND = 267386880;
/**
 * Mask to get the value of base types.
 */
Frame.BASE_VALUE = 1048575;
/**
 * Kind of the types that are not relative to an input stack map frame.
 */
Frame.BASE = 16777216;
/**
 * Kind of the types that are relative to the local variable types of an
 * input stack map frame. The value of such types is a local variable index.
 */
Frame.LOCAL = 33554432;
/**
 * Kind of the the types that are relative to the stack of an input stack
 * map frame. The value of such types is a position relatively to the top of
 * this stack.
 */
Frame.STACK = 50331648;
exports.Frame = Frame;
Frame["__class"] = "Frame";
Frame.SIZE_$LI$();
Frame.UNINITIALIZED_THIS_$LI$();
Frame.NULL_$LI$();
Frame.LONG_$LI$();
Frame.DOUBLE_$LI$();
Frame.FLOAT_$LI$();
Frame.INTEGER_$LI$();
Frame.SHORT_$LI$();
Frame.CHAR_$LI$();
Frame.BYTE_$LI$();
Frame.BOOLEAN_$LI$();
Frame.TOP_$LI$();
Frame.UNINITIALIZED_$LI$();
Frame.OBJECT_$LI$();
Frame.__static_initialize();
