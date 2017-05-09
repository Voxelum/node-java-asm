"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * A {@link ClassVisitor} that generates classes in bytecode form. More
 * precisely this visitor generates a byte array conforming to the Java class
 * file format. It can be used alone, to generate a Java class "from scratch",
 * or with one or more {@link ClassReader ClassReader} and adapter class visitor
 * to generate a modified class from one or more existing Java classes.
 *
 * @author Eric Bruneton
 */
const AnnotationWriter_1 = require("./AnnotationWriter");
const ByteVector_1 = require("./ByteVector");
const ClassReader_1 = require("./ClassReader");
const ClassVisitor_1 = require("./ClassVisitor");
const FieldWriter_1 = require("./FieldWriter");
const Item_1 = require("./Item");
const MethodWriter_1 = require("./MethodWriter");
const Opcodes_1 = require("./Opcodes");
class ClassWriter extends ClassVisitor_1.ClassVisitor {
    /**
     * Constructs a new {@link ClassWriter} object and enables optimizations for
     * "mostly add" bytecode transformations. These optimizations are the
     * following:
     *
     * <ul>
     * <li>The constant pool from the original class is copied as is in the new
     * class, which saves time. New constant pool entries will be added at the
     * end if necessary, but unused constant pool entries <i>won't be
     * removed</i>.</li>
     * <li>Methods that are not transformed are copied as is in the new class,
     * directly from the original class bytecode (i.e. without emitting visit
     * events for all the method instructions), which saves a <i>lot</i> of
     * time. Untransformed methods are detected by the fact that the
     * {@link ClassReader} receives {@link MethodVisitor} objects that come from
     * a {@link ClassWriter} (and not from any other {@link ClassVisitor}
     * instance).</li>
     * </ul>
     *
     * @param classReader
     * the {@link ClassReader} used to read the original class. It
     * will be used to copy the entire constant pool from the
     * original class and also to copy other fragments of original
     * bytecode where applicable.
     * @param flags
     * option flags that can be used to modify the default behavior
     * of this class. <i>These option flags do not affect methods
     * that are copied as is in the new class. This means that
     * neither the maximum stack size nor the stack frames will be
     * computed for these methods</i>. See {@link #COMPUTE_MAXS},
     * {@link #COMPUTE_FRAMES}.
     */
    constructor(classReader, flags) {
        if (((classReader != null && classReader instanceof ClassReader_1.ClassReader) || classReader === null) && ((typeof flags === 'number') || flags === null)) {
            let __args = Array.prototype.slice.call(arguments);
            {
                throw new Error('not supported');
                // let __args = Array.prototype.slice.call(arguments);
                // super(Opcodes.ASM5);
                // this.version = 0;
                // this.index = 0;
                // this.threshold = 0;
                // this.typeCount = 0;
                // this.access = 0;
                // this.name = 0;
                // this.signature = 0;
                // this.superName = 0;
                // this.interfaceCount = 0;
                // this.sourceFile = 0;
                // this.enclosingMethodOwner = 0;
                // this.enclosingMethod = 0;
                // this.innerClassesCount = 0;
                // this.bootstrapMethodsCount = 0;
                // this.compute = 0;
                // this.hasAsmInsns = false;
                // (() => {
                //     this.index = 1;
                //     this.pool = new ByteVector();
                //     this.items = new Array(256);
                //     this.threshold = (<number>(0.75 * this.items.length) | 0);
                //     // this.key = new Item();
                //     // this.key2 = new Item();
                //     // this.key3 = new Item();
                //     // this.key4 = new Item();
                //     this.compute = (flags & ClassWriter.COMPUTE_FRAMES) !== 0 ? MethodWriter.FRAMES : ((flags & ClassWriter.COMPUTE_MAXS) !== 0 ? MethodWriter.MAXS : MethodWriter.NOTHING);
                // })();
            }
            // (() => {
            //     classReader.copyPool(this);
            //     this.cr = classReader;
            // })();
        }
        else if (((typeof classReader === 'number') || classReader === null) && flags === undefined) {
            let __args = Array.prototype.slice.call(arguments);
            let flags = __args[0];
            super(Opcodes_1.Opcodes.ASM5);
            this.version = 0;
            this.index = 0;
            this.threshold = 0;
            this.typeCount = 0;
            this.access = 0;
            this.name = 0;
            this.signature = 0;
            this.superName = 0;
            this.interfaceCount = 0;
            this.sourceFile = 0;
            this.enclosingMethodOwner = 0;
            this.enclosingMethod = 0;
            this.innerClassesCount = 0;
            this.bootstrapMethodsCount = 0;
            this.compute = 0;
            this.hasAsmInsns = false;
            (() => {
                this.index = 1;
                this.pool = new ByteVector_1.ByteVector();
                this.items = new Array(256);
                this.threshold = ((0.75 * this.items.length) | 0);
                // this.key = new Item();
                // this.key2 = new Item();
                // this.key3 = new Item();
                // this.key4 = new Item();
                this.compute = (flags & ClassWriter.COMPUTE_FRAMES) !== 0 ? MethodWriter_1.MethodWriter.FRAMES : ((flags & ClassWriter.COMPUTE_MAXS) !== 0 ? MethodWriter_1.MethodWriter.MAXS : MethodWriter_1.MethodWriter.NOTHING);
            })();
        }
        else
            throw new Error('invalid overload');
    }
    static __static_initialize() { if (!ClassWriter.__static_initialized) {
        ClassWriter.__static_initialized = true;
        ClassWriter.__static_initializer_0();
    } }
    static TO_ACC_SYNTHETIC_$LI$() { ClassWriter.__static_initialize(); if (ClassWriter.TO_ACC_SYNTHETIC == null)
        ClassWriter.TO_ACC_SYNTHETIC = (ClassWriter.ACC_SYNTHETIC_ATTRIBUTE / Opcodes_1.Opcodes.ACC_SYNTHETIC | 0); return ClassWriter.TO_ACC_SYNTHETIC; }
    ;
    static TYPE_$LI$() { ClassWriter.__static_initialize(); return ClassWriter.TYPE; }
    ;
    static __static_initializer_0() {
        let i;
        let b = new Array(220);
        let s = "AAAAAAAAAAAAAAAABCLMMDDDDDEEEEEEEEEEEEEEEEEEEEAAAAAAAADDDDDEEEEEEEEEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANAAAAAAAAAAAAAAAAAAAAJJJJJJJJJJJJJJJJDOPAAAAAAGGGGGGGHIFBFAAFFAARQJJKKSSSSSSSSSSSSSSSSSS";
        for (i = 0; i < b.length; ++i) {
            b[i] = (((s.charAt(i)).charCodeAt(0) - ('A').charCodeAt(0)) | 0);
        }
        ClassWriter.TYPE = b;
    }
    visit(version, access, name, signature, superName, interfaces) {
        this.version = version;
        this.access = access;
        this.name = this.newClass(name);
        this.thisName = name;
        if (ClassReader_1.ClassReader.SIGNATURES && signature != null) {
            this.signature = this.newUTF8(signature);
        }
        this.superName = superName == null ? 0 : this.newClass(superName);
        if (interfaces != null && interfaces.length > 0) {
            this.interfaceCount = interfaces.length;
            this.interfaces = new Array(this.interfaceCount);
            for (let i = 0; i < this.interfaceCount; ++i) {
                this.interfaces[i] = this.newClass(interfaces[i]);
            }
        }
    }
    visitSource(file, debug) {
        throw new Error('not supported');
        // if (file != null) {
        //     this.sourceFile = this.newUTF8(file);
        // }
        // if (debug != null) {
        //     this.sourceDebug = new ByteVector().encodeUTF8(debug, 0, javaemul.internal.IntegerHelper.MAX_VALUE);
        // }
    }
    visitOuterClass(owner, name, desc) {
        this.enclosingMethodOwner = this.newClass(owner);
        if (name != null && desc != null) {
            this.enclosingMethod = this.newNameType(name, desc);
        }
    }
    visitAnnotation(desc, visible) {
        if (!ClassReader_1.ClassReader.ANNOTATIONS) {
            return null;
        }
        let bv = new ByteVector_1.ByteVector();
        bv.putShort(this.newUTF8(desc)).putShort(0);
        let aw = new AnnotationWriter_1.AnnotationWriter(this, true, bv, bv, 2);
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
        bv.putShort(this.newUTF8(desc)).putShort(0);
        let aw = new AnnotationWriter_1.AnnotationWriter(this, true, bv, bv, bv.length - 2);
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
    visitAttribute(attr) {
        attr.next = this.attrs;
        this.attrs = attr;
    }
    visitInnerClass(name, outerName, innerName, access) {
        if (this.innerClasses == null) {
            this.innerClasses = new ByteVector_1.ByteVector();
        }
        let nameItem = this.newClassItem(name);
        if (nameItem.intVal === 0) {
            ++this.innerClassesCount;
            this.innerClasses.putShort(nameItem.index);
            this.innerClasses.putShort(outerName == null ? 0 : this.newClass(outerName));
            this.innerClasses.putShort(innerName == null ? 0 : this.newUTF8(innerName));
            this.innerClasses.putShort(access);
            nameItem.intVal = this.innerClassesCount;
        }
        else {
        }
    }
    visitField(access, name, desc, signature, value) {
        return new FieldWriter_1.FieldWriter(this, access, name, desc, signature, value);
    }
    visitMethod(access, name, desc, signature, exceptions) {
        return new MethodWriter_1.MethodWriter(this, access, name, desc, signature, exceptions, this.compute);
    }
    visitEnd() {
    }
    /**
     * Returns the bytecode of the class that was build with this class writer.
     *
     * @return the bytecode of the class that was build with this class writer.
     */
    toByteArray() {
        // if (this.index > 65535) {
        //     throw new Error("Class file too large!");
        // }
        // let size: number = 24 + 2 * this.interfaceCount;
        // let nbFields: number = 0;
        // let fb: FieldWriter = this.firstField;
        // while ((fb != null)) {
        //     ++nbFields;
        //     size += fb.getSize();
        //     fb = <FieldWriter>fb.fv;
        // };
        // let nbMethods: number = 0;
        // let mb: MethodWriter = this.firstMethod;
        // while ((mb != null)) {
        //     ++nbMethods;
        //     size += mb.getSize();
        //     mb = <MethodWriter>mb.mv;
        // };
        // let attributeCount: number = 0;
        // if (this.bootstrapMethods != null) {
        //     ++attributeCount;
        //     size += 8 + this.bootstrapMethods.length;
        //     this.newUTF8("BootstrapMethods");
        // }
        // if (ClassReader.SIGNATURES && this.signature !== 0) {
        //     ++attributeCount;
        //     size += 8;
        //     this.newUTF8("Signature");
        // }
        // if (this.sourceFile !== 0) {
        //     ++attributeCount;
        //     size += 8;
        //     this.newUTF8("SourceFile");
        // }
        // if (this.sourceDebug != null) {
        //     ++attributeCount;
        //     size += this.sourceDebug.length + 6;
        //     this.newUTF8("SourceDebugExtension");
        // }
        // if (this.enclosingMethodOwner !== 0) {
        //     ++attributeCount;
        //     size += 10;
        //     this.newUTF8("EnclosingMethod");
        // }
        // if ((this.access & Opcodes.ACC_DEPRECATED) !== 0) {
        //     ++attributeCount;
        //     size += 6;
        //     this.newUTF8("Deprecated");
        // }
        // if ((this.access & Opcodes.ACC_SYNTHETIC) !== 0) {
        //     if ((this.version & 65535) < Opcodes.V1_5 || (this.access & ClassWriter.ACC_SYNTHETIC_ATTRIBUTE) !== 0) {
        //         ++attributeCount;
        //         size += 6;
        //         this.newUTF8("Synthetic");
        //     }
        // }
        // if (this.innerClasses != null) {
        //     ++attributeCount;
        //     size += 8 + this.innerClasses.length;
        //     this.newUTF8("InnerClasses");
        // }
        // if (ClassReader.ANNOTATIONS && this.anns != null) {
        //     ++attributeCount;
        //     size += 8 + this.anns.getSize();
        //     this.newUTF8("RuntimeVisibleAnnotations");
        // }
        // if (ClassReader.ANNOTATIONS && this.ianns != null) {
        //     ++attributeCount;
        //     size += 8 + this.ianns.getSize();
        //     this.newUTF8("RuntimeInvisibleAnnotations");
        // }
        // if (ClassReader.ANNOTATIONS && this.tanns != null) {
        //     ++attributeCount;
        //     size += 8 + this.tanns.getSize();
        //     this.newUTF8("RuntimeVisibleTypeAnnotations");
        // }
        // if (ClassReader.ANNOTATIONS && this.itanns != null) {
        //     ++attributeCount;
        //     size += 8 + this.itanns.getSize();
        //     this.newUTF8("RuntimeInvisibleTypeAnnotations");
        // }
        // if (this.attrs != null) {
        //     attributeCount += this.attrs.getCount();
        //     size += this.attrs.getSize(this, null, 0, -1, -1);
        // }
        // size += this.pool.length;
        // let out: ByteVector = new ByteVector(size);
        // out.putInt(-889275714).putInt(this.version);
        // out.putShort(this.index).putByteArray(this.pool.data, 0, this.pool.length);
        // let mask: number = Opcodes.ACC_DEPRECATED | ClassWriter.ACC_SYNTHETIC_ATTRIBUTE | (((this.access & ClassWriter.ACC_SYNTHETIC_ATTRIBUTE) / ClassWriter.TO_ACC_SYNTHETIC_$LI$() | 0));
        // out.putShort(this.access & ~mask).putShort(this.name).putShort(this.superName);
        // out.putShort(this.interfaceCount);
        // for (let i: number = 0; i < this.interfaceCount; ++i) {
        //     out.putShort(this.interfaces[i]);
        // }
        // out.putShort(nbFields);
        // fb = this.firstField;
        // while ((fb != null)) {
        //     fb.put(out);
        //     fb = <FieldWriter>fb.fv;
        // };
        // out.putShort(nbMethods);
        // mb = this.firstMethod;
        // while ((mb != null)) {
        //     mb.put(out);
        //     mb = <MethodWriter>mb.mv;
        // };
        // out.putShort(attributeCount);
        // if (this.bootstrapMethods != null) {
        //     out.putShort(this.newUTF8("BootstrapMethods"));
        //     out.putInt(this.bootstrapMethods.length + 2).putShort(this.bootstrapMethodsCount);
        //     out.putByteArray(this.bootstrapMethods.data, 0, this.bootstrapMethods.length);
        // }
        // if (ClassReader.SIGNATURES && this.signature !== 0) {
        //     out.putShort(this.newUTF8("Signature")).putInt(2).putShort(this.signature);
        // }
        // if (this.sourceFile !== 0) {
        //     out.putShort(this.newUTF8("SourceFile")).putInt(2).putShort(this.sourceFile);
        // }
        // if (this.sourceDebug != null) {
        //     let len: number = this.sourceDebug.length;
        //     out.putShort(this.newUTF8("SourceDebugExtension")).putInt(len);
        //     out.putByteArray(this.sourceDebug.data, 0, len);
        // }
        // if (this.enclosingMethodOwner !== 0) {
        //     out.putShort(this.newUTF8("EnclosingMethod")).putInt(4);
        //     out.putShort(this.enclosingMethodOwner).putShort(this.enclosingMethod);
        // }
        // if ((this.access & Opcodes.ACC_DEPRECATED) !== 0) {
        //     out.putShort(this.newUTF8("Deprecated")).putInt(0);
        // }
        // if ((this.access & Opcodes.ACC_SYNTHETIC) !== 0) {
        //     if ((this.version & 65535) < Opcodes.V1_5 || (this.access & ClassWriter.ACC_SYNTHETIC_ATTRIBUTE) !== 0) {
        //         out.putShort(this.newUTF8("Synthetic")).putInt(0);
        //     }
        // }
        // if (this.innerClasses != null) {
        //     out.putShort(this.newUTF8("InnerClasses"));
        //     out.putInt(this.innerClasses.length + 2).putShort(this.innerClassesCount);
        //     out.putByteArray(this.innerClasses.data, 0, this.innerClasses.length);
        // }
        // if (ClassReader.ANNOTATIONS && this.anns != null) {
        //     out.putShort(this.newUTF8("RuntimeVisibleAnnotations"));
        //     this.anns.put(out);
        // }
        // if (ClassReader.ANNOTATIONS && this.ianns != null) {
        //     out.putShort(this.newUTF8("RuntimeInvisibleAnnotations"));
        //     this.ianns.put(out);
        // }
        // if (ClassReader.ANNOTATIONS && this.tanns != null) {
        //     out.putShort(this.newUTF8("RuntimeVisibleTypeAnnotations"));
        //     this.tanns.put(out);
        // }
        // if (ClassReader.ANNOTATIONS && this.itanns != null) {
        //     out.putShort(this.newUTF8("RuntimeInvisibleTypeAnnotations"));
        //     this.itanns.put(out);
        // }
        // if (this.attrs != null) {
        //     this.attrs.put(this, null, 0, -1, -1, out);
        // }
        // if (this.hasAsmInsns) {
        //     this.anns = null;
        //     this.ianns = null;
        //     this.attrs = null;
        //     this.innerClassesCount = 0;
        //     this.innerClasses = null;
        //     this.firstField = null;
        //     this.lastField = null;
        //     this.firstMethod = null;
        //     this.lastMethod = null;
        //     this.compute = MethodWriter.INSERTED_FRAMES;
        //     this.hasAsmInsns = false;
        //     new ClassReader(out.data).accept(this, ClassReader.EXPAND_FRAMES | ClassReader.EXPAND_ASM_INSNS);
        //     return this.toByteArray();
        // }
        // return out.data;
        throw new Error('not supported');
    }
    /**
     * Adds a number or string constant to the constant pool of the class being
     * build. Does nothing if the constant pool already contains a similar item.
     *
     * @param cst
     * the value of the constant to be added to the constant pool.
     * This parameter must be an {@link Integer}, a {@link Float}, a
     * {@link Long}, a {@link Double}, a {@link String} or a
     * {@link Type}.
     * @return a new or already existing constant item with the given value.
     */
    newConstItem(cst) {
        throw new Error("unsupported");
        // if (typeof cst === 'number') {
        //     let val: number = /* intValue */((<number>cst) | 0);
        //     return this.newInteger(val);
        // } else if (typeof cst === 'number') {
        //     let val: number = /* intValue */((<number>cst) | 0);
        //     return this.newInteger(val);
        // } else if (typeof cst === 'string') {
        //     let val: number = ((<string>cst).charValue()).charCodeAt(0);
        //     return this.newInteger(val);
        // } else if (typeof cst === 'number') {
        //     let val: number = /* intValue */((<number>cst) | 0);
        //     return this.newInteger(val);
        // } else if (typeof cst === 'boolean') {
        //     let val: number = (<boolean>cst).booleanValue() ? 1 : 0;
        //     return this.newInteger(val);
        // } else if (typeof cst === 'number') {
        //     let val: number = (<number>cst).floatValue();
        //     return this.newFloat(val);
        // } else if (typeof cst === 'number') {
        //     let val: number = (<number>cst).longValue();
        //     return this.newLong(val);
        // } else if (typeof cst === 'number') {
        //     let val: number = (<number>cst).doubleValue();
        //     return this.newDouble(val);
        // } else if (typeof cst === 'string') {
        //     return this.newString(<string>cst);
        // } else if (cst != null && cst instanceof Type) {
        //     let t: Type = <Type>cst;
        //     let s: number = t.getSort();
        //     if (s === Type.OBJECT) {
        //         return this.newClassItem(t.getInternalName());
        //     } else if (s === Type.METHOD) {
        //         return this.newMethodTypeItem(t.getDescriptor());
        //     } else {
        //         return this.newClassItem(t.getDescriptor());
        //     }
        // } else if (cst != null && cst instanceof Handle) {
        //     let h: Handle = <Handle>cst;
        //     return this.newHandleItem(h.tag, h.owner, h.name, h.desc, h.itf);
        // } else {
        //     throw new Error("value " + cst);
        // }
    }
    /**
     * Adds a number or string constant to the constant pool of the class being
     * build. Does nothing if the constant pool already contains a similar item.
     * <i>This method is intended for {@link Attribute} sub classes, and is
     * normally not needed by class generators or adapters.</i>
     *
     * @param cst
     * the value of the constant to be added to the constant pool.
     * This parameter must be an {@link Integer}, a {@link Float}, a
     * {@link Long}, a {@link Double} or a {@link String}.
     * @return the index of a new or already existing constant item with the
     * given value.
     */
    newConst(cst) {
        return this.newConstItem(cst).index;
    }
    /**
     * Adds an UTF8 string to the constant pool of the class being build. Does
     * nothing if the constant pool already contains a similar item. <i>This
     * method is intended for {@link Attribute} sub classes, and is normally not
     * needed by class generators or adapters.</i>
     *
     * @param value
     * the String value.
     * @return the index of a new or already existing UTF8 item.
     */
    newUTF8(value) {
        this.key.set(ClassWriter.UTF8, value, null, null);
        let result = this.get(this.key);
        if (result == null) {
            this.pool.putByte(ClassWriter.UTF8).putUTF8(value);
            result = new Item_1.Item(this.index++, this.key);
            this.put(result);
        }
        return result.index;
    }
    /**
     * Adds a class reference to the constant pool of the class being build.
     * Does nothing if the constant pool already contains a similar item.
     * <i>This method is intended for {@link Attribute} sub classes, and is
     * normally not needed by class generators or adapters.</i>
     *
     * @param value
     * the internal name of the class.
     * @return a new or already existing class reference item.
     */
    newClassItem(value) {
        this.key2.set(ClassWriter.CLASS, value, null, null);
        let result = this.get(this.key2);
        if (result == null) {
            this.pool.put12(ClassWriter.CLASS, this.newUTF8(value));
            result = new Item_1.Item(this.index++, this.key2);
            this.put(result);
        }
        return result;
    }
    /**
     * Adds a class reference to the constant pool of the class being build.
     * Does nothing if the constant pool already contains a similar item.
     * <i>This method is intended for {@link Attribute} sub classes, and is
     * normally not needed by class generators or adapters.</i>
     *
     * @param value
     * the internal name of the class.
     * @return the index of a new or already existing class reference item.
     */
    newClass(value) {
        return this.newClassItem(value).index;
    }
    /**
     * Adds a method type reference to the constant pool of the class being
     * build. Does nothing if the constant pool already contains a similar item.
     * <i>This method is intended for {@link Attribute} sub classes, and is
     * normally not needed by class generators or adapters.</i>
     *
     * @param methodDesc
     * method descriptor of the method type.
     * @return a new or already existing method type reference item.
     */
    newMethodTypeItem(methodDesc) {
        this.key2.set(ClassWriter.MTYPE, methodDesc, null, null);
        let result = this.get(this.key2);
        if (result == null) {
            this.pool.put12(ClassWriter.MTYPE, this.newUTF8(methodDesc));
            result = new Item_1.Item(this.index++, this.key2);
            this.put(result);
        }
        return result;
    }
    /**
     * Adds a method type reference to the constant pool of the class being
     * build. Does nothing if the constant pool already contains a similar item.
     * <i>This method is intended for {@link Attribute} sub classes, and is
     * normally not needed by class generators or adapters.</i>
     *
     * @param methodDesc
     * method descriptor of the method type.
     * @return the index of a new or already existing method type reference
     * item.
     */
    newMethodType(methodDesc) {
        return this.newMethodTypeItem(methodDesc).index;
    }
    /**
     * Adds a handle to the constant pool of the class being build. Does nothing
     * if the constant pool already contains a similar item. <i>This method is
     * intended for {@link Attribute} sub classes, and is normally not needed by
     * class generators or adapters.</i>
     *
     * @param tag
     * the kind of this handle. Must be {@link Opcodes#H_GETFIELD},
     * {@link Opcodes#H_GETSTATIC}, {@link Opcodes#H_PUTFIELD},
     * {@link Opcodes#H_PUTSTATIC}, {@link Opcodes#H_INVOKEVIRTUAL},
     * {@link Opcodes#H_INVOKESTATIC},
     * {@link Opcodes#H_INVOKESPECIAL},
     * {@link Opcodes#H_NEWINVOKESPECIAL} or
     * {@link Opcodes#H_INVOKEINTERFACE}.
     * @param owner
     * the internal name of the field or method owner class.
     * @param name
     * the name of the field or method.
     * @param desc
     * the descriptor of the field or method.
     * @param itf
     * true if the owner is an interface.
     * @return a new or an already existing method type reference item.
     */
    newHandleItem(tag, owner, name, desc, itf) {
        this.key4.set(ClassWriter.HANDLE_BASE + tag, owner, name, desc);
        let result = this.get(this.key4);
        if (result == null) {
            if (tag <= Opcodes_1.Opcodes.H_PUTSTATIC) {
                this.put112(ClassWriter.HANDLE, tag, this.newField(owner, name, desc));
            }
            else {
                this.put112(ClassWriter.HANDLE, tag, this.newMethod(owner, name, desc, itf));
            }
            result = new Item_1.Item(this.index++, this.key4);
            this.put(result);
        }
        return result;
    }
    /**
     * Adds a handle to the constant pool of the class being build. Does nothing
     * if the constant pool already contains a similar item. <i>This method is
     * intended for {@link Attribute} sub classes, and is normally not needed by
     * class generators or adapters.</i>
     *
     * @param tag
     * the kind of this handle. Must be {@link Opcodes#H_GETFIELD},
     * {@link Opcodes#H_GETSTATIC}, {@link Opcodes#H_PUTFIELD},
     * {@link Opcodes#H_PUTSTATIC}, {@link Opcodes#H_INVOKEVIRTUAL},
     * {@link Opcodes#H_INVOKESTATIC},
     * {@link Opcodes#H_INVOKESPECIAL},
     * {@link Opcodes#H_NEWINVOKESPECIAL} or
     * {@link Opcodes#H_INVOKEINTERFACE}.
     * @param owner
     * the internal name of the field or method owner class.
     * @param name
     * the name of the field or method.
     * @param desc
     * the descriptor of the field or method.
     * @return the index of a new or already existing method type reference
     * item.
     *
     * @deprecated this method is superseded by
     * {@link #newHandle(int, String, String, String, boolean)}.
     */
    newHandle$int$java_lang_String$java_lang_String$java_lang_String(tag, owner, name, desc) {
        return this.newHandle(tag, owner, name, desc, tag === Opcodes_1.Opcodes.H_INVOKEINTERFACE);
    }
    /**
     * Adds a handle to the constant pool of the class being build. Does nothing
     * if the constant pool already contains a similar item. <i>This method is
     * intended for {@link Attribute} sub classes, and is normally not needed by
     * class generators or adapters.</i>
     *
     * @param tag
     * the kind of this handle. Must be {@link Opcodes#H_GETFIELD},
     * {@link Opcodes#H_GETSTATIC}, {@link Opcodes#H_PUTFIELD},
     * {@link Opcodes#H_PUTSTATIC}, {@link Opcodes#H_INVOKEVIRTUAL},
     * {@link Opcodes#H_INVOKESTATIC},
     * {@link Opcodes#H_INVOKESPECIAL},
     * {@link Opcodes#H_NEWINVOKESPECIAL} or
     * {@link Opcodes#H_INVOKEINTERFACE}.
     * @param owner
     * the internal name of the field or method owner class.
     * @param name
     * the name of the field or method.
     * @param desc
     * the descriptor of the field or method.
     * @param itf
     * true if the owner is an interface.
     * @return the index of a new or already existing method type reference
     * item.
     */
    newHandle(tag, owner, name, desc, itf) {
        if (((typeof tag === 'number') || tag === null) && ((typeof owner === 'string') || owner === null) && ((typeof name === 'string') || name === null) && ((typeof desc === 'string') || desc === null) && ((typeof itf === 'boolean') || itf === null)) {
            let __args = Array.prototype.slice.call(arguments);
            return (() => {
                return this.newHandleItem(tag, owner, name, desc, itf).index;
            })();
        }
        else if (((typeof tag === 'number') || tag === null) && ((typeof owner === 'string') || owner === null) && ((typeof name === 'string') || name === null) && ((typeof desc === 'string') || desc === null) && itf === undefined) {
            return this.newHandle$int$java_lang_String$java_lang_String$java_lang_String(tag, owner, name, desc);
        }
        else
            throw new Error('invalid overload');
    }
    /**
     * Adds an invokedynamic reference to the constant pool of the class being
     * build. Does nothing if the constant pool already contains a similar item.
     * <i>This method is intended for {@link Attribute} sub classes, and is
     * normally not needed by class generators or adapters.</i>
     *
     * @param name
     * name of the invoked method.
     * @param desc
     * descriptor of the invoke method.
     * @param bsm
     * the bootstrap method.
     * @param bsmArgs
     * the bootstrap method constant arguments.
     *
     * @return a new or an already existing invokedynamic type reference item.
     */
    newInvokeDynamicItem(name, desc, bsm, ...bsmArgs) {
        throw new Error('not supported');
        // let bootstrapMethods: ByteVector = this.bootstrapMethods;
        // if (bootstrapMethods == null) {
        //     bootstrapMethods = this.bootstrapMethods = new ByteVector();
        // }
        // let position: number = bootstrapMethods.length;
        // let hashCode: number = bsm.hashCode();
        // bootstrapMethods.putShort(this.newHandle(bsm.tag, bsm.owner, bsm.name, bsm.desc, bsm.isInterface()));
        // let argsLength: number = bsmArgs.length;
        // bootstrapMethods.putShort(argsLength);
        // for (let i: number = 0; i < argsLength; i++) {
        //     let bsmArg: any = bsmArgs[i];
        //     hashCode ^= (<any>bsmArg.toString());
        //     bootstrapMethods.putShort(this.newConst(bsmArg));
        // }
        // let data: number[] = bootstrapMethods.data;
        // let length: number = (1 + 1 + argsLength) << 1;
        // hashCode &= 2147483647;
        // let result: Item = this.items[hashCode % this.items.length];
        // loop: while ((result != null)) {
        //     if (result.type !== ClassWriter.BSM || result.__hashCode !== hashCode) {
        //         result = result.next;
        //         continue;
        //     }
        //     let resultPosition: number = result.intVal;
        //     for (let p: number = 0; p < length; p++) {
        //         if (data[position + p] !== data[resultPosition + p]) {
        //             result = result.next;
        //             continue loop;
        //         }
        //     }
        //     break;
        // };
        // let bootstrapMethodIndex: number;
        // if (result != null) {
        //     bootstrapMethodIndex = result.index;
        //     bootstrapMethods.length = position;
        // } else {
        //     bootstrapMethodIndex = this.bootstrapMethodsCount++;
        //     result = new Item(bootstrapMethodIndex);
        //     result.set(position, hashCode);
        //     this.put(result);
        // }
        // this.key3.set(name, desc, bootstrapMethodIndex);
        // result = this.get(this.key3);
        // if (result == null) {
        //     this.put122(ClassWriter.INDY, bootstrapMethodIndex, this.newNameType(name, desc));
        //     result = new Item(this.index++, this.key3);
        //     this.put(result);
        // }
        // return result;
    }
    /**
     * Adds an invokedynamic reference to the constant pool of the class being
     * build. Does nothing if the constant pool already contains a similar item.
     * <i>This method is intended for {@link Attribute} sub classes, and is
     * normally not needed by class generators or adapters.</i>
     *
     * @param name
     * name of the invoked method.
     * @param desc
     * descriptor of the invoke method.
     * @param bsm
     * the bootstrap method.
     * @param bsmArgs
     * the bootstrap method constant arguments.
     *
     * @return the index of a new or already existing invokedynamic reference
     * item.
     */
    newInvokeDynamic(name, desc, bsm, ...bsmArgs) {
        return this.newInvokeDynamicItem.apply(this, [name, desc, bsm].concat(bsmArgs)).index;
    }
    /**
     * Adds a field reference to the constant pool of the class being build.
     * Does nothing if the constant pool already contains a similar item.
     *
     * @param owner
     * the internal name of the field's owner class.
     * @param name
     * the field's name.
     * @param desc
     * the field's descriptor.
     * @return a new or already existing field reference item.
     */
    newFieldItem(owner, name, desc) {
        this.key3.set(ClassWriter.FIELD, owner, name, desc);
        let result = this.get(this.key3);
        if (result == null) {
            this.put122(ClassWriter.FIELD, this.newClass(owner), this.newNameType(name, desc));
            result = new Item_1.Item(this.index++, this.key3);
            this.put(result);
        }
        return result;
    }
    /**
     * Adds a field reference to the constant pool of the class being build.
     * Does nothing if the constant pool already contains a similar item.
     * <i>This method is intended for {@link Attribute} sub classes, and is
     * normally not needed by class generators or adapters.</i>
     *
     * @param owner
     * the internal name of the field's owner class.
     * @param name
     * the field's name.
     * @param desc
     * the field's descriptor.
     * @return the index of a new or already existing field reference item.
     */
    newField(owner, name, desc) {
        return this.newFieldItem(owner, name, desc).index;
    }
    /**
     * Adds a method reference to the constant pool of the class being build.
     * Does nothing if the constant pool already contains a similar item.
     *
     * @param owner
     * the internal name of the method's owner class.
     * @param name
     * the method's name.
     * @param desc
     * the method's descriptor.
     * @param itf
     * <tt>true</tt> if <tt>owner</tt> is an interface.
     * @return a new or already existing method reference item.
     */
    newMethodItem(owner, name, desc, itf) {
        let type = itf ? ClassWriter.IMETH : ClassWriter.METH;
        this.key3.set(type, owner, name, desc);
        let result = this.get(this.key3);
        if (result == null) {
            this.put122(type, this.newClass(owner), this.newNameType(name, desc));
            result = new Item_1.Item(this.index++, this.key3);
            this.put(result);
        }
        return result;
    }
    /**
     * Adds a method reference to the constant pool of the class being build.
     * Does nothing if the constant pool already contains a similar item.
     * <i>This method is intended for {@link Attribute} sub classes, and is
     * normally not needed by class generators or adapters.</i>
     *
     * @param owner
     * the internal name of the method's owner class.
     * @param name
     * the method's name.
     * @param desc
     * the method's descriptor.
     * @param itf
     * <tt>true</tt> if <tt>owner</tt> is an interface.
     * @return the index of a new or already existing method reference item.
     */
    newMethod(owner, name, desc, itf) {
        return this.newMethodItem(owner, name, desc, itf).index;
    }
    /**
     * Adds an integer to the constant pool of the class being build. Does
     * nothing if the constant pool already contains a similar item.
     *
     * @param value
     * the int value.
     * @return a new or already existing int item.
     */
    newInteger(value) {
        this.key.set(value);
        let result = this.get(this.key);
        if (result == null) {
            this.pool.putByte(ClassWriter.INT).putInt(value);
            result = new Item_1.Item(this.index++, this.key);
            this.put(result);
        }
        return result;
    }
    /**
     * Adds a float to the constant pool of the class being build. Does nothing
     * if the constant pool already contains a similar item.
     *
     * @param value
     * the float value.
     * @return a new or already existing float item.
     */
    newFloat(value) {
        this.key.set(value);
        let result = this.get(this.key);
        if (result == null) {
            this.pool.putByte(ClassWriter.FLOAT).putInt(this.key.intVal);
            result = new Item_1.Item(this.index++, this.key);
            this.put(result);
        }
        return result;
    }
    /**
     * Adds a long to the constant pool of the class being build. Does nothing
     * if the constant pool already contains a similar item.
     *
     * @param value
     * the long value.
     * @return a new or already existing long item.
     */
    newLong(value) {
        // this.key.set(value);
        // let result: Item = this.get(this.key);
        // if (result == null) {
        //     this.pool.putByte(ClassWriter.LONG).putLong(value);
        //     result = new Item(this.index, this.key);
        //     this.index += 2;
        //     this.put(result);
        // }
        // return result;
        throw new Error('not supported');
    }
    /**
     * Adds a double to the constant pool of the class being build. Does nothing
     * if the constant pool already contains a similar item.
     *
     * @param value
     * the double value.
     * @return a new or already existing double item.
     */
    newDouble(value) {
        throw new Error('not supported');
        // this.key.set(value);
        // let result: Item = this.get(this.key);
        // if (result == null) {
        //     this.pool.putByte(ClassWriter.DOUBLE).putLong(this.key.longVal);
        //     result = new Item(this.index, this.key);
        //     this.index += 2;
        //     this.put(result);
        // }
        // return result;
    }
    /**
     * Adds a string to the constant pool of the class being build. Does nothing
     * if the constant pool already contains a similar item.
     *
     * @param value
     * the String value.
     * @return a new or already existing string item.
     */
    newString(value) {
        this.key2.set(ClassWriter.STR, value, null, null);
        let result = this.get(this.key2);
        if (result == null) {
            this.pool.put12(ClassWriter.STR, this.newUTF8(value));
            result = new Item_1.Item(this.index++, this.key2);
            this.put(result);
        }
        return result;
    }
    /**
     * Adds a name and type to the constant pool of the class being build. Does
     * nothing if the constant pool already contains a similar item. <i>This
     * method is intended for {@link Attribute} sub classes, and is normally not
     * needed by class generators or adapters.</i>
     *
     * @param name
     * a name.
     * @param desc
     * a type descriptor.
     * @return the index of a new or already existing name and type item.
     */
    newNameType(name, desc) {
        return this.newNameTypeItem(name, desc).index;
    }
    /**
     * Adds a name and type to the constant pool of the class being build. Does
     * nothing if the constant pool already contains a similar item.
     *
     * @param name
     * a name.
     * @param desc
     * a type descriptor.
     * @return a new or already existing name and type item.
     */
    newNameTypeItem(name, desc) {
        this.key2.set(ClassWriter.NAME_TYPE, name, desc, null);
        let result = this.get(this.key2);
        if (result == null) {
            this.put122(ClassWriter.NAME_TYPE, this.newUTF8(name), this.newUTF8(desc));
            result = new Item_1.Item(this.index++, this.key2);
            this.put(result);
        }
        return result;
    }
    /**
     * Adds the given internal name to {@link #typeTable} and returns its index.
     * Does nothing if the type table already contains this internal name.
     *
     * @param type
     * the internal name to be added to the type table.
     * @return the index of this internal name in the type table.
     */
    addType(type) {
        if (((typeof type === 'string') || type === null)) {
            let __args = Array.prototype.slice.call(arguments);
            return (() => {
                this.key.set(ClassWriter.TYPE_NORMAL, type, null, null);
                let result = this.get(this.key);
                if (result == null) {
                    result = this.addType(this.key);
                }
                return result.index;
            })();
        }
        else if (((type != null && type instanceof Item_1.Item) || type === null)) {
            return this.addType$Item(type);
        }
        else
            throw new Error('invalid overload');
    }
    /**
     * Adds the given "uninitialized" type to {@link #typeTable} and returns its
     * index. This method is used for UNINITIALIZED types, made of an internal
     * name and a bytecode offset.
     *
     * @param type
     * the internal name to be added to the type table.
     * @param offset
     * the bytecode offset of the NEW instruction that created this
     * UNINITIALIZED type value.
     * @return the index of this internal name in the type table.
     */
    addUninitializedType(type, offset) {
        this.key.type = ClassWriter.TYPE_UNINIT;
        this.key.intVal = offset;
        this.key.strVal1 = type;
        this.key.__hashCode = 2147483647 & (ClassWriter.TYPE_UNINIT + type.toString() + offset);
        let result = this.get(this.key);
        if (result == null) {
            result = this.addType(this.key);
        }
        return result.index;
    }
    /**
     * Adds the given Item to {@link #typeTable}.
     *
     * @param item
     * the value to be added to the type table.
     * @return the added Item, which a new Item instance with the same value as
     * the given Item.
     */
    addType$Item(item) {
        throw new Error('not supported');
        // ++this.typeCount;
        // let result: Item = new Item(this.typeCount, this.key);
        // this.put(result);
        // if (this.typeTable == null) {
        //     this.typeTable = new Array(16);
        // }
        // if (this.typeCount === this.typeTable.length) {
        //     let newTable: Item[] = new Array(2 * this.typeTable.length);
        //     java.lang.System.arraycopy(this.typeTable, 0, newTable, 0, this.typeTable.length);
        //     this.typeTable = newTable;
        // }
        // this.typeTable[this.typeCount] = result;
        // return result;
    }
    /**
     * Returns the index of the common super type of the two given types. This
     * method calls {@link #getCommonSuperClass} and caches the result in the
     * {@link #items} hash table to speedup future calls with the same
     * parameters.
     *
     * @param type1
     * index of an internal name in {@link #typeTable}.
     * @param type2
     * index of an internal name in {@link #typeTable}.
     * @return the index of the common super type of the two given types.
     */
    getMergedType(type1, type2) {
        throw new Error('not supported');
        // this.key2.type = ClassWriter.TYPE_MERGED;
        // this.key2.longVal = type1 | ((Math.round(<number>type2)) << 32);
        // this.key2.__hashCode = 2147483647 & (ClassWriter.TYPE_MERGED + type1 + type2);
        // let result: Item = this.get(this.key2);
        // if (result == null) {
        //     let t: string = this.typeTable[type1].strVal1;
        //     let u: string = this.typeTable[type2].strVal1;
        //     this.key2.intVal = this.addType(this.getCommonSuperClass(t, u));
        //     result = new Item((<number>0 | 0), this.key2);
        //     this.put(result);
        // }
        // return result.intVal;
    }
    /**
     * Returns the common super type of the two given types. The default
     * implementation of this method <i>loads</i> the two given classes and uses
     * the java.lang.Class methods to find the common super class. It can be
     * overridden to compute this common super type in other ways, in particular
     * without actually loading any class, or to take into account the class
     * that is currently being generated by this ClassWriter, which can of
     * course not be loaded since it is under construction.
     *
     * @param type1
     * the internal name of a class.
     * @param type2
     * the internal name of another class.
     * @return the internal name of the common super class of the two given
     * classes.
     */
    getCommonSuperClass(type1, type2) {
        return 'java/lang/Object';
        //break....
        // let c: any;
        // let d: any;
        // let classLoader: java.lang.ClassLoader = (<any>this.constructor).getClassLoader();
        // try {
        //     c = java.lang.Class.forName(/* replace */type1.split('/').join('.'), false, classLoader);
        //     d = java.lang.Class.forName(/* replace */type2.split('/').join('.'), false, classLoader);
        // } catch (e) {
        //     throw new Error(e.toString());
        // };
        // if (c.isAssignableFrom(d)) {
        //     return type1;
        // }
        // if (d.isAssignableFrom(c)) {
        //     return type2;
        // }
        // if (c.isInterface() || d.isInterface()) {
        //     return "java/lang/Object";
        // } else {
        //     do {
        //         c = c.getSuperclass();
        //     } while ((!c.isAssignableFrom(d)));
        //     return /* replace *//* getName */(c => c["__class"] ? c["__class"] : c.name)(c).split('.').join('/');
        // }
    }
    /**
     * Returns the constant pool's hash table item which is equal to the given
     * item.
     *
     * @param key
     * a constant pool item.
     * @return the constant pool's hash table item which is equal to the given
     * item, or <tt>null</tt> if there is no such item.
     */
    get(key) {
        let i = this.items[key.__hashCode % this.items.length];
        while ((i != null && (i.type !== key.type || !key.isEqualTo(i)))) {
            i = i.next;
        }
        ;
        return i;
    }
    /**
     * Puts the given item in the constant pool's hash table. The hash table
     * <i>must</i> not already contains this item.
     *
     * @param i
     * the item to be added to the constant pool's hash table.
     */
    put(i) {
        if (this.index + this.typeCount > this.threshold) {
            let ll = this.items.length;
            let nl = ll * 2 + 1;
            let newItems = new Array(nl);
            for (let l = ll - 1; l >= 0; --l) {
                let j = this.items[l];
                while ((j != null)) {
                    let index = j.__hashCode % newItems.length;
                    let k = j.next;
                    j.next = newItems[index];
                    newItems[index] = j;
                    j = k;
                }
                ;
            }
            this.items = newItems;
            this.threshold = ((nl * 0.75) | 0);
        }
        let index = i.__hashCode % this.items.length;
        i.next = this.items[index];
        this.items[index] = i;
    }
    /**
     * Puts one byte and two shorts into the constant pool.
     *
     * @param b
     * a byte.
     * @param s1
     * a short.
     * @param s2
     * another short.
     */
    put122(b, s1, s2) {
        this.pool.put12(b, s1).putShort(s2);
    }
    /**
     * Puts two bytes and one short into the constant pool.
     *
     * @param b1
     * a byte.
     * @param b2
     * another byte.
     * @param s
     * a short.
     */
    put112(b1, b2, s) {
        this.pool.put11(b1, b2).putShort(s);
    }
}
ClassWriter.__static_initialized = false;
/**
 * Flag to automatically compute the maximum stack size and the maximum
 * number of local variables of methods. If this flag is set, then the
 * arguments of the {@link MethodVisitor#visitMaxs visitMaxs} method of the
 * {@link MethodVisitor} returned by the {@link #visitMethod visitMethod}
 * method will be ignored, and computed automatically from the signature and
 * the bytecode of each method.
 *
 * @see #ClassWriter(int)
 */
ClassWriter.COMPUTE_MAXS = 1;
/**
 * Flag to automatically compute the stack map frames of methods from
 * scratch. If this flag is set, then the calls to the
 * {@link MethodVisitor#visitFrame} method are ignored, and the stack map
 * frames are recomputed from the methods bytecode. The arguments of the
 * {@link MethodVisitor#visitMaxs visitMaxs} method are also ignored and
 * recomputed from the bytecode. In other words, COMPUTE_FRAMES implies
 * COMPUTE_MAXS.
 *
 * @see #ClassWriter(int)
 */
ClassWriter.COMPUTE_FRAMES = 2;
/**
 * Pseudo access flag to distinguish between the synthetic attribute and the
 * synthetic access flag.
 */
ClassWriter.ACC_SYNTHETIC_ATTRIBUTE = 262144;
/**
 * The type of instructions without any argument.
 */
ClassWriter.NOARG_INSN = 0;
/**
 * The type of instructions with an signed byte argument.
 */
ClassWriter.SBYTE_INSN = 1;
/**
 * The type of instructions with an signed short argument.
 */
ClassWriter.SHORT_INSN = 2;
/**
 * The type of instructions with a local variable index argument.
 */
ClassWriter.VAR_INSN = 3;
/**
 * The type of instructions with an implicit local variable index argument.
 */
ClassWriter.IMPLVAR_INSN = 4;
/**
 * The type of instructions with a type descriptor argument.
 */
ClassWriter.TYPE_INSN = 5;
/**
 * The type of field and method invocations instructions.
 */
ClassWriter.FIELDORMETH_INSN = 6;
/**
 * The type of the INVOKEINTERFACE/INVOKEDYNAMIC instruction.
 */
ClassWriter.ITFMETH_INSN = 7;
/**
 * The type of the INVOKEDYNAMIC instruction.
 */
ClassWriter.INDYMETH_INSN = 8;
/**
 * The type of instructions with a 2 bytes bytecode offset label.
 */
ClassWriter.LABEL_INSN = 9;
/**
 * The type of instructions with a 4 bytes bytecode offset label.
 */
ClassWriter.LABELW_INSN = 10;
/**
 * The type of the LDC instruction.
 */
ClassWriter.LDC_INSN = 11;
/**
 * The type of the LDC_W and LDC2_W instructions.
 */
ClassWriter.LDCW_INSN = 12;
/**
 * The type of the IINC instruction.
 */
ClassWriter.IINC_INSN = 13;
/**
 * The type of the TABLESWITCH instruction.
 */
ClassWriter.TABL_INSN = 14;
/**
 * The type of the LOOKUPSWITCH instruction.
 */
ClassWriter.LOOK_INSN = 15;
/**
 * The type of the MULTIANEWARRAY instruction.
 */
ClassWriter.MANA_INSN = 16;
/**
 * The type of the WIDE instruction.
 */
ClassWriter.WIDE_INSN = 17;
/**
 * The type of the ASM pseudo instructions with an unsigned 2 bytes offset
 * label (see Label#resolve).
 */
ClassWriter.ASM_LABEL_INSN = 18;
/**
 * Represents a frame inserted between already existing frames. This kind of
 * frame can only be used if the frame content can be computed from the
 * previous existing frame and from the instructions between this existing
 * frame and the inserted one, without any knowledge of the type hierarchy.
 * This kind of frame is only used when an unconditional jump is inserted in
 * a method while expanding an ASM pseudo instruction (see ClassReader).
 */
ClassWriter.F_INSERT = 256;
/**
 * The type of CONSTANT_Class constant pool items.
 */
ClassWriter.CLASS = 7;
/**
 * The type of CONSTANT_Fieldref constant pool items.
 */
ClassWriter.FIELD = 9;
/**
 * The type of CONSTANT_Methodref constant pool items.
 */
ClassWriter.METH = 10;
/**
 * The type of CONSTANT_InterfaceMethodref constant pool items.
 */
ClassWriter.IMETH = 11;
/**
 * The type of CONSTANT_String constant pool items.
 */
ClassWriter.STR = 8;
/**
 * The type of CONSTANT_Integer constant pool items.
 */
ClassWriter.INT = 3;
/**
 * The type of CONSTANT_Float constant pool items.
 */
ClassWriter.FLOAT = 4;
/**
 * The type of CONSTANT_Long constant pool items.
 */
ClassWriter.LONG = 5;
/**
 * The type of CONSTANT_Double constant pool items.
 */
ClassWriter.DOUBLE = 6;
/**
 * The type of CONSTANT_NameAndType constant pool items.
 */
ClassWriter.NAME_TYPE = 12;
/**
 * The type of CONSTANT_Utf8 constant pool items.
 */
ClassWriter.UTF8 = 1;
/**
 * The type of CONSTANT_MethodType constant pool items.
 */
ClassWriter.MTYPE = 16;
/**
 * The type of CONSTANT_MethodHandle constant pool items.
 */
ClassWriter.HANDLE = 15;
/**
 * The type of CONSTANT_InvokeDynamic constant pool items.
 */
ClassWriter.INDY = 18;
/**
 * The base value for all CONSTANT_MethodHandle constant pool items.
 * Internally, ASM store the 9 variations of CONSTANT_MethodHandle into 9
 * different items.
 */
ClassWriter.HANDLE_BASE = 20;
/**
 * Normal type Item stored in the ClassWriter {@link ClassWriter#typeTable},
 * instead of the constant pool, in order to avoid clashes with normal
 * constant pool items in the ClassWriter constant pool's hash table.
 */
ClassWriter.TYPE_NORMAL = 30;
/**
 * Uninitialized type Item stored in the ClassWriter
 * {@link ClassWriter#typeTable}, instead of the constant pool, in order to
 * avoid clashes with normal constant pool items in the ClassWriter constant
 * pool's hash table.
 */
ClassWriter.TYPE_UNINIT = 31;
/**
 * Merged type Item stored in the ClassWriter {@link ClassWriter#typeTable},
 * instead of the constant pool, in order to avoid clashes with normal
 * constant pool items in the ClassWriter constant pool's hash table.
 */
ClassWriter.TYPE_MERGED = 32;
/**
 * The type of BootstrapMethods items. These items are stored in a special
 * class attribute named BootstrapMethods and not in the constant pool.
 */
ClassWriter.BSM = 33;
exports.ClassWriter = ClassWriter;
ClassWriter["__class"] = "ClassWriter";
ClassWriter.TYPE_$LI$();
ClassWriter.TO_ACC_SYNTHETIC_$LI$();
ClassWriter.__static_initialize();
