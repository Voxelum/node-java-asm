"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * A constant pool item. Constant pool items can be created with the 'newXXX'
 * methods in the {@link ClassWriter} class.
 *
 * @author Eric Bruneton
 */
const ClassWriter_1 = require("./ClassWriter");
const WriterConstant_1 = require("./WriterConstant");
const bits_1 = require("./bits");
const Long = require("long");
class Item {
    /**
     * Constructs a copy of the given item.
     *
     * @param index
     * index of the item to be constructed.
     * @param i
     * the item that must be copied into the item to be constructed.
     */
    constructor(index, i) {
        this.index = index;
        if (i) {
            this.index = index;
            this.type = i.type;
            this.intVal = i.intVal;
            this.longVal = i.longVal;
            this.strVal1 = i.strVal1;
            this.strVal2 = i.strVal2;
            this.strVal3 = i.strVal3;
            this.__hashCode = i.__hashCode;
        }
    }
    /**
     * Sets this item to an integer item.
     *
     * @param intVal
     * the value of this item.
     */
    set$int(intVal) {
        this.type = ClassWriter_1.ClassWriter.INT;
        this.intVal = intVal;
        this.__hashCode = 2147483647 & (this.type + intVal);
    }
    /**
     * Sets this item to a long item.
     *
     * @param longVal
     * the value of this item.
     */
    set$long(longVal) {
        this.type = ClassWriter_1.ClassWriter.LONG;
        this.longVal = longVal;
        this.__hashCode = 2147483647 & (this.type + (longVal.getLowBits()));
    }
    /**
     * Sets this item to a float item.
     *
     * @param floatVal
     * the value of this item.
     */
    set$float(floatVal) {
        this.type = ClassWriter_1.ClassWriter.FLOAT;
        this.intVal = bits_1.floatToIntBits(floatVal);
        this.__hashCode = 2147483647 & (this.type + (floatVal | 0));
    }
    /**
     * Sets this item to a double item.
     *
     * @param doubleVal
     * the value of this item.
     */
    set$double(doubleVal) {
        this.type = ClassWriter_1.ClassWriter.DOUBLE;
        this.longVal = bits_1.doubleToLongBits(doubleVal);
        this.__hashCode = 2147483647 & (this.type + (doubleVal | 0));
    }
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
    set(type, strVal1, strVal2, strVal3) {
        this.type = type;
        this.strVal1 = strVal1;
        this.strVal2 = strVal2;
        this.strVal3 = strVal3;
        switch (type) {
            case WriterConstant_1.WriterConstant.CLASS:
                this.intVal = 0; // intVal of a class must be zero, see visitInnerClass
            case WriterConstant_1.WriterConstant.UTF8:
            case WriterConstant_1.WriterConstant.STR:
            case WriterConstant_1.WriterConstant.MTYPE:
            case WriterConstant_1.WriterConstant.TYPE_NORMAL:
                this.__hashCode = 0x7FFFFFFF & (type + str_hash(strVal1));
                return;
            case WriterConstant_1.WriterConstant.NAME_TYPE: {
                this.__hashCode = 0x7FFFFFFF & (type + str_hash(strVal1)
                    * str_hash(strVal2));
                return;
            }
            // ClassWriter.FIELD:
            // ClassWriter.METH:
            // ClassWriter.IMETH:
            // ClassWriter.HANDLE_BASE + 1..9
            default:
                this.__hashCode = 0x7FFFFFFF & (type + str_hash(strVal1)
                    * str_hash(strVal2) * str_hash(strVal3));
        }
    }
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
    set$java_lang_String$java_lang_String$int(name, desc, bsmIndex) {
        this.type = ClassWriter_1.ClassWriter.INDY;
        this.longVal = Long.fromInt(bsmIndex);
        this.strVal1 = name;
        this.strVal2 = desc;
        this.__hashCode = 2147483647 & (ClassWriter_1.ClassWriter.INDY + bsmIndex * this.strVal1.toString() * this.strVal2.toString());
    }
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
    set$int$int(position, hashCode) {
        this.type = ClassWriter_1.ClassWriter.BSM;
        this.intVal = position;
        this.__hashCode = hashCode;
    }
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
    isEqualTo(i) {
        switch ((this.type)) {
            case ClassWriter_1.ClassWriter.UTF8:
            case ClassWriter_1.ClassWriter.STR:
            case ClassWriter_1.ClassWriter.CLASS:
            case ClassWriter_1.ClassWriter.MTYPE:
            case ClassWriter_1.ClassWriter.TYPE_NORMAL:
                return (i.strVal1 === this.strVal1);
            case ClassWriter_1.ClassWriter.TYPE_MERGED:
            case ClassWriter_1.ClassWriter.LONG:
            case ClassWriter_1.ClassWriter.DOUBLE:
                return i.longVal === this.longVal;
            case ClassWriter_1.ClassWriter.INT:
            case ClassWriter_1.ClassWriter.FLOAT:
                return i.intVal === this.intVal;
            case ClassWriter_1.ClassWriter.TYPE_UNINIT:
                return i.intVal === this.intVal && (i.strVal1 === this.strVal1);
            case ClassWriter_1.ClassWriter.NAME_TYPE:
                return (i.strVal1 === this.strVal1) && (i.strVal2 === this.strVal2);
            case ClassWriter_1.ClassWriter.INDY:
                {
                    return i.longVal === this.longVal && (i.strVal1 === this.strVal1) && (i.strVal2 === this.strVal2);
                }
                ;
            default:
                return (i.strVal1 === this.strVal1) && (i.strVal2 === this.strVal2) && (i.strVal3 === this.strVal3);
        }
    }
}
exports.Item = Item;
Item["__class"] = "Item";
function str_hash(str) {
    var hash = 0;
    if (str.length == 0)
        return hash;
    for (let i = 0; i < str.length; i++) {
        let char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
String.prototype['hashCode'] = function () {
    var hash = 0;
    if (this.length == 0)
        return hash;
    for (let i = 0; i < this.length; i++) {
        let char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};
