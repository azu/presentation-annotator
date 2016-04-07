// LICENSE : MIT
"use strict";
const EventEmitter = require("events");
const EVENT_KEY = "EVENT_BUG";
export class DomainEventBus extends EventEmitter {
    on(EntityName, handler) {
        super.on(EVENT_KEY, (payload) => {
            if (EntityName === payload.EntityName) {
                handler(payload.value);
            }
        });
    }

    emit(EntityName, value) {
        super.emit(EVENT_KEY, {
            EntityName,
            value
        });
    }
}
export default new DomainEventBus();