/// <reference types="node" />
/// <reference types="long" />
import { Attribute } from './Attribute';
import { ClassVisitor } from './ClassVisitor';
import { Label } from './Label';
import * as Long from 'long';
export declare class ClassReader {
    /**
    * True to enable signatures support.
    */
    static SIGNATURES: boolean;
    /**
     * True to enable annotations support.
     */
    static ANNOTATIONS: boolean;
    /**
     * True to enable stack map frames support.
     */
    static FRAMES: boolean;
    /**
     * True to enable bytecode writing support.
     */
    static WRITER: boolean;
    /**
     * True to enable JSR_W and GOTO_W support.
     */
    static RESIZE: boolean;
    /**
     * Flag to skip method code. If this class is set <code>CODE</code>
     * attribute won't be visited. This can be used, for example, to retrieve
     * annotations for methods and method parameters.
     */
    static SKIP_CODE: number;
    /**
     * Flag to skip the debug information in the class. If this flag is set the
     * debug information of the class is not visited, i.e. the
     * {@link MethodVisitor#visitLocalVariable visitLocalVariable} and
     * {@link MethodVisitor#visitLineNumber visitLineNumber} methods will not be
     * called.
     */
    static SKIP_DEBUG: number;
    /**
     * Flag to skip the stack map frames in the class. If this flag is set the
     * stack map frames of the class is not visited, i.e. the
     * {@link MethodVisitor#visitFrame visitFrame} method will not be called.
     * This flag is useful when the {@link ClassWriter#COMPUTE_FRAMES} option is
     * used: it avoids visiting frames that will be ignored and recomputed from
     * scratch in the class writer.
     */
    static SKIP_FRAMES: number;
    /**
     * Flag to expand the stack map frames. By default stack map frames are
     * visited in their original format (i.e. "expanded" for classes whose
     * version is less than V1_6, and "compressed" for the other classes). If
     * this flag is set, stack map frames are always visited in expanded format
     * (this option adds a decompression/recompression step in ClassReader and
     * ClassWriter which degrades performances quite a lot).
     */
    static EXPAND_FRAMES: number;
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
    static EXPAND_ASM_INSNS: number;
    /**
     * The class to be parsed. <i>The content of this array must not be
     * modified. This field is intended for {@link Attribute} sub classes, and
     * is normally not needed by class generators or adapters.</i>
     */
    buf: Buffer;
    /**
     * The start index of each constant pool item in {@link #b b}, plus one. The
     * one byte offset skips the constant pool item tag that indicates its type.
     */
    private items;
    /**
     * The String objects corresponding to the CONSTANT_Utf8 items. This cache
     * avoids multiple parsing of a given CONSTANT_Utf8 constant pool item,
     * which GREATLY improves performances (by a factor 2 to 3). This caching
     * strategy could be extended to all constant pool items, but its benefit
     * would not be so great for these items (because they are much less
     * expensive to parse than CONSTANT_Utf8 items).
     */
    private strings;
    /**
     * Maximum length of the strings contained in the constant pool of the
     * class.
     */
    private maxStringLength;
    /**
     * Start index of the class header information (access, name...) in
     * {@link #b b}.
     */
    header: number;
    /**
     * Constructs a new {@link ClassReader} object.
     *
     * @param b   the bytecode of the class to be read.
     * @param off the start offset of the class data.
     * @param len the length of the class data.
     */
    constructor(buffer: Buffer, off?: number, len?: number);
    /**
     * Returns the class's access flags (see {@link Opcodes}). This value may
     * not reflect Deprecated and Synthetic flags when bytecode is before 1.5
     * and those flags are represented by attributes.
     *
     * @return the class access flags
     * @see ClassVisitor#visit(int, int, String, String, String, String[])
     */
    getAccess(): number;
    /**
     * Returns the internal name of the class (see
     * {@link Type#getInternalName() getInternalName}).
     *
     * @return the internal class name
     * @see ClassVisitor#visit(int, int, String, String, String, String[])
     */
    getClassName(): string;
    /**
     * Returns the internal of name of the super class (see
     * {@link Type#getInternalName() getInternalName}). For interfaces, the
     * super class is {@link Object}.
     *
     * @return the internal name of super class, or <tt>null</tt> for
     * {@link Object} class.
     * @see ClassVisitor#visit(int, int, String, String, String, String[])
     */
    getSuperName(): string;
    /**
     * Returns the internal names of the class's interfaces (see
     * {@link Type#getInternalName() getInternalName}).
     *
     * @return the array of internal names for all implemented interfaces or
     * <tt>null</tt>.
     * @see ClassVisitor#visit(int, int, String, String, String, String[])
     */
    getInterfaces(): string[];
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
    accept(classVisitor: ClassVisitor, attrs?: Attribute[], flags?: number): void;
    /**
     * Reads a field and makes the given visitor visit it.
     *
     * @param classVisitor the visitor that must visit the field.
     * @param context      information about the class being parsed.
     * @param u            the start offset of the field in the class file.
     * @return the offset of the first byte following the field in the class.
     */
    private readField(classVisitor, context, u);
    /**
     * Reads a method and makes the given visitor visit it.
     *
     * @param classVisitor the visitor that must visit the method.
     * @param context      information about the class being parsed.
     * @param u            the start offset of the method in the class file.
     * @return the offset of the first byte following the method in the class.
     */
    private readMethod(classVisitor, context, u);
    /**
     * Reads the bytecode of a method and makes the given visitor visit it.
     *
     * @param mv      the visitor that must visit the method's code.
     * @param context information about the class being parsed.
     * @param u       the start offset of the code attribute in the class file.
     */
    private readCode(mv, context, u);
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
    private readTypeAnnotations(mv, context, u, visible);
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
    private readAnnotationTarget(context, u);
    /**
     * Reads parameter annotations and makes the given visitor visit them.
     *
     * @param mv      the visitor that must visit the annotations.
     * @param context information about the class being parsed.
     * @param v       start offset in {@link #b b} of the annotations to be read.
     * @param visible <tt>true</tt> if the annotations to be read are visible at
     * runtime.
     */
    private readParameterAnnotations(mv, context, v, visible);
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
    private readAnnotationValues(v, buf, named, av);
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
    private readAnnotationValue(v, buf, name, av);
    /**
     * Computes the implicit frame of the method currently being parsed (as
     * defined in the given {@link Context}) and stores it in the given context.
     *
     * @param frame information about the class being parsed.
     */
    private getImplicitFrame(frame);
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
    private readFrame(stackMap, zip, unzip, frame);
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
    private readFrameType(frame, index, v, buf, labels);
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
    readLabel(offset: number, labels: Label[]): Label;
    /**
     * Returns the start index of the attribute_info structure of this class.
     *
     * @return the start index of the attribute_info structure of this class.
     */
    private getAttributes();
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
    private readAttribute(attrs, type, off, len, buf, codeOff, labels);
    /**
     * Returns the number of constant pool items in {@link #b b}.
     *
     * @return the number of constant pool items in {@link #b b}.
     */
    getItemCount(): number;
    /**
     * Returns the start index of the constant pool item in {@link #b b}, plus
     * one. <i>This method is intended for {@link Attribute} sub classes, and is
     * normally not needed by class generators or adapters.</i>
     *
     * @param item the index a constant pool item.
     * @return the start index of the constant pool item in {@link #b b}, plus
     * one.
     */
    getItem(item: number): number;
    /**
     * Returns the maximum length of the strings contained in the constant pool
     * of the class.
     *
     * @return the maximum length of the strings contained in the constant pool
     * of the class.
     */
    getMaxStringLength(): number;
    /**
     * Reads a byte value in {@link #b b}. <i>This method is intended for
     * {@link Attribute} sub classes, and is normally not needed by class
     * generators or adapters.</i>
     *
     * @param index the start index of the value to be read in {@link #b b}.
     * @return the read value.
     */
    readByte(index: number): number;
    /**
     * Reads an unsigned short value in {@link #b b}. <i>This method is intended
     * for {@link Attribute} sub classes, and is normally not needed by class
     * generators or adapters.</i>
     *
     * @param index the start index of the value to be read in {@link #b b}.
     * @return the read value.
     */
    readUnsignedShort(index: number): number;
    /**
     * Reads a signed short value in {@link #b b}. <i>This method is intended
     * for {@link Attribute} sub classes, and is normally not needed by class
     * generators or adapters.</i>
     *
     * @param index the start index of the value to be read in {@link #b b}.
     * @return the read value.
     */
    readShort(index: number): number;
    /**
     * Reads a signed int value in {@link #b b}. <i>This method is intended for
     * {@link Attribute} sub classes, and is normally not needed by class
     * generators or adapters.</i>
     *
     * @param index the start index of the value to be read in {@link #b b}.
     * @return the read value.
     */
    readInt(index: number): number;
    /**
     * Reads a signed long value in {@link #b b}. <i>This method is intended for
     * {@link Attribute} sub classes, and is normally not needed by class
     * generators or adapters.</i>
     *
     * @param index the start index of the value to be read in {@link #b b}.
     * @return the read value.
     */
    readLong(index: number): Long;
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
    readUTF8(index: number, buf: number[]): string;
    /**
     * Reads UTF8 string in {@link #b b}.
     *
     * @param index  start offset of the UTF8 string to be read.
     * @param utfLen length of the UTF8 string to be read.
     * @param buf    buffer to be used to read the string. This buffer must be
     * sufficiently large. It is not automatically resized.
     * @return the String corresponding to the specified UTF8 string.
     */
    private readUTF(index, utfLen, buf);
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
    readClass(index: number, buf: number[]): string;
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
    readConst(item: number, buf: number[]): any;
}
