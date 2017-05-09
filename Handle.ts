/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
/**
 * A reference to a field or a method.
 * 
 * @author Remi Forax
 * @author Eric Bruneton
 */
import { Opcodes } from './Opcodes'
export class Handle {
    /**
     * The kind of field or method designated by this Handle. Should be
     * {@link Opcodes#H_GETFIELD}, {@link Opcodes#H_GETSTATIC},
     * {@link Opcodes#H_PUTFIELD}, {@link Opcodes#H_PUTSTATIC},
     * {@link Opcodes#H_INVOKEVIRTUAL}, {@link Opcodes#H_INVOKESTATIC},
     * {@link Opcodes#H_INVOKESPECIAL}, {@link Opcodes#H_NEWINVOKESPECIAL} or
     * {@link Opcodes#H_INVOKEINTERFACE}.
     */
    tag: number;

    /**
     * The internal name of the class that owns the field or method designated
     * by this handle.
     */
    owner: string;

    /**
     * The name of the field or method designated by this handle.
     */
    name: string;

    /**
     * The descriptor of the field or method designated by this handle.
     */
    desc: string;

    /**
     * Indicate if the owner is an interface or not.
     */
    itf: boolean;

    /**
     * Constructs a new field or method handle.
     * 
     * @param tag
     * the kind of field or method designated by this Handle. Must be
     * {@link Opcodes#H_GETFIELD}, {@link Opcodes#H_GETSTATIC},
     * {@link Opcodes#H_PUTFIELD}, {@link Opcodes#H_PUTSTATIC},
     * {@link Opcodes#H_INVOKEVIRTUAL},
     * {@link Opcodes#H_INVOKESTATIC},
     * {@link Opcodes#H_INVOKESPECIAL},
     * {@link Opcodes#H_NEWINVOKESPECIAL} or
     * {@link Opcodes#H_INVOKEINTERFACE}.
     * @param owner
     * the internal name of the class that owns the field or method
     * designated by this handle.
     * @param name
     * the name of the field or method designated by this handle.
     * @param desc
     * the descriptor of the field or method designated by this
     * handle.
     * @param itf
     * true if the owner is an interface.
     */
    public constructor(tag?: any, owner?: any, name?: any, desc?: any, itf?: any) {
        if (((typeof tag === 'number') || tag === null) && ((typeof owner === 'string') || owner === null) && ((typeof name === 'string') || name === null) && ((typeof desc === 'string') || desc === null) && ((typeof itf === 'boolean') || itf === null)) {
            let __args = Array.prototype.slice.call(arguments);
            this.tag = 0;
            this.itf = false;
            (() => {
                this.tag = tag;
                this.owner = owner;
                this.name = name;
                this.desc = desc;
                this.itf = itf;
            })();
        } else if (((typeof tag === 'number') || tag === null) && ((typeof owner === 'string') || owner === null) && ((typeof name === 'string') || name === null) && ((typeof desc === 'string') || desc === null) && itf === undefined) {
            let __args = Array.prototype.slice.call(arguments);
            {
                let __args = Array.prototype.slice.call(arguments);
                let itf: any = __args[0] === Opcodes.H_INVOKEINTERFACE;
                this.tag = 0;
                this.itf = false;
                (() => {
                    this.tag = tag;
                    this.owner = owner;
                    this.name = name;
                    this.desc = desc;
                    this.itf = itf;
                })();
            }
        } else throw new Error('invalid overload');
    }

    /**
     * Returns the kind of field or method designated by this handle.
     * 
     * @return {@link Opcodes#H_GETFIELD}, {@link Opcodes#H_GETSTATIC},
     * {@link Opcodes#H_PUTFIELD}, {@link Opcodes#H_PUTSTATIC},
     * {@link Opcodes#H_INVOKEVIRTUAL}, {@link Opcodes#H_INVOKESTATIC},
     * {@link Opcodes#H_INVOKESPECIAL},
     * {@link Opcodes#H_NEWINVOKESPECIAL} or
     * {@link Opcodes#H_INVOKEINTERFACE}.
     */
    public getTag(): number {
        return this.tag;
    }

    /**
     * Returns the internal name of the class that owns the field or method
     * designated by this handle.
     * 
     * @return the internal name of the class that owns the field or method
     * designated by this handle.
     */
    public getOwner(): string {
        return this.owner;
    }

    /**
     * Returns the name of the field or method designated by this handle.
     * 
     * @return the name of the field or method designated by this handle.
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Returns the descriptor of the field or method designated by this handle.
     * 
     * @return the descriptor of the field or method designated by this handle.
     */
    public getDesc(): string {
        return this.desc;
    }

    /**
     * Returns true if the owner of the field or method designated
     * by this handle is an interface.
     * 
     * @return true if the owner of the field or method designated
     * by this handle is an interface.
     */
    public isInterface(): boolean {
        return this.itf;
    }

    public equals(obj: any): boolean {
        if (obj === this) {
            return true;
        }
        if (!(obj != null && obj instanceof Handle)) {
            return false;
        }
        let h: Handle = <Handle>obj;
        return this.tag === h.tag && this.itf === h.itf && (this.owner === h.owner) && (this.name === h.name) && (this.desc === h.desc);
    }

    public hashCode(): number {
        return this.tag + (this.itf ? 64 : 0) + (<any>this.owner.toString()) * (<any>this.name.toString()) * (<any>this.desc.toString());
    }

    /**
     * Returns the textual representation of this handle. The textual
     * representation is:
     * 
     * <pre>
     * for a reference to a class:
     * owner '.' name desc ' ' '(' tag ')'
     * for a reference to an interface:
     * owner '.' name desc ' ' '(' tag ' ' itf ')'
     * </pre>
     * 
     * . As this format is unambiguous, it can be parsed if necessary.
     */
    public toString(): string {
        return this.owner + '.' + this.name + this.desc + " (" + this.tag + (this.itf ? " itf" : "") + ')';
    }
}
Handle["__class"] = "Handle";



