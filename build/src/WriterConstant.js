"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Opcodes_1 = require("./Opcodes");
class WriterConstant {
}
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
WriterConstant.COMPUTE_MAXS = 1;
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
WriterConstant.COMPUTE_FRAMES = 2;
/**
 * Pseudo access flag to distinguish between the synthetic attribute and the
 * synthetic access flag.
 */
WriterConstant.ACC_SYNTHETIC_ATTRIBUTE = 262144;
/**
 * Factor to convert from ACC_SYNTHETIC_ATTRIBUTE to Opcode.ACC_SYNTHETIC.
 */
WriterConstant.TO_ACC_SYNTHETIC = WriterConstant.ACC_SYNTHETIC_ATTRIBUTE / Opcodes_1.Opcodes.ACC_SYNTHETIC;
/**
 * The type of CONSTANT_Fieldref constant pool items.
 */
WriterConstant.FIELD = 9;
/**
 * The type of CONSTANT_Methodref constant pool items.
 */
WriterConstant.METH = 10;
/**
 * The type of CONSTANT_InterfaceMethodref constant pool items.
 */
WriterConstant.IMETH = 11;
/**
 * The type of CONSTANT_String constant pool items.
 */
WriterConstant.STR = 8;
/**
 * The type of CONSTANT_Integer constant pool items.
 */
WriterConstant.INT = 3;
/**
 * The type of CONSTANT_Float constant pool items.
 */
WriterConstant.FLOAT = 4;
/**
 * The type of CONSTANT_Long constant pool items.
 */
WriterConstant.LONG = 5;
/**
 * The type of CONSTANT_Double constant pool items.
 */
WriterConstant.DOUBLE = 6;
/**
 * The type of CONSTANT_NameAndType constant pool items.
 */
WriterConstant.NAME_TYPE = 12;
/**
 * The type of CONSTANT_Utf8 constant pool items.
 */
WriterConstant.UTF8 = 1;
/**
 * The type of CONSTANT_MethodType constant pool items.
 */
WriterConstant.MTYPE = 16;
/**
 * The type of CONSTANT_MethodHandle constant pool items.
 */
WriterConstant.HANDLE = 15;
/**
 * The type of CONSTANT_InvokeDynamic constant pool items.
 */
WriterConstant.INDY = 18;
/**
 * The base value for all CONSTANT_MethodHandle constant pool items.
 * Internally, ASM store the 9 variations of CONSTANT_MethodHandle into 9
 * different items.
 */
WriterConstant.HANDLE_BASE = 20;
/**
 * Normal type Item stored in the ClassWriter {@link ClassWriter#typeTable},
 * instead of the constant pool, in order to avoid clashes with normal
 * constant pool items in the ClassWriter constant pool's hash table.
 */
WriterConstant.TYPE_NORMAL = 30;
/**
 * Uninitialized type Item stored in the ClassWriter
 * {@link ClassWriter#typeTable}, instead of the constant pool, in order to
 * avoid clashes with normal constant pool items in the ClassWriter constant
 * pool's hash table.
 */
WriterConstant.TYPE_UNINIT = 31;
/**
 * Merged type Item stored in the ClassWriter {@link ClassWriter#typeTable},
 * instead of the constant pool, in order to avoid clashes with normal
 * constant pool items in the ClassWriter constant pool's hash table.
 */
WriterConstant.TYPE_MERGED = 32;
/**
 * The type of BootstrapMethods items. These items are stored in a special
 * class attribute named BootstrapMethods and not in the constant pool.
 */
WriterConstant.BSM = 33;
/**
 * The type of CONSTANT_Class constant pool items.
 */
WriterConstant.CLASS = 7;
/**
 * The type of instructions with a 2 bytes bytecode offset label.
 */
WriterConstant.LABEL_INSN = 9;
/**
 * The type of instructions with a 4 bytes bytecode offset label.
 */
WriterConstant.LABELW_INSN = 10;
/**
 * The type of the LDC instruction.
 */
WriterConstant.LDC_INSN = 11;
/**
 * The type of the LDC_W and LDC2_W instructions.
 */
WriterConstant.LDCW_INSN = 12;
/**
 * The type of the IINC instruction.
 */
WriterConstant.IINC_INSN = 13;
/**
 * The type of the TABLESWITCH instruction.
 */
WriterConstant.TABL_INSN = 14;
/**
 * The type of the LOOKUPSWITCH instruction.
 */
WriterConstant.LOOK_INSN = 15;
/**
 * The type of the MULTIANEWARRAY instruction.
 */
WriterConstant.MANA_INSN = 16;
/**
 * The type of the WIDE instruction.
 */
WriterConstant.WIDE_INSN = 17;
/**
 * The type of the ASM pseudo instructions with an unsigned 2 bytes offset
 * label (see Label#resolve).
 */
WriterConstant.ASM_LABEL_INSN = 18;
/**
 * Represents a frame inserted between already existing frames. This kind of
 * frame can only be used if the frame content can be computed from the
 * previous existing frame and from the instructions between this existing
 * frame and the inserted one, without any knowledge of the type hierarchy.
 * This kind of frame is only used when an unconditional jump is inserted in
 * a method while expanding an ASM pseudo instruction (see ClassReader).
 */
WriterConstant.F_INSERT = 256;
/**
 * The type of instructions without any argument.
 */
WriterConstant.NOARG_INSN = 0;
/**
 * The type of instructions with an signed byte argument.
 */
WriterConstant.SBYTE_INSN = 1;
/**
 * The type of instructions with an signed short argument.
 */
WriterConstant.SHORT_INSN = 2;
/**
 * The type of instructions with a local variable index argument.
 */
WriterConstant.VAR_INSN = 3;
/**
 * The type of instructions with an implicit local variable index argument.
 */
WriterConstant.IMPLVAR_INSN = 4;
/**
 * The type of instructions with a type descriptor argument.
 */
WriterConstant.TYPE_INSN = 5;
/**
 * The type of field and method invocations instructions.
 */
WriterConstant.FIELDORMETH_INSN = 6;
/**
 * The type of the INVOKEINTERFACE/INVOKEDYNAMIC instruction.
 */
WriterConstant.ITFMETH_INSN = 7;
/**
 * The type of the INVOKEDYNAMIC instruction.
 */
WriterConstant.INDYMETH_INSN = 8;
exports.WriterConstant = WriterConstant;
WriterConstant["__class"] = "WriterConstant";
function init() {
    let i;
    let b = new Array(220);
    let s = "AAAAAAAAAAAAAAAABCLMMDDDDDEEEEEEEEEEEEEEEEEEEEAAAAAAAADDDDDEEEEEEEEEEEEEEEEEEEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANAAAAAAAAAAAAAAAAAAAAJJJJJJJJJJJJJJJJDOPAAAAAAGGGGGGGHIFBFAAFFAARQJJKKSSSSSSSSSSSSSSSSSS";
    for (i = 0; i < b.length; ++i)
        b[i] = s.charCodeAt(i) - ('A').charCodeAt(0);
    WriterConstant.TYPE = b;
}
init();
