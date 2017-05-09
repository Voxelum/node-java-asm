import { AnnotationVisitor } from './AnnotationVisitor';
import { Attribute } from './Attribute';
import { ByteVector } from './ByteVector';
import { ClassReader } from './ClassReader';
import { ClassVisitor } from './ClassVisitor';
import { FieldVisitor } from './FieldVisitor';
import { FieldWriter } from './FieldWriter';
import { Handle } from './Handle';
import { Item } from './Item';
import { MethodVisitor } from './MethodVisitor';
import { MethodWriter } from './MethodWriter';
import { TypePath } from './TypePath';
export declare class ClassWriter extends ClassVisitor {
    static __static_initialized: boolean;
    static __static_initialize(): void;
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
    static COMPUTE_MAXS: number;
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
    static COMPUTE_FRAMES: number;
    /**
     * Pseudo access flag to distinguish between the synthetic attribute and the
     * synthetic access flag.
     */
    static ACC_SYNTHETIC_ATTRIBUTE: number;
    /**
     * Factor to convert from ACC_SYNTHETIC_ATTRIBUTE to Opcode.ACC_SYNTHETIC.
     */
    static TO_ACC_SYNTHETIC: number;
    static TO_ACC_SYNTHETIC_$LI$(): number;
    /**
     * The type of instructions without any argument.
     */
    static NOARG_INSN: number;
    /**
     * The type of instructions with an signed byte argument.
     */
    static SBYTE_INSN: number;
    /**
     * The type of instructions with an signed short argument.
     */
    static SHORT_INSN: number;
    /**
     * The type of instructions with a local variable index argument.
     */
    static VAR_INSN: number;
    /**
     * The type of instructions with an implicit local variable index argument.
     */
    static IMPLVAR_INSN: number;
    /**
     * The type of instructions with a type descriptor argument.
     */
    static TYPE_INSN: number;
    /**
     * The type of field and method invocations instructions.
     */
    static FIELDORMETH_INSN: number;
    /**
     * The type of the INVOKEINTERFACE/INVOKEDYNAMIC instruction.
     */
    static ITFMETH_INSN: number;
    /**
     * The type of the INVOKEDYNAMIC instruction.
     */
    static INDYMETH_INSN: number;
    /**
     * The type of instructions with a 2 bytes bytecode offset label.
     */
    static LABEL_INSN: number;
    /**
     * The type of instructions with a 4 bytes bytecode offset label.
     */
    static LABELW_INSN: number;
    /**
     * The type of the LDC instruction.
     */
    static LDC_INSN: number;
    /**
     * The type of the LDC_W and LDC2_W instructions.
     */
    static LDCW_INSN: number;
    /**
     * The type of the IINC instruction.
     */
    static IINC_INSN: number;
    /**
     * The type of the TABLESWITCH instruction.
     */
    static TABL_INSN: number;
    /**
     * The type of the LOOKUPSWITCH instruction.
     */
    static LOOK_INSN: number;
    /**
     * The type of the MULTIANEWARRAY instruction.
     */
    static MANA_INSN: number;
    /**
     * The type of the WIDE instruction.
     */
    static WIDE_INSN: number;
    /**
     * The type of the ASM pseudo instructions with an unsigned 2 bytes offset
     * label (see Label#resolve).
     */
    static ASM_LABEL_INSN: number;
    /**
     * Represents a frame inserted between already existing frames. This kind of
     * frame can only be used if the frame content can be computed from the
     * previous existing frame and from the instructions between this existing
     * frame and the inserted one, without any knowledge of the type hierarchy.
     * This kind of frame is only used when an unconditional jump is inserted in
     * a method while expanding an ASM pseudo instruction (see ClassReader).
     */
    static F_INSERT: number;
    /**
     * The instruction types of all JVM opcodes.
     */
    static TYPE: number[];
    static TYPE_$LI$(): number[];
    /**
     * The type of CONSTANT_Class constant pool items.
     */
    static CLASS: number;
    /**
     * The type of CONSTANT_Fieldref constant pool items.
     */
    static FIELD: number;
    /**
     * The type of CONSTANT_Methodref constant pool items.
     */
    static METH: number;
    /**
     * The type of CONSTANT_InterfaceMethodref constant pool items.
     */
    static IMETH: number;
    /**
     * The type of CONSTANT_String constant pool items.
     */
    static STR: number;
    /**
     * The type of CONSTANT_Integer constant pool items.
     */
    static INT: number;
    /**
     * The type of CONSTANT_Float constant pool items.
     */
    static FLOAT: number;
    /**
     * The type of CONSTANT_Long constant pool items.
     */
    static LONG: number;
    /**
     * The type of CONSTANT_Double constant pool items.
     */
    static DOUBLE: number;
    /**
     * The type of CONSTANT_NameAndType constant pool items.
     */
    static NAME_TYPE: number;
    /**
     * The type of CONSTANT_Utf8 constant pool items.
     */
    static UTF8: number;
    /**
     * The type of CONSTANT_MethodType constant pool items.
     */
    static MTYPE: number;
    /**
     * The type of CONSTANT_MethodHandle constant pool items.
     */
    static HANDLE: number;
    /**
     * The type of CONSTANT_InvokeDynamic constant pool items.
     */
    static INDY: number;
    /**
     * The base value for all CONSTANT_MethodHandle constant pool items.
     * Internally, ASM store the 9 variations of CONSTANT_MethodHandle into 9
     * different items.
     */
    static HANDLE_BASE: number;
    /**
     * Normal type Item stored in the ClassWriter {@link ClassWriter#typeTable},
     * instead of the constant pool, in order to avoid clashes with normal
     * constant pool items in the ClassWriter constant pool's hash table.
     */
    static TYPE_NORMAL: number;
    /**
     * Uninitialized type Item stored in the ClassWriter
     * {@link ClassWriter#typeTable}, instead of the constant pool, in order to
     * avoid clashes with normal constant pool items in the ClassWriter constant
     * pool's hash table.
     */
    static TYPE_UNINIT: number;
    /**
     * Merged type Item stored in the ClassWriter {@link ClassWriter#typeTable},
     * instead of the constant pool, in order to avoid clashes with normal
     * constant pool items in the ClassWriter constant pool's hash table.
     */
    static TYPE_MERGED: number;
    /**
     * The type of BootstrapMethods items. These items are stored in a special
     * class attribute named BootstrapMethods and not in the constant pool.
     */
    static BSM: number;
    /**
     * The class reader from which this class writer was constructed, if any.
     */
    cr: ClassReader;
    /**
     * Minor and major version numbers of the class to be generated.
     */
    version: number;
    /**
     * Index of the next item to be added in the constant pool.
     */
    index: number;
    /**
     * The constant pool of this class.
     */
    pool: ByteVector;
    /**
     * The constant pool's hash table data.
     */
    items: Item[];
    /**
     * The threshold of the constant pool's hash table.
     */
    threshold: number;
    /**
     * A reusable key used to look for items in the {@link #items} hash table.
     */
    key: Item;
    /**
     * A reusable key used to look for items in the {@link #items} hash table.
     */
    key2: Item;
    /**
     * A reusable key used to look for items in the {@link #items} hash table.
     */
    key3: Item;
    /**
     * A reusable key used to look for items in the {@link #items} hash table.
     */
    key4: Item;
    /**
     * A type table used to temporarily store internal names that will not
     * necessarily be stored in the constant pool. This type table is used by
     * the control flow and data flow analysis algorithm used to compute stack
     * map frames from scratch. This array associates to each index <tt>i</tt>
     * the Item whose index is <tt>i</tt>. All Item objects stored in this array
     * are also stored in the {@link #items} hash table. These two arrays allow
     * to retrieve an Item from its index or, conversely, to get the index of an
     * Item from its value. Each Item stores an internal name in its
     * {@link Item#strVal1} field.
     */
    typeTable: Item[];
    /**
     * Number of elements in the {@link #typeTable} array.
     */
    private typeCount;
    /**
     * The access flags of this class.
     */
    private access;
    /**
     * The constant pool item that contains the internal name of this class.
     */
    private name;
    /**
     * The internal name of this class.
     */
    thisName: string;
    /**
     * The constant pool item that contains the signature of this class.
     */
    private signature;
    /**
     * The constant pool item that contains the internal name of the super class
     * of this class.
     */
    private superName;
    /**
     * Number of interfaces implemented or extended by this class or interface.
     */
    private interfaceCount;
    /**
     * The interfaces implemented or extended by this class or interface. More
     * precisely, this array contains the indexes of the constant pool items
     * that contain the internal names of these interfaces.
     */
    private interfaces;
    /**
     * The index of the constant pool item that contains the name of the source
     * file from which this class was compiled.
     */
    private sourceFile;
    /**
     * The SourceDebug attribute of this class.
     */
    private sourceDebug;
    /**
     * The constant pool item that contains the name of the enclosing class of
     * this class.
     */
    private enclosingMethodOwner;
    /**
     * The constant pool item that contains the name and descriptor of the
     * enclosing method of this class.
     */
    private enclosingMethod;
    /**
     * The runtime visible annotations of this class.
     */
    private anns;
    /**
     * The runtime invisible annotations of this class.
     */
    private ianns;
    /**
     * The runtime visible type annotations of this class.
     */
    private tanns;
    /**
     * The runtime invisible type annotations of this class.
     */
    private itanns;
    /**
     * The non standard attributes of this class.
     */
    private attrs;
    /**
     * The number of entries in the InnerClasses attribute.
     */
    private innerClassesCount;
    /**
     * The InnerClasses attribute.
     */
    private innerClasses;
    /**
     * The number of entries in the BootstrapMethods attribute.
     */
    bootstrapMethodsCount: number;
    /**
     * The BootstrapMethods attribute.
     */
    bootstrapMethods: ByteVector;
    /**
     * The fields of this class. These fields are stored in a linked list of
     * {@link FieldWriter} objects, linked to each other by their
     * {@link FieldWriter#fv} field. This field stores the first element of this
     * list.
     */
    firstField: FieldWriter;
    /**
     * The fields of this class. These fields are stored in a linked list of
     * {@link FieldWriter} objects, linked to each other by their
     * {@link FieldWriter#fv} field. This field stores the last element of this
     * list.
     */
    lastField: FieldWriter;
    /**
     * The methods of this class. These methods are stored in a linked list of
     * {@link MethodWriter} objects, linked to each other by their
     * {@link MethodWriter#mv} field. This field stores the first element of
     * this list.
     */
    firstMethod: MethodWriter;
    /**
     * The methods of this class. These methods are stored in a linked list of
     * {@link MethodWriter} objects, linked to each other by their
     * {@link MethodWriter#mv} field. This field stores the last element of this
     * list.
     */
    lastMethod: MethodWriter;
    /**
     * Indicates what must be automatically computed.
     *
     * @see MethodWriter#compute
     */
    private compute;
    /**
     * <tt>true</tt> if some methods have wide forward jumps using ASM pseudo
     * instructions, which need to be expanded into sequences of standard
     * bytecode instructions. In this case the class is re-read and re-written
     * with a ClassReader -> ClassWriter chain to perform this transformation.
     */
    hasAsmInsns: boolean;
    static __static_initializer_0(): void;
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
    constructor(classReader?: any, flags?: any);
    visit(version: number, access: number, name: string, signature: string, superName: string, interfaces: string[]): void;
    visitSource(file: string, debug: string): void;
    visitOuterClass(owner: string, name: string, desc: string): void;
    visitAnnotation(desc: string, visible: boolean): AnnotationVisitor;
    visitTypeAnnotation(typeRef: number, typePath: TypePath, desc: string, visible: boolean): AnnotationVisitor;
    visitAttribute(attr: Attribute): void;
    visitInnerClass(name: string, outerName: string, innerName: string, access: number): void;
    visitField(access: number, name: string, desc: string, signature: string, value: any): FieldVisitor;
    visitMethod(access: number, name: string, desc: string, signature: string, exceptions: string[]): MethodVisitor;
    visitEnd(): void;
    /**
     * Returns the bytecode of the class that was build with this class writer.
     *
     * @return the bytecode of the class that was build with this class writer.
     */
    toByteArray(): number[];
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
    newConstItem(cst: any): Item;
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
    newConst(cst: any): number;
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
    newUTF8(value: string): number;
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
    newClassItem(value: string): Item;
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
    newClass(value: string): number;
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
    newMethodTypeItem(methodDesc: string): Item;
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
    newMethodType(methodDesc: string): number;
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
    newHandleItem(tag: number, owner: string, name: string, desc: string, itf: boolean): Item;
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
    newHandle$int$java_lang_String$java_lang_String$java_lang_String(tag: number, owner: string, name: string, desc: string): number;
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
    newHandle(tag?: any, owner?: any, name?: any, desc?: any, itf?: any): any;
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
    newInvokeDynamicItem(name: string, desc: string, bsm: Handle, ...bsmArgs: any[]): Item;
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
    newInvokeDynamic(name: string, desc: string, bsm: Handle, ...bsmArgs: any[]): number;
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
    newFieldItem(owner: string, name: string, desc: string): Item;
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
    newField(owner: string, name: string, desc: string): number;
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
    newMethodItem(owner: string, name: string, desc: string, itf: boolean): Item;
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
    newMethod(owner: string, name: string, desc: string, itf: boolean): number;
    /**
     * Adds an integer to the constant pool of the class being build. Does
     * nothing if the constant pool already contains a similar item.
     *
     * @param value
     * the int value.
     * @return a new or already existing int item.
     */
    newInteger(value: number): Item;
    /**
     * Adds a float to the constant pool of the class being build. Does nothing
     * if the constant pool already contains a similar item.
     *
     * @param value
     * the float value.
     * @return a new or already existing float item.
     */
    newFloat(value: number): Item;
    /**
     * Adds a long to the constant pool of the class being build. Does nothing
     * if the constant pool already contains a similar item.
     *
     * @param value
     * the long value.
     * @return a new or already existing long item.
     */
    newLong(value: number): Item;
    /**
     * Adds a double to the constant pool of the class being build. Does nothing
     * if the constant pool already contains a similar item.
     *
     * @param value
     * the double value.
     * @return a new or already existing double item.
     */
    newDouble(value: number): Item;
    /**
     * Adds a string to the constant pool of the class being build. Does nothing
     * if the constant pool already contains a similar item.
     *
     * @param value
     * the String value.
     * @return a new or already existing string item.
     */
    private newString(value);
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
    newNameType(name: string, desc: string): number;
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
    newNameTypeItem(name: string, desc: string): Item;
    /**
     * Adds the given internal name to {@link #typeTable} and returns its index.
     * Does nothing if the type table already contains this internal name.
     *
     * @param type
     * the internal name to be added to the type table.
     * @return the index of this internal name in the type table.
     */
    addType(type?: any): any;
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
    addUninitializedType(type: string, offset: number): number;
    /**
     * Adds the given Item to {@link #typeTable}.
     *
     * @param item
     * the value to be added to the type table.
     * @return the added Item, which a new Item instance with the same value as
     * the given Item.
     */
    private addType$Item(item);
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
    getMergedType(type1: number, type2: number): number;
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
    getCommonSuperClass(type1: string, type2: string): string;
    /**
     * Returns the constant pool's hash table item which is equal to the given
     * item.
     *
     * @param key
     * a constant pool item.
     * @return the constant pool's hash table item which is equal to the given
     * item, or <tt>null</tt> if there is no such item.
     */
    private get(key);
    /**
     * Puts the given item in the constant pool's hash table. The hash table
     * <i>must</i> not already contains this item.
     *
     * @param i
     * the item to be added to the constant pool's hash table.
     */
    private put(i);
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
    private put122(b, s1, s2);
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
    private put112(b1, b2, s);
}
