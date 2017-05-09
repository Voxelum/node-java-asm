/// <reference types="long" />
import * as Long from 'long';
export declare class Item {
    /**
     * Index of this item in the constant pool.
     */
    index: number;
    /**
     * Type of this constant pool item. A single class is used to represent all
     * constant pool item types, in order to minimize the bytecode size of this
     * package. The value of this field is one of {@link ClassWriter#INT},
     * {@link ClassWriter#LONG}, {@link ClassWriter#FLOAT},
     * {@link ClassWriter#DOUBLE}, {@link ClassWriter#UTF8},
     * {@link ClassWriter#STR}, {@link ClassWriter#CLASS},
     * {@link ClassWriter#NAME_TYPE}, {@link ClassWriter#FIELD},
     * {@link ClassWriter#METH}, {@link ClassWriter#IMETH},
     * {@link ClassWriter#MTYPE}, {@link ClassWriter#INDY}.
     *
     * MethodHandle constant 9 variations are stored using a range of 9 values
     * from {@link ClassWriter#HANDLE_BASE} + 1 to
     * {@link ClassWriter#HANDLE_BASE} + 9.
     *
     * Special Item types are used for Items that are stored in the ClassWriter
     * {@link ClassWriter#typeTable}, instead of the constant pool, in order to
     * avoid clashes with normal constant pool items in the ClassWriter constant
     * pool's hash table. These special item types are
     * {@link ClassWriter#TYPE_NORMAL}, {@link ClassWriter#TYPE_UNINIT} and
     * {@link ClassWriter#TYPE_MERGED}.
     */
    type: number;
    /**
     * Value of this item, for an integer item.
     */
    intVal: number;
    /**
     * Value of this item, for a long item.
     */
    longVal: Long;
    /**
     * First part of the value of this item, for items that do not hold a
     * primitive value.
     */
    strVal1: string;
    /**
     * Second part of the value of this item, for items that do not hold a
     * primitive value.
     */
    strVal2: string;
    /**
     * Third part of the value of this item, for items that do not hold a
     * primitive value.
     */
    strVal3: string;
    /**
     * The hash code value of this constant pool item.
     */
    __hashCode: number;
    /**
     * Link to another constant pool item, used for collision lists in the
     * constant pool's hash table.
     */
    next: Item;
    /**
     * Constructs a copy of the given item.
     *
     * @param index
     * index of the item to be constructed.
     * @param i
     * the item that must be copied into the item to be constructed.
     */
    constructor(index: number, i?: Item);
    /**
     * Sets this item to an integer item.
     *
     * @param intVal
     * the value of this item.
     */
    set$int(intVal: number): void;
    /**
     * Sets this item to a long item.
     *
     * @param longVal
     * the value of this item.
     */
    set$long(longVal: Long): void;
    /**
     * Sets this item to a float item.
     *
     * @param floatVal
     * the value of this item.
     */
    set$float(floatVal: number): void;
    /**
     * Sets this item to a double item.
     *
     * @param doubleVal
     * the value of this item.
     */
    set$double(doubleVal: number): void;
    /**
     * Sets this item to an item that do not hold a primitive value.
     *
     * @param type
     * the type of this item.
     * @param strVal1
     * first part of the value of this item.
     * @param strVal2
     * second part of the value of this item.
     * @param strVal3
     * third part of the value of this item.
     */
    set(type?: number, strVal1?: string, strVal2?: string, strVal3?: string): any;
    /**
     * Sets the item to an InvokeDynamic item.
     *
     * @param name
     * invokedynamic's name.
     * @param desc
     * invokedynamic's desc.
     * @param bsmIndex
     * zero based index into the class attribute BootrapMethods.
     */
    set$java_lang_String$java_lang_String$int(name: string, desc: string, bsmIndex: number): void;
    /**
     * Sets the item to a BootstrapMethod item.
     *
     * @param position
     * position in byte in the class attribute BootrapMethods.
     * @param hashCode
     * hashcode of the item. This hashcode is processed from the
     * hashcode of the bootstrap method and the hashcode of all
     * bootstrap arguments.
     */
    set$int$int(position: number, hashCode: number): void;
    /**
     * Indicates if the given item is equal to this one. <i>This method assumes
     * that the two items have the same {@link #type}</i>.
     *
     * @param i
     * the item to be compared to this one. Both items must have the
     * same {@link #type}.
     * @return <tt>true</tt> if the given item if equal to this one,
     * <tt>false</tt> otherwise.
     */
    isEqualTo(i: Item): boolean;
}
