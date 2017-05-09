/**
 * Defines the JVM opcodes, access flags and array type codes. This interface
 * does not define all the JVM opcodes because some opcodes are automatically
 * handled. For example, the xLOAD and xSTORE opcodes are automatically replaced
 * by xLOAD_n and xSTORE_n opcodes when possible. The xLOAD_n and xSTORE_n
 * opcodes are therefore not defined in this interface. Likewise for LDC,
 * automatically replaced by LDC_W or LDC2_W when necessary, WIDE, GOTO_W and
 * JSR_W.
 *
 * @author Eric Bruneton
 * @author Eugene Kuleshov
 */
export declare namespace Opcodes {
    const ASM4: number;
    const ASM5: number;
    const V1_1: number;
    const V1_2: number;
    const V1_3: number;
    const V1_4: number;
    const V1_5: number;
    const V1_6: number;
    const V1_7: number;
    const V1_8: number;
    const ACC_PUBLIC: number;
    const ACC_PRIVATE: number;
    const ACC_PROTECTED: number;
    const ACC_STATIC: number;
    const ACC_FINAL: number;
    const ACC_SUPER: number;
    const ACC_SYNCHRONIZED: number;
    const ACC_VOLATILE: number;
    const ACC_BRIDGE: number;
    const ACC_VARARGS: number;
    const ACC_TRANSIENT: number;
    const ACC_NATIVE: number;
    const ACC_INTERFACE: number;
    const ACC_ABSTRACT: number;
    const ACC_STRICT: number;
    const ACC_SYNTHETIC: number;
    const ACC_ANNOTATION: number;
    const ACC_ENUM: number;
    const ACC_MANDATED: number;
    const ACC_DEPRECATED: number;
    const T_BOOLEAN: number;
    const T_CHAR: number;
    const T_FLOAT: number;
    const T_DOUBLE: number;
    const T_BYTE: number;
    const T_SHORT: number;
    const T_INT: number;
    const T_LONG: number;
    const H_GETFIELD: number;
    const H_GETSTATIC: number;
    const H_PUTFIELD: number;
    const H_PUTSTATIC: number;
    const H_INVOKEVIRTUAL: number;
    const H_INVOKESTATIC: number;
    const H_INVOKESPECIAL: number;
    const H_NEWINVOKESPECIAL: number;
    const H_INVOKEINTERFACE: number;
    /**
     * Represents an expanded frame. See {@link ClassReader#EXPAND_FRAMES}.
     */
    const F_NEW: number;
    /**
     * Represents a compressed frame with compexport conste frame data.
     */
    const F_FULL: number;
    /**
     * Represents a compressed frame where locals are the same as the locals in
     * the previous frame, except that additional 1-3 locals are defined, and
     * with an empty stack.
     */
    const F_APPEND: number;
    /**
     * Represents a compressed frame where locals are the same as the locals in
     * the previous frame, except that the last 1-3 locals are absent and with
     * an empty stack.
     */
    const F_CHOP: number;
    /**
     * Represents a compressed frame with exactly the same locals as the
     * previous frame and with an empty stack.
     */
    const F_SAME: number;
    /**
     * Represents a compressed frame with exactly the same locals as the
     * previous frame and with a single value on the stack.
     */
    const F_SAME1: number;
    const TOP: number;
    const INTEGER: number;
    const FLOAT: number;
    const DOUBLE: number;
    const LONG: number;
    const NULL: number;
    const UNINITIALIZED_THIS: number;
    const NOP: number;
    const ACONST_NULL: number;
    const ICONST_M1: number;
    const ICONST_0: number;
    const ICONST_1: number;
    const ICONST_2: number;
    const ICONST_3: number;
    const ICONST_4: number;
    const ICONST_5: number;
    const LCONST_0: number;
    const LCONST_1: number;
    const FCONST_0: number;
    const FCONST_1: number;
    const FCONST_2: number;
    const DCONST_0: number;
    const DCONST_1: number;
    const BIPUSH: number;
    const SIPUSH: number;
    const LDC: number;
    const ILOAD: number;
    const LLOAD: number;
    const FLOAD: number;
    const DLOAD: number;
    const ALOAD: number;
    const IALOAD: number;
    const LALOAD: number;
    const FALOAD: number;
    const DALOAD: number;
    const AALOAD: number;
    const BALOAD: number;
    const CALOAD: number;
    const SALOAD: number;
    const ISTORE: number;
    const LSTORE: number;
    const FSTORE: number;
    const DSTORE: number;
    const ASTORE: number;
    const IASTORE: number;
    const LASTORE: number;
    const FASTORE: number;
    const DASTORE: number;
    const AASTORE: number;
    const BASTORE: number;
    const CASTORE: number;
    const SASTORE: number;
    const POP: number;
    const POP2: number;
    const DUP: number;
    const DUP_X1: number;
    const DUP_X2: number;
    const DUP2: number;
    const DUP2_X1: number;
    const DUP2_X2: number;
    const SWAP: number;
    const IADD: number;
    const LADD: number;
    const FADD: number;
    const DADD: number;
    const ISUB: number;
    const LSUB: number;
    const FSUB: number;
    const DSUB: number;
    const IMUL: number;
    const LMUL: number;
    const FMUL: number;
    const DMUL: number;
    const IDIV: number;
    const LDIV: number;
    const FDIV: number;
    const DDIV: number;
    const IREM: number;
    const LREM: number;
    const FREM: number;
    const DREM: number;
    const INEG: number;
    const LNEG: number;
    const FNEG: number;
    const DNEG: number;
    const ISHL: number;
    const LSHL: number;
    const ISHR: number;
    const LSHR: number;
    const IUSHR: number;
    const LUSHR: number;
    const IAND: number;
    const LAND: number;
    const IOR: number;
    const LOR: number;
    const IXOR: number;
    const LXOR: number;
    const IINC: number;
    const I2L: number;
    const I2F: number;
    const I2D: number;
    const L2I: number;
    const L2F: number;
    const L2D: number;
    const F2I: number;
    const F2L: number;
    const F2D: number;
    const D2I: number;
    const D2L: number;
    const D2F: number;
    const I2B: number;
    const I2C: number;
    const I2S: number;
    const LCMP: number;
    const FCMPL: number;
    const FCMPG: number;
    const DCMPL: number;
    const DCMPG: number;
    const IFEQ: number;
    const IFNE: number;
    const IFLT: number;
    const IFGE: number;
    const IFGT: number;
    const IFLE: number;
    const IF_ICMPEQ: number;
    const IF_ICMPNE: number;
    const IF_ICMPLT: number;
    const IF_ICMPGE: number;
    const IF_ICMPGT: number;
    const IF_ICMPLE: number;
    const IF_ACMPEQ: number;
    const IF_ACMPNE: number;
    const GOTO: number;
    const JSR: number;
    const RET: number;
    const TABLESWITCH: number;
    const LOOKUPSWITCH: number;
    const IRETURN: number;
    const LRETURN: number;
    const FRETURN: number;
    const DRETURN: number;
    const ARETURN: number;
    const RETURN: number;
    const GETSTATIC: number;
    const PUTSTATIC: number;
    const GETFIELD: number;
    const PUTFIELD: number;
    const INVOKEVIRTUAL: number;
    const INVOKESPECIAL: number;
    const INVOKESTATIC: number;
    const INVOKEINTERFACE: number;
    const INVOKEDYNAMIC: number;
    const NEW: number;
    const NEWARRAY: number;
    const ANEWARRAY: number;
    const ARRAYLENGTH: number;
    const ATHROW: number;
    const CHECKCAST: number;
    const INSTANCEOF: number;
    const MONITORENTER: number;
    const MONITOREXIT: number;
    const MULTIANEWARRAY: number;
    const IFNULL: number;
    const IFNONNULL: number;
}
