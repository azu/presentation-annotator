// LICENSE : MIT
"use strict";
import {EventEmitter} from "events";
const STATE_CHANGE_EVENT = "STATE_CHANGE_EVENT";
import domainEventBus from "./DomainEventBus";
export default class DomainModel extends EventEmitter {
    constructor() {
        super();
        this.domainEventBus = domainEventBus;
    }

    /**
     * subscribe change event.
     * if emit change event, then call registered event handler function
     * @param {Function} cb
     * @returns {Function} return unbind function
     */
    onChange(cb) {
        this.on(STATE_CHANGE_EVENT, cb);
        return this.removeListener.bind(this, STATE_CHANGE_EVENT, cb);
    }

    /**
     * emit change event to subscribers
     */
    emitChange() {
        this.emit(STATE_CHANGE_EVENT);
        const entityName = this.constructor.name;
        this.domainEventBus.emit(entityName);
    }
};