export declare class WriterConstant {
    /**
     * The instruction types of all JVM opcodes.
     */
    static TYPE: number[];
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
    static readonly COMPUTE_MAXS: number;
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
    static readonly COMPUTE_FRAMES: number;
    /**
     * Pseudo access flag to distinguish between the synthetic attribute and the
     * synthetic access flag.
     */
    static readonly ACC_SYNTHETIC_ATTRIBUTE: number;
    /**
     * Factor to convert from ACC_SYNTHETIC_ATTRIBUTE to Opcode.ACC_SYNTHETIC.
     */
    static readonly TO_ACC_SYNTHETIC: number;
    /**
     * The type of CONSTANT_Fieldref constant pool items.
     */
    static readonly FIELD: number;
    /**
     * The type of CONSTANT_Methodref constant pool items.
     */
    static readonly METH: number;
    /**
     * The type of CONSTANT_InterfaceMethodref constant pool items.
     */
    static readonly IMETH: number;
    /**
     * The type of CONSTANT_String constant pool items.
     */
    static readonly STR: number;
    /**
     * The type of CONSTANT_Integer constant pool items.
     */
    static readonly INT: number;
    /**
     * The type of CONSTANT_Float constant pool items.
     */
    static readonly FLOAT: number;
    /**
     * The type of CONSTANT_Long constant pool items.
     */
    static readonly LONG: number;
    /**
     * The type of CONSTANT_Double constant pool items.
     */
    static readonly DOUBLE: number;
    /**
     * The type of CONSTANT_NameAndType constant pool items.
     */
    static readonly NAME_TYPE: number;
    /**
     * The type of CONSTANT_Utf8 constant pool items.
     */
    static readonly UTF8: number;
    /**
     * The type of CONSTANT_MethodType constant pool items.
     */
    static readonly MTYPE: number;
    /**
     * The type of CONSTANT_MethodHandle constant pool items.
     */
    static readonly HANDLE: number;
    /**
     * The type of CONSTANT_InvokeDynamic constant pool items.
     */
    static readonly INDY: number;
    /**
     * The base value for all CONSTANT_MethodHandle constant pool items.
     * Internally, ASM store the 9 variations of CONSTANT_MethodHandle into 9
     * different items.
     */
    static readonly HANDLE_BASE: number;
    /**
     * Normal type Item stored in the ClassWriter {@link ClassWriter#typeTable},
     * instead of the constant pool, in order to avoid clashes with normal
     * constant pool items in the ClassWriter constant pool's hash table.
     */
    static readonly TYPE_NORMAL: number;
    /**
     * Uninitialized type Item stored in the ClassWriter
     * {@link ClassWriter#typeTable}, instead of the constant pool, in order to
     * avoid clashes with normal constant pool items in the ClassWriter constant
     * pool's hash table.
     */
    static readonly TYPE_UNINIT: number;
    /**
     * Merged type Item stored in the ClassWriter {@link ClassWriter#typeTable},
     * instead of the constant pool, in order to avoid clashes with normal
     * constant pool items in the ClassWriter constant pool's hash table.
     */
    static readonly TYPE_MERGED: number;
    /**
     * The type of BootstrapMethods items. These items are stored in a special
     * class attribute named BootstrapMethods and not in the constant pool.
     */
    static readonly BSM: number;
    /**
     * The type of CONSTANT_Class constant pool items.
     */
    static readonly CLASS: number;
    /**
     * The type of instructions with a 2 bytes bytecode offset label.
     */
    static readonly LABEL_INSN: number;
    /**
     * The type of instructions with a 4 bytes bytecode offset label.
     */
    static readonly LABELW_INSN: number;
    /**
     * The type of the LDC instruction.
     */
    static readonly LDC_INSN: number;
    /**
     * The type of the LDC_W and LDC2_W instructions.
     */
    static readonly LDCW_INSN: number;
    /**
     * The type of the IINC instruction.
     */
    static readonly IINC_INSN: number;
    /**
     * The type of the TABLESWITCH instruction.
     */
    static readonly TABL_INSN: number;
    /**
     * The type of the LOOKUPSWITCH instruction.
     */
    static readonly LOOK_INSN: number;
    /**
     * The type of the MULTIANEWARRAY instruction.
     */
    static readonly MANA_INSN: number;
    /**
     * The type of the WIDE instruction.
     */
    static readonly WIDE_INSN: number;
    /**
     * The type of the ASM pseudo instructions with an unsigned 2 bytes offset
     * label (see Label#resolve).
     */
    static readonly ASM_LABEL_INSN: number;
    /**
     * Represents a frame inserted between already existing frames. This kind of
     * frame can only be used if the frame content can be computed from the
     * previous existing frame and from the instructions between this existing
     * frame and the inserted one, without any knowledge of the type hierarchy.
     * This kind of frame is only used when an unconditional jump is inserted in
     * a method while expanding an ASM pseudo instruction (see ClassReader).
     */
    static readonly F_INSERT: number;
    /**
     * The type of instructions without any argument.
     */
    static readonly NOARG_INSN: number;
    /**
     * The type of instructions with an signed byte argument.
     */
    static readonly SBYTE_INSN: number;
    /**
     * The type of instructions with an signed short argument.
     */
    static readonly SHORT_INSN: number;
    /**
     * The type of instructions with a local variable index argument.
     */
    static readonly VAR_INSN: number;
    /**
     * The type of instructions with an implicit local variable index argument.
     */
    static readonly IMPLVAR_INSN: number;
    /**
     * The type of instructions with a type descriptor argument.
     */
    static readonly TYPE_INSN: number;
    /**
     * The type of field and method invocations instructions.
     */
    static readonly FIELDORMETH_INSN: number;
    /**
     * The type of the INVOKEINTERFACE/INVOKEDYNAMIC instruction.
     */
    static readonly ITFMETH_INSN: number;
    /**
     * The type of the INVOKEDYNAMIC instruction.
     */
    static readonly INDYMETH_INSN: number;
}
