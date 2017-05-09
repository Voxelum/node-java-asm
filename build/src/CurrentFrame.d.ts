/**
 * Information about the input stack map frame at the "current" instruction of a
 * method. This is implemented as a Frame subclass for a "basic block"
 * containing only one instruction.
 *
 * @author Eric Bruneton
 */
import { Frame } from "./Frame";
import { ClassWriter } from "./ClassWriter";
import { Item } from "./Item";
export declare class CurrentFrame extends Frame {
    /**
     * Sets this CurrentFrame to the input stack map frame of the next "current"
     * instruction, i.e. the instruction just after the given one. It is assumed
     * that the value of this object when this method is called is the stack map
     * frame status just before the given instruction is executed.
     */
    execute(opcode: number, arg: number, cw: ClassWriter, item: Item): void;
}
