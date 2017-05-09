"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asm_1 = require("./src/asm");
const fs = require("fs");
class AVisitor extends asm_1.AnnotationVisitor {
    constructor() {
        super(asm_1.Opcodes.ASM5);
    }
    visit(s, o) {
        console.log(s + ' ' + o);
    }
}
class AnnoVisitor extends asm_1.ClassVisitor {
    constructor() {
        super(asm_1.Opcodes.ASM5);
    }
    visitAnnotation(desc, visible) {
        console.log('visit annotation');
        if (desc == "Lnet/minecraftforge/fml/common/Mod;")
            return new AVisitor();
        return null;
    }
}
fs.readFile('test.class', (err, buff) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('read into buffer');
        let reader = new asm_1.ClassReader(buff);
        reader.accept(new AnnoVisitor());
    }
});
