// LICENSE : MIT
"use strict";
const EventEmitter = require("events");
export class DomainEventBus extends EventEmitter {
    ont(EntityName, handler) {
        super.on(EntityName, handler);
    }

    emit(EntityName, value) {
        super.emit(EntityName, value);
    }
}
export default new DomainEventBus();