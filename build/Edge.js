"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Edge {
    constructor() {
        this.info = 0;
    }
}
/**
 * Denotes a normal control flow graph edge.
 */
Edge.NORMAL = 0;
/**
 * Denotes a control flow graph edge corresponding to an exception handler.
 * More precisely any {@link Edge} whose {@link #info} is strictly positive
 * corresponds to an exception handler. The actual value of {@link #info} is
 * the index, in the {@link ClassWriter} type table, of the exception that
 * is catched.
 */
Edge.EXCEPTION = 2147483647;
exports.Edge = Edge;
Edge["__class"] = "Edge";
