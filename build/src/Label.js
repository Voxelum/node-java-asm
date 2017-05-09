"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * A label represents a position in the bytecode of a method. Labels are used
 * for jump, goto, and switch instructions, and for try catch blocks. A label
 * designates the <i>instruction</i> that is just after. Note however that there
 * can be other elements between a label and the instruction it designates (such
 * as other labels, stack map frames, line numbers, etc.).
 *
 * @author Eric Bruneton
 */
const Edge_1 = require("./Edge");
const Opcodes_1 = require("./Opcodes");
const ClassReader_1 = require("./ClassReader");
const bits = require("./bits");
class Label {
    /**
     * Constructs a new label.
     */
    constructor() {
        this.status = 0;
        this.line = 0;
        this.position = 0;
        this.referenceCount = 0;
        this.inputStackTop = 0;
        this.outputStackMax = 0;
    }
    /**
     * Returns the offset corresponding to this label. This offset is computed
     * from the start of the method's bytecode. <i>This method is intended for
     * {@link Attribute} sub classes, and is normally not needed by class
     * generators or adapters.</i>
     *
     * @return the offset corresponding to this label.
     * @throws IllegalStateException
     * if this label is not resolved yet.
     */
    getOffset() {
        if ((this.status & Label.RESOLVED) === 0) {
            throw new Error("Label offset position has not been resolved yet");
        }
        return this.position;
    }
    /**
     * Puts a reference to this label in the bytecode of a method. If the
     * position of the label is known, the offset is computed and written
     * directly. Otherwise, a null offset is written and a new forward reference
     * is declared for this label.
     *
     * @param owner
     * the code writer that calls this method.
     * @param out
     * the bytecode of the method.
     * @param source
     * the position of first byte of the bytecode instruction that
     * contains this label.
     * @param wideOffset
     * <tt>true</tt> if the reference must be stored in 4 bytes, or
     * <tt>false</tt> if it must be stored with 2 bytes.
     * @throws IllegalArgumentException
     * if this label has not been created by the given code writer.
     */
    put(owner, out, source, wideOffset) {
        if ((this.status & Label.RESOLVED) === 0) {
            if (wideOffset) {
                this.addReference(-1 - source, out.length);
                out.putInt(-1);
            }
            else {
                this.addReference(source, out.length);
                out.putShort(-1);
            }
        }
        else {
            if (wideOffset) {
                out.putInt(this.position - source);
            }
            else {
                out.putShort(this.position - source);
            }
        }
    }
    /**
     * Adds a forward reference to this label. This method must be called only
     * for a true forward reference, i.e. only if this label is not resolved
     * yet. For backward references, the offset of the reference can be, and
     * must be, computed and stored directly.
     *
     * @param sourcePosition
     * the position of the referencing instruction. This position
     * will be used to compute the offset of this forward reference.
     * @param referencePosition
     * the position where the offset for this forward reference must
     * be stored.
     */
    addReference(sourcePosition, referencePosition) {
        if (this.srcAndRefPositions == null) {
            this.srcAndRefPositions = new Array(6);
        }
        if (this.referenceCount >= this.srcAndRefPositions.length) {
            let a = new Array(this.srcAndRefPositions.length + 6);
            a.concat(this.srcAndRefPositions);
            // java.lang.System.arraycopy(this.srcAndRefPositions, 0, a, 0, this.srcAndRefPositions.length);
            this.srcAndRefPositions = a;
        }
        this.srcAndRefPositions[this.referenceCount++] = sourcePosition;
        this.srcAndRefPositions[this.referenceCount++] = referencePosition;
    }
    /**
     * Resolves all forward references to this label. This method must be called
     * when this label is added to the bytecode of the method, i.e. when its
     * position becomes known. This method fills in the blanks that where left
     * in the bytecode by each forward reference previously added to this label.
     *
     * @param owner
     * the code writer that calls this method.
     * @param position
     * the position of this label in the bytecode.
     * @param data
     * the bytecode of the method.
     * @return <tt>true</tt> if a blank that was left for this label was to
     * small to store the offset. In such a case the corresponding jump
     * instruction is replaced with a pseudo instruction (using unused
     * opcodes) using an unsigned two bytes offset. These pseudo
     * instructions will be replaced with standard bytecode instructions
     * with wider offsets (4 bytes instead of 2), in ClassReader.
     * @throws IllegalArgumentException
     * if this label has already been resolved, or if it has not
     * been created by the given code writer.
     */
    resolve(owner, position, data) {
        let needUpdate = false;
        this.status |= Label.RESOLVED;
        this.position = position;
        let i = 0;
        while ((i < this.referenceCount)) {
            let source = this.srcAndRefPositions[i++];
            let reference = this.srcAndRefPositions[i++];
            let offset;
            if (source >= 0) {
                offset = position - source;
                if (offset < bits.SHORT_MIN || offset > bits.SHORT_MAX) {
                    let opcode = data[reference - 1] & 255;
                    if (opcode <= Opcodes_1.Opcodes.JSR) {
                        data[reference - 1] = ((opcode + 49) | 0);
                    }
                    else {
                        data[reference - 1] = ((opcode + 20) | 0);
                    }
                    needUpdate = true;
                }
                data[reference++] = ((offset >>> 8) | 0);
                data[reference] = (offset | 0);
            }
            else {
                offset = position + source + 1;
                data[reference++] = ((offset >>> 24) | 0);
                data[reference++] = ((offset >>> 16) | 0);
                data[reference++] = ((offset >>> 8) | 0);
                data[reference] = (offset | 0);
            }
        }
        ;
        return needUpdate;
    }
    /**
     * Returns the first label of the series to which this label belongs. For an
     * isolated label or for the first label in a series of successive labels,
     * this method returns the label itself. For other labels it returns the
     * first label of the series.
     *
     * @return the first label of the series to which this label belongs.
     */
    getFirst() {
        return !ClassReader_1.ClassReader.FRAMES || this.frame == null ? this : this.frame.owner;
    }
    /**
     * Returns true is this basic block belongs to the given subroutine.
     *
     * @param id
     * a subroutine id.
     * @return true is this basic block belongs to the given subroutine.
     */
    inSubroutine(id) {
        if ((this.status & Label.VISITED) !== 0) {
            return (this.srcAndRefPositions[((id >>> 32) | 0)] & (id | 0)) !== 0;
        }
        return false;
    }
    /**
     * Returns true if this basic block and the given one belong to a common
     * subroutine.
     *
     * @param block
     * another basic block.
     * @return true if this basic block and the given one belong to a common
     * subroutine.
     */
    inSameSubroutine(block) {
        if ((this.status & Label.VISITED) === 0 || (block.status & Label.VISITED) === 0) {
            return false;
        }
        for (let i = 0; i < this.srcAndRefPositions.length; ++i) {
            if ((this.srcAndRefPositions[i] & block.srcAndRefPositions[i]) !== 0) {
                return true;
            }
        }
        return false;
    }
    /**
     * Marks this basic block as belonging to the given subroutine.
     *
     * @param id
     * a subroutine id.
     * @param nbSubroutines
     * the total number of subroutines in the method.
     */
    addToSubroutine(id, nbSubroutines) {
        if ((this.status & Label.VISITED) === 0) {
            this.status |= Label.VISITED;
            this.srcAndRefPositions = new Array((nbSubroutines / 32 | 0) + 1);
        }
        this.srcAndRefPositions[((id >>> 32) | 0)] |= (id | 0);
    }
    /**
     * Finds the basic blocks that belong to a given subroutine, and marks these
     * blocks as belonging to this subroutine. This method follows the control
     * flow graph to find all the blocks that are reachable from the current
     * block WITHOUT following any JSR target.
     *
     * @param JSR
     * a JSR block that jumps to this subroutine. If this JSR is not
     * null it is added to the successor of the RET blocks found in
     * the subroutine.
     * @param id
     * the id of this subroutine.
     * @param nbSubroutines
     * the total number of subroutines in the method.
     */
    visitSubroutine(JSR, id, nbSubroutines) {
        let stack = this;
        while ((stack != null)) {
            let l = stack;
            stack = l.next;
            l.next = null;
            if (JSR != null) {
                if ((l.status & Label.VISITED2) !== 0) {
                    continue;
                }
                l.status |= Label.VISITED2;
                if ((l.status & Label.RET) !== 0) {
                    if (!l.inSameSubroutine(JSR)) {
                        let e = new Edge_1.Edge();
                        e.info = l.inputStackTop;
                        e.successor = JSR.successors.successor;
                        e.next = l.successors;
                        l.successors = e;
                    }
                }
            }
            else {
                if (l.inSubroutine(id)) {
                    continue;
                }
                l.addToSubroutine(id, nbSubroutines);
            }
            let e = l.successors;
            while ((e != null)) {
                if ((l.status & Label.JSR) === 0 || e !== l.successors.next) {
                    if (e.successor.next == null) {
                        e.successor.next = stack;
                        stack = e.successor;
                    }
                }
                e = e.next;
            }
            ;
        }
        ;
    }
    /**
     * Returns a string representation of this label.
     *
     * @return a string representation of this label.
     */
    toString() {
        return "Lable";
        // return "L" + java.lang.System.identityHashCode(this);
    }
}
/**
 * Indicates if this label is only used for debug attributes. Such a label
 * is not the start of a basic block, the target of a jump instruction, or
 * an exception handler. It can be safely ignored in control flow graph
 * analysis algorithms (for optimization purposes).
 */
Label.DEBUG = 1;
/**
 * Indicates if the position of this label is known.
 */
Label.RESOLVED = 2;
/**
 * Indicates if this label has been updated, after instruction resizing.
 */
Label.RESIZED = 4;
/**
 * Indicates if this basic block has been pushed in the basic block stack.
 * See {@link MethodWriter#visitMaxs visitMaxs}.
 */
Label.PUSHED = 8;
/**
 * Indicates if this label is the target of a jump instruction, or the start
 * of an exception handler.
 */
Label.TARGET = 16;
/**
 * Indicates if a stack map frame must be stored for this label.
 */
Label.STORE = 32;
/**
 * Indicates if this label corresponds to a reachable basic block.
 */
Label.REACHABLE = 64;
/**
 * Indicates if this basic block ends with a JSR instruction.
 */
Label.JSR = 128;
/**
 * Indicates if this basic block ends with a RET instruction.
 */
Label.RET = 256;
/**
 * Indicates if this basic block is the start of a subroutine.
 */
Label.SUBROUTINE = 512;
/**
 * Indicates if this subroutine basic block has been visited by a
 * visitSubroutine(null, ...) call.
 */
Label.VISITED = 1024;
/**
 * Indicates if this subroutine basic block has been visited by a
 * visitSubroutine(!null, ...) call.
 */
Label.VISITED2 = 2048;
exports.Label = Label;
Label["__class"] = "Label";
