import { ClassReader, ClassVisitor, Opcodes, AnnotationVisitor } from '../src/asm'
import * as fs from 'fs';

class AVisitor extends AnnotationVisitor {
    constructor() {
        super(Opcodes.ASM5);
    }

    public visit(s: string, o: any) {
        console.log(s + ' ' + o);
    }
}
class AnnoVisitor extends ClassVisitor {
    public constructor() {
        super(Opcodes.ASM5);
    }

    public visitAnnotation(desc: string, visible: boolean): AnnotationVisitor {
        console.log('visit annotation')
        if (desc == "Lnet/minecraftforge/fml/common/Mod;") return new AVisitor();
        return null;
    }
}

fs.readFile('test.class', (err, buff) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('read into buffer')
        let reader = new ClassReader(buff);
        reader.accept(new AnnoVisitor());
    }
});
