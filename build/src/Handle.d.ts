export declare class Handle {
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
    constructor(tag: number, owner: string, name: string, desc: string, itf?: boolean);
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
    getTag(): number;
    /**
     * Returns the internal name of the class that owns the field or method
     * designated by this handle.
     *
     * @return the internal name of the class that owns the field or method
     * designated by this handle.
     */
    getOwner(): string;
    /**
     * Returns the name of the field or method designated by this handle.
     *
     * @return the name of the field or method designated by this handle.
     */
    getName(): string;
    /**
     * Returns the descriptor of the field or method designated by this handle.
     *
     * @return the descriptor of the field or method designated by this handle.
     */
    getDesc(): string;
    /**
     * Returns true if the owner of the field or method designated
     * by this handle is an interface.
     *
     * @return true if the owner of the field or method designated
     * by this handle is an interface.
     */
    isInterface(): boolean;
    equals(obj: any): boolean;
    hashCode(): number;
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
    toString(): string;
}
