// LICENSE : MIT
"use strict";
const EventEmitter = require("events");
const EVENT_KEY = "EVENT_BUG";
export default class DomainEventEmitter extends EventEmitter {
    subscribe(handler) {
        this.on(EVENT_KEY, handler);
    }

    /**
     * @param {{type:string}} payload
     */
    publish(payload) {
        this.emit(EVENT_KEY, payload);
    }
}