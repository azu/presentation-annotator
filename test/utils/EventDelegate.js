// LICENSE : MIT
"use strict";
const assert = require("assert");
/**
 * delegate fromEmitter events to toEmitter.
 * @param fromEmitter
 * @param toEmitter
 */
export default function delegateEvents(fromEmitter, toEmitter) {
    assert(typeof fromEmitter.emit === "function");
    assert(typeof toEmitter.emit === "function");
    const oldEmit = fromEmitter.emit;
    const fromEmitterName = fromEmitter.constructor.name;
    const toEmitterName = toEmitter.constructor.name;
    const delegateName = `${fromEmitterName} => ${toEmitterName}`;
    /**
     * @param {DispatcherPayload} payload
     */
    const eventDelegateHookEmit = function eventDelegateHookEmit(payload) {
        const {type} = payload;
        this.displayName = delegateName;
        toEmitter.emit(type, ...args);
        oldEmit.apply(fromEmitter, originalArgs);
    };
    fromEmitter.emit = eventDelegateHookEmit;
}