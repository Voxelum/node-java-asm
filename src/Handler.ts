/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * Information about an exception handler block.
 * 
 * @author Eric Bruneton
 */
import { Label } from "./Label";

export class Handler {
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
    static remove(h: Handler, start: Label, end: Label): Handler {
        if (h == null) {
            return null;
        } else {
            h.next = Handler.remove(h.next, start, end);
        }
        let hstart: number = h.start.position;
        let hend: number = h.end.position;
        let s: number = start.position;
        // let e : number = end == null?javaemul.internal.IntegerHelper.MAX_VALUE:end.position;
        let e: number = end == null ? Number.MAX_VALUE : end.position;
        if (s < hend && e > hstart) {
            if (s <= hstart) {
                if (e >= hend) {
                    h = h.next;
                } else {
                    h.start = end;
                }
            } else if (e >= hend) {
                h.end = start;
            } else {
                let g: Handler = new Handler();
                g.start = end;
                g.end = h.end;
                g.handler = h.handler;
                g.desc = h.desc;
                g.type = h.type;
                g.next = h.next;
                h.end = start;
                h.next = g;
            }
        }
        return h;
    }

    constructor() {
        this.type = 0;
    }
}
Handler["__class"] = "Handler";



