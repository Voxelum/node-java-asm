"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnnotationWriter_1 = require("./AnnotationWriter");
const ByteVector_1 = require("./ByteVector");
const ClassReader_1 = require("./ClassReader");
const ClassWriter_1 = require("./ClassWriter");
const FieldVisitor_1 = require("./FieldVisitor");
const Opcodes_1 = require("./Opcodes");
class FieldWriter extends FieldVisitor_1.FieldVisitor {
    /**
     * Constructs a new {@link FieldWriter}.
     *
     * @param cw
     * the class writer to which this field must be added.
     * @param access
     * the field's access flags (see {@link Opcodes}).
     * @param name
     * the field's name.
     * @param desc
     * the field's descriptor (see {@link Type}).
     * @param signature
     * the field's signature. May be <tt>null</tt>.
     * @param value
     * the field's constant value. May be <tt>null</tt>.
     */
    constructor(cw, access, name, desc, signature, value) {
        super(Opcodes_1.Opcodes.ASM5);
        this.access = 0;
        this.name = 0;
        this.desc = 0;
        this.signature = 0;
        this.value = 0;
        if (cw.firstField == null) {
            cw.firstField = this;
        }
        else {
            cw.lastField.fv = this;
        }
        cw.lastField = this;
        this.cw = cw;
        this.access = access;
        this.name = cw.newUTF8(name);
        this.desc = cw.newUTF8(desc);
        if (ClassReader_1.ClassReader.SIGNATURES && signature != null) {
            this.signature = cw.newUTF8(signature);
        }
        if (value != null) {
            this.value = cw.newConstItem(value).index;
        }
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
    visitAttribute(attr) {
        attr.next = this.attrs;
        this.attrs = attr;
    }
    visitEnd() {
    }
    /**
     * Returns the size of this field.
     *
     * @return the size of this field.
     */
    getSize() {
        let size = 8;
        if (this.value !== 0) {
            this.cw.newUTF8("ConstantValue");
            size += 8;
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
        if (ClassReader_1.ClassReader.SIGNATURES && this.signature !== 0) {
            this.cw.newUTF8("Signature");
            size += 8;
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
        if (this.attrs != null) {
            size += this.attrs.getSize(this.cw, null, 0, -1, -1);
        }
        return size;
    }
    /**
     * Puts the content of this field into the given byte vector.
     *
     * @param out
     * where the content of this field must be put.
     */
    put(out) {
        let FACTOR = ClassWriter_1.ClassWriter.TO_ACC_SYNTHETIC_$LI$();
        let mask = Opcodes_1.Opcodes.ACC_DEPRECATED | ClassWriter_1.ClassWriter.ACC_SYNTHETIC_ATTRIBUTE | (((this.access & ClassWriter_1.ClassWriter.ACC_SYNTHETIC_ATTRIBUTE) / FACTOR | 0));
        out.putShort(this.access & ~mask).putShort(this.name).putShort(this.desc);
        let attributeCount = 0;
        if (this.value !== 0) {
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
        if (ClassReader_1.ClassReader.SIGNATURES && this.signature !== 0) {
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
        if (this.attrs != null) {
            attributeCount += this.attrs.getCount();
        }
        out.putShort(attributeCount);
        if (this.value !== 0) {
            out.putShort(this.cw.newUTF8("ConstantValue"));
            out.putInt(2).putShort(this.value);
        }
        if ((this.access & Opcodes_1.Opcodes.ACC_SYNTHETIC) !== 0) {
            if ((this.cw.version & 65535) < Opcodes_1.Opcodes.V1_5 || (this.access & ClassWriter_1.ClassWriter.ACC_SYNTHETIC_ATTRIBUTE) !== 0) {
                out.putShort(this.cw.newUTF8("Synthetic")).putInt(0);
            }
        }
        if ((this.access & Opcodes_1.Opcodes.ACC_DEPRECATED) !== 0) {
            out.putShort(this.cw.newUTF8("Deprecated")).putInt(0);
        }
        if (ClassReader_1.ClassReader.SIGNATURES && this.signature !== 0) {
            out.putShort(this.cw.newUTF8("Signature"));
            out.putInt(2).putShort(this.signature);
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
        if (this.attrs != null) {
            this.attrs.put(this.cw, null, 0, -1, -1, out);
        }
    }
}
exports.FieldWriter = FieldWriter;
FieldWriter["__class"] = "FieldWriter";
