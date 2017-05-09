"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * A visitor to visit a Java class. The methods of this class must be called in
 * the following order: <tt>visit</tt> [ <tt>visitSource</tt> ] [
 * <tt>visitOuterClass</tt> ] ( <tt>visitAnnotation</tt> |
 * <tt>visitTypeAnnotation</tt> | <tt>visitAttribute</tt> )* (
 * <tt>visitInnerClass</tt> | <tt>visitField</tt> | <tt>visitMethod</tt> )*
 * <tt>visitEnd</tt>.
 *
 * @author Eric Bruneton
 */
const Opcodes_1 = require("./Opcodes");
class ClassVisitor {
    /**
     * Constructs a new {@link ClassVisitor}.
     *
     * @param api
     * the ASM API version implemented by this visitor. Must be one
     * of {@link Opcodes#ASM4} or {@link Opcodes#ASM5}.
     * @param cv
     * the class visitor to which this visitor must delegate method
     * calls. May be null.
     */
    constructor(api, cv = null) {
        this.api = 0;
        if (api !== Opcodes_1.Opcodes.ASM4 && api !== Opcodes_1.Opcodes.ASM5) {
            throw new Error();
        }
        this.api = api;
        this.cv = cv;
    }
    /**
     * Visits the header of the class.
     *
     * @param version
     * the class version.
     * @param access
     * the class's access flags (see {@link Opcodes}). This parameter
     * also indicates if the class is deprecated.
     * @param name
     * the internal name of the class (see
     * {@link Type#getInternalName() getInternalName}).
     * @param signature
     * the signature of this class. May be <tt>null</tt> if the class
     * is not a generic one, and does not extend or implement generic
     * classes or interfaces.
     * @param superName
     * the internal of name of the super class (see
     * {@link Type#getInternalName() getInternalName}). For
     * interfaces, the super class is {@link Object}. May be
     * <tt>null</tt>, but only for the {@link Object} class.
     * @param interfaces
     * the internal names of the class's interfaces (see
     * {@link Type#getInternalName() getInternalName}). May be
     * <tt>null</tt>.
     */
    visit(version, access, name, signature, superName, interfaces) {
        if (this.cv != null) {
            this.cv.visit(version, access, name, signature, superName, interfaces);
        }
    }
    /**
     * Visits the source of the class.
     *
     * @param source
     * the name of the source file from which the class was compiled.
     * May be <tt>null</tt>.
     * @param debug
     * additional debug information to compute the correspondance
     * between source and compiled elements of the class. May be
     * <tt>null</tt>.
     */
    visitSource(source, debug) {
        if (this.cv != null) {
            this.cv.visitSource(source, debug);
        }
    }
    /**
     * Visits the enclosing class of the class. This method must be called only
     * if the class has an enclosing class.
     *
     * @param owner
     * internal name of the enclosing class of the class.
     * @param name
     * the name of the method that contains the class, or
     * <tt>null</tt> if the class is not enclosed in a method of its
     * enclosing class.
     * @param desc
     * the descriptor of the method that contains the class, or
     * <tt>null</tt> if the class is not enclosed in a method of its
     * enclosing class.
     */
    visitOuterClass(owner, name, desc) {
        if (this.cv != null) {
            this.cv.visitOuterClass(owner, name, desc);
        }
    }
    /**
     * Visits an annotation of the class.
     *
     * @param desc
     * the class descriptor of the annotation class.
     * @param visible
     * <tt>true</tt> if the annotation is visible at runtime.
     * @return a visitor to visit the annotation values, or <tt>null</tt> if
     * this visitor is not interested in visiting this annotation.
     */
    visitAnnotation(desc, visible) {
        if (this.cv != null) {
            return this.cv.visitAnnotation(desc, visible);
        }
        return null;
    }
    /**
     * Visits an annotation on a type in the class signature.
     *
     * @param typeRef
     * a reference to the annotated type. The sort of this type
     * reference must be {@link TypeReference#CLASS_TYPE_PARAMETER
     * CLASS_TYPE_PARAMETER},
     * {@link TypeReference#CLASS_TYPE_PARAMETER_BOUND
     * CLASS_TYPE_PARAMETER_BOUND} or
     * {@link TypeReference#CLASS_EXTENDS CLASS_EXTENDS}. See
     * {@link TypeReference}.
     * @param typePath
     * the path to the annotated type argument, wildcard bound, array
     * element type, or static inner type within 'typeRef'. May be
     * <tt>null</tt> if the annotation targets 'typeRef' as a whole.
     * @param desc
     * the class descriptor of the annotation class.
     * @param visible
     * <tt>true</tt> if the annotation is visible at runtime.
     * @return a visitor to visit the annotation values, or <tt>null</tt> if
     * this visitor is not interested in visiting this annotation.
     */
    visitTypeAnnotation(typeRef, typePath, desc, visible) {
        if (this.api < Opcodes_1.Opcodes.ASM5) {
            throw new Error();
        }
        if (this.cv != null) {
            return this.cv.visitTypeAnnotation(typeRef, typePath, desc, visible);
        }
        return null;
    }
    /**
     * Visits a non standard attribute of the class.
     *
     * @param attr
     * an attribute.
     */
    visitAttribute(attr) {
        if (this.cv != null) {
            this.cv.visitAttribute(attr);
        }
    }
    /**
     * Visits information about an inner class. This inner class is not
     * necessarily a member of the class being visited.
     *
     * @param name
     * the internal name of an inner class (see
     * {@link Type#getInternalName() getInternalName}).
     * @param outerName
     * the internal name of the class to which the inner class
     * belongs (see {@link Type#getInternalName() getInternalName}).
     * May be <tt>null</tt> for not member classes.
     * @param innerName
     * the (simple) name of the inner class inside its enclosing
     * class. May be <tt>null</tt> for anonymous inner classes.
     * @param access
     * the access flags of the inner class as originally declared in
     * the enclosing class.
     */
    visitInnerClass(name, outerName, innerName, access) {
        if (this.cv != null) {
            this.cv.visitInnerClass(name, outerName, innerName, access);
        }
    }
    /**
     * Visits a field of the class.
     *
     * @param access
     * the field's access flags (see {@link Opcodes}). This parameter
     * also indicates if the field is synthetic and/or deprecated.
     * @param name
     * the field's name.
     * @param desc
     * the field's descriptor (see {@link Type Type}).
     * @param signature
     * the field's signature. May be <tt>null</tt> if the field's
     * type does not use generic types.
     * @param value
     * the field's initial value. This parameter, which may be
     * <tt>null</tt> if the field does not have an initial value,
     * must be an {@link Integer}, a {@link Float}, a {@link Long}, a
     * {@link Double} or a {@link String} (for <tt>int</tt>,
     * <tt>float</tt>, <tt>long</tt> or <tt>String</tt> fields
     * respectively). <i>This parameter is only used for static
     * fields</i>. Its value is ignored for non static fields, which
     * must be initialized through bytecode instructions in
     * constructors or methods.
     * @return a visitor to visit field annotations and attributes, or
     * <tt>null</tt> if this class visitor is not interested in visiting
     * these annotations and attributes.
     */
    visitField(access, name, desc, signature, value) {
        if (this.cv != null) {
            return this.cv.visitField(access, name, desc, signature, value);
        }
        return null;
    }
    /**
     * Visits a method of the class. This method <i>must</i> return a new
     * {@link MethodVisitor} instance (or <tt>null</tt>) each time it is called,
     * i.e., it should not return a previously returned visitor.
     *
     * @param access
     * the method's access flags (see {@link Opcodes}). This
     * parameter also indicates if the method is synthetic and/or
     * deprecated.
     * @param name
     * the method's name.
     * @param desc
     * the method's descriptor (see {@link Type Type}).
     * @param signature
     * the method's signature. May be <tt>null</tt> if the method
     * parameters, return type and exceptions do not use generic
     * types.
     * @param exceptions
     * the internal names of the method's exception classes (see
     * {@link Type#getInternalName() getInternalName}). May be
     * <tt>null</tt>.
     * @return an object to visit the byte code of the method, or <tt>null</tt>
     * if this class visitor is not interested in visiting the code of
     * this method.
     */
    visitMethod(access, name, desc, signature, exceptions) {
        if (this.cv != null) {
            return this.cv.visitMethod(access, name, desc, signature, exceptions);
        }
        return null;
    }
    /**
     * Visits the end of the class. This method, which is the last one to be
     * called, is used to inform the visitor that all the fields and methods of
     * the class have been visited.
     */
    visitEnd() {
        if (this.cv != null) {
            this.cv.visitEnd();
        }
    }
}
exports.ClassVisitor = ClassVisitor;
ClassVisitor["__class"] = "ClassVisitor";
