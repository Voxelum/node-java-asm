/**
 * Information about an exception handler block.
 *
 * @author Eric Bruneton
 */
import { Label } from "./Label";
export declare class Handler {
    /**
     * Beginning of the exception handler's scope (inclusive).
     */
    start: Label;
    /**
     * End of the exception handler's scope (exclusive).
     */
    end: Label;
    /**
     * Beginning of the exception handler's code.
     */
    handler: Label;
    /**
     * Internal name of the type of exceptions handled by this handler, or
     * <tt>null</tt> to catch any exceptions.
     */
    desc: string;
    /**
     * Constant pool index of the internal name of the type of exceptions
     * handled by this handler, or 0 to catch any exceptions.
     */
    type: number;
    /**
     * Next exception handler block info.
     */
    next: Handler;
    /**
     * Removes the range between start and end from the given exception
     * handlers.
     *
     * @param h
     * an exception handler list.
     * @param start
     * the start of the range to be removed.
     * @param end
     * the end of the range to be removed. Maybe null.
     * @return the exception handler list with the start-end range removed.
     */
    static remove(h: Handler, start: Label, end: Label): Handler;
    constructor();
}
