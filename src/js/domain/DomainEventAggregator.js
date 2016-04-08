// LICENSE : MIT
"use strict";
import DomainEventEmitter from "./DomainEventEmitter";
/**
 * If you stub for testing, do that
 *
 * model.eventEmitter = stubEventEmitter;
 *
 */
export class DomainEventAggregator {
    constructor() {
        /**
         * @type {DomainEventEmitter}
         */
        this.eventEmitter = new DomainEventEmitter();
    }

    /**
     * @param {string} EntityName
     * @param {Function} handler
     */
    subscribe(EntityName, handler) {
        this.eventEmitter.subscribe(({type, value}) => {
            if (type === EntityName) {
                handler(value);
            }
        });
    }

    /**
     * @param EntityName
     * @param value
     */
    publish(EntityName, value) {
        this.eventEmitter.publish({
            type: EntityName,
            value
        });
    }
}
export default new DomainEventAggregator();