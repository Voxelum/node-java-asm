"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
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
var Opcodes;
(function (Opcodes) {
    Opcodes.ASM4 = 4 << 16 | 0 << 8 | 0;
    Opcodes.ASM5 = 5 << 16 | 0 << 8 | 0;
    Opcodes.V1_1 = 3 << 16 | 45;
    Opcodes.V1_2 = 0 << 16 | 46;
    Opcodes.V1_3 = 0 << 16 | 47;
    Opcodes.V1_4 = 0 << 16 | 48;
    Opcodes.V1_5 = 0 << 16 | 49;
    Opcodes.V1_6 = 0 << 16 | 50;
    Opcodes.V1_7 = 0 << 16 | 51;
    Opcodes.V1_8 = 0 << 16 | 52;
    Opcodes.ACC_PUBLIC = 1;
    Opcodes.ACC_PRIVATE = 2;
    Opcodes.ACC_PROTECTED = 4;
    Opcodes.ACC_STATIC = 8;
    Opcodes.ACC_FINAL = 16;
    Opcodes.ACC_SUPER = 32;
    Opcodes.ACC_SYNCHRONIZED = 32;
    Opcodes.ACC_VOLATILE = 64;
    Opcodes.ACC_BRIDGE = 64;
    Opcodes.ACC_VARARGS = 128;
    Opcodes.ACC_TRANSIENT = 128;
    Opcodes.ACC_NATIVE = 256;
    Opcodes.ACC_INTERFACE = 512;
    Opcodes.ACC_ABSTRACT = 1024;
    Opcodes.ACC_STRICT = 2048;
    Opcodes.ACC_SYNTHETIC = 4096;
    Opcodes.ACC_ANNOTATION = 8192;
    Opcodes.ACC_ENUM = 16384;
    Opcodes.ACC_MANDATED = 32768;
    Opcodes.ACC_DEPRECATED = 131072;
    Opcodes.T_BOOLEAN = 4;
    Opcodes.T_CHAR = 5;
    Opcodes.T_FLOAT = 6;
    Opcodes.T_DOUBLE = 7;
    Opcodes.T_BYTE = 8;
    Opcodes.T_SHORT = 9;
    Opcodes.T_INT = 10;
    Opcodes.T_LONG = 11;
    Opcodes.H_GETFIELD = 1;
    Opcodes.H_GETSTATIC = 2;
    Opcodes.H_PUTFIELD = 3;
    Opcodes.H_PUTSTATIC = 4;
    Opcodes.H_INVOKEVIRTUAL = 5;
    Opcodes.H_INVOKESTATIC = 6;
    Opcodes.H_INVOKESPECIAL = 7;
    Opcodes.H_NEWINVOKESPECIAL = 8;
    Opcodes.H_INVOKEINTERFACE = 9;
    /**
     * Represents an expanded frame. See {@link ClassReader#EXPAND_FRAMES}.
     */
    Opcodes.F_NEW = -1;
    /**
     * Represents a compressed frame with compexport conste frame data.
     */
    Opcodes.F_FULL = 0;
    /**
     * Represents a compressed frame where locals are the same as the locals in
     * the previous frame, except that additional 1-3 locals are defined, and
     * with an empty stack.
     */
    Opcodes.F_APPEND = 1;
    /**
     * Represents a compressed frame where locals are the same as the locals in
     * the previous frame, except that the last 1-3 locals are absent and with
     * an empty stack.
     */
    Opcodes.F_CHOP = 2;
    /**
     * Represents a compressed frame with exactly the same locals as the
     * previous frame and with an empty stack.
     */
    Opcodes.F_SAME = 3;
    /**
     * Represents a compressed frame with exactly the same locals as the
     * previous frame and with a single value on the stack.
     */
    Opcodes.F_SAME1 = 4;
    Opcodes.TOP = new Number(0);
    Opcodes.INTEGER = new Number(1);
    Opcodes.FLOAT = new Number(2);
    Opcodes.DOUBLE = new Number(3);
    Opcodes.LONG = new Number(4);
    Opcodes.NULL = new Number(5);
    Opcodes.UNINITIALIZED_THIS = new Number(6);
    Opcodes.NOP = 0;
    Opcodes.ACONST_NULL = 1;
    Opcodes.ICONST_M1 = 2;
    Opcodes.ICONST_0 = 3;
    Opcodes.ICONST_1 = 4;
    Opcodes.ICONST_2 = 5;
    Opcodes.ICONST_3 = 6;
    Opcodes.ICONST_4 = 7;
    Opcodes.ICONST_5 = 8;
    Opcodes.LCONST_0 = 9;
    Opcodes.LCONST_1 = 10;
    Opcodes.FCONST_0 = 11;
    Opcodes.FCONST_1 = 12;
    Opcodes.FCONST_2 = 13;
    Opcodes.DCONST_0 = 14;
    Opcodes.DCONST_1 = 15;
    Opcodes.BIPUSH = 16;
    Opcodes.SIPUSH = 17;
    Opcodes.LDC = 18;
    Opcodes.ILOAD = 21;
    Opcodes.LLOAD = 22;
    Opcodes.FLOAD = 23;
    Opcodes.DLOAD = 24;
    Opcodes.ALOAD = 25;
    Opcodes.IALOAD = 46;
    Opcodes.LALOAD = 47;
    Opcodes.FALOAD = 48;
    Opcodes.DALOAD = 49;
    Opcodes.AALOAD = 50;
    Opcodes.BALOAD = 51;
    Opcodes.CALOAD = 52;
    Opcodes.SALOAD = 53;
    Opcodes.ISTORE = 54;
    Opcodes.LSTORE = 55;
    Opcodes.FSTORE = 56;
    Opcodes.DSTORE = 57;
    Opcodes.ASTORE = 58;
    Opcodes.IASTORE = 79;
    Opcodes.LASTORE = 80;
    Opcodes.FASTORE = 81;
    Opcodes.DASTORE = 82;
    Opcodes.AASTORE = 83;
    Opcodes.BASTORE = 84;
    Opcodes.CASTORE = 85;
    Opcodes.SASTORE = 86;
    Opcodes.POP = 87;
    Opcodes.POP2 = 88;
    Opcodes.DUP = 89;
    Opcodes.DUP_X1 = 90;
    Opcodes.DUP_X2 = 91;
    Opcodes.DUP2 = 92;
    Opcodes.DUP2_X1 = 93;
    Opcodes.DUP2_X2 = 94;
    Opcodes.SWAP = 95;
    Opcodes.IADD = 96;
    Opcodes.LADD = 97;
    Opcodes.FADD = 98;
    Opcodes.DADD = 99;
    Opcodes.ISUB = 100;
    Opcodes.LSUB = 101;
    Opcodes.FSUB = 102;
    Opcodes.DSUB = 103;
    Opcodes.IMUL = 104;
    Opcodes.LMUL = 105;
    Opcodes.FMUL = 106;
    Opcodes.DMUL = 107;
    Opcodes.IDIV = 108;
    Opcodes.LDIV = 109;
    Opcodes.FDIV = 110;
    Opcodes.DDIV = 111;
    Opcodes.IREM = 112;
    Opcodes.LREM = 113;
    Opcodes.FREM = 114;
    Opcodes.DREM = 115;
    Opcodes.INEG = 116;
    Opcodes.LNEG = 117;
    Opcodes.FNEG = 118;
    Opcodes.DNEG = 119;
    Opcodes.ISHL = 120;
    Opcodes.LSHL = 121;
    Opcodes.ISHR = 122;
    Opcodes.LSHR = 123;
    Opcodes.IUSHR = 124;
    Opcodes.LUSHR = 125;
    Opcodes.IAND = 126;
    Opcodes.LAND = 127;
    Opcodes.IOR = 128;
    Opcodes.LOR = 129;
    Opcodes.IXOR = 130;
    Opcodes.LXOR = 131;
    Opcodes.IINC = 132;
    Opcodes.I2L = 133;
    Opcodes.I2F = 134;
    Opcodes.I2D = 135;
    Opcodes.L2I = 136;
    Opcodes.L2F = 137;
    Opcodes.L2D = 138;
    Opcodes.F2I = 139;
    Opcodes.F2L = 140;
    Opcodes.F2D = 141;
    Opcodes.D2I = 142;
    Opcodes.D2L = 143;
    Opcodes.D2F = 144;
    Opcodes.I2B = 145;
    Opcodes.I2C = 146;
    Opcodes.I2S = 147;
    Opcodes.LCMP = 148;
    Opcodes.FCMPL = 149;
    Opcodes.FCMPG = 150;
    Opcodes.DCMPL = 151;
    Opcodes.DCMPG = 152;
    Opcodes.IFEQ = 153;
    Opcodes.IFNE = 154;
    Opcodes.IFLT = 155;
    Opcodes.IFGE = 156;
    Opcodes.IFGT = 157;
    Opcodes.IFLE = 158;
    Opcodes.IF_ICMPEQ = 159;
    Opcodes.IF_ICMPNE = 160;
    Opcodes.IF_ICMPLT = 161;
    Opcodes.IF_ICMPGE = 162;
    Opcodes.IF_ICMPGT = 163;
    Opcodes.IF_ICMPLE = 164;
    Opcodes.IF_ACMPEQ = 165;
    Opcodes.IF_ACMPNE = 166;
    Opcodes.GOTO = 167;
    Opcodes.JSR = 168;
    Opcodes.RET = 169;
    Opcodes.TABLESWITCH = 170;
    Opcodes.LOOKUPSWITCH = 171;
    Opcodes.IRETURN = 172;
    Opcodes.LRETURN = 173;
    Opcodes.FRETURN = 174;
    Opcodes.DRETURN = 175;
    Opcodes.ARETURN = 176;
    Opcodes.RETURN = 177;
    Opcodes.GETSTATIC = 178;
    Opcodes.PUTSTATIC = 179;
    Opcodes.GETFIELD = 180;
    Opcodes.PUTFIELD = 181;
    Opcodes.INVOKEVIRTUAL = 182;
    Opcodes.INVOKESPECIAL = 183;
    Opcodes.INVOKESTATIC = 184;
    Opcodes.INVOKEINTERFACE = 185;
    Opcodes.INVOKEDYNAMIC = 186;
    Opcodes.NEW = 187;
    Opcodes.NEWARRAY = 188;
    Opcodes.ANEWARRAY = 189;
    Opcodes.ARRAYLENGTH = 190;
    Opcodes.ATHROW = 191;
    Opcodes.CHECKCAST = 192;
    Opcodes.INSTANCEOF = 193;
    Opcodes.MONITORENTER = 194;
    Opcodes.MONITOREXIT = 195;
    Opcodes.MULTIANEWARRAY = 197;
    Opcodes.IFNULL = 198;
    Opcodes.IFNONNULL = 199;
})(Opcodes = exports.Opcodes || (exports.Opcodes = {}));
