"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Context {
    constructor() {
        this.flags = 0;
        this.access = 0;
        this.typeRef = 0;
        this.offset = 0;
        this.mode = 0;
        this.localCount = 0;
        this.localDiff = 0;
        this.stackCount = 0;
    }
}
exports.Context = Context;
Context["__class"] = "Context";
