"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Handler {
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
    static remove(h, start, end) {
        if (h == null) {
            return null;
        }
        else {
            h.next = Handler.remove(h.next, start, end);
        }
        let hstart = h.start.position;
        let hend = h.end.position;
        let s = start.position;
        // let e : number = end == null?javaemul.internal.IntegerHelper.MAX_VALUE:end.position;
        let e = end == null ? Number.MAX_VALUE : end.position;
        if (s < hend && e > hstart) {
            if (s <= hstart) {
                if (e >= hend) {
                    h = h.next;
                }
                else {
                    h.start = end;
                }
            }
            else if (e >= hend) {
                h.end = start;
            }
            else {
                let g = new Handler();
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
exports.Handler = Handler;
Handler["__class"] = "Handler";
