// LICENSE : MIT
"use strict";
const assert = require("assert");
/**
 * Usage
 * eventDelete(fromEmitter => toEmitter);
 */
export default function eventDelegate(fromEmitter, toEmitter) {
    assert(typeof fromEmitter.emit === "function");
    assert(typeof toEmitter.emit === "function");
    const oldEmit = fromEmitter.emit;
    const fromEmitterName = fromEmitter.constructor.name;
    const toEmitterName = toEmitter.constructor.name;
    const delegateName = `${fromEmitterName} => ${toEmitterName}`;
    const eventDelegateHookEmit = function eventDelegateHookEmit(...originalArgs) {
        const {type, args} = originalArgs[1];
        this.displayName = delegateName;
        toEmitter.emit(type, ...args);
        oldEmit.apply(fromEmitter, originalArgs);
    };
    fromEmitter.emit = eventDelegateHookEmit;
}