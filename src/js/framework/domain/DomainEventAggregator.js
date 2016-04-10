// LICENSE : MIT
"use strict";
import DomainEventEmitter from "./DomainEventEmitter";
let _eventEmitter = new DomainEventEmitter();
/**
 * If you stub for testing, do that
 *
 * model.eventEmitter = stubEventEmitter;
 *
 */
export class DomainEventAggregator {
    constructor() {
        if (_eventEmitter) {
            _eventEmitter.removeAllListeners();
        }
    }

    /**
     * @returns {DomainEventEmitter}
     */
    get eventEmitter() {
        return _eventEmitter;
    }

    /**
     * @param {DomainEventEmitter }domainEventEmitter
     */
    setEventEmitterForTesting(domainEventEmitter) {
        _eventEmitter.removeAllListeners();
        _eventEmitter = domainEventEmitter;
    }

    /**
     * clear all listened event for testing 
     */
    clearEventsForTesting() {
        _eventEmitter.removeAllListeners();
    }

    /**
     * @param {string} entityName
     * @param {Function} handler
     */
    subscribe(entityName, handler) {
        this.eventEmitter.subscribe(({type, value}) => {
            if (type === entityName) {
                handler(value);
            }
        });
    }

    /**
     * @param entityName
     * @param value
     */
    publish(entityName, value) {
        this.eventEmitter.publish({
            type: entityName,
            value
        });
    }
}
export default new DomainEventAggregator();