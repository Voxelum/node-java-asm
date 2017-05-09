/*
 * ASM: a very small and fast Java bytecode manipulation framework
 * Copyright (c) 2000-2011 INRIA, France Telecom
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holders nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */
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



