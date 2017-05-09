/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * Information about a class being parsed in a {@link ClassReader}.
 * 
 * @author Eric Bruneton
 */
import { Label } from "./Label";
import { TypePath } from "./TypePath";
import { Attribute } from "./Attribute";

export class Context {
    /**
     * Prototypes of the attributes that must be parsed for this class.
     */
    attrs : Attribute[];

    /**
     * The {@link ClassReader} option flags for the parsing of this class.
     */
    flags : number;

    /**
     * The buffer used to read strings.
     */
    buffer : number[];

    /**
     * The start index of each bootstrap method.
     */
    bootstrapMethods : number[];

    /**
     * The access flags of the method currently being parsed.
     */
    access : number;

    /**
     * The name of the method currently being parsed.
     */
    name : string;

    /**
     * The descriptor of the method currently being parsed.
     */
    desc : string;

    /**
     * The label objects, indexed by bytecode offset, of the method currently
     * being parsed (only bytecode offsets for which a label is needed have a
     * non null associated Label object).
     */
    labels : Label[];

    /**
     * The target of the type annotation currently being parsed.
     */
    typeRef : number;

    /**
     * The path of the type annotation currently being parsed.
     */
    typePath : TypePath;

    /**
     * The offset of the latest stack map frame that has been parsed.
     */
    offset : number;

    /**
     * The labels corresponding to the start of the local variable ranges in the
     * local variable type annotation currently being parsed.
     */
    start : Label[];

    /**
     * The labels corresponding to the end of the local variable ranges in the
     * local variable type annotation currently being parsed.
     */
    end : Label[];

    /**
     * The local variable indices for each local variable range in the local
     * variable type annotation currently being parsed.
     */
    index : number[];

    /**
     * The encoding of the latest stack map frame that has been parsed.
     */
    mode : number;

    /**
     * The number of locals in the latest stack map frame that has been parsed.
     */
    localCount : number;

    /**
     * The number locals in the latest stack map frame that has been parsed,
     * minus the number of locals in the previous frame.
     */
    localDiff : number;

    /**
     * The local values of the latest stack map frame that has been parsed.
     */
    local : any[];

    /**
     * The stack size of the latest stack map frame that has been parsed.
     */
    stackCount : number;

    /**
     * The stack values of the latest stack map frame that has been parsed.
     */
    stack : any[];

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
Context["__class"] = "Context";



