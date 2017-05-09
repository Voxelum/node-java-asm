"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * A {@link MethodVisitor} that generates methods in bytecode form. Each visit
 * method of this class appends the bytecode corresponding to the visited
 * instruction to a byte vector, in the order these methods are called.
 *
 * @author Eric Bruneton
 * @author Eugene Kuleshov
 */
const MethodVisitor_1 = require("./MethodVisitor");
const ByteVector_1 = require("./ByteVector");
const AnnotationWriter_1 = require("./AnnotationWriter");
const ClassReader_1 = require("./ClassReader");
const Opcodes_1 = require("./Opcodes");
const Frame_1 = require("./Frame");
const Type_1 = require("./Type");
const Edge_1 = require("./Edge");
const Label_1 = require("./Label");
const Handler_1 = require("./Handler");
const ClassWriter_1 = require("./ClassWriter");
const CurrentFrame_1 = require("./CurrentFrame");
const bits = require("./bits");
class MethodWriter extends MethodVisitor_1.MethodVisitor {
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
    constructor(cw, access, name, desc, signature, exceptions, compute) {
        super(Opcodes_1.Opcodes.ASM5);
        /**
         * The bytecode of this method.
         */
        this.code = new ByteVector_1.ByteVector();
        this.access = 0;
        this.name = 0;
        this.desc = 0;
        this.classReaderOffset = 0;
        this.classReaderLength = 0;
        this.exceptionCount = 0;
        this.synthetics = 0;
        this.maxStack = 0;
        this.maxLocals = 0;
        this.currentLocals = 0;
        this.frameCount = 0;
        this.previousFrameOffset = 0;
        this.handlerCount = 0;
        this.methodParametersCount = 0;
        this.localVarCount = 0;
        this.localVarTypeCount = 0;
        this.lineNumberCount = 0;
        this.lastCodeOffset = 0;
        this.subroutines = 0;
        this.compute = 0;
        this.stackSize = 0;
        this.maxStackSize = 0;
        if (cw.firstMethod == null) {
            cw.firstMethod = this;
        }
        else {
            cw.lastMethod.mv = this;
        }
        cw.lastMethod = this;
        this.cw = cw;
        this.access = access;
        if (("<init>" === name)) {
            this.access |= MethodWriter.ACC_CONSTRUCTOR;
        }
        this.name = cw.newUTF8(name);
        this.desc = cw.newUTF8(desc);
        this.descriptor = desc;
        if (ClassReader_1.ClassReader.SIGNATURES) {
            this.signature = signature;
        }
        if (exceptions != null && exceptions.length > 0) {
            this.exceptionCount = exceptions.length;
            this.exceptions = new Array(this.exceptionCount);
            for (let i = 0; i < this.exceptionCount; ++i) {
                this.exceptions[i] = cw.newClass(exceptions[i]);
            }
        }
        this.compute = compute;
        if (compute !== MethodWriter.NOTHING) {
            let size = Type_1.Type.getArgumentsAndReturnSizes(this.descriptor) >> 2;
            if ((access & Opcodes_1.Opcodes.ACC_STATIC) !== 0) {
                --size;
            }
            this.maxLocals = size;
            this.currentLocals = size;
            this.labels = new Label_1.Label();
            this.labels.status |= Label_1.Label.PUSHED;
            this.visitLabel(this.labels);
        }
    }
    visitParameter(name, access) {
        if (this.methodParameters == null) {
            this.methodParameters = new ByteVector_1.ByteVector();
        }
        ++this.methodParametersCount;
        this.methodParameters.putShort((name == null) ? 0 : this.cw.newUTF8(name)).putShort(access);
    }
    visitAnnotationDefault() {
        if (!ClassReader_1.ClassReader.ANNOTATIONS) {
            return null;
        }
        this.annd = new ByteVector_1.ByteVector();
        return new AnnotationWriter_1.AnnotationWriter(this.cw, false, this.annd, null, 0);
    }
    visitAnnotation(desc, visible) {
        if (!ClassReader_1.ClassReader.ANNOTATIONS) {
            return null;
        }
        let bv = new ByteVector_1.ByteVector();
        bv.putShort(this.cw.newUTF8(desc)).putShort(0);
        let aw = new AnnotationWriter_1.AnnotationWriter(this.cw, true, bv, bv, 2);
        if (visible) {
            aw.next = this.anns;
            this.anns = aw;
        }
        else {
            aw.next = this.ianns;
            this.ianns = aw;
        }
        return aw;
    }
    visitTypeAnnotation(typeRef, typePath, desc, visible) {
        if (!ClassReader_1.ClassReader.ANNOTATIONS) {
            return null;
        }
        let bv = new ByteVector_1.ByteVector();
        AnnotationWriter_1.AnnotationWriter.putTarget(typeRef, typePath, bv);
        bv.putShort(this.cw.newUTF8(desc)).putShort(0);
        let aw = new AnnotationWriter_1.AnnotationWriter(this.cw, true, bv, bv, bv.length - 2);
        if (visible) {
            aw.next = this.tanns;
            this.tanns = aw;
        }
        else {
            aw.next = this.itanns;
            this.itanns = aw;
        }
        return aw;
    }
    visitParameterAnnotation(parameter, desc, visible) {
        if (!ClassReader_1.ClassReader.ANNOTATIONS) {
            return null;
        }
        let bv = new ByteVector_1.ByteVector();
        if (("Ljava/lang/Synthetic;" === desc)) {
            this.synthetics = Math.max(this.synthetics, parameter + 1);
            return new AnnotationWriter_1.AnnotationWriter(this.cw, false, bv, null, 0);
        }
        bv.putShort(this.cw.newUTF8(desc)).putShort(0);
        let aw = new AnnotationWriter_1.AnnotationWriter(this.cw, true, bv, bv, 2);
        if (visible) {
            if (this.panns == null) {
                this.panns = new Array(Type_1.Type.getArgumentTypes(this.descriptor).length);
            }
            aw.next = this.panns[parameter];
            this.panns[parameter] = aw;
        }
        else {
            if (this.ipanns == null) {
                this.ipanns = new Array(Type_1.Type.getArgumentTypes(this.descriptor).length);
            }
            aw.next = this.ipanns[parameter];
            this.ipanns[parameter] = aw;
        }
        return aw;
    }
    visitAttribute(attr) {
        if (attr.isCodeAttribute()) {
            attr.next = this.cattrs;
            this.cattrs = attr;
        }
        else {
            attr.next = this.attrs;
            this.attrs = attr;
        }
    }
    visitCode() {
    }
    visitFrame(type, nLocal, local, nStack, stack) {
        if (((typeof type === 'number') || type === null) && ((typeof nLocal === 'number') || nLocal === null) && ((local != null && local instanceof Array) || local === null) && ((typeof nStack === 'number') || nStack === null) && ((stack != null && stack instanceof Array) || stack === null)) {
            let __args = Array.prototype.slice.call(arguments);
            return (() => {
                if (!ClassReader_1.ClassReader.FRAMES || this.compute === MethodWriter.FRAMES) {
                    return;
                }
                if (this.compute === MethodWriter.INSERTED_FRAMES) {
                    if (this.currentBlock.frame == null) {
                        this.currentBlock.frame = new CurrentFrame_1.CurrentFrame();
                        this.currentBlock.frame.owner = this.currentBlock;
                        this.currentBlock.frame.initInputFrame(this.cw, this.access, Type_1.Type.getArgumentTypes(this.descriptor), nLocal);
                        this.visitImplicitFirstFrame();
                    }
                    else {
                        if (type === Opcodes_1.Opcodes.F_NEW) {
                            this.currentBlock.frame.set(this.cw, nLocal, local, nStack, stack);
                        }
                        else {
                        }
                        this.visitFrame(this.currentBlock.frame);
                    }
                }
                else if (type === Opcodes_1.Opcodes.F_NEW) {
                    if (this.previousFrame == null) {
                        this.visitImplicitFirstFrame();
                    }
                    this.currentLocals = nLocal;
                    let frameIndex = this.startFrame(this.code.length, nLocal, nStack);
                    for (let i = 0; i < nLocal; ++i) {
                        if (typeof local[i] === 'string') {
                            this.frame[frameIndex++] = Frame_1.Frame.OBJECT_$LI$() | this.cw.addType(local[i]);
                        }
                        else if (typeof local[i] === 'number') {
                            this.frame[frameIndex++] = (local[i] | 0);
                        }
                        else {
                            this.frame[frameIndex++] = Frame_1.Frame.UNINITIALIZED_$LI$() | this.cw.addUninitializedType("", local[i].position);
                        }
                    }
                    for (let i = 0; i < nStack; ++i) {
                        if (typeof stack[i] === 'string') {
                            this.frame[frameIndex++] = Frame_1.Frame.OBJECT_$LI$() | this.cw.addType(stack[i]);
                        }
                        else if (typeof stack[i] === 'number') {
                            this.frame[frameIndex++] = (stack[i] | 0);
                        }
                        else {
                            this.frame[frameIndex++] = Frame_1.Frame.UNINITIALIZED_$LI$() | this.cw.addUninitializedType("", stack[i].position);
                        }
                    }
                    this.endFrame();
                }
                else {
                    let delta;
                    if (this.stackMap == null) {
                        this.stackMap = new ByteVector_1.ByteVector();
                        delta = this.code.length;
                    }
                    else {
                        delta = this.code.length - this.previousFrameOffset - 1;
                        if (delta < 0) {
                            if (type === Opcodes_1.Opcodes.F_SAME) {
                                return;
                            }
                            else {
                                throw new Error();
                            }
                        }
                    }
                    switch ((type)) {
                        case Opcodes_1.Opcodes.F_FULL:
                            this.currentLocals = nLocal;
                            this.stackMap.putByte(MethodWriter.FULL_FRAME).putShort(delta).putShort(nLocal);
                            for (let i = 0; i < nLocal; ++i) {
                                this.writeFrameType(local[i]);
                            }
                            this.stackMap.putShort(nStack);
                            for (let i = 0; i < nStack; ++i) {
                                this.writeFrameType(stack[i]);
                            }
                            break;
                        case Opcodes_1.Opcodes.F_APPEND:
                            this.currentLocals += nLocal;
                            this.stackMap.putByte(MethodWriter.SAME_FRAME_EXTENDED + nLocal).putShort(delta);
                            for (let i = 0; i < nLocal; ++i) {
                                this.writeFrameType(local[i]);
                            }
                            break;
                        case Opcodes_1.Opcodes.F_CHOP:
                            this.currentLocals -= nLocal;
                            this.stackMap.putByte(MethodWriter.SAME_FRAME_EXTENDED - nLocal).putShort(delta);
                            break;
                        case Opcodes_1.Opcodes.F_SAME:
                            if (delta < 64) {
                                this.stackMap.putByte(delta);
                            }
                            else {
                                this.stackMap.putByte(MethodWriter.SAME_FRAME_EXTENDED).putShort(delta);
                            }
                            break;
                        case Opcodes_1.Opcodes.F_SAME1:
                            if (delta < 64) {
                                this.stackMap.putByte(MethodWriter.SAME_LOCALS_1_STACK_ITEM_FRAME + delta);
                            }
                            else {
                                this.stackMap.putByte(MethodWriter.SAME_LOCALS_1_STACK_ITEM_FRAME_EXTENDED).putShort(delta);
                            }
                            this.writeFrameType(stack[0]);
                            break;
                    }
                    this.previousFrameOffset = this.code.length;
                    ++this.frameCount;
                }
                this.maxStack = Math.max(this.maxStack, nStack);
                this.maxLocals = Math.max(this.maxLocals, this.currentLocals);
            })();
        }
        else if (((type != null && type instanceof Frame_1.Frame) || type === null) && nLocal === undefined && local === undefined && nStack === undefined && stack === undefined) {
            return this.visitFrame$Frame(type);
        }
        else
            throw new Error('invalid overload');
    }
    visitInsn(opcode) {
        this.lastCodeOffset = this.code.length;
        this.code.putByte(opcode);
        if (this.currentBlock != null) {
            if (this.compute === MethodWriter.FRAMES || this.compute === MethodWriter.INSERTED_FRAMES) {
                this.currentBlock.frame.execute(opcode, 0, null, null);
            }
            else {
                let size = this.stackSize + Frame_1.Frame.SIZE_$LI$()[opcode];
                if (size > this.maxStackSize) {
                    this.maxStackSize = size;
                }
                this.stackSize = size;
            }
            if ((opcode >= Opcodes_1.Opcodes.IRETURN && opcode <= Opcodes_1.Opcodes.RETURN) || opcode === Opcodes_1.Opcodes.ATHROW) {
                this.noSuccessor();
            }
        }
    }
    visitIntInsn(opcode, operand) {
        this.lastCodeOffset = this.code.length;
        if (this.currentBlock != null) {
            if (this.compute === MethodWriter.FRAMES || this.compute === MethodWriter.INSERTED_FRAMES) {
                this.currentBlock.frame.execute(opcode, operand, null, null);
            }
            else if (opcode !== Opcodes_1.Opcodes.NEWARRAY) {
                let size = this.stackSize + 1;
                if (size > this.maxStackSize) {
                    this.maxStackSize = size;
                }
                this.stackSize = size;
            }
        }
        if (opcode === Opcodes_1.Opcodes.SIPUSH) {
            this.code.put12(opcode, operand);
        }
        else {
            this.code.put11(opcode, operand);
        }
    }
    visitVarInsn(opcode, __var) {
        this.lastCodeOffset = this.code.length;
        if (this.currentBlock != null) {
            if (this.compute === MethodWriter.FRAMES || this.compute === MethodWriter.INSERTED_FRAMES) {
                this.currentBlock.frame.execute(opcode, __var, null, null);
            }
            else {
                if (opcode === Opcodes_1.Opcodes.RET) {
                    this.currentBlock.status |= Label_1.Label.RET;
                    this.currentBlock.inputStackTop = this.stackSize;
                    this.noSuccessor();
                }
                else {
                    let size = this.stackSize + Frame_1.Frame.SIZE_$LI$()[opcode];
                    if (size > this.maxStackSize) {
                        this.maxStackSize = size;
                    }
                    this.stackSize = size;
                }
            }
        }
        if (this.compute !== MethodWriter.NOTHING) {
            let n;
            if (opcode === Opcodes_1.Opcodes.LLOAD || opcode === Opcodes_1.Opcodes.DLOAD || opcode === Opcodes_1.Opcodes.LSTORE || opcode === Opcodes_1.Opcodes.DSTORE) {
                n = __var + 2;
            }
            else {
                n = __var + 1;
            }
            if (n > this.maxLocals) {
                this.maxLocals = n;
            }
        }
        if (__var < 4 && opcode !== Opcodes_1.Opcodes.RET) {
            let opt;
            if (opcode < Opcodes_1.Opcodes.ISTORE) {
                opt = 26 + ((opcode - Opcodes_1.Opcodes.ILOAD) << 2) + __var;
            }
            else {
                opt = 59 + ((opcode - Opcodes_1.Opcodes.ISTORE) << 2) + __var;
            }
            this.code.putByte(opt);
        }
        else if (__var >= 256) {
            this.code.putByte(196).put12(opcode, __var);
        }
        else {
            this.code.put11(opcode, __var);
        }
        if (opcode >= Opcodes_1.Opcodes.ISTORE && this.compute === MethodWriter.FRAMES && this.handlerCount > 0) {
            this.visitLabel(new Label_1.Label());
        }
    }
    visitTypeInsn(opcode, type) {
        this.lastCodeOffset = this.code.length;
        let i = this.cw.newClassItem(type);
        if (this.currentBlock != null) {
            if (this.compute === MethodWriter.FRAMES || this.compute === MethodWriter.INSERTED_FRAMES) {
                this.currentBlock.frame.execute(opcode, this.code.length, this.cw, i);
            }
            else if (opcode === Opcodes_1.Opcodes.NEW) {
                let size = this.stackSize + 1;
                if (size > this.maxStackSize) {
                    this.maxStackSize = size;
                }
                this.stackSize = size;
            }
        }
        this.code.put12(opcode, i.index);
    }
    visitFieldInsn(opcode, owner, name, desc) {
        this.lastCodeOffset = this.code.length;
        let i = this.cw.newFieldItem(owner, name, desc);
        if (this.currentBlock != null) {
            if (this.compute === MethodWriter.FRAMES || this.compute === MethodWriter.INSERTED_FRAMES) {
                this.currentBlock.frame.execute(opcode, 0, this.cw, i);
            }
            else {
                let size;
                let c = desc.charAt(0);
                switch ((opcode)) {
                    case Opcodes_1.Opcodes.GETSTATIC:
                        size = this.stackSize + (c === 'D' || c === 'J' ? 2 : 1);
                        break;
                    case Opcodes_1.Opcodes.PUTSTATIC:
                        size = this.stackSize + (c === 'D' || c === 'J' ? -2 : -1);
                        break;
                    case Opcodes_1.Opcodes.GETFIELD:
                        size = this.stackSize + (c === 'D' || c === 'J' ? 1 : 0);
                        break;
                    default:
                        size = this.stackSize + (c === 'D' || c === 'J' ? -3 : -2);
                        break;
                }
                if (size > this.maxStackSize) {
                    this.maxStackSize = size;
                }
                this.stackSize = size;
            }
        }
        this.code.put12(opcode, i.index);
    }
    visitMethodInsn(opcode, owner, name, desc, itf) {
        if (((typeof opcode === 'number') || opcode === null) && ((typeof owner === 'string') || owner === null) && ((typeof name === 'string') || name === null) && ((typeof desc === 'string') || desc === null) && ((typeof itf === 'boolean') || itf === null)) {
            let __args = Array.prototype.slice.call(arguments);
            return (() => {
                this.lastCodeOffset = this.code.length;
                let i = this.cw.newMethodItem(owner, name, desc, itf);
                let argSize = i.intVal;
                if (this.currentBlock != null) {
                    if (this.compute === MethodWriter.FRAMES || this.compute === MethodWriter.INSERTED_FRAMES) {
                        this.currentBlock.frame.execute(opcode, 0, this.cw, i);
                    }
                    else {
                        if (argSize === 0) {
                            argSize = Type_1.Type.getArgumentsAndReturnSizes(desc);
                            i.intVal = argSize;
                        }
                        let size;
                        if (opcode === Opcodes_1.Opcodes.INVOKESTATIC) {
                            size = this.stackSize - (argSize >> 2) + (argSize & 3) + 1;
                        }
                        else {
                            size = this.stackSize - (argSize >> 2) + (argSize & 3);
                        }
                        if (size > this.maxStackSize) {
                            this.maxStackSize = size;
                        }
                        this.stackSize = size;
                    }
                }
                if (opcode === Opcodes_1.Opcodes.INVOKEINTERFACE) {
                    if (argSize === 0) {
                        argSize = Type_1.Type.getArgumentsAndReturnSizes(desc);
                        i.intVal = argSize;
                    }
                    this.code.put12(Opcodes_1.Opcodes.INVOKEINTERFACE, i.index).put11(argSize >> 2, 0);
                }
                else {
                    this.code.put12(opcode, i.index);
                }
            })();
        }
        else if (((typeof opcode === 'number') || opcode === null) && ((typeof owner === 'string') || owner === null) && ((typeof name === 'string') || name === null) && ((typeof desc === 'string') || desc === null) && itf === undefined) {
            return this.visitMethodInsn$int$java_lang_String$java_lang_String$java_lang_String(opcode, owner, name, desc);
        }
        else
            throw new Error('invalid overload');
    }
    visitInvokeDynamicInsn(name, desc, bsm, ...bsmArgs) {
        this.lastCodeOffset = this.code.length;
        let i = (this['__jswref_0'] = this.cw).newInvokeDynamicItem.apply(this['__jswref_0'], [name, desc, bsm].concat(bsmArgs));
        let argSize = i.intVal;
        if (this.currentBlock != null) {
            if (this.compute === MethodWriter.FRAMES || this.compute === MethodWriter.INSERTED_FRAMES) {
                this.currentBlock.frame.execute(Opcodes_1.Opcodes.INVOKEDYNAMIC, 0, this.cw, i);
            }
            else {
                if (argSize === 0) {
                    argSize = Type_1.Type.getArgumentsAndReturnSizes(desc);
                    i.intVal = argSize;
                }
                let size = this.stackSize - (argSize >> 2) + (argSize & 3) + 1;
                if (size > this.maxStackSize) {
                    this.maxStackSize = size;
                }
                this.stackSize = size;
            }
        }
        this.code.put12(Opcodes_1.Opcodes.INVOKEDYNAMIC, i.index);
        this.code.putShort(0);
    }
    visitJumpInsn(opcode, label) {
        let isWide = opcode >= 200;
        opcode = isWide ? opcode - 33 : opcode;
        this.lastCodeOffset = this.code.length;
        let nextInsn = null;
        if (this.currentBlock != null) {
            if (this.compute === MethodWriter.FRAMES) {
                this.currentBlock.frame.execute(opcode, 0, null, null);
                label.getFirst().status |= Label_1.Label.TARGET;
                this.addSuccessor(Edge_1.Edge.NORMAL, label);
                if (opcode !== Opcodes_1.Opcodes.GOTO) {
                    nextInsn = new Label_1.Label();
                }
            }
            else if (this.compute === MethodWriter.INSERTED_FRAMES) {
                this.currentBlock.frame.execute(opcode, 0, null, null);
            }
            else {
                if (opcode === Opcodes_1.Opcodes.JSR) {
                    if ((label.status & Label_1.Label.SUBROUTINE) === 0) {
                        label.status |= Label_1.Label.SUBROUTINE;
                        ++this.subroutines;
                    }
                    this.currentBlock.status |= Label_1.Label.JSR;
                    this.addSuccessor(this.stackSize + 1, label);
                    nextInsn = new Label_1.Label();
                }
                else {
                    this.stackSize += Frame_1.Frame.SIZE_$LI$()[opcode];
                    this.addSuccessor(this.stackSize, label);
                }
            }
        }
        if ((label.status & Label_1.Label.RESOLVED) !== 0 && label.position - this.code.length < bits.SHORT_MIN) {
            if (opcode === Opcodes_1.Opcodes.GOTO) {
                this.code.putByte(200);
            }
            else if (opcode === Opcodes_1.Opcodes.JSR) {
                this.code.putByte(201);
            }
            else {
                if (nextInsn != null) {
                    nextInsn.status |= Label_1.Label.TARGET;
                }
                this.code.putByte(opcode <= 166 ? ((opcode + 1) ^ 1) - 1 : opcode ^ 1);
                this.code.putShort(8);
                this.code.putByte(200);
            }
            label.put(this, this.code, this.code.length - 1, true);
        }
        else if (isWide) {
            this.code.putByte(opcode + 33);
            label.put(this, this.code, this.code.length - 1, true);
        }
        else {
            this.code.putByte(opcode);
            label.put(this, this.code, this.code.length - 1, false);
        }
        if (this.currentBlock != null) {
            if (nextInsn != null) {
                this.visitLabel(nextInsn);
            }
            if (opcode === Opcodes_1.Opcodes.GOTO) {
                this.noSuccessor();
            }
        }
    }
    visitLabel(label) {
        this.cw.hasAsmInsns = this.cw.hasAsmInsns || label.resolve(this, this.code.length, this.code.data);
        if ((label.status & Label_1.Label.DEBUG) !== 0) {
            return;
        }
        if (this.compute === MethodWriter.FRAMES) {
            if (this.currentBlock != null) {
                if (label.position === this.currentBlock.position) {
                    this.currentBlock.status |= (label.status & Label_1.Label.TARGET);
                    label.frame = this.currentBlock.frame;
                    return;
                }
                this.addSuccessor(Edge_1.Edge.NORMAL, label);
            }
            this.currentBlock = label;
            if (label.frame == null) {
                label.frame = new Frame_1.Frame();
                label.frame.owner = label;
            }
            if (this.previousBlock != null) {
                if (label.position === this.previousBlock.position) {
                    this.previousBlock.status |= (label.status & Label_1.Label.TARGET);
                    label.frame = this.previousBlock.frame;
                    this.currentBlock = this.previousBlock;
                    return;
                }
                this.previousBlock.successor = label;
            }
            this.previousBlock = label;
        }
        else if (this.compute === MethodWriter.INSERTED_FRAMES) {
            if (this.currentBlock == null) {
                this.currentBlock = label;
            }
            else {
                this.currentBlock.frame.owner = label;
            }
        }
        else if (this.compute === MethodWriter.MAXS) {
            if (this.currentBlock != null) {
                this.currentBlock.outputStackMax = this.maxStackSize;
                this.addSuccessor(this.stackSize, label);
            }
            this.currentBlock = label;
            this.stackSize = 0;
            this.maxStackSize = 0;
            if (this.previousBlock != null) {
                this.previousBlock.successor = label;
            }
            this.previousBlock = label;
        }
    }
    visitLdcInsn(cst) {
        this.lastCodeOffset = this.code.length;
        let i = this.cw.newConstItem(cst);
        if (this.currentBlock != null) {
            if (this.compute === MethodWriter.FRAMES || this.compute === MethodWriter.INSERTED_FRAMES) {
                this.currentBlock.frame.execute(Opcodes_1.Opcodes.LDC, 0, this.cw, i);
            }
            else {
                let size;
                if (i.type === ClassWriter_1.ClassWriter.LONG || i.type === ClassWriter_1.ClassWriter.DOUBLE) {
                    size = this.stackSize + 2;
                }
                else {
                    size = this.stackSize + 1;
                }
                if (size > this.maxStackSize) {
                    this.maxStackSize = size;
                }
                this.stackSize = size;
            }
        }
        let index = i.index;
        if (i.type === ClassWriter_1.ClassWriter.LONG || i.type === ClassWriter_1.ClassWriter.DOUBLE) {
            this.code.put12(20, index);
        }
        else if (index >= 256) {
            this.code.put12(19, index);
        }
        else {
            this.code.put11(Opcodes_1.Opcodes.LDC, index);
        }
    }
    visitIincInsn(__var, increment) {
        this.lastCodeOffset = this.code.length;
        if (this.currentBlock != null) {
            if (this.compute === MethodWriter.FRAMES || this.compute === MethodWriter.INSERTED_FRAMES) {
                this.currentBlock.frame.execute(Opcodes_1.Opcodes.IINC, __var, null, null);
            }
        }
        if (this.compute !== MethodWriter.NOTHING) {
            let n = __var + 1;
            if (n > this.maxLocals) {
                this.maxLocals = n;
            }
        }
        if ((__var > 255) || (increment > 127) || (increment < -128)) {
            this.code.putByte(196).put12(Opcodes_1.Opcodes.IINC, __var).putShort(increment);
        }
        else {
            this.code.putByte(Opcodes_1.Opcodes.IINC).put11(__var, increment);
        }
    }
    visitTableSwitchInsn(min, max, dflt, ...labels) {
        this.lastCodeOffset = this.code.length;
        let source = this.code.length;
        this.code.putByte(Opcodes_1.Opcodes.TABLESWITCH);
        this.code.putByteArray(null, 0, (4 - this.code.length % 4) % 4);
        dflt.put(this, this.code, source, true);
        this.code.putInt(min).putInt(max);
        for (let i = 0; i < labels.length; ++i) {
            labels[i].put(this, this.code, source, true);
        }
        this.visitSwitchInsn(dflt, labels);
    }
    visitLookupSwitchInsn(dflt, keys, labels) {
        this.lastCodeOffset = this.code.length;
        let source = this.code.length;
        this.code.putByte(Opcodes_1.Opcodes.LOOKUPSWITCH);
        this.code.putByteArray(null, 0, (4 - this.code.length % 4) % 4);
        dflt.put(this, this.code, source, true);
        this.code.putInt(labels.length);
        for (let i = 0; i < labels.length; ++i) {
            this.code.putInt(keys[i]);
            labels[i].put(this, this.code, source, true);
        }
        this.visitSwitchInsn(dflt, labels);
    }
    visitSwitchInsn(dflt, labels) {
        if (this.currentBlock != null) {
            if (this.compute === MethodWriter.FRAMES) {
                this.currentBlock.frame.execute(Opcodes_1.Opcodes.LOOKUPSWITCH, 0, null, null);
                this.addSuccessor(Edge_1.Edge.NORMAL, dflt);
                dflt.getFirst().status |= Label_1.Label.TARGET;
                for (let i = 0; i < labels.length; ++i) {
                    this.addSuccessor(Edge_1.Edge.NORMAL, labels[i]);
                    labels[i].getFirst().status |= Label_1.Label.TARGET;
                }
            }
            else {
                --this.stackSize;
                this.addSuccessor(this.stackSize, dflt);
                for (let i = 0; i < labels.length; ++i) {
                    this.addSuccessor(this.stackSize, labels[i]);
                }
            }
            this.noSuccessor();
        }
    }
    visitMultiANewArrayInsn(desc, dims) {
        this.lastCodeOffset = this.code.length;
        let i = this.cw.newClassItem(desc);
        if (this.currentBlock != null) {
            if (this.compute === MethodWriter.FRAMES || this.compute === MethodWriter.INSERTED_FRAMES) {
                this.currentBlock.frame.execute(Opcodes_1.Opcodes.MULTIANEWARRAY, dims, this.cw, i);
            }
            else {
                this.stackSize += 1 - dims;
            }
        }
        this.code.put12(Opcodes_1.Opcodes.MULTIANEWARRAY, i.index).putByte(dims);
    }
    visitInsnAnnotation(typeRef, typePath, desc, visible) {
        if (!ClassReader_1.ClassReader.ANNOTATIONS) {
            return null;
        }
        let bv = new ByteVector_1.ByteVector();
        typeRef = (typeRef & -16776961) | (this.lastCodeOffset << 8);
        AnnotationWriter_1.AnnotationWriter.putTarget(typeRef, typePath, bv);
        bv.putShort(this.cw.newUTF8(desc)).putShort(0);
        let aw = new AnnotationWriter_1.AnnotationWriter(this.cw, true, bv, bv, bv.length - 2);
        if (visible) {
            aw.next = this.ctanns;
            this.ctanns = aw;
        }
        else {
            aw.next = this.ictanns;
            this.ictanns = aw;
        }
        return aw;
    }
    visitTryCatchBlock(start, end, handler, type) {
        ++this.handlerCount;
        let h = new Handler_1.Handler();
        h.start = start;
        h.end = end;
        h.handler = handler;
        h.desc = type;
        h.type = type != null ? this.cw.newClass(type) : 0;
        if (this.lastHandler == null) {
            this.firstHandler = h;
        }
        else {
            this.lastHandler.next = h;
        }
        this.lastHandler = h;
    }
    visitTryCatchAnnotation(typeRef, typePath, desc, visible) {
        if (!ClassReader_1.ClassReader.ANNOTATIONS) {
            return null;
        }
        let bv = new ByteVector_1.ByteVector();
        AnnotationWriter_1.AnnotationWriter.putTarget(typeRef, typePath, bv);
        bv.putShort(this.cw.newUTF8(desc)).putShort(0);
        let aw = new AnnotationWriter_1.AnnotationWriter(this.cw, true, bv, bv, bv.length - 2);
        if (visible) {
            aw.next = this.ctanns;
            this.ctanns = aw;
        }
        else {
            aw.next = this.ictanns;
            this.ictanns = aw;
        }
        return aw;
    }
    visitLocalVariable(name, desc, signature, start, end, index) {
        if (signature != null) {
            if (this.localVarType == null) {
                this.localVarType = new ByteVector_1.ByteVector();
            }
            ++this.localVarTypeCount;
            this.localVarType.putShort(start.position).putShort(end.position - start.position).putShort(this.cw.newUTF8(name)).putShort(this.cw.newUTF8(signature)).putShort(index);
        }
        if (this.localVar == null) {
            this.localVar = new ByteVector_1.ByteVector();
        }
        ++this.localVarCount;
        this.localVar.putShort(start.position).putShort(end.position - start.position).putShort(this.cw.newUTF8(name)).putShort(this.cw.newUTF8(desc)).putShort(index);
        if (this.compute !== MethodWriter.NOTHING) {
            let c = desc.charAt(0);
            let n = index + (c === 'J' || c === 'D' ? 2 : 1);
            if (n > this.maxLocals) {
                this.maxLocals = n;
            }
        }
    }
    visitLocalVariableAnnotation(typeRef, typePath, start, end, index, desc, visible) {
        if (!ClassReader_1.ClassReader.ANNOTATIONS) {
            return null;
        }
        let bv = new ByteVector_1.ByteVector();
        bv.putByte(typeRef >>> 24).putShort(start.length);
        for (let i = 0; i < start.length; ++i) {
            bv.putShort(start[i].position).putShort(end[i].position - start[i].position).putShort(index[i]);
        }
        if (typePath == null) {
            bv.putByte(0);
        }
        else {
            let length = typePath.buf[typePath.offset] * 2 + 1;
            bv.putByteArray(typePath.buf, typePath.offset, length);
        }
        bv.putShort(this.cw.newUTF8(desc)).putShort(0);
        let aw = new AnnotationWriter_1.AnnotationWriter(this.cw, true, bv, bv, bv.length - 2);
        if (visible) {
            aw.next = this.ctanns;
            this.ctanns = aw;
        }
        else {
            aw.next = this.ictanns;
            this.ictanns = aw;
        }
        return aw;
    }
    visitLineNumber(line, start) {
        if (this.lineNumber == null) {
            this.lineNumber = new ByteVector_1.ByteVector();
        }
        ++this.lineNumberCount;
        this.lineNumber.putShort(start.position);
        this.lineNumber.putShort(line);
    }
    visitMaxs(maxStack, maxLocals) {
        if (ClassReader_1.ClassReader.FRAMES && this.compute === MethodWriter.FRAMES) {
            let handler = this.firstHandler;
            while ((handler != null)) {
                let l = handler.start.getFirst();
                let h = handler.handler.getFirst();
                let e = handler.end.getFirst();
                let t = handler.desc == null ? "java/lang/Throwable" : handler.desc;
                let kind = Frame_1.Frame.OBJECT_$LI$() | this.cw.addType(t);
                h.status |= Label_1.Label.TARGET;
                while ((l !== e)) {
                    let b = new Edge_1.Edge();
                    b.info = kind;
                    b.successor = h;
                    b.next = l.successors;
                    l.successors = b;
                    l = l.successor;
                }
                ;
                handler = handler.next;
            }
            ;
            let f = this.labels.frame;
            f.initInputFrame(this.cw, this.access, Type_1.Type.getArgumentTypes(this.descriptor), this.maxLocals);
            this.visitFrame(f);
            let max = 0;
            let changed = this.labels;
            while ((changed != null)) {
                let l = changed;
                changed = changed.next;
                l.next = null;
                f = l.frame;
                if ((l.status & Label_1.Label.TARGET) !== 0) {
                    l.status |= Label_1.Label.STORE;
                }
                l.status |= Label_1.Label.REACHABLE;
                let blockMax = f.inputStack.length + l.outputStackMax;
                if (blockMax > max) {
                    max = blockMax;
                }
                let e = l.successors;
                while ((e != null)) {
                    let n = e.successor.getFirst();
                    let change = f.merge(this.cw, n.frame, e.info);
                    if (change && n.next == null) {
                        n.next = changed;
                        changed = n;
                    }
                    e = e.next;
                }
                ;
            }
            ;
            let l = this.labels;
            while ((l != null)) {
                f = l.frame;
                if ((l.status & Label_1.Label.STORE) !== 0) {
                    this.visitFrame(f);
                }
                if ((l.status & Label_1.Label.REACHABLE) === 0) {
                    let k = l.successor;
                    let start = l.position;
                    let end = (k == null ? this.code.length : k.position) - 1;
                    if (end >= start) {
                        max = Math.max(max, 1);
                        for (let i = start; i < end; ++i) {
                            this.code.data[i] = Opcodes_1.Opcodes.NOP;
                        }
                        this.code.data[end] = (Opcodes_1.Opcodes.ATHROW | 0);
                        let frameIndex = this.startFrame(start, 0, 1);
                        this.frame[frameIndex] = Frame_1.Frame.OBJECT_$LI$() | this.cw.addType("java/lang/Throwable");
                        this.endFrame();
                        this.firstHandler = Handler_1.Handler.remove(this.firstHandler, l, k);
                    }
                }
                l = l.successor;
            }
            ;
            handler = this.firstHandler;
            this.handlerCount = 0;
            while ((handler != null)) {
                this.handlerCount += 1;
                handler = handler.next;
            }
            ;
            this.maxStack = max;
        }
        else if (this.compute === MethodWriter.MAXS) {
            let handler = this.firstHandler;
            while ((handler != null)) {
                let l = handler.start;
                let h = handler.handler;
                let e = handler.end;
                while ((l !== e)) {
                    let b = new Edge_1.Edge();
                    b.info = Edge_1.Edge.EXCEPTION;
                    b.successor = h;
                    if ((l.status & Label_1.Label.JSR) === 0) {
                        b.next = l.successors;
                        l.successors = b;
                    }
                    else {
                        b.next = l.successors.next.next;
                        l.successors.next.next = b;
                    }
                    l = l.successor;
                }
                ;
                handler = handler.next;
            }
            ;
            if (this.subroutines > 0) {
                let id = 0;
                this.labels.visitSubroutine(null, 1, this.subroutines);
                let l = this.labels;
                while ((l != null)) {
                    if ((l.status & Label_1.Label.JSR) !== 0) {
                        let subroutine = l.successors.next.successor;
                        if ((subroutine.status & Label_1.Label.VISITED) === 0) {
                            id += 1;
                            subroutine.visitSubroutine(null, (Math.round(id / 32)) << 32 | (1 << (id % 32)), this.subroutines);
                        }
                    }
                    l = l.successor;
                }
                ;
                l = this.labels;
                while ((l != null)) {
                    if ((l.status & Label_1.Label.JSR) !== 0) {
                        let L = this.labels;
                        while ((L != null)) {
                            L.status &= ~Label_1.Label.VISITED2;
                            L = L.successor;
                        }
                        ;
                        let subroutine = l.successors.next.successor;
                        subroutine.visitSubroutine(l, 0, this.subroutines);
                    }
                    l = l.successor;
                }
                ;
            }
            let max = 0;
            let stack = this.labels;
            while ((stack != null)) {
                let l = stack;
                stack = stack.next;
                let start = l.inputStackTop;
                let blockMax = start + l.outputStackMax;
                if (blockMax > max) {
                    max = blockMax;
                }
                let b = l.successors;
                if ((l.status & Label_1.Label.JSR) !== 0) {
                    b = b.next;
                }
                while ((b != null)) {
                    l = b.successor;
                    if ((l.status & Label_1.Label.PUSHED) === 0) {
                        l.inputStackTop = b.info === Edge_1.Edge.EXCEPTION ? 1 : start + b.info;
                        l.status |= Label_1.Label.PUSHED;
                        l.next = stack;
                        stack = l;
                    }
                    b = b.next;
                }
                ;
            }
            ;
            this.maxStack = Math.max(maxStack, max);
        }
        else {
            this.maxStack = maxStack;
            this.maxLocals = maxLocals;
        }
    }
    visitEnd() {
    }
    /**
     * Adds a successor to the {@link #currentBlock currentBlock} block.
     *
     * @param info
     * information about the control flow edge to be added.
     * @param successor
     * the successor block to be added to the current block.
     */
    addSuccessor(info, successor) {
        let b = new Edge_1.Edge();
        b.info = info;
        b.successor = successor;
        b.next = this.currentBlock.successors;
        this.currentBlock.successors = b;
    }
    /**
     * Ends the current basic block. This method must be used in the case where
     * the current basic block does not have any successor.
     */
    noSuccessor() {
        if (this.compute === MethodWriter.FRAMES) {
            let l = new Label_1.Label();
            l.frame = new Frame_1.Frame();
            l.frame.owner = l;
            l.resolve(this, this.code.length, this.code.data);
            this.previousBlock.successor = l;
            this.previousBlock = l;
        }
        else {
            this.currentBlock.outputStackMax = this.maxStackSize;
        }
        if (this.compute !== MethodWriter.INSERTED_FRAMES) {
            this.currentBlock = null;
        }
    }
    /**
     * Visits a frame that has been computed from scratch.
     *
     * @param f
     * the frame that must be visited.
     */
    visitFrame$Frame(f) {
        let i;
        let t;
        let nTop = 0;
        let nLocal = 0;
        let nStack = 0;
        let locals = f.inputLocals;
        let stacks = f.inputStack;
        for (i = 0; i < locals.length; ++i) {
            t = locals[i];
            if (t === Frame_1.Frame.TOP_$LI$()) {
                ++nTop;
            }
            else {
                nLocal += nTop + 1;
                nTop = 0;
            }
            if (t === Frame_1.Frame.LONG_$LI$() || t === Frame_1.Frame.DOUBLE_$LI$()) {
                ++i;
            }
        }
        for (i = 0; i < stacks.length; ++i) {
            t = stacks[i];
            ++nStack;
            if (t === Frame_1.Frame.LONG_$LI$() || t === Frame_1.Frame.DOUBLE_$LI$()) {
                ++i;
            }
        }
        let frameIndex = this.startFrame(f.owner.position, nLocal, nStack);
        for (i = 0; nLocal > 0; ++i, --nLocal) {
            t = locals[i];
            this.frame[frameIndex++] = t;
            if (t === Frame_1.Frame.LONG_$LI$() || t === Frame_1.Frame.DOUBLE_$LI$()) {
                ++i;
            }
        }
        for (i = 0; i < stacks.length; ++i) {
            t = stacks[i];
            this.frame[frameIndex++] = t;
            if (t === Frame_1.Frame.LONG_$LI$() || t === Frame_1.Frame.DOUBLE_$LI$()) {
                ++i;
            }
        }
        this.endFrame();
    }
    /**
     * Visit the implicit first frame of this method.
     */
    visitImplicitFirstFrame() {
        let frameIndex = this.startFrame(0, this.descriptor.length + 1, 0);
        if ((this.access & Opcodes_1.Opcodes.ACC_STATIC) === 0) {
            if ((this.access & MethodWriter.ACC_CONSTRUCTOR) === 0) {
                this.frame[frameIndex++] = Frame_1.Frame.OBJECT_$LI$() | this.cw.addType(this.cw.thisName);
            }
            else {
                this.frame[frameIndex++] = 6;
            }
        }
        let i = 1;
        loop: while ((true)) {
            let j = i;
            switch ((this.descriptor.charAt(i++))) {
                case 'Z':
                case 'C':
                case 'B':
                case 'S':
                case 'I':
                    this.frame[frameIndex++] = 1;
                    break;
                case 'F':
                    this.frame[frameIndex++] = 2;
                    break;
                case 'J':
                    this.frame[frameIndex++] = 4;
                    break;
                case 'D':
                    this.frame[frameIndex++] = 3;
                    break;
                case '[':
                    while ((this.descriptor.charAt(i) === '[')) {
                        ++i;
                    }
                    ;
                    if (this.descriptor.charAt(i) === 'L') {
                        ++i;
                        while ((this.descriptor.charAt(i) !== ';')) {
                            ++i;
                        }
                        ;
                    }
                    this.frame[frameIndex++] = Frame_1.Frame.OBJECT_$LI$() | this.cw.addType(this.descriptor.substring(j, ++i));
                    break;
                case 'L':
                    while ((this.descriptor.charAt(i) !== ';')) {
                        ++i;
                    }
                    ;
                    this.frame[frameIndex++] = Frame_1.Frame.OBJECT_$LI$() | this.cw.addType(this.descriptor.substring(j + 1, i++));
                    break;
                default:
                    break loop;
            }
        }
        ;
        this.frame[1] = frameIndex - 3;
        this.endFrame();
    }
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
    startFrame(offset, nLocal, nStack) {
        let n = 3 + nLocal + nStack;
        if (this.frame == null || this.frame.length < n) {
            this.frame = new Array(n);
        }
        this.frame[0] = offset;
        this.frame[1] = nLocal;
        this.frame[2] = nStack;
        return 3;
    }
    /**
     * Checks if the visit of the current frame {@link #frame} is finished, and
     * if yes, write it in the StackMapTable attribute.
     */
    endFrame() {
        if (this.previousFrame != null) {
            if (this.stackMap == null) {
                this.stackMap = new ByteVector_1.ByteVector();
            }
            this.writeFrame();
            ++this.frameCount;
        }
        this.previousFrame = this.frame;
        this.frame = null;
    }
    /**
     * Compress and writes the current frame {@link #frame} in the StackMapTable
     * attribute.
     */
    writeFrame() {
        let clocalsSize = this.frame[1];
        let cstackSize = this.frame[2];
        if ((this.cw.version & 65535) < Opcodes_1.Opcodes.V1_6) {
            this.stackMap.putShort(this.frame[0]).putShort(clocalsSize);
            this.writeFrameTypes(3, 3 + clocalsSize);
            this.stackMap.putShort(cstackSize);
            this.writeFrameTypes(3 + clocalsSize, 3 + clocalsSize + cstackSize);
            return;
        }
        let localsSize = this.previousFrame[1];
        let type = MethodWriter.FULL_FRAME;
        let k = 0;
        let delta;
        if (this.frameCount === 0) {
            delta = this.frame[0];
        }
        else {
            delta = this.frame[0] - this.previousFrame[0] - 1;
        }
        if (cstackSize === 0) {
            k = clocalsSize - localsSize;
            switch ((k)) {
                case -3:
                case -2:
                case -1:
                    type = MethodWriter.CHOP_FRAME;
                    localsSize = clocalsSize;
                    break;
                case 0:
                    type = delta < 64 ? MethodWriter.SAME_FRAME : MethodWriter.SAME_FRAME_EXTENDED;
                    break;
                case 1:
                case 2:
                case 3:
                    type = MethodWriter.APPEND_FRAME;
                    break;
            }
        }
        else if (clocalsSize === localsSize && cstackSize === 1) {
            type = delta < 63 ? MethodWriter.SAME_LOCALS_1_STACK_ITEM_FRAME : MethodWriter.SAME_LOCALS_1_STACK_ITEM_FRAME_EXTENDED;
        }
        if (type !== MethodWriter.FULL_FRAME) {
            let l = 3;
            for (let j = 0; j < localsSize; j++) {
                if (this.frame[l] !== this.previousFrame[l]) {
                    type = MethodWriter.FULL_FRAME;
                    break;
                }
                l++;
            }
        }
        switch ((type)) {
            case MethodWriter.SAME_FRAME:
                this.stackMap.putByte(delta);
                break;
            case MethodWriter.SAME_LOCALS_1_STACK_ITEM_FRAME:
                this.stackMap.putByte(MethodWriter.SAME_LOCALS_1_STACK_ITEM_FRAME + delta);
                this.writeFrameTypes(3 + clocalsSize, 4 + clocalsSize);
                break;
            case MethodWriter.SAME_LOCALS_1_STACK_ITEM_FRAME_EXTENDED:
                this.stackMap.putByte(MethodWriter.SAME_LOCALS_1_STACK_ITEM_FRAME_EXTENDED).putShort(delta);
                this.writeFrameTypes(3 + clocalsSize, 4 + clocalsSize);
                break;
            case MethodWriter.SAME_FRAME_EXTENDED:
                this.stackMap.putByte(MethodWriter.SAME_FRAME_EXTENDED).putShort(delta);
                break;
            case MethodWriter.CHOP_FRAME:
                this.stackMap.putByte(MethodWriter.SAME_FRAME_EXTENDED + k).putShort(delta);
                break;
            case MethodWriter.APPEND_FRAME:
                this.stackMap.putByte(MethodWriter.SAME_FRAME_EXTENDED + k).putShort(delta);
                this.writeFrameTypes(3 + localsSize, 3 + clocalsSize);
                break;
            default:
                this.stackMap.putByte(MethodWriter.FULL_FRAME).putShort(delta).putShort(clocalsSize);
                this.writeFrameTypes(3, 3 + clocalsSize);
                this.stackMap.putShort(cstackSize);
                this.writeFrameTypes(3 + clocalsSize, 3 + clocalsSize + cstackSize);
        }
    }
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
    writeFrameTypes(start, end) {
        for (let i = start; i < end; ++i) {
            let t = this.frame[i];
            let d = t & Frame_1.Frame.DIM;
            if (d === 0) {
                let v = t & Frame_1.Frame.BASE_VALUE;
                switch ((t & Frame_1.Frame.BASE_KIND)) {
                    case Frame_1.Frame.OBJECT_$LI$():
                        this.stackMap.putByte(7).putShort(this.cw.newClass(this.cw.typeTable[v].strVal1));
                        break;
                    case Frame_1.Frame.UNINITIALIZED_$LI$():
                        this.stackMap.putByte(8).putShort(this.cw.typeTable[v].intVal);
                        break;
                    default:
                        this.stackMap.putByte(v);
                }
            }
            else {
                let sb = '';
                d >>= 28;
                while ((d-- > 0)) {
                    sb += '[';
                }
                ;
                if ((t & Frame_1.Frame.BASE_KIND) === Frame_1.Frame.OBJECT_$LI$()) {
                    sb += 'L';
                    sb += this.cw.typeTable[t & Frame_1.Frame.BASE_VALUE].strVal1;
                    sb += ';';
                }
                else {
                    switch ((t & 15)) {
                        case 1:
                            sb += 'I';
                            break;
                        case 2:
                            sb += 'F';
                            break;
                        case 3:
                            sb += 'D';
                            break;
                        case 9:
                            sb += 'Z';
                            break;
                        case 10:
                            sb += 'B';
                            break;
                        case 11:
                            sb += 'C';
                            break;
                        case 12:
                            sb += 'S';
                            break;
                        default:
                            sb += 'J';
                    }
                }
                this.stackMap.putByte(7).putShort(this.cw.newClass(sb.toString()));
            }
        }
    }
    writeFrameType(type) {
        if (typeof type === 'string') {
            this.stackMap.putByte(7).putShort(this.cw.newClass(type));
        }
        else if (typeof type === 'number') {
            this.stackMap.putByte(/* intValue */ (type | 0));
        }
        else {
            this.stackMap.putByte(8).putShort(type.position);
        }
    }
    /**
     * Returns the size of the bytecode of this method.
     *
     * @return the size of the bytecode of this method.
     */
    getSize() {
        if (this.classReaderOffset !== 0) {
            return 6 + this.classReaderLength;
        }
        let size = 8;
        if (this.code.length > 0) {
            if (this.code.length > 65535) {
                throw new Error("Method code too large!");
            }
            this.cw.newUTF8("Code");
            size += 18 + this.code.length + 8 * this.handlerCount;
            if (this.localVar != null) {
                this.cw.newUTF8("LocalVariableTable");
                size += 8 + this.localVar.length;
            }
            if (this.localVarType != null) {
                this.cw.newUTF8("LocalVariableTypeTable");
                size += 8 + this.localVarType.length;
            }
            if (this.lineNumber != null) {
                this.cw.newUTF8("LineNumberTable");
                size += 8 + this.lineNumber.length;
            }
            if (this.stackMap != null) {
                let zip = (this.cw.version & 65535) >= Opcodes_1.Opcodes.V1_6;
                this.cw.newUTF8(zip ? "StackMapTable" : "StackMap");
                size += 8 + this.stackMap.length;
            }
            if (ClassReader_1.ClassReader.ANNOTATIONS && this.ctanns != null) {
                this.cw.newUTF8("RuntimeVisibleTypeAnnotations");
                size += 8 + this.ctanns.getSize();
            }
            if (ClassReader_1.ClassReader.ANNOTATIONS && this.ictanns != null) {
                this.cw.newUTF8("RuntimeInvisibleTypeAnnotations");
                size += 8 + this.ictanns.getSize();
            }
            if (this.cattrs != null) {
                size += this.cattrs.getSize(this.cw, this.code.data, this.code.length, this.maxStack, this.maxLocals);
            }
        }
        if (this.exceptionCount > 0) {
            this.cw.newUTF8("Exceptions");
            size += 8 + 2 * this.exceptionCount;
        }
        if ((this.access & Opcodes_1.Opcodes.ACC_SYNTHETIC) !== 0) {
            if ((this.cw.version & 65535) < Opcodes_1.Opcodes.V1_5 || (this.access & ClassWriter_1.ClassWriter.ACC_SYNTHETIC_ATTRIBUTE) !== 0) {
                this.cw.newUTF8("Synthetic");
                size += 6;
            }
        }
        if ((this.access & Opcodes_1.Opcodes.ACC_DEPRECATED) !== 0) {
            this.cw.newUTF8("Deprecated");
            size += 6;
        }
        if (ClassReader_1.ClassReader.SIGNATURES && this.signature != null) {
            this.cw.newUTF8("Signature");
            this.cw.newUTF8(this.signature);
            size += 8;
        }
        if (this.methodParameters != null) {
            this.cw.newUTF8("MethodParameters");
            size += 7 + this.methodParameters.length;
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.annd != null) {
            this.cw.newUTF8("AnnotationDefault");
            size += 6 + this.annd.length;
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.anns != null) {
            this.cw.newUTF8("RuntimeVisibleAnnotations");
            size += 8 + this.anns.getSize();
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.ianns != null) {
            this.cw.newUTF8("RuntimeInvisibleAnnotations");
            size += 8 + this.ianns.getSize();
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.tanns != null) {
            this.cw.newUTF8("RuntimeVisibleTypeAnnotations");
            size += 8 + this.tanns.getSize();
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.itanns != null) {
            this.cw.newUTF8("RuntimeInvisibleTypeAnnotations");
            size += 8 + this.itanns.getSize();
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.panns != null) {
            this.cw.newUTF8("RuntimeVisibleParameterAnnotations");
            size += 7 + 2 * (this.panns.length - this.synthetics);
            for (let i = this.panns.length - 1; i >= this.synthetics; --i) {
                size += this.panns[i] == null ? 0 : this.panns[i].getSize();
            }
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.ipanns != null) {
            this.cw.newUTF8("RuntimeInvisibleParameterAnnotations");
            size += 7 + 2 * (this.ipanns.length - this.synthetics);
            for (let i = this.ipanns.length - 1; i >= this.synthetics; --i) {
                size += this.ipanns[i] == null ? 0 : this.ipanns[i].getSize();
            }
        }
        if (this.attrs != null) {
            size += this.attrs.getSize(this.cw, null, 0, -1, -1);
        }
        return size;
    }
    /**
     * Puts the bytecode of this method in the given byte vector.
     *
     * @param out
     * the byte vector into which the bytecode of this method must be
     * copied.
     */
    put(out) {
        let FACTOR = ClassWriter_1.ClassWriter.TO_ACC_SYNTHETIC_$LI$();
        let mask = MethodWriter.ACC_CONSTRUCTOR | Opcodes_1.Opcodes.ACC_DEPRECATED | ClassWriter_1.ClassWriter.ACC_SYNTHETIC_ATTRIBUTE | (((this.access & ClassWriter_1.ClassWriter.ACC_SYNTHETIC_ATTRIBUTE) / FACTOR | 0));
        out.putShort(this.access & ~mask).putShort(this.name).putShort(this.desc);
        if (this.classReaderOffset !== 0) {
            out.putByteArray(this.cw.cr.buf, this.classReaderOffset, this.classReaderLength);
            return;
        }
        let attributeCount = 0;
        if (this.code.length > 0) {
            ++attributeCount;
        }
        if (this.exceptionCount > 0) {
            ++attributeCount;
        }
        if ((this.access & Opcodes_1.Opcodes.ACC_SYNTHETIC) !== 0) {
            if ((this.cw.version & 65535) < Opcodes_1.Opcodes.V1_5 || (this.access & ClassWriter_1.ClassWriter.ACC_SYNTHETIC_ATTRIBUTE) !== 0) {
                ++attributeCount;
            }
        }
        if ((this.access & Opcodes_1.Opcodes.ACC_DEPRECATED) !== 0) {
            ++attributeCount;
        }
        if (ClassReader_1.ClassReader.SIGNATURES && this.signature != null) {
            ++attributeCount;
        }
        if (this.methodParameters != null) {
            ++attributeCount;
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.annd != null) {
            ++attributeCount;
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.anns != null) {
            ++attributeCount;
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.ianns != null) {
            ++attributeCount;
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.tanns != null) {
            ++attributeCount;
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.itanns != null) {
            ++attributeCount;
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.panns != null) {
            ++attributeCount;
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.ipanns != null) {
            ++attributeCount;
        }
        if (this.attrs != null) {
            attributeCount += this.attrs.getCount();
        }
        out.putShort(attributeCount);
        if (this.code.length > 0) {
            let size = 12 + this.code.length + 8 * this.handlerCount;
            if (this.localVar != null) {
                size += 8 + this.localVar.length;
            }
            if (this.localVarType != null) {
                size += 8 + this.localVarType.length;
            }
            if (this.lineNumber != null) {
                size += 8 + this.lineNumber.length;
            }
            if (this.stackMap != null) {
                size += 8 + this.stackMap.length;
            }
            if (ClassReader_1.ClassReader.ANNOTATIONS && this.ctanns != null) {
                size += 8 + this.ctanns.getSize();
            }
            if (ClassReader_1.ClassReader.ANNOTATIONS && this.ictanns != null) {
                size += 8 + this.ictanns.getSize();
            }
            if (this.cattrs != null) {
                size += this.cattrs.getSize(this.cw, this.code.data, this.code.length, this.maxStack, this.maxLocals);
            }
            out.putShort(this.cw.newUTF8("Code")).putInt(size);
            out.putShort(this.maxStack).putShort(this.maxLocals);
            out.putInt(this.code.length).putByteArray(this.code.data, 0, this.code.length);
            out.putShort(this.handlerCount);
            if (this.handlerCount > 0) {
                let h = this.firstHandler;
                while ((h != null)) {
                    out.putShort(h.start.position).putShort(h.end.position).putShort(h.handler.position).putShort(h.type);
                    h = h.next;
                }
                ;
            }
            attributeCount = 0;
            if (this.localVar != null) {
                ++attributeCount;
            }
            if (this.localVarType != null) {
                ++attributeCount;
            }
            if (this.lineNumber != null) {
                ++attributeCount;
            }
            if (this.stackMap != null) {
                ++attributeCount;
            }
            if (ClassReader_1.ClassReader.ANNOTATIONS && this.ctanns != null) {
                ++attributeCount;
            }
            if (ClassReader_1.ClassReader.ANNOTATIONS && this.ictanns != null) {
                ++attributeCount;
            }
            if (this.cattrs != null) {
                attributeCount += this.cattrs.getCount();
            }
            out.putShort(attributeCount);
            if (this.localVar != null) {
                out.putShort(this.cw.newUTF8("LocalVariableTable"));
                out.putInt(this.localVar.length + 2).putShort(this.localVarCount);
                out.putByteArray(this.localVar.data, 0, this.localVar.length);
            }
            if (this.localVarType != null) {
                out.putShort(this.cw.newUTF8("LocalVariableTypeTable"));
                out.putInt(this.localVarType.length + 2).putShort(this.localVarTypeCount);
                out.putByteArray(this.localVarType.data, 0, this.localVarType.length);
            }
            if (this.lineNumber != null) {
                out.putShort(this.cw.newUTF8("LineNumberTable"));
                out.putInt(this.lineNumber.length + 2).putShort(this.lineNumberCount);
                out.putByteArray(this.lineNumber.data, 0, this.lineNumber.length);
            }
            if (this.stackMap != null) {
                let zip = (this.cw.version & 65535) >= Opcodes_1.Opcodes.V1_6;
                out.putShort(this.cw.newUTF8(zip ? "StackMapTable" : "StackMap"));
                out.putInt(this.stackMap.length + 2).putShort(this.frameCount);
                out.putByteArray(this.stackMap.data, 0, this.stackMap.length);
            }
            if (ClassReader_1.ClassReader.ANNOTATIONS && this.ctanns != null) {
                out.putShort(this.cw.newUTF8("RuntimeVisibleTypeAnnotations"));
                this.ctanns.put(out);
            }
            if (ClassReader_1.ClassReader.ANNOTATIONS && this.ictanns != null) {
                out.putShort(this.cw.newUTF8("RuntimeInvisibleTypeAnnotations"));
                this.ictanns.put(out);
            }
            if (this.cattrs != null) {
                this.cattrs.put(this.cw, this.code.data, this.code.length, this.maxLocals, this.maxStack, out);
            }
        }
        if (this.exceptionCount > 0) {
            out.putShort(this.cw.newUTF8("Exceptions")).putInt(2 * this.exceptionCount + 2);
            out.putShort(this.exceptionCount);
            for (let i = 0; i < this.exceptionCount; ++i) {
                out.putShort(this.exceptions[i]);
            }
        }
        if ((this.access & Opcodes_1.Opcodes.ACC_SYNTHETIC) !== 0) {
            if ((this.cw.version & 65535) < Opcodes_1.Opcodes.V1_5 || (this.access & ClassWriter_1.ClassWriter.ACC_SYNTHETIC_ATTRIBUTE) !== 0) {
                out.putShort(this.cw.newUTF8("Synthetic")).putInt(0);
            }
        }
        if ((this.access & Opcodes_1.Opcodes.ACC_DEPRECATED) !== 0) {
            out.putShort(this.cw.newUTF8("Deprecated")).putInt(0);
        }
        if (ClassReader_1.ClassReader.SIGNATURES && this.signature != null) {
            out.putShort(this.cw.newUTF8("Signature")).putInt(2).putShort(this.cw.newUTF8(this.signature));
        }
        if (this.methodParameters != null) {
            out.putShort(this.cw.newUTF8("MethodParameters"));
            out.putInt(this.methodParameters.length + 1).putByte(this.methodParametersCount);
            out.putByteArray(this.methodParameters.data, 0, this.methodParameters.length);
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.annd != null) {
            out.putShort(this.cw.newUTF8("AnnotationDefault"));
            out.putInt(this.annd.length);
            out.putByteArray(this.annd.data, 0, this.annd.length);
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.anns != null) {
            out.putShort(this.cw.newUTF8("RuntimeVisibleAnnotations"));
            this.anns.put(out);
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.ianns != null) {
            out.putShort(this.cw.newUTF8("RuntimeInvisibleAnnotations"));
            this.ianns.put(out);
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.tanns != null) {
            out.putShort(this.cw.newUTF8("RuntimeVisibleTypeAnnotations"));
            this.tanns.put(out);
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.itanns != null) {
            out.putShort(this.cw.newUTF8("RuntimeInvisibleTypeAnnotations"));
            this.itanns.put(out);
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.panns != null) {
            out.putShort(this.cw.newUTF8("RuntimeVisibleParameterAnnotations"));
            AnnotationWriter_1.AnnotationWriter.put(this.panns, this.synthetics, out);
        }
        if (ClassReader_1.ClassReader.ANNOTATIONS && this.ipanns != null) {
            out.putShort(this.cw.newUTF8("RuntimeInvisibleParameterAnnotations"));
            AnnotationWriter_1.AnnotationWriter.put(this.ipanns, this.synthetics, out);
        }
        if (this.attrs != null) {
            this.attrs.put(this.cw, null, 0, -1, -1, out);
        }
    }
}
/**
 * Pseudo access flag used to denote constructors.
 */
MethodWriter.ACC_CONSTRUCTOR = 524288;
/**
 * Frame has exactly the same locals as the previous stack map frame and
 * number of stack items is zero.
 */
MethodWriter.SAME_FRAME = 0;
/**
 * Frame has exactly the same locals as the previous stack map frame and
 * number of stack items is 1
 */
MethodWriter.SAME_LOCALS_1_STACK_ITEM_FRAME = 64;
/**
 * Reserved for future use
 */
MethodWriter.RESERVED = 128;
/**
 * Frame has exactly the same locals as the previous stack map frame and
 * number of stack items is 1. Offset is bigger then 63;
 */
MethodWriter.SAME_LOCALS_1_STACK_ITEM_FRAME_EXTENDED = 247;
/**
 * Frame where current locals are the same as the locals in the previous
 * frame, except that the k last locals are absent. The value of k is given
 * by the formula 251-frame_type.
 */
MethodWriter.CHOP_FRAME = 248;
/**
 * Frame has exactly the same locals as the previous stack map frame and
 * number of stack items is zero. Offset is bigger then 63;
 */
MethodWriter.SAME_FRAME_EXTENDED = 251;
/**
 * Frame where current locals are the same as the locals in the previous
 * frame, except that k additional locals are defined. The value of k is
 * given by the formula frame_type-251.
 */
MethodWriter.APPEND_FRAME = 252;
/**
 * Full frame
 */
MethodWriter.FULL_FRAME = 255;
/**
 * Indicates that the stack map frames must be recomputed from scratch. In
 * this case the maximum stack size and number of local variables is also
 * recomputed from scratch.
 *
 * @see #compute
 */
MethodWriter.FRAMES = 0;
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
MethodWriter.INSERTED_FRAMES = 1;
/**
 * Indicates that the maximum stack size and number of local variables must
 * be automatically computed.
 *
 * @see #compute
 */
MethodWriter.MAXS = 2;
/**
 * Indicates that nothing must be automatically computed.
 *
 * @see #compute
 */
MethodWriter.NOTHING = 3;
exports.MethodWriter = MethodWriter;
MethodWriter["__class"] = "MethodWriter";
