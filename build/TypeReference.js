"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * A reference to a type appearing in a class, field or method declaration, or
 * on an instruction. Such a reference designates the part of the class where
 * the referenced type is appearing (e.g. an 'extends', 'implements' or 'throws'
 * clause, a 'new' instruction, a 'catch' clause, a type cast, a local variable
 * declaration, etc).
 *
 * @author Eric Bruneton
 */
class TypeReference {
    /**
     * Creates a new TypeReference.
     *
     * @param typeRef
     * the int encoded value of the type reference, as received in a
     * visit method related to type annotations, like
     * visitTypeAnnotation.
     */
    constructor(typeRef) {
        this.value = 0;
        this.value = typeRef;
    }
    /**
     * Returns a type reference of the given sort.
     *
     * @param sort
     * {@link #FIELD FIELD}, {@link #METHOD_RETURN METHOD_RETURN},
     * {@link #METHOD_RECEIVER METHOD_RECEIVER},
     * {@link #LOCAL_VARIABLE LOCAL_VARIABLE},
     * {@link #RESOURCE_VARIABLE RESOURCE_VARIABLE},
     * {@link #INSTANCEOF INSTANCEOF}, {@link #NEW NEW},
     * {@link #CONSTRUCTOR_REFERENCE CONSTRUCTOR_REFERENCE}, or
     * {@link #METHOD_REFERENCE METHOD_REFERENCE}.
     * @return a type reference of the given sort.
     */
    static newTypeReference(sort) {
        return new TypeReference(sort << 24);
    }
    /**
     * Returns a reference to a type parameter of a generic class or method.
     *
     * @param sort
     * {@link #CLASS_TYPE_PARAMETER CLASS_TYPE_PARAMETER} or
     * {@link #METHOD_TYPE_PARAMETER METHOD_TYPE_PARAMETER}.
     * @param paramIndex
     * the type parameter index.
     * @return a reference to the given generic class or method type parameter.
     */
    static newTypeParameterReference(sort, paramIndex) {
        return new TypeReference((sort << 24) | (paramIndex << 16));
    }
    /**
     * Returns a reference to a type parameter bound of a generic class or
     * method.
     *
     * @param sort
     * {@link #CLASS_TYPE_PARAMETER CLASS_TYPE_PARAMETER} or
     * {@link #METHOD_TYPE_PARAMETER METHOD_TYPE_PARAMETER}.
     * @param paramIndex
     * the type parameter index.
     * @param boundIndex
     * the type bound index within the above type parameters.
     * @return a reference to the given generic class or method type parameter
     * bound.
     */
    static newTypeParameterBoundReference(sort, paramIndex, boundIndex) {
        return new TypeReference((sort << 24) | (paramIndex << 16) | (boundIndex << 8));
    }
    /**
     * Returns a reference to the super class or to an interface of the
     * 'implements' clause of a class.
     *
     * @param itfIndex
     * the index of an interface in the 'implements' clause of a
     * class, or -1 to reference the super class of the class.
     * @return a reference to the given super type of a class.
     */
    static newSuperTypeReference(itfIndex) {
        itfIndex &= 65535;
        return new TypeReference((TypeReference.CLASS_EXTENDS << 24) | (itfIndex << 8));
    }
    /**
     * Returns a reference to the type of a formal parameter of a method.
     *
     * @param paramIndex
     * the formal parameter index.
     *
     * @return a reference to the type of the given method formal parameter.
     */
    static newFormalParameterReference(paramIndex) {
        return new TypeReference((TypeReference.METHOD_FORMAL_PARAMETER << 24) | (paramIndex << 16));
    }
    /**
     * Returns a reference to the type of an exception, in a 'throws' clause of
     * a method.
     *
     * @param exceptionIndex
     * the index of an exception in a 'throws' clause of a method.
     *
     * @return a reference to the type of the given exception.
     */
    static newExceptionReference(exceptionIndex) {
        return new TypeReference((TypeReference.THROWS << 24) | (exceptionIndex << 8));
    }
    /**
     * Returns a reference to the type of the exception declared in a 'catch'
     * clause of a method.
     *
     * @param tryCatchBlockIndex
     * the index of a try catch block (using the order in which they
     * are visited with visitTryCatchBlock).
     *
     * @return a reference to the type of the given exception.
     */
    static newTryCatchReference(tryCatchBlockIndex) {
        return new TypeReference((TypeReference.EXCEPTION_PARAMETER << 24) | (tryCatchBlockIndex << 8));
    }
    /**
     * Returns a reference to the type of a type argument in a constructor or
     * method call or reference.
     *
     * @param sort
     * {@link #CAST CAST},
     * {@link #CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT
     * CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT},
     * {@link #METHOD_INVOCATION_TYPE_ARGUMENT
     * METHOD_INVOCATION_TYPE_ARGUMENT},
     * {@link #CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT
     * CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT}, or
     * {@link #METHOD_REFERENCE_TYPE_ARGUMENT
     * METHOD_REFERENCE_TYPE_ARGUMENT}.
     * @param argIndex
     * the type argument index.
     *
     * @return a reference to the type of the given type argument.
     */
    static newTypeArgumentReference(sort, argIndex) {
        return new TypeReference((sort << 24) | argIndex);
    }
    /**
     * Returns the sort of this type reference.
     *
     * @return {@link #CLASS_TYPE_PARAMETER CLASS_TYPE_PARAMETER},
     * {@link #METHOD_TYPE_PARAMETER METHOD_TYPE_PARAMETER},
     * {@link #CLASS_EXTENDS CLASS_EXTENDS},
     * {@link #CLASS_TYPE_PARAMETER_BOUND CLASS_TYPE_PARAMETER_BOUND},
     * {@link #METHOD_TYPE_PARAMETER_BOUND METHOD_TYPE_PARAMETER_BOUND},
     * {@link #FIELD FIELD}, {@link #METHOD_RETURN METHOD_RETURN},
     * {@link #METHOD_RECEIVER METHOD_RECEIVER},
     * {@link #METHOD_FORMAL_PARAMETER METHOD_FORMAL_PARAMETER},
     * {@link #THROWS THROWS}, {@link #LOCAL_VARIABLE LOCAL_VARIABLE},
     * {@link #RESOURCE_VARIABLE RESOURCE_VARIABLE},
     * {@link #EXCEPTION_PARAMETER EXCEPTION_PARAMETER},
     * {@link #INSTANCEOF INSTANCEOF}, {@link #NEW NEW},
     * {@link #CONSTRUCTOR_REFERENCE CONSTRUCTOR_REFERENCE},
     * {@link #METHOD_REFERENCE METHOD_REFERENCE}, {@link #CAST CAST},
     * {@link #CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT
     * CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT},
     * {@link #METHOD_INVOCATION_TYPE_ARGUMENT
     * METHOD_INVOCATION_TYPE_ARGUMENT},
     * {@link #CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT
     * CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT}, or
     * {@link #METHOD_REFERENCE_TYPE_ARGUMENT
     * METHOD_REFERENCE_TYPE_ARGUMENT}.
     */
    getSort() {
        return this.value >>> 24;
    }
    /**
     * Returns the index of the type parameter referenced by this type
     * reference. This method must only be used for type references whose sort
     * is {@link #CLASS_TYPE_PARAMETER CLASS_TYPE_PARAMETER},
     * {@link #METHOD_TYPE_PARAMETER METHOD_TYPE_PARAMETER},
     * {@link #CLASS_TYPE_PARAMETER_BOUND CLASS_TYPE_PARAMETER_BOUND} or
     * {@link #METHOD_TYPE_PARAMETER_BOUND METHOD_TYPE_PARAMETER_BOUND}.
     *
     * @return a type parameter index.
     */
    getTypeParameterIndex() {
        return (this.value & 16711680) >> 16;
    }
    /**
     * Returns the index of the type parameter bound, within the type parameter
     * {@link #getTypeParameterIndex}, referenced by this type reference. This
     * method must only be used for type references whose sort is
     * {@link #CLASS_TYPE_PARAMETER_BOUND CLASS_TYPE_PARAMETER_BOUND} or
     * {@link #METHOD_TYPE_PARAMETER_BOUND METHOD_TYPE_PARAMETER_BOUND}.
     *
     * @return a type parameter bound index.
     */
    getTypeParameterBoundIndex() {
        return (this.value & 65280) >> 8;
    }
    /**
     * Returns the index of the "super type" of a class that is referenced by
     * this type reference. This method must only be used for type references
     * whose sort is {@link #CLASS_EXTENDS CLASS_EXTENDS}.
     *
     * @return the index of an interface in the 'implements' clause of a class,
     * or -1 if this type reference references the type of the super
     * class.
     */
    getSuperTypeIndex() {
        return (((this.value & 16776960) >> 8) | 0);
    }
    /**
     * Returns the index of the formal parameter whose type is referenced by
     * this type reference. This method must only be used for type references
     * whose sort is {@link #METHOD_FORMAL_PARAMETER METHOD_FORMAL_PARAMETER}.
     *
     * @return a formal parameter index.
     */
    getFormalParameterIndex() {
        return (this.value & 16711680) >> 16;
    }
    /**
     * Returns the index of the exception, in a 'throws' clause of a method,
     * whose type is referenced by this type reference. This method must only be
     * used for type references whose sort is {@link #THROWS THROWS}.
     *
     * @return the index of an exception in the 'throws' clause of a method.
     */
    getExceptionIndex() {
        return (this.value & 16776960) >> 8;
    }
    /**
     * Returns the index of the try catch block (using the order in which they
     * are visited with visitTryCatchBlock), whose 'catch' type is referenced by
     * this type reference. This method must only be used for type references
     * whose sort is {@link #EXCEPTION_PARAMETER EXCEPTION_PARAMETER} .
     *
     * @return the index of an exception in the 'throws' clause of a method.
     */
    getTryCatchBlockIndex() {
        return (this.value & 16776960) >> 8;
    }
    /**
     * Returns the index of the type argument referenced by this type reference.
     * This method must only be used for type references whose sort is
     * {@link #CAST CAST}, {@link #CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT
     * CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT},
     * {@link #METHOD_INVOCATION_TYPE_ARGUMENT METHOD_INVOCATION_TYPE_ARGUMENT},
     * {@link #CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT
     * CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT}, or
     * {@link #METHOD_REFERENCE_TYPE_ARGUMENT METHOD_REFERENCE_TYPE_ARGUMENT}.
     *
     * @return a type parameter index.
     */
    getTypeArgumentIndex() {
        return this.value & 255;
    }
    /**
     * Returns the int encoded value of this type reference, suitable for use in
     * visit methods related to type annotations, like visitTypeAnnotation.
     *
     * @return the int encoded value of this type reference.
     */
    getValue() {
        return this.value;
    }
}
/**
 * The sort of type references that target a type parameter of a generic
 * class. See {@link #getSort getSort}.
 */
TypeReference.CLASS_TYPE_PARAMETER = 0;
/**
 * The sort of type references that target a type parameter of a generic
 * method. See {@link #getSort getSort}.
 */
TypeReference.METHOD_TYPE_PARAMETER = 1;
/**
 * The sort of type references that target the super class of a class or one
 * of the interfaces it implements. See {@link #getSort getSort}.
 */
TypeReference.CLASS_EXTENDS = 16;
/**
 * The sort of type references that target a bound of a type parameter of a
 * generic class. See {@link #getSort getSort}.
 */
TypeReference.CLASS_TYPE_PARAMETER_BOUND = 17;
/**
 * The sort of type references that target a bound of a type parameter of a
 * generic method. See {@link #getSort getSort}.
 */
TypeReference.METHOD_TYPE_PARAMETER_BOUND = 18;
/**
 * The sort of type references that target the type of a field. See
 * {@link #getSort getSort}.
 */
TypeReference.FIELD = 19;
/**
 * The sort of type references that target the return type of a method. See
 * {@link #getSort getSort}.
 */
TypeReference.METHOD_RETURN = 20;
/**
 * The sort of type references that target the receiver type of a method.
 * See {@link #getSort getSort}.
 */
TypeReference.METHOD_RECEIVER = 21;
/**
 * The sort of type references that target the type of a formal parameter of
 * a method. See {@link #getSort getSort}.
 */
TypeReference.METHOD_FORMAL_PARAMETER = 22;
/**
 * The sort of type references that target the type of an exception declared
 * in the throws clause of a method. See {@link #getSort getSort}.
 */
TypeReference.THROWS = 23;
/**
 * The sort of type references that target the type of a local variable in a
 * method. See {@link #getSort getSort}.
 */
TypeReference.LOCAL_VARIABLE = 64;
/**
 * The sort of type references that target the type of a resource variable
 * in a method. See {@link #getSort getSort}.
 */
TypeReference.RESOURCE_VARIABLE = 65;
/**
 * The sort of type references that target the type of the exception of a
 * 'catch' clause in a method. See {@link #getSort getSort}.
 */
TypeReference.EXCEPTION_PARAMETER = 66;
/**
 * The sort of type references that target the type declared in an
 * 'instanceof' instruction. See {@link #getSort getSort}.
 */
TypeReference.INSTANCEOF = 67;
/**
 * The sort of type references that target the type of the object created by
 * a 'new' instruction. See {@link #getSort getSort}.
 */
TypeReference.NEW = 68;
/**
 * The sort of type references that target the receiver type of a
 * constructor reference. See {@link #getSort getSort}.
 */
TypeReference.CONSTRUCTOR_REFERENCE = 69;
/**
 * The sort of type references that target the receiver type of a method
 * reference. See {@link #getSort getSort}.
 */
TypeReference.METHOD_REFERENCE = 70;
/**
 * The sort of type references that target the type declared in an explicit
 * or implicit cast instruction. See {@link #getSort getSort}.
 */
TypeReference.CAST = 71;
/**
 * The sort of type references that target a type parameter of a generic
 * constructor in a constructor call. See {@link #getSort getSort}.
 */
TypeReference.CONSTRUCTOR_INVOCATION_TYPE_ARGUMENT = 72;
/**
 * The sort of type references that target a type parameter of a generic
 * method in a method call. See {@link #getSort getSort}.
 */
TypeReference.METHOD_INVOCATION_TYPE_ARGUMENT = 73;
/**
 * The sort of type references that target a type parameter of a generic
 * constructor in a constructor reference. See {@link #getSort getSort}.
 */
TypeReference.CONSTRUCTOR_REFERENCE_TYPE_ARGUMENT = 74;
/**
 * The sort of type references that target a type parameter of a generic
 * method in a method reference. See {@link #getSort getSort}.
 */
TypeReference.METHOD_REFERENCE_TYPE_ARGUMENT = 75;
exports.TypeReference = TypeReference;
TypeReference["__class"] = "TypeReference";
