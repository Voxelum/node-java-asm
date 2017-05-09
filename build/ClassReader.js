"use strict";
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
Object.defineProperty(exports, "__esModule", { value: true });
const Attribute_1 = require("./Attribute");
const ClassWriter_1 = require("./ClassWriter");
const Context_1 = require("./Context");
const Handle_1 = require("./Handle");
const Label_1 = require("./Label");
const MethodWriter_1 = require("./MethodWriter");
const Opcodes_1 = require("./Opcodes");
const Type_1 = require("./Type");
const TypePath_1 = require("./TypePath");
const Long = require("long");
const bits_1 = require("./bits");
class ClassReader {
    /**
     * Constructs a new {@link ClassReader} object.
     *
     * @param b   the bytecode of the class to be read.
     * @param off the start offset of the class data.
     * @param len the length of the class data.
     */
    constructor(buffer, off = 0, len = buffer.length) {
        this.maxStringLength = 0;
        this.header = 0;
        this.buf = buffer;
        if (this.readShort(off + 6) > Opcodes_1.Opcodes.V1_8)
            throw new Error();
        this.items = new Array(this.readUnsignedShort(off + 8));
        let n = this.items.length;
        this.strings = new Array(n);
        let max = 0;
        let index = off + 10;
        for (let i = 1; i < n; ++i) {
            this.items[i] = index + 1;
            let size;
            switch ((buffer[index])) {
                case ClassWriter_1.ClassWriter.FIELD:
                case ClassWriter_1.ClassWriter.METH:
                case ClassWriter_1.ClassWriter.IMETH:
                case ClassWriter_1.ClassWriter.INT:
                case ClassWriter_1.ClassWriter.FLOAT:
                case ClassWriter_1.ClassWriter.NAME_TYPE:
                case ClassWriter_1.ClassWriter.INDY:
                    size = 5;
                    break;
                case ClassWriter_1.ClassWriter.LONG:
                case ClassWriter_1.ClassWriter.DOUBLE:
                    size = 9;
                    ++i;
                    break;
                case ClassWriter_1.ClassWriter.UTF8:
                    size = 3 + this.readUnsignedShort(index + 1);
                    if (size > max) {
                        max = size;
                    }
                    break;
                case ClassWriter_1.ClassWriter.HANDLE:
                    size = 4;
                    break;
                default:
                    size = 3;
                    break;
            }
            index += size;
        }
        this.maxStringLength = max;
        this.header = index;
    }
    /**
     * Returns the class's access flags (see {@link Opcodes}). This value may
     * not reflect Deprecated and Synthetic flags when bytecode is before 1.5
     * and those flags are represented by attributes.
     *
     * @return the class access flags
     * @see ClassVisitor#visit(int, int, String, String, String, String[])
     */
    getAccess() {
        return this.readUnsignedShort(this.header);
    }
    /**
     * Returns the internal name of the class (see
     * {@link Type#getInternalName() getInternalName}).
     *
     * @return the internal class name
     * @see ClassVisitor#visit(int, int, String, String, String, String[])
     */
    getClassName() {
        return this.readClass(this.header + 2, new Array(this.maxStringLength));
    }
    /**
     * Returns the internal of name of the super class (see
     * {@link Type#getInternalName() getInternalName}). For interfaces, the
     * super class is {@link Object}.
     *
     * @return the internal name of super class, or <tt>null</tt> for
     * {@link Object} class.
     * @see ClassVisitor#visit(int, int, String, String, String, String[])
     */
    getSuperName() {
        return this.readClass(this.header + 4, new Array(this.maxStringLength));
    }
    /**
     * Returns the internal names of the class's interfaces (see
     * {@link Type#getInternalName() getInternalName}).
     *
     * @return the array of internal names for all implemented interfaces or
     * <tt>null</tt>.
     * @see ClassVisitor#visit(int, int, String, String, String, String[])
     */
    getInterfaces() {
        let index = this.header + 6;
        let n = this.readUnsignedShort(index);
        let interfaces = new Array(n);
        if (n > 0) {
            let buf = new Array(this.maxStringLength);
            for (let i = 0; i < n; ++i) {
                index += 2;
                interfaces[i] = this.readClass(index, buf);
            }
        }
        return interfaces;
    }
    /**
     * Makes the given visitor visit the Java class of this {@link ClassReader}.
     * This class is the one specified in the constructor (see
     * {@link #ClassReader(byte[]) ClassReader}).
     *
     * @param classVisitor the visitor that must visit this class.
     * @param attrs        prototypes of the attributes that must be parsed during the
     * visit of the class. Any attribute whose type is not equal to
     * the type of one the prototypes will not be parsed: its byte
     * array value will be passed unchanged to the ClassWriter.
     * <i>This may corrupt it if this value contains references to
     * the constant pool, or has syntactic or semantic links with a
     * class element that has been transformed by a class adapter
     * between the reader and the writer</i>.
     * @param flags        option flags that can be used to modify the default behavior
     * of this class. See {@link #SKIP_DEBUG}, {@link #EXPAND_FRAMES}
     * , {@link #SKIP_FRAMES}, {@link #SKIP_CODE}.
     */
    accept(classVisitor, attrs = [], flags = 0) {
        let u = this.header;
        let c = new Array(this.maxStringLength);
        let context = new Context_1.Context();
        context.attrs = attrs;
        context.flags = flags;
        context.buffer = c;
        let access = this.readUnsignedShort(u);
        let name = this.readClass(u + 2, c);
        let superClass = this.readClass(u + 4, c);
        let interfaces = new Array(this.readUnsignedShort(u + 6));
        u += 8;
        for (let i = 0; i < interfaces.length; ++i) {
            interfaces[i] = this.readClass(u, c);
            u += 2;
        }
        let signature = null;
        let sourceFile = null;
        let sourceDebug = null;
        let enclosingOwner = null;
        let enclosingName = null;
        let enclosingDesc = null;
        let anns = 0;
        let ianns = 0;
        let tanns = 0;
        let itanns = 0;
        let innerClasses = 0;
        let attributes = null;
        u = this.getAttributes();
        for (let i = this.readUnsignedShort(u); i > 0; --i) {
            let attrName = this.readUTF8(u + 2, c);
            if (("SourceFile" === attrName)) {
                sourceFile = this.readUTF8(u + 8, c);
            }
            else if (("InnerClasses" === attrName)) {
                innerClasses = u + 8;
            }
            else if (("EnclosingMethod" === attrName)) {
                enclosingOwner = this.readClass(u + 8, c);
                let item = this.readUnsignedShort(u + 10);
                if (item !== 0) {
                    enclosingName = this.readUTF8(this.items[item], c);
                    enclosingDesc = this.readUTF8(this.items[item] + 2, c);
                }
            }
            else if (ClassReader.SIGNATURES && ("Signature" === attrName)) {
                signature = this.readUTF8(u + 8, c);
            }
            else if (ClassReader.ANNOTATIONS && ("RuntimeVisibleAnnotations" === attrName)) {
                anns = u + 8;
            }
            else if (ClassReader.ANNOTATIONS && ("RuntimeVisibleTypeAnnotations" === attrName)) {
                tanns = u + 8;
            }
            else if (("Deprecated" === attrName)) {
                access |= Opcodes_1.Opcodes.ACC_DEPRECATED;
            }
            else if (("Synthetic" === attrName)) {
                access |= Opcodes_1.Opcodes.ACC_SYNTHETIC | ClassWriter_1.ClassWriter.ACC_SYNTHETIC_ATTRIBUTE;
            }
            else if (("SourceDebugExtension" === attrName)) {
                let len = this.readInt(u + 4);
                sourceDebug = this.readUTF(u + 8, len, new Array(len));
            }
            else if (ClassReader.ANNOTATIONS && ("RuntimeInvisibleAnnotations" === attrName)) {
                ianns = u + 8;
            }
            else if (ClassReader.ANNOTATIONS && ("RuntimeInvisibleTypeAnnotations" === attrName)) {
                itanns = u + 8;
            }
            else if (("BootstrapMethods" === attrName)) {
                let bootstrapMethods = new Array(this.readUnsignedShort(u + 8));
                for (let j = 0, v = u + 10; j < bootstrapMethods.length; j++) {
                    bootstrapMethods[j] = v;
                    v += 2 + this.readUnsignedShort(v + 2) << 1;
                }
                context.bootstrapMethods = bootstrapMethods;
            }
            else {
                let attr = this.readAttribute(attrs, attrName, u + 8, this.readInt(u + 4), c, -1, null);
                if (attr != null) {
                    attr.next = attributes;
                    attributes = attr;
                }
            }
            u += 6 + this.readInt(u + 4);
        }
        classVisitor.visit(this.readInt(this.items[1] - 7), access, name, signature, superClass, interfaces);
        if ((flags & ClassReader.SKIP_DEBUG) === 0 && (sourceFile != null || sourceDebug != null)) {
            classVisitor.visitSource(sourceFile, sourceDebug);
        }
        if (enclosingOwner != null) {
            classVisitor.visitOuterClass(enclosingOwner, enclosingName, enclosingDesc);
        }
        if (ClassReader.ANNOTATIONS && anns !== 0) {
            for (let i = this.readUnsignedShort(anns), v = anns + 2; i > 0; --i) {
                v = this.readAnnotationValues(v + 2, c, true, classVisitor.visitAnnotation(this.readUTF8(v, c), true));
            }
        }
        if (ClassReader.ANNOTATIONS && ianns !== 0) {
            for (let i = this.readUnsignedShort(ianns), v = ianns + 2; i > 0; --i) {
                v = this.readAnnotationValues(v + 2, c, true, classVisitor.visitAnnotation(this.readUTF8(v, c), false));
            }
        }
        if (ClassReader.ANNOTATIONS && tanns !== 0) {
            for (let i = this.readUnsignedShort(tanns), v = tanns + 2; i > 0; --i) {
                v = this.readAnnotationTarget(context, v);
                v = this.readAnnotationValues(v + 2, c, true, classVisitor.visitTypeAnnotation(context.typeRef, context.typePath, this.readUTF8(v, c), true));
            }
        }
        if (ClassReader.ANNOTATIONS && itanns !== 0) {
            for (let i = this.readUnsignedShort(itanns), v = itanns + 2; i > 0; --i) {
                v = this.readAnnotationTarget(context, v);
                v = this.readAnnotationValues(v + 2, c, true, classVisitor.visitTypeAnnotation(context.typeRef, context.typePath, this.readUTF8(v, c), false));
            }
        }
        while ((attributes != null)) {
            let attr = attributes.next;
            attributes.next = null;
            classVisitor.visitAttribute(attributes);
            attributes = attr;
        }
        ;
        if (innerClasses !== 0) {
            let v = innerClasses + 2;
            for (let i = this.readUnsignedShort(innerClasses); i > 0; --i) {
                classVisitor.visitInnerClass(this.readClass(v, c), this.readClass(v + 2, c), this.readUTF8(v + 4, c), this.readUnsignedShort(v + 6));
                v += 8;
            }
        }
        u = this.header + 10 + 2 * interfaces.length;
        for (let i = this.readUnsignedShort(u - 2); i > 0; --i) {
            u = this.readField(classVisitor, context, u);
        }
        u += 2;
        for (let i = this.readUnsignedShort(u - 2); i > 0; --i) {
            u = this.readMethod(classVisitor, context, u);
        }
        classVisitor.visitEnd();
    }
    /**
     * Reads a field and makes the given visitor visit it.
     *
     * @param classVisitor the visitor that must visit the field.
     * @param context      information about the class being parsed.
     * @param u            the start offset of the field in the class file.
     * @return the offset of the first byte following the field in the class.
     */
    readField(classVisitor, context, u) {
        let c = context.buffer;
        let access = this.readUnsignedShort(u);
        let name = this.readUTF8(u + 2, c);
        let desc = this.readUTF8(u + 4, c);
        u += 6;
        let signature = null;
        let anns = 0;
        let ianns = 0;
        let tanns = 0;
        let itanns = 0;
        let value = null;
        let attributes = null;
        for (let i = this.readUnsignedShort(u); i > 0; --i) {
            let attrName = this.readUTF8(u + 2, c);
            if (("ConstantValue" === attrName)) {
                let item = this.readUnsignedShort(u + 8);
                value = item === 0 ? null : this.readConst(item, c);
            }
            else if (ClassReader.SIGNATURES && ("Signature" === attrName)) {
                signature = this.readUTF8(u + 8, c);
            }
            else if (("Deprecated" === attrName)) {
                access |= Opcodes_1.Opcodes.ACC_DEPRECATED;
            }
            else if (("Synthetic" === attrName)) {
                access |= Opcodes_1.Opcodes.ACC_SYNTHETIC | ClassWriter_1.ClassWriter.ACC_SYNTHETIC_ATTRIBUTE;
            }
            else if (ClassReader.ANNOTATIONS && ("RuntimeVisibleAnnotations" === attrName)) {
                anns = u + 8;
            }
            else if (ClassReader.ANNOTATIONS && ("RuntimeVisibleTypeAnnotations" === attrName)) {
                tanns = u + 8;
            }
            else if (ClassReader.ANNOTATIONS && ("RuntimeInvisibleAnnotations" === attrName)) {
                ianns = u + 8;
            }
            else if (ClassReader.ANNOTATIONS && ("RuntimeInvisibleTypeAnnotations" === attrName)) {
                itanns = u + 8;
            }
            else {
                let attr = this.readAttribute(context.attrs, attrName, u + 8, this.readInt(u + 4), c, -1, null);
                if (attr != null) {
                    attr.next = attributes;
                    attributes = attr;
                }
            }
            u += 6 + this.readInt(u + 4);
        }
        u += 2;
        let fv = classVisitor.visitField(access, name, desc, signature, value);
        if (fv == null) {
            return u;
        }
        if (ClassReader.ANNOTATIONS && anns !== 0) {
            for (let i = this.readUnsignedShort(anns), v = anns + 2; i > 0; --i) {
                v = this.readAnnotationValues(v + 2, c, true, fv.visitAnnotation(this.readUTF8(v, c), true));
            }
        }
        if (ClassReader.ANNOTATIONS && ianns !== 0) {
            for (let i = this.readUnsignedShort(ianns), v = ianns + 2; i > 0; --i) {
                v = this.readAnnotationValues(v + 2, c, true, fv.visitAnnotation(this.readUTF8(v, c), false));
            }
        }
        if (ClassReader.ANNOTATIONS && tanns !== 0) {
            for (let i = this.readUnsignedShort(tanns), v = tanns + 2; i > 0; --i) {
                v = this.readAnnotationTarget(context, v);
                v = this.readAnnotationValues(v + 2, c, true, fv.visitTypeAnnotation(context.typeRef, context.typePath, this.readUTF8(v, c), true));
            }
        }
        if (ClassReader.ANNOTATIONS && itanns !== 0) {
            for (let i = this.readUnsignedShort(itanns), v = itanns + 2; i > 0; --i) {
                v = this.readAnnotationTarget(context, v);
                v = this.readAnnotationValues(v + 2, c, true, fv.visitTypeAnnotation(context.typeRef, context.typePath, this.readUTF8(v, c), false));
            }
        }
        while ((attributes != null)) {
            let attr = attributes.next;
            attributes.next = null;
            fv.visitAttribute(attributes);
            attributes = attr;
        }
        ;
        fv.visitEnd();
        return u;
    }
    /**
     * Reads a method and makes the given visitor visit it.
     *
     * @param classVisitor the visitor that must visit the method.
     * @param context      information about the class being parsed.
     * @param u            the start offset of the method in the class file.
     * @return the offset of the first byte following the method in the class.
     */
    readMethod(classVisitor, context, u) {
        let c = context.buffer;
        context.access = this.readUnsignedShort(u);
        context.name = this.readUTF8(u + 2, c);
        context.desc = this.readUTF8(u + 4, c);
        u += 6;
        let code = 0;
        let exception = 0;
        let exceptions = null;
        let signature = null;
        let methodParameters = 0;
        let anns = 0;
        let ianns = 0;
        let tanns = 0;
        let itanns = 0;
        let dann = 0;
        let mpanns = 0;
        let impanns = 0;
        let firstAttribute = u;
        let attributes = null;
        for (let i = this.readUnsignedShort(u); i > 0; --i) {
            let attrName = this.readUTF8(u + 2, c);
            if (("Code" === attrName)) {
                if ((context.flags & ClassReader.SKIP_CODE) === 0) {
                    code = u + 8;
                }
            }
            else if (("Exceptions" === attrName)) {
                exceptions = new Array(this.readUnsignedShort(u + 8));
                exception = u + 10;
                for (let j = 0; j < exceptions.length; ++j) {
                    exceptions[j] = this.readClass(exception, c);
                    exception += 2;
                }
            }
            else if (ClassReader.SIGNATURES && ("Signature" === attrName)) {
                signature = this.readUTF8(u + 8, c);
            }
            else if (("Deprecated" === attrName)) {
                context.access |= Opcodes_1.Opcodes.ACC_DEPRECATED;
            }
            else if (ClassReader.ANNOTATIONS && ("RuntimeVisibleAnnotations" === attrName)) {
                anns = u + 8;
            }
            else if (ClassReader.ANNOTATIONS && ("RuntimeVisibleTypeAnnotations" === attrName)) {
                tanns = u + 8;
            }
            else if (ClassReader.ANNOTATIONS && ("AnnotationDefault" === attrName)) {
                dann = u + 8;
            }
            else if (("Synthetic" === attrName)) {
                context.access |= Opcodes_1.Opcodes.ACC_SYNTHETIC | ClassWriter_1.ClassWriter.ACC_SYNTHETIC_ATTRIBUTE;
            }
            else if (ClassReader.ANNOTATIONS && ("RuntimeInvisibleAnnotations" === attrName)) {
                ianns = u + 8;
            }
            else if (ClassReader.ANNOTATIONS && ("RuntimeInvisibleTypeAnnotations" === attrName)) {
                itanns = u + 8;
            }
            else if (ClassReader.ANNOTATIONS && ("RuntimeVisibleParameterAnnotations" === attrName)) {
                mpanns = u + 8;
            }
            else if (ClassReader.ANNOTATIONS && ("RuntimeInvisibleParameterAnnotations" === attrName)) {
                impanns = u + 8;
            }
            else if (("MethodParameters" === attrName)) {
                methodParameters = u + 8;
            }
            else {
                let attr = this.readAttribute(context.attrs, attrName, u + 8, this.readInt(u + 4), c, -1, null);
                if (attr != null) {
                    attr.next = attributes;
                    attributes = attr;
                }
            }
            u += 6 + this.readInt(u + 4);
        }
        u += 2;
        let mv = classVisitor.visitMethod(context.access, context.name, context.desc, signature, exceptions);
        if (mv == null) {
            return u;
        }
        if (ClassReader.WRITER && (mv != null && mv instanceof MethodWriter_1.MethodWriter)) {
            let mw = mv;
            if (mw.cw.cr === this && signature === mw.signature) {
                let sameExceptions = false;
                if (exceptions == null) {
                    sameExceptions = mw.exceptionCount === 0;
                }
                else if (exceptions.length === mw.exceptionCount) {
                    sameExceptions = true;
                    for (let j = exceptions.length - 1; j >= 0; --j) {
                        exception -= 2;
                        if (mw.exceptions[j] !== this.readUnsignedShort(exception)) {
                            sameExceptions = false;
                            break;
                        }
                    }
                }
                if (sameExceptions) {
                    mw.classReaderOffset = firstAttribute;
                    mw.classReaderLength = u - firstAttribute;
                    return u;
                }
            }
        }
        if (methodParameters !== 0) {
            for (let i = this.buf[methodParameters] & 255, v = methodParameters + 1; i > 0; --i, v = v + 4) {
                mv.visitParameter(this.readUTF8(v, c), this.readUnsignedShort(v + 2));
            }
        }
        if (ClassReader.ANNOTATIONS && dann !== 0) {
            let dv = mv.visitAnnotationDefault();
            this.readAnnotationValue(dann, c, null, dv);
            if (dv != null) {
                dv.visitEnd();
            }
        }
        if (ClassReader.ANNOTATIONS && anns !== 0) {
            for (let i = this.readUnsignedShort(anns), v = anns + 2; i > 0; --i) {
                v = this.readAnnotationValues(v + 2, c, true, mv.visitAnnotation(this.readUTF8(v, c), true));
            }
        }
        if (ClassReader.ANNOTATIONS && ianns !== 0) {
            for (let i = this.readUnsignedShort(ianns), v = ianns + 2; i > 0; --i) {
                v = this.readAnnotationValues(v + 2, c, true, mv.visitAnnotation(this.readUTF8(v, c), false));
            }
        }
        if (ClassReader.ANNOTATIONS && tanns !== 0) {
            for (let i = this.readUnsignedShort(tanns), v = tanns + 2; i > 0; --i) {
                v = this.readAnnotationTarget(context, v);
                v = this.readAnnotationValues(v + 2, c, true, mv.visitTypeAnnotation(context.typeRef, context.typePath, this.readUTF8(v, c), true));
            }
        }
        if (ClassReader.ANNOTATIONS && itanns !== 0) {
            for (let i = this.readUnsignedShort(itanns), v = itanns + 2; i > 0; --i) {
                v = this.readAnnotationTarget(context, v);
                v = this.readAnnotationValues(v + 2, c, true, mv.visitTypeAnnotation(context.typeRef, context.typePath, this.readUTF8(v, c), false));
            }
        }
        if (ClassReader.ANNOTATIONS && mpanns !== 0) {
            this.readParameterAnnotations(mv, context, mpanns, true);
        }
        if (ClassReader.ANNOTATIONS && impanns !== 0) {
            this.readParameterAnnotations(mv, context, impanns, false);
        }
        while ((attributes != null)) {
            let attr = attributes.next;
            attributes.next = null;
            mv.visitAttribute(attributes);
            attributes = attr;
        }
        ;
        if (code !== 0) {
            mv.visitCode();
            this.readCode(mv, context, code);
        }
        mv.visitEnd();
        return u;
    }
    /**
     * Reads the bytecode of a method and makes the given visitor visit it.
     *
     * @param mv      the visitor that must visit the method's code.
     * @param context information about the class being parsed.
     * @param u       the start offset of the code attribute in the class file.
     */
    readCode(mv, context, u) {
        let b = this.buf;
        let c = context.buffer;
        let maxStack = this.readUnsignedShort(u);
        let maxLocals = this.readUnsignedShort(u + 2);
        let codeLength = this.readInt(u + 4);
        u += 8;
        let codeStart = u;
        let codeEnd = u + codeLength;
        let labels = context.labels = new Array(codeLength + 2);
        this.readLabel(codeLength + 1, labels);
        while ((u < codeEnd)) {
            let offset = u - codeStart;
            let opcode = b[u] & 255;
            switch ((ClassWriter_1.ClassWriter.TYPE[opcode])) {
                case ClassWriter_1.ClassWriter.NOARG_INSN:
                case ClassWriter_1.ClassWriter.IMPLVAR_INSN:
                    u += 1;
                    break;
                case ClassWriter_1.ClassWriter.LABEL_INSN:
                    this.readLabel(offset + this.readShort(u + 1), labels);
                    u += 3;
                    break;
                case ClassWriter_1.ClassWriter.ASM_LABEL_INSN:
                    this.readLabel(offset + this.readUnsignedShort(u + 1), labels);
                    u += 3;
                    break;
                case ClassWriter_1.ClassWriter.LABELW_INSN:
                    this.readLabel(offset + this.readInt(u + 1), labels);
                    u += 5;
                    break;
                case ClassWriter_1.ClassWriter.WIDE_INSN:
                    opcode = b[u + 1] & 255;
                    if (opcode === Opcodes_1.Opcodes.IINC) {
                        u += 6;
                    }
                    else {
                        u += 4;
                    }
                    break;
                case ClassWriter_1.ClassWriter.TABL_INSN:
                    u = u + 4 - (offset & 3);
                    this.readLabel(offset + this.readInt(u), labels);
                    for (let i = this.readInt(u + 8) - this.readInt(u + 4) + 1; i > 0; --i) {
                        this.readLabel(offset + this.readInt(u + 12), labels);
                        u += 4;
                    }
                    u += 12;
                    break;
                case ClassWriter_1.ClassWriter.LOOK_INSN:
                    u = u + 4 - (offset & 3);
                    this.readLabel(offset + this.readInt(u), labels);
                    for (let i = this.readInt(u + 4); i > 0; --i) {
                        this.readLabel(offset + this.readInt(u + 12), labels);
                        u += 8;
                    }
                    u += 8;
                    break;
                case ClassWriter_1.ClassWriter.VAR_INSN:
                case ClassWriter_1.ClassWriter.SBYTE_INSN:
                case ClassWriter_1.ClassWriter.LDC_INSN:
                    u += 2;
                    break;
                case ClassWriter_1.ClassWriter.SHORT_INSN:
                case ClassWriter_1.ClassWriter.LDCW_INSN:
                case ClassWriter_1.ClassWriter.FIELDORMETH_INSN:
                case ClassWriter_1.ClassWriter.TYPE_INSN:
                case ClassWriter_1.ClassWriter.IINC_INSN:
                    u += 3;
                    break;
                case ClassWriter_1.ClassWriter.ITFMETH_INSN:
                case ClassWriter_1.ClassWriter.INDYMETH_INSN:
                    u += 5;
                    break;
                default:
                    u += 4;
                    break;
            }
        }
        ;
        for (let i = this.readUnsignedShort(u); i > 0; --i) {
            let start = this.readLabel(this.readUnsignedShort(u + 2), labels);
            let end = this.readLabel(this.readUnsignedShort(u + 4), labels);
            let handler = this.readLabel(this.readUnsignedShort(u + 6), labels);
            let type = this.readUTF8(this.items[this.readUnsignedShort(u + 8)], c);
            mv.visitTryCatchBlock(start, end, handler, type);
            u += 8;
        }
        u += 2;
        let tanns = null;
        let itanns = null;
        let tann = 0;
        let itann = 0;
        let ntoff = -1;
        let nitoff = -1;
        let varTable = 0;
        let varTypeTable = 0;
        let zip = true;
        let unzip = (context.flags & ClassReader.EXPAND_FRAMES) !== 0;
        let stackMap = 0;
        let stackMapSize = 0;
        let frameCount = 0;
        let frame = null;
        let attributes = null;
        for (let i = this.readUnsignedShort(u); i > 0; --i) {
            let attrName = this.readUTF8(u + 2, c);
            if (("LocalVariableTable" === attrName)) {
                if ((context.flags & ClassReader.SKIP_DEBUG) === 0) {
                    varTable = u + 8;
                    for (let j = this.readUnsignedShort(u + 8), v = u; j > 0; --j) {
                        let label = this.readUnsignedShort(v + 10);
                        if (labels[label] == null) {
                            this.readLabel(label, labels).status |= Label_1.Label.DEBUG;
                        }
                        label += this.readUnsignedShort(v + 12);
                        if (labels[label] == null) {
                            this.readLabel(label, labels).status |= Label_1.Label.DEBUG;
                        }
                        v += 10;
                    }
                }
            }
            else if (("LocalVariableTypeTable" === attrName)) {
                varTypeTable = u + 8;
            }
            else if (("LineNumberTable" === attrName)) {
                if ((context.flags & ClassReader.SKIP_DEBUG) === 0) {
                    for (let j = this.readUnsignedShort(u + 8), v = u; j > 0; --j) {
                        let label = this.readUnsignedShort(v + 10);
                        if (labels[label] == null) {
                            this.readLabel(label, labels).status |= Label_1.Label.DEBUG;
                        }
                        let l = labels[label];
                        while ((l.line > 0)) {
                            if (l.next == null) {
                                l.next = new Label_1.Label();
                            }
                            l = l.next;
                        }
                        ;
                        l.line = this.readUnsignedShort(v + 12);
                        v += 4;
                    }
                }
            }
            else if (ClassReader.ANNOTATIONS && ("RuntimeVisibleTypeAnnotations" === attrName)) {
                tanns = this.readTypeAnnotations(mv, context, u + 8, true);
                ntoff = tanns.length === 0 || this.readByte(tanns[0]) < 67 ? -1 : this.readUnsignedShort(tanns[0] + 1);
            }
            else if (ClassReader.ANNOTATIONS && ("RuntimeInvisibleTypeAnnotations" === attrName)) {
                itanns = this.readTypeAnnotations(mv, context, u + 8, false);
                nitoff = itanns.length === 0 || this.readByte(itanns[0]) < 67 ? -1 : this.readUnsignedShort(itanns[0] + 1);
            }
            else if (ClassReader.FRAMES && ("StackMapTable" === attrName)) {
                if ((context.flags & ClassReader.SKIP_FRAMES) === 0) {
                    stackMap = u + 10;
                    stackMapSize = this.readInt(u + 4);
                    frameCount = this.readUnsignedShort(u + 8);
                }
            }
            else if (ClassReader.FRAMES && ("StackMap" === attrName)) {
                if ((context.flags & ClassReader.SKIP_FRAMES) === 0) {
                    zip = false;
                    stackMap = u + 10;
                    stackMapSize = this.readInt(u + 4);
                    frameCount = this.readUnsignedShort(u + 8);
                }
            }
            else {
                for (let j = 0; j < context.attrs.length; ++j) {
                    if ((context.attrs[j].type === attrName)) {
                        let attr = context.attrs[j].read(this, u + 8, this.readInt(u + 4), c, codeStart - 8, labels);
                        if (attr != null) {
                            attr.next = attributes;
                            attributes = attr;
                        }
                    }
                }
            }
            u += 6 + this.readInt(u + 4);
        }
        u += 2;
        if (ClassReader.FRAMES && stackMap !== 0) {
            frame = context;
            frame.offset = -1;
            frame.mode = 0;
            frame.localCount = 0;
            frame.localDiff = 0;
            frame.stackCount = 0;
            frame.local = new Array(maxLocals);
            frame.stack = new Array(maxStack);
            if (unzip) {
                this.getImplicitFrame(context);
            }
            for (let i = stackMap; i < stackMap + stackMapSize - 2; ++i) {
                if (b[i] === 8) {
                    let v = this.readUnsignedShort(i + 1);
                    if (v >= 0 && v < codeLength) {
                        if ((b[codeStart + v] & 255) === Opcodes_1.Opcodes.NEW) {
                            this.readLabel(v, labels);
                        }
                    }
                }
            }
        }
        if ((context.flags & ClassReader.EXPAND_ASM_INSNS) !== 0) {
            mv.visitFrame(Opcodes_1.Opcodes.F_NEW, maxLocals, null, 0, null);
        }
        let opcodeDelta = (context.flags & ClassReader.EXPAND_ASM_INSNS) === 0 ? -33 : 0;
        u = codeStart;
        while ((u < codeEnd)) {
            let offset = u - codeStart;
            let l = labels[offset];
            if (l != null) {
                let next = l.next;
                l.next = null;
                mv.visitLabel(l);
                if ((context.flags & ClassReader.SKIP_DEBUG) === 0 && l.line > 0) {
                    mv.visitLineNumber(l.line, l);
                    while ((next != null)) {
                        mv.visitLineNumber(next.line, l);
                        next = next.next;
                    }
                    ;
                }
            }
            while ((ClassReader.FRAMES && frame != null && (frame.offset === offset || frame.offset === -1))) {
                if (frame.offset !== -1) {
                    if (!zip || unzip) {
                        mv.visitFrame(Opcodes_1.Opcodes.F_NEW, frame.localCount, frame.local, frame.stackCount, frame.stack);
                    }
                    else {
                        mv.visitFrame(frame.mode, frame.localDiff, frame.local, frame.stackCount, frame.stack);
                    }
                }
                if (frameCount > 0) {
                    stackMap = this.readFrame(stackMap, zip, unzip, frame);
                    --frameCount;
                }
                else {
                    frame = null;
                }
            }
            ;
            let opcode = b[u] & 255;
            switch ((ClassWriter_1.ClassWriter.TYPE[opcode])) {
                case ClassWriter_1.ClassWriter.NOARG_INSN:
                    mv.visitInsn(opcode);
                    u += 1;
                    break;
                case ClassWriter_1.ClassWriter.IMPLVAR_INSN:
                    if (opcode > Opcodes_1.Opcodes.ISTORE) {
                        opcode -= 59;
                        mv.visitVarInsn(Opcodes_1.Opcodes.ISTORE + (opcode >> 2), opcode & 3);
                    }
                    else {
                        opcode -= 26;
                        mv.visitVarInsn(Opcodes_1.Opcodes.ILOAD + (opcode >> 2), opcode & 3);
                    }
                    u += 1;
                    break;
                case ClassWriter_1.ClassWriter.LABEL_INSN:
                    mv.visitJumpInsn(opcode, labels[offset + this.readShort(u + 1)]);
                    u += 3;
                    break;
                case ClassWriter_1.ClassWriter.LABELW_INSN:
                    mv.visitJumpInsn(opcode + opcodeDelta, labels[offset + this.readInt(u + 1)]);
                    u += 5;
                    break;
                case ClassWriter_1.ClassWriter.ASM_LABEL_INSN:
                    {
                        opcode = opcode < 218 ? opcode - 49 : opcode - 20;
                        let target = labels[offset + this.readUnsignedShort(u + 1)];
                        if (opcode === Opcodes_1.Opcodes.GOTO || opcode === Opcodes_1.Opcodes.JSR) {
                            mv.visitJumpInsn(opcode + 33, target);
                        }
                        else {
                            opcode = opcode <= 166 ? ((opcode + 1) ^ 1) - 1 : opcode ^ 1;
                            let endif = new Label_1.Label();
                            mv.visitJumpInsn(opcode, endif);
                            mv.visitJumpInsn(200, target);
                            mv.visitLabel(endif);
                            if (ClassReader.FRAMES && stackMap !== 0 && (frame == null || frame.offset !== offset + 3)) {
                                mv.visitFrame(ClassWriter_1.ClassWriter.F_INSERT, 0, null, 0, null);
                            }
                        }
                        u += 3;
                        break;
                    }
                    ;
                case ClassWriter_1.ClassWriter.WIDE_INSN:
                    opcode = b[u + 1] & 255;
                    if (opcode === Opcodes_1.Opcodes.IINC) {
                        mv.visitIincInsn(this.readUnsignedShort(u + 2), this.readShort(u + 4));
                        u += 6;
                    }
                    else {
                        mv.visitVarInsn(opcode, this.readUnsignedShort(u + 2));
                        u += 4;
                    }
                    break;
                case ClassWriter_1.ClassWriter.TABL_INSN:
                    {
                        u = u + 4 - (offset & 3);
                        let label = offset + this.readInt(u);
                        let min = this.readInt(u + 4);
                        let max = this.readInt(u + 8);
                        let table = new Array(max - min + 1);
                        u += 12;
                        for (let i = 0; i < table.length; ++i) {
                            table[i] = labels[offset + this.readInt(u)];
                            u += 4;
                        }
                        (this['__jswref_0'] = mv).visitTableSwitchInsn.apply(this['__jswref_0'], [min, max, labels[label]].concat(table));
                        break;
                    }
                    ;
                case ClassWriter_1.ClassWriter.LOOK_INSN:
                    {
                        u = u + 4 - (offset & 3);
                        let label = offset + this.readInt(u);
                        let len = this.readInt(u + 4);
                        let keys = new Array(len);
                        let values = new Array(len);
                        u += 8;
                        for (let i = 0; i < len; ++i) {
                            keys[i] = this.readInt(u);
                            values[i] = labels[offset + this.readInt(u + 4)];
                            u += 8;
                        }
                        mv.visitLookupSwitchInsn(labels[label], keys, values);
                        break;
                    }
                    ;
                case ClassWriter_1.ClassWriter.VAR_INSN:
                    mv.visitVarInsn(opcode, b[u + 1] & 255);
                    u += 2;
                    break;
                case ClassWriter_1.ClassWriter.SBYTE_INSN:
                    mv.visitIntInsn(opcode, b[u + 1]);
                    u += 2;
                    break;
                case ClassWriter_1.ClassWriter.SHORT_INSN:
                    mv.visitIntInsn(opcode, this.readShort(u + 1));
                    u += 3;
                    break;
                case ClassWriter_1.ClassWriter.LDC_INSN:
                    mv.visitLdcInsn(this.readConst(b[u + 1] & 255, c));
                    u += 2;
                    break;
                case ClassWriter_1.ClassWriter.LDCW_INSN:
                    mv.visitLdcInsn(this.readConst(this.readUnsignedShort(u + 1), c));
                    u += 3;
                    break;
                case ClassWriter_1.ClassWriter.FIELDORMETH_INSN:
                case ClassWriter_1.ClassWriter.ITFMETH_INSN:
                    {
                        let cpIndex = this.items[this.readUnsignedShort(u + 1)];
                        let itf = b[cpIndex - 1] === ClassWriter_1.ClassWriter.IMETH;
                        let iowner = this.readClass(cpIndex, c);
                        cpIndex = this.items[this.readUnsignedShort(cpIndex + 2)];
                        let iname = this.readUTF8(cpIndex, c);
                        let idesc = this.readUTF8(cpIndex + 2, c);
                        if (opcode < Opcodes_1.Opcodes.INVOKEVIRTUAL) {
                            mv.visitFieldInsn(opcode, iowner, iname, idesc);
                        }
                        else {
                            mv.visitMethodInsn(opcode, iowner, iname, idesc, itf);
                        }
                        if (opcode === Opcodes_1.Opcodes.INVOKEINTERFACE) {
                            u += 5;
                        }
                        else {
                            u += 3;
                        }
                        break;
                    }
                    ;
                case ClassWriter_1.ClassWriter.INDYMETH_INSN:
                    {
                        let cpIndex = this.items[this.readUnsignedShort(u + 1)];
                        let bsmIndex = context.bootstrapMethods[this.readUnsignedShort(cpIndex)];
                        let bsm = this.readConst(this.readUnsignedShort(bsmIndex), c);
                        let bsmArgCount = this.readUnsignedShort(bsmIndex + 2);
                        let bsmArgs = new Array(bsmArgCount);
                        bsmIndex += 4;
                        for (let i = 0; i < bsmArgCount; i++) {
                            bsmArgs[i] = this.readConst(this.readUnsignedShort(bsmIndex), c);
                            bsmIndex += 2;
                        }
                        cpIndex = this.items[this.readUnsignedShort(cpIndex + 2)];
                        let iname = this.readUTF8(cpIndex, c);
                        let idesc = this.readUTF8(cpIndex + 2, c);
                        (this['__jswref_1'] = mv).visitInvokeDynamicInsn.apply(this['__jswref_1'], [iname, idesc, bsm].concat(bsmArgs));
                        u += 5;
                        break;
                    }
                    ;
                case ClassWriter_1.ClassWriter.TYPE_INSN:
                    mv.visitTypeInsn(opcode, this.readClass(u + 1, c));
                    u += 3;
                    break;
                case ClassWriter_1.ClassWriter.IINC_INSN:
                    mv.visitIincInsn(b[u + 1] & 255, b[u + 2]);
                    u += 3;
                    break;
                default:
                    mv.visitMultiANewArrayInsn(this.readClass(u + 1, c), b[u + 3] & 255);
                    u += 4;
                    break;
            }
            while ((tanns != null && tann < tanns.length && ntoff <= offset)) {
                if (ntoff === offset) {
                    let v = this.readAnnotationTarget(context, tanns[tann]);
                    this.readAnnotationValues(v + 2, c, true, mv.visitInsnAnnotation(context.typeRef, context.typePath, this.readUTF8(v, c), true));
                }
                ntoff = ++tann >= tanns.length || this.readByte(tanns[tann]) < 67 ? -1 : this.readUnsignedShort(tanns[tann] + 1);
            }
            ;
            while ((itanns != null && itann < itanns.length && nitoff <= offset)) {
                if (nitoff === offset) {
                    let v = this.readAnnotationTarget(context, itanns[itann]);
                    this.readAnnotationValues(v + 2, c, true, mv.visitInsnAnnotation(context.typeRef, context.typePath, this.readUTF8(v, c), false));
                }
                nitoff = ++itann >= itanns.length || this.readByte(itanns[itann]) < 67 ? -1 : this.readUnsignedShort(itanns[itann] + 1);
            }
            ;
        }
        ;
        if (labels[codeLength] != null) {
            mv.visitLabel(labels[codeLength]);
        }
        if ((context.flags & ClassReader.SKIP_DEBUG) === 0 && varTable !== 0) {
            let typeTable = null;
            if (varTypeTable !== 0) {
                u = varTypeTable + 2;
                typeTable = new Array(this.readUnsignedShort(varTypeTable) * 3);
                for (let i = typeTable.length; i > 0;) {
                    typeTable[--i] = u + 6;
                    typeTable[--i] = this.readUnsignedShort(u + 8);
                    typeTable[--i] = this.readUnsignedShort(u);
                    u += 10;
                }
            }
            u = varTable + 2;
            for (let i = this.readUnsignedShort(varTable); i > 0; --i) {
                let start = this.readUnsignedShort(u);
                let length = this.readUnsignedShort(u + 2);
                let index = this.readUnsignedShort(u + 8);
                let vsignature = null;
                if (typeTable != null) {
                    for (let j = 0; j < typeTable.length; j += 3) {
                        if (typeTable[j] === start && typeTable[j + 1] === index) {
                            vsignature = this.readUTF8(typeTable[j + 2], c);
                            break;
                        }
                    }
                }
                mv.visitLocalVariable(this.readUTF8(u + 4, c), this.readUTF8(u + 6, c), vsignature, labels[start], labels[start + length], index);
                u += 10;
            }
        }
        if (tanns != null) {
            for (let i = 0; i < tanns.length; ++i) {
                if ((this.readByte(tanns[i]) >> 1) === (64 >> 1)) {
                    let v = this.readAnnotationTarget(context, tanns[i]);
                    v = this.readAnnotationValues(v + 2, c, true, mv.visitLocalVariableAnnotation(context.typeRef, context.typePath, context.start, context.end, context.index, this.readUTF8(v, c), true));
                }
            }
        }
        if (itanns != null) {
            for (let i = 0; i < itanns.length; ++i) {
                if ((this.readByte(itanns[i]) >> 1) === (64 >> 1)) {
                    let v = this.readAnnotationTarget(context, itanns[i]);
                    v = this.readAnnotationValues(v + 2, c, true, mv.visitLocalVariableAnnotation(context.typeRef, context.typePath, context.start, context.end, context.index, this.readUTF8(v, c), false));
                }
            }
        }
        while ((attributes != null)) {
            let attr = attributes.next;
            attributes.next = null;
            mv.visitAttribute(attributes);
            attributes = attr;
        }
        ;
        mv.visitMaxs(maxStack, maxLocals);
    }
    /**
     * Parses a type annotation table to find the labels, and to visit the try
     * catch block annotations.
     *
     * @param u       the start offset of a type annotation table.
     * @param mv      the method visitor to be used to visit the try catch block
     * annotations.
     * @param context information about the class being parsed.
     * @param visible if the type annotation table to parse contains runtime visible
     * annotations.
     * @return the start offset of each type annotation in the parsed table.
     */
    readTypeAnnotations(mv, context, u, visible) {
        let c = context.buffer;
        let offsets = new Array(this.readUnsignedShort(u));
        u += 2;
        for (let i = 0; i < offsets.length; ++i) {
            offsets[i] = u;
            let target = this.readInt(u);
            switch ((target >>> 24)) {
                case 0:
                case 1:
                case 22:
                    u += 2;
                    break;
                case 19:
                case 20:
                case 21:
                    u += 1;
                    break;
                case 64:
                case 65:
                    for (let j = this.readUnsignedShort(u + 1); j > 0; --j) {
                        let start = this.readUnsignedShort(u + 3);
                        let length = this.readUnsignedShort(u + 5);
                        this.readLabel(start, context.labels);
                        this.readLabel(start + length, context.labels);
                        u += 6;
                    }
                    u += 3;
                    break;
                case 71:
                case 72:
                case 73:
                case 74:
                case 75:
                    u += 4;
                    break;
                default:
                    u += 3;
                    break;
            }
            let pathLength = this.readByte(u);
            if ((target >>> 24) === 66) {
                let path = pathLength === 0 ? null : new TypePath_1.TypePath(this.buf, u);
                u += 1 + 2 * pathLength;
                u = this.readAnnotationValues(u + 2, c, true, mv.visitTryCatchAnnotation(target, path, this.readUTF8(u, c), visible));
            }
            else {
                u = this.readAnnotationValues(u + 3 + 2 * pathLength, c, true, null);
            }
        }
        return offsets;
    }
    /**
     * Parses the header of a type annotation to extract its target_type and
     * target_path (the result is stored in the given context), and returns the
     * start offset of the rest of the type_annotation structure (i.e. the
     * offset to the type_index field, which is followed by
     * num_element_value_pairs and then the name,value pairs).
     *
     * @param context information about the class being parsed. This is where the
     * extracted target_type and target_path must be stored.
     * @param u       the start offset of a type_annotation structure.
     * @return the start offset of the rest of the type_annotation structure.
     */
    readAnnotationTarget(context, u) {
        let target = this.readInt(u);
        switch ((target >>> 24)) {
            case 0:
            case 1:
            case 22:
                target &= -65536;
                u += 2;
                break;
            case 19:
            case 20:
            case 21:
                target &= -16777216;
                u += 1;
                break;
            case 64:
            case 65:
                {
                    target &= -16777216;
                    let n = this.readUnsignedShort(u + 1);
                    context.start = new Array(n);
                    context.end = new Array(n);
                    context.index = new Array(n);
                    u += 3;
                    for (let i = 0; i < n; ++i) {
                        let start = this.readUnsignedShort(u);
                        let length = this.readUnsignedShort(u + 2);
                        context.start[i] = this.readLabel(start, context.labels);
                        context.end[i] = this.readLabel(start + length, context.labels);
                        context.index[i] = this.readUnsignedShort(u + 4);
                        u += 6;
                    }
                    break;
                }
                ;
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
                target &= -16776961;
                u += 4;
                break;
            default:
                target &= (target >>> 24) < 67 ? -256 : -16777216;
                u += 3;
                break;
        }
        let pathLength = this.readByte(u);
        context.typeRef = target;
        context.typePath = pathLength === 0 ? null : new TypePath_1.TypePath(this.buf, u);
        return u + 1 + 2 * pathLength;
    }
    /**
     * Reads parameter annotations and makes the given visitor visit them.
     *
     * @param mv      the visitor that must visit the annotations.
     * @param context information about the class being parsed.
     * @param v       start offset in {@link #b b} of the annotations to be read.
     * @param visible <tt>true</tt> if the annotations to be read are visible at
     * runtime.
     */
    readParameterAnnotations(mv, context, v, visible) {
        let i;
        let n = this.buf[v++] & 255;
        let synthetics = Type_1.Type.getArgumentTypes(context.desc).length - n;
        let av;
        for (i = 0; i < synthetics; ++i) {
            av = mv.visitParameterAnnotation(i, "Ljava/lang/Synthetic;", false);
            if (av != null) {
                av.visitEnd();
            }
        }
        let c = context.buffer;
        for (; i < n + synthetics; ++i) {
            let j = this.readUnsignedShort(v);
            v += 2;
            for (; j > 0; --j) {
                av = mv.visitParameterAnnotation(i, this.readUTF8(v, c), visible);
                v = this.readAnnotationValues(v + 2, c, true, av);
            }
        }
    }
    /**
     * Reads the values of an annotation and makes the given visitor visit them.
     *
     * @param v     the start offset in {@link #b b} of the values to be read
     * (including the unsigned short that gives the number of
     * values).
     * @param buf   buffer to be used to call {@link #readUTF8 readUTF8},
     * {@link #readClass(int, int[]) readClass} or {@link #readConst
     * readConst}.
     * @param named if the annotation values are named or not.
     * @param av    the visitor that must visit the values.
     * @return the end offset of the annotation values.
     */
    readAnnotationValues(v, buf, named, av) {
        let i = this.readUnsignedShort(v);
        v += 2;
        if (named) {
            for (; i > 0; --i) {
                v = this.readAnnotationValue(v + 2, buf, this.readUTF8(v, buf), av);
            }
        }
        else {
            for (; i > 0; --i) {
                v = this.readAnnotationValue(v, buf, null, av);
            }
        }
        if (av != null) {
            av.visitEnd();
        }
        return v;
    }
    /**
     * Reads a value of an annotation and makes the given visitor visit it.
     *
     * @param v    the start offset in {@link #b b} of the value to be read
     * (<i>not including the value name constant pool index</i>).
     * @param buf  buffer to be used to call {@link #readUTF8 readUTF8},
     * {@link #readClass(int, int[]) readClass} or {@link #readConst
     * readConst}.
     * @param name the name of the value to be read.
     * @param av   the visitor that must visit the value.
     * @return the end offset of the annotation value.
     */
    readAnnotationValue(v, buf, name, av) {
        let i;
        if (av == null) {
            switch ((this.buf[v] & 255)) {
                case ('e').charCodeAt(0):
                    return v + 5;
                case ('@').charCodeAt(0):
                    return this.readAnnotationValues(v + 3, buf, true, null);
                case ('[').charCodeAt(0):
                    return this.readAnnotationValues(v + 1, buf, false, null);
                default:
                    return v + 3;
            }
        }
        switch ((this.buf[v++] & 255)) {
            case ('I').charCodeAt(0):
            case ('J').charCodeAt(0):
            case ('F').charCodeAt(0):
            case ('D').charCodeAt(0):
                av.visit(name, this.readConst(this.readUnsignedShort(v), buf));
                v += 2;
                break;
            case ('B').charCodeAt(0):
                av.visit(name, (this.readInt(this.items[this.readUnsignedShort(v)]) | 0));
                v += 2;
                break;
            case ('Z').charCodeAt(0):
                av.visit(name, this.readInt(this.items[this.readUnsignedShort(v)]) === 0 ? false : true);
                v += 2;
                break;
            case ('S').charCodeAt(0):
                av.visit(name, (this.readInt(this.items[this.readUnsignedShort(v)]) | 0));
                v += 2;
                break;
            case ('C').charCodeAt(0):
                av.visit(name, String.fromCharCode(this.readInt(this.items[this.readUnsignedShort(v)])));
                v += 2;
                break;
            case ('s').charCodeAt(0):
                av.visit(name, this.readUTF8(v, buf));
                v += 2;
                break;
            case ('e').charCodeAt(0):
                av.visitEnum(name, this.readUTF8(v, buf), this.readUTF8(v + 2, buf));
                v += 4;
                break;
            case ('c').charCodeAt(0):
                av.visit(name, Type_1.Type.getType(this.readUTF8(v, buf)));
                v += 2;
                break;
            case ('@').charCodeAt(0):
                v = this.readAnnotationValues(v + 2, buf, true, av.visitAnnotation(name, this.readUTF8(v, buf)));
                break;
            case ('[').charCodeAt(0):
                let size = this.readUnsignedShort(v);
                v += 2;
                if (size === 0) {
                    return this.readAnnotationValues(v - 2, buf, false, av.visitArray(name));
                }
                switch ((this.buf[v++] & 255)) {
                    case ('B').charCodeAt(0):
                        let bv = new Array(size);
                        for (i = 0; i < size; i++) {
                            bv[i] = (this.readInt(this.items[this.readUnsignedShort(v)]) | 0);
                            v += 3;
                        }
                        av.visit(name, bv);
                        --v;
                        break;
                    case ('Z').charCodeAt(0):
                        let zv = new Array(size);
                        for (i = 0; i < size; i++) {
                            zv[i] = this.readInt(this.items[this.readUnsignedShort(v)]) !== 0;
                            v += 3;
                        }
                        av.visit(name, zv);
                        --v;
                        break;
                    case ('S').charCodeAt(0):
                        let sv = new Array(size);
                        for (i = 0; i < size; i++) {
                            sv[i] = (this.readInt(this.items[this.readUnsignedShort(v)]) | 0);
                            v += 3;
                        }
                        av.visit(name, sv);
                        --v;
                        break;
                    case ('C').charCodeAt(0):
                        let cv = new Array(size);
                        for (i = 0; i < size; i++) {
                            cv[i] = String.fromCharCode(this.readInt(this.items[this.readUnsignedShort(v)]));
                            v += 3;
                        }
                        av.visit(name, cv);
                        --v;
                        break;
                    case ('I').charCodeAt(0):
                        let iv = new Array(size);
                        for (i = 0; i < size; i++) {
                            iv[i] = this.readInt(this.items[this.readUnsignedShort(v)]);
                            v += 3;
                        }
                        av.visit(name, iv);
                        --v;
                        break;
                    case ('J').charCodeAt(0):
                        let lv = new Array(size);
                        for (i = 0; i < size; i++) {
                            lv[i] = this.readLong(this.items[this.readUnsignedShort(v)]);
                            v += 3;
                        }
                        av.visit(name, lv);
                        --v;
                        break;
                    case ('F').charCodeAt(0):
                        let fv = new Array(size);
                        for (i = 0; i < size; i++) {
                            fv[i] = bits_1.intBitsToFloat(this.readInt(this.items[this.readUnsignedShort(v)]));
                            v += 3;
                        }
                        av.visit(name, fv);
                        --v;
                        break;
                    case ('D').charCodeAt(0):
                        let dv = new Array(size);
                        for (i = 0; i < size; i++) {
                            dv[i] = bits_1.longBitsToDouble(this.readLong(this.items[this.readUnsignedShort(v)]));
                            v += 3;
                        }
                        av.visit(name, dv);
                        --v;
                        break;
                    default:
                        v = this.readAnnotationValues(v - 3, buf, false, av.visitArray(name));
                }
        }
        return v;
    }
    /**
     * Computes the implicit frame of the method currently being parsed (as
     * defined in the given {@link Context}) and stores it in the given context.
     *
     * @param frame information about the class being parsed.
     */
    getImplicitFrame(frame) {
        let desc = frame.desc;
        let locals = frame.local;
        let local = 0;
        if ((frame.access & Opcodes_1.Opcodes.ACC_STATIC) === 0) {
            if (("<init>" === frame.name)) {
                locals[local++] = Opcodes_1.Opcodes.UNINITIALIZED_THIS;
            }
            else {
                locals[local++] = this.readClass(this.header + 2, frame.buffer);
            }
        }
        let i = 1;
        loop: while ((true)) {
            let j = i;
            switch (((desc.charAt(i++)).charCodeAt(0))) {
                case ('Z').charCodeAt(0):
                case ('C').charCodeAt(0):
                case ('B').charCodeAt(0):
                case ('S').charCodeAt(0):
                case ('I').charCodeAt(0):
                    locals[local++] = Opcodes_1.Opcodes.INTEGER;
                    break;
                case ('F').charCodeAt(0):
                    locals[local++] = Opcodes_1.Opcodes.FLOAT;
                    break;
                case ('J').charCodeAt(0):
                    locals[local++] = Opcodes_1.Opcodes.LONG;
                    break;
                case ('D').charCodeAt(0):
                    locals[local++] = Opcodes_1.Opcodes.DOUBLE;
                    break;
                case ('[').charCodeAt(0):
                    while ((desc.charAt(i) === ('['))) {
                        ++i;
                    }
                    ;
                    if (desc.charAt(i) === ('L')) {
                        ++i;
                        while ((desc.charAt(i) !== (';'))) {
                            ++i;
                        }
                        ;
                    }
                    locals[local++] = desc.substring(j, ++i);
                    break;
                case ('L').charCodeAt(0):
                    while ((desc.charAt(i) !== (';'))) {
                        ++i;
                    }
                    ;
                    locals[local++] = desc.substring(j + 1, i++);
                    break;
                default:
                    break loop;
            }
        }
        ;
        frame.localCount = local;
    }
    /**
     * Reads a stack map frame and stores the result in the given
     * {@link Context} object.
     *
     * @param stackMap the start offset of a stack map frame in the class file.
     * @param zip      if the stack map frame at stackMap is compressed or not.
     * @param unzip    if the stack map frame must be uncompressed.
     * @param frame    where the parsed stack map frame must be stored.
     * @return the offset of the first byte following the parsed frame.
     */
    readFrame(stackMap, zip, unzip, frame) {
        let c = frame.buffer;
        let labels = frame.labels;
        let tag;
        let delta;
        if (zip) {
            tag = this.buf[stackMap++] & 255;
        }
        else {
            tag = MethodWriter_1.MethodWriter.FULL_FRAME;
            frame.offset = -1;
        }
        frame.localDiff = 0;
        if (tag < MethodWriter_1.MethodWriter.SAME_LOCALS_1_STACK_ITEM_FRAME) {
            delta = tag;
            frame.mode = Opcodes_1.Opcodes.F_SAME;
            frame.stackCount = 0;
        }
        else if (tag < MethodWriter_1.MethodWriter.RESERVED) {
            delta = tag - MethodWriter_1.MethodWriter.SAME_LOCALS_1_STACK_ITEM_FRAME;
            stackMap = this.readFrameType(frame.stack, 0, stackMap, c, labels);
            frame.mode = Opcodes_1.Opcodes.F_SAME1;
            frame.stackCount = 1;
        }
        else {
            delta = this.readUnsignedShort(stackMap);
            stackMap += 2;
            if (tag === MethodWriter_1.MethodWriter.SAME_LOCALS_1_STACK_ITEM_FRAME_EXTENDED) {
                stackMap = this.readFrameType(frame.stack, 0, stackMap, c, labels);
                frame.mode = Opcodes_1.Opcodes.F_SAME1;
                frame.stackCount = 1;
            }
            else if (tag >= MethodWriter_1.MethodWriter.CHOP_FRAME && tag < MethodWriter_1.MethodWriter.SAME_FRAME_EXTENDED) {
                frame.mode = Opcodes_1.Opcodes.F_CHOP;
                frame.localDiff = MethodWriter_1.MethodWriter.SAME_FRAME_EXTENDED - tag;
                frame.localCount -= frame.localDiff;
                frame.stackCount = 0;
            }
            else if (tag === MethodWriter_1.MethodWriter.SAME_FRAME_EXTENDED) {
                frame.mode = Opcodes_1.Opcodes.F_SAME;
                frame.stackCount = 0;
            }
            else if (tag < MethodWriter_1.MethodWriter.FULL_FRAME) {
                let local = unzip ? frame.localCount : 0;
                for (let i = tag - MethodWriter_1.MethodWriter.SAME_FRAME_EXTENDED; i > 0; i--) {
                    stackMap = this.readFrameType(frame.local, local++, stackMap, c, labels);
                }
                frame.mode = Opcodes_1.Opcodes.F_APPEND;
                frame.localDiff = tag - MethodWriter_1.MethodWriter.SAME_FRAME_EXTENDED;
                frame.localCount += frame.localDiff;
                frame.stackCount = 0;
            }
            else {
                frame.mode = Opcodes_1.Opcodes.F_FULL;
                let n = this.readUnsignedShort(stackMap);
                stackMap += 2;
                frame.localDiff = n;
                frame.localCount = n;
                for (let local = 0; n > 0; n--) {
                    stackMap = this.readFrameType(frame.local, local++, stackMap, c, labels);
                }
                n = this.readUnsignedShort(stackMap);
                stackMap += 2;
                frame.stackCount = n;
                for (let stack = 0; n > 0; n--) {
                    stackMap = this.readFrameType(frame.stack, stack++, stackMap, c, labels);
                }
            }
        }
        frame.offset += delta + 1;
        this.readLabel(frame.offset, labels);
        return stackMap;
    }
    /**
     * Reads a stack map frame type and stores it at the given index in the
     * given array.
     *
     * @param frame  the array where the parsed type must be stored.
     * @param index  the index in 'frame' where the parsed type must be stored.
     * @param v      the start offset of the stack map frame type to read.
     * @param buf    a buffer to read strings.
     * @param labels the labels of the method currently being parsed, indexed by
     * their offset. If the parsed type is an Uninitialized type, a
     * new label for the corresponding NEW instruction is stored in
     * this array if it does not already exist.
     * @return the offset of the first byte after the parsed type.
     */
    readFrameType(frame, index, v, buf, labels) {
        let type = this.buf[v++] & 255;
        switch ((type)) {
            case 0:
                frame[index] = Opcodes_1.Opcodes.TOP;
                break;
            case 1:
                frame[index] = Opcodes_1.Opcodes.INTEGER;
                break;
            case 2:
                frame[index] = Opcodes_1.Opcodes.FLOAT;
                break;
            case 3:
                frame[index] = Opcodes_1.Opcodes.DOUBLE;
                break;
            case 4:
                frame[index] = Opcodes_1.Opcodes.LONG;
                break;
            case 5:
                frame[index] = Opcodes_1.Opcodes.NULL;
                break;
            case 6:
                frame[index] = Opcodes_1.Opcodes.UNINITIALIZED_THIS;
                break;
            case 7:
                frame[index] = this.readClass(v, buf);
                v += 2;
                break;
            default:
                frame[index] = this.readLabel(this.readUnsignedShort(v), labels);
                v += 2;
        }
        return v;
    }
    /**
     * Returns the label corresponding to the given offset. The default
     * implementation of this method creates a label for the given offset if it
     * has not been already created.
     *
     * @param offset a bytecode offset in a method.
     * @param labels the already created labels, indexed by their offset. If a
     * label already exists for offset this method must not create a
     * new one. Otherwise it must store the new label in this array.
     * @return a non null Label, which must be equal to labels[offset].
     */
    readLabel(offset, labels) {
        if (labels[offset] == null) {
            labels[offset] = new Label_1.Label();
        }
        return labels[offset];
    }
    /**
     * Returns the start index of the attribute_info structure of this class.
     *
     * @return the start index of the attribute_info structure of this class.
     */
    getAttributes() {
        let u = this.header + 8 + this.readUnsignedShort(this.header + 6) * 2;
        for (let i = this.readUnsignedShort(u); i > 0; --i) {
            for (let j = this.readUnsignedShort(u + 8); j > 0; --j) {
                u += 6 + this.readInt(u + 12);
            }
            u += 8;
        }
        u += 2;
        for (let i = this.readUnsignedShort(u); i > 0; --i) {
            for (let j = this.readUnsignedShort(u + 8); j > 0; --j) {
                u += 6 + this.readInt(u + 12);
            }
            u += 8;
        }
        return u + 2;
    }
    /**
     * Reads an attribute in {@link #b b}.
     *
     * @param attrs   prototypes of the attributes that must be parsed during the
     * visit of the class. Any attribute whose type is not equal to
     * the type of one the prototypes is ignored (i.e. an empty
     * {@link Attribute} instance is returned).
     * @param type    the type of the attribute.
     * @param off     index of the first byte of the attribute's content in
     * {@link #b b}. The 6 attribute header bytes, containing the
     * type and the length of the attribute, are not taken into
     * account here (they have already been read).
     * @param len     the length of the attribute's content.
     * @param buf     buffer to be used to call {@link #readUTF8 readUTF8},
     * {@link #readClass(int, int[]) readClass} or {@link #readConst
     * readConst}.
     * @param codeOff index of the first byte of code's attribute content in
     * {@link #b b}, or -1 if the attribute to be read is not a code
     * attribute. The 6 attribute header bytes, containing the type
     * and the length of the attribute, are not taken into account
     * here.
     * @param labels  the labels of the method's code, or <tt>null</tt> if the
     * attribute to be read is not a code attribute.
     * @return the attribute that has been read, or <tt>null</tt> to skip this
     * attribute.
     */
    readAttribute(attrs, type, off, len, buf, codeOff, labels) {
        for (let i = 0; i < attrs.length; ++i) {
            if ((attrs[i].type === type)) {
                return attrs[i].read(this, off, len, buf, codeOff, labels);
            }
        }
        return new Attribute_1.Attribute(type).read(this, off, len, null, -1, null);
    }
    /**
     * Returns the number of constant pool items in {@link #b b}.
     *
     * @return the number of constant pool items in {@link #b b}.
     */
    getItemCount() {
        return this.items.length;
    }
    /**
     * Returns the start index of the constant pool item in {@link #b b}, plus
     * one. <i>This method is intended for {@link Attribute} sub classes, and is
     * normally not needed by class generators or adapters.</i>
     *
     * @param item the index a constant pool item.
     * @return the start index of the constant pool item in {@link #b b}, plus
     * one.
     */
    getItem(item) {
        return this.items[item];
    }
    /**
     * Returns the maximum length of the strings contained in the constant pool
     * of the class.
     *
     * @return the maximum length of the strings contained in the constant pool
     * of the class.
     */
    getMaxStringLength() {
        return this.maxStringLength;
    }
    /**
     * Reads a byte value in {@link #b b}. <i>This method is intended for
     * {@link Attribute} sub classes, and is normally not needed by class
     * generators or adapters.</i>
     *
     * @param index the start index of the value to be read in {@link #b b}.
     * @return the read value.
     */
    readByte(index) {
        return this.buf.readInt8(index);
        // return this.buf[index] & 255;
    }
    /**
     * Reads an unsigned short value in {@link #b b}. <i>This method is intended
     * for {@link Attribute} sub classes, and is normally not needed by class
     * generators or adapters.</i>
     *
     * @param index the start index of the value to be read in {@link #b b}.
     * @return the read value.
     */
    readUnsignedShort(index) {
        return this.buf.readUInt16BE(index);
        // let b: number[] = this.buf;
        // return ((b[index] & 255) << 8) | (b[index + 1] & 255);
    }
    /**
     * Reads a signed short value in {@link #b b}. <i>This method is intended
     * for {@link Attribute} sub classes, and is normally not needed by class
     * generators or adapters.</i>
     *
     * @param index the start index of the value to be read in {@link #b b}.
     * @return the read value.
     */
    readShort(index) {
        return this.buf.readInt16BE(index);
        // let b: number[] = this.buf;
        // return (<number>(((b[index] & 255) << 8) | (b[index + 1] & 255)) | 0);
    }
    /**
     * Reads a signed int value in {@link #b b}. <i>This method is intended for
     * {@link Attribute} sub classes, and is normally not needed by class
     * generators or adapters.</i>
     *
     * @param index the start index of the value to be read in {@link #b b}.
     * @return the read value.
     */
    readInt(index) {
        return this.buf.readInt32BE(index);
        // let b: number[] = this.buf;
        // return ((b[index] & 255) << 24) | ((b[index + 1] & 255) << 16) | ((b[index + 2] & 255) << 8) | (b[index + 3] & 255);
    }
    /**
     * Reads a signed long value in {@link #b b}. <i>This method is intended for
     * {@link Attribute} sub classes, and is normally not needed by class
     * generators or adapters.</i>
     *
     * @param index the start index of the value to be read in {@link #b b}.
     * @return the read value.
     */
    readLong(index) {
        let l1 = this.readInt(index);
        let l0 = this.readInt(index + 4) & 4294967295;
        return new Long(l1, l0);
    }
    /**
     * Reads an UTF8 string constant pool item in {@link #b b}. <i>This method
     * is intended for {@link Attribute} sub classes, and is normally not needed
     * by class generators or adapters.</i>
     *
     * @param index the start index of an unsigned short value in {@link #b b},
     * whose value is the index of an UTF8 constant pool item.
     * @param buf   buffer to be used to read the item. This buffer must be
     * sufficiently large. It is not automatically resized.
     * @return the String corresponding to the specified UTF8 item.
     */
    readUTF8(index, buf) {
        let item = this.readUnsignedShort(index);
        if (index === 0 || item === 0)
            return null;
        let s = this.strings[item];
        if (s != null)
            return s;
        index = this.items[item];
        this.strings[item] = this.readUTF(index + 2, this.readUnsignedShort(index), buf);
        return this.strings[item];
    }
    /**
     * Reads UTF8 string in {@link #b b}.
     *
     * @param index  start offset of the UTF8 string to be read.
     * @param utfLen length of the UTF8 string to be read.
     * @param buf    buffer to be used to read the string. This buffer must be
     * sufficiently large. It is not automatically resized.
     * @return the String corresponding to the specified UTF8 string.
     */
    readUTF(index, utfLen, buf) {
        let endIndex = index + utfLen;
        let b = this.buf;
        let strLen = 0;
        let c;
        let st = 0;
        let cc = 0;
        while (index < endIndex) {
            c = b[index++];
            switch (st) {
                case 0:
                    c = c & 255;
                    if (c < 128) {
                        buf[strLen++] = c;
                    }
                    else if (c < 224 && c > 191) {
                        cc = (c & 31);
                        st = 1;
                    }
                    else {
                        cc = (c & 15);
                        st = 2;
                    }
                    break;
                case 1:
                    buf[strLen++] = ((cc << 6) | (c & 63));
                    st = 0;
                    break;
                case 2:
                    cc = ((cc << 6) | (c & 63));
                    st = 1;
                    break;
            }
        }
        ;
        return buf.slice(0, strLen).map(c => String.fromCodePoint(c)).join('');
    }
    /**
     * Reads a class constant pool item in {@link #b b}. <i>This method is
     * intended for {@link Attribute} sub classes, and is normally not needed by
     * class generators or adapters.</i>
     *
     * @param index the start index of an unsigned short value in {@link #b b},
     * whose value is the index of a class constant pool item.
     * @param buf   buffer to be used to read the item. This buffer must be
     * sufficiently large. It is not automatically resized.
     * @return the String corresponding to the specified class item.
     */
    readClass(index, buf) {
        return this.readUTF8(this.items[this.readUnsignedShort(index)], buf);
    }
    /**
     * Reads a numeric or string constant pool item in {@link #b b}. <i>This
     * method is intended for {@link Attribute} sub classes, and is normally not
     * needed by class generators or adapters.</i>
     *
     * @param item the index of a constant pool item.
     * @param buf  buffer to be used to read the item. This buffer must be
     * sufficiently large. It is not automatically resized.
     * @return the {@link Integer}, {@link Float}, {@link Long}, {@link Double},
     * {@link String}, {@link Type} or {@link Handle} corresponding to
     * the given constant pool item.
     */
    readConst(item, buf) {
        let index = this.items[item];
        switch ((this.buf[index - 1])) {
            case ClassWriter_1.ClassWriter.INT:
                return this.readInt(index);
            case ClassWriter_1.ClassWriter.FLOAT:
                return bits_1.intBitsToFloat(this.readInt(index));
            case ClassWriter_1.ClassWriter.LONG:
                return this.readLong(index);
            case ClassWriter_1.ClassWriter.DOUBLE:
                return bits_1.longBitsToDouble(this.readLong(index));
            case ClassWriter_1.ClassWriter.CLASS:
                return Type_1.Type.getObjectType(this.readUTF8(index, buf));
            case ClassWriter_1.ClassWriter.STR:
                return this.readUTF8(index, buf);
            case ClassWriter_1.ClassWriter.MTYPE:
                return Type_1.Type.getMethodType(this.readUTF8(index, buf));
            default:
                let tag = this.readByte(index);
                let items = this.items;
                let cpIndex = items[this.readUnsignedShort(index + 1)];
                let itf = this.buf[cpIndex - 1] === ClassWriter_1.ClassWriter.IMETH;
                let owner = this.readClass(cpIndex, buf);
                cpIndex = items[this.readUnsignedShort(cpIndex + 2)];
                let name = this.readUTF8(cpIndex, buf);
                let desc = this.readUTF8(cpIndex + 2, buf);
                return new Handle_1.Handle(tag, owner, name, desc, itf);
        }
    }
}
/**
* True to enable signatures support.
*/
ClassReader.SIGNATURES = true;
/**
 * True to enable annotations support.
 */
ClassReader.ANNOTATIONS = true;
/**
 * True to enable stack map frames support.
 */
ClassReader.FRAMES = true;
/**
 * True to enable bytecode writing support.
 */
ClassReader.WRITER = true;
/**
 * True to enable JSR_W and GOTO_W support.
 */
ClassReader.RESIZE = true;
/**
 * Flag to skip method code. If this class is set <code>CODE</code>
 * attribute won't be visited. This can be used, for example, to retrieve
 * annotations for methods and method parameters.
 */
ClassReader.SKIP_CODE = 1;
/**
 * Flag to skip the debug information in the class. If this flag is set the
 * debug information of the class is not visited, i.e. the
 * {@link MethodVisitor#visitLocalVariable visitLocalVariable} and
 * {@link MethodVisitor#visitLineNumber visitLineNumber} methods will not be
 * called.
 */
ClassReader.SKIP_DEBUG = 2;
/**
 * Flag to skip the stack map frames in the class. If this flag is set the
 * stack map frames of the class is not visited, i.e. the
 * {@link MethodVisitor#visitFrame visitFrame} method will not be called.
 * This flag is useful when the {@link ClassWriter#COMPUTE_FRAMES} option is
 * used: it avoids visiting frames that will be ignored and recomputed from
 * scratch in the class writer.
 */
ClassReader.SKIP_FRAMES = 4;
/**
 * Flag to expand the stack map frames. By default stack map frames are
 * visited in their original format (i.e. "expanded" for classes whose
 * version is less than V1_6, and "compressed" for the other classes). If
 * this flag is set, stack map frames are always visited in expanded format
 * (this option adds a decompression/recompression step in ClassReader and
 * ClassWriter which degrades performances quite a lot).
 */
ClassReader.EXPAND_FRAMES = 8;
/**
 * Flag to expand the ASM pseudo instructions into an equivalent sequence of
 * standard bytecode instructions. When resolving a forward jump it may
 * happen that the signed 2 bytes offset reserved for it is not sufficient
 * to store the bytecode offset. In this case the jump instruction is
 * replaced with a temporary ASM pseudo instruction using an unsigned 2
 * bytes offset (see Label#resolve). This internal flag is used to re-read
 * classes containing such instructions, in order to replace them with
 * standard instructions. In addition, when this flag is used, GOTO_W and
 * JSR_W are <i>not</i> converted into GOTO and JSR, to make sure that
 * infinite loops where a GOTO_W is replaced with a GOTO in ClassReader and
 * converted back to a GOTO_W in ClassWriter cannot occur.
 */
ClassReader.EXPAND_ASM_INSNS = 256;
exports.ClassReader = ClassReader;
ClassReader["__class"] = "ClassReader";
