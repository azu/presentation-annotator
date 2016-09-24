// LICENSE : MIT
"use strict";
import {ReduceStore} from "almin-reduce-store";
import ExportingState from "./ExportingState";
/*
 StateStore has change condition
 */
export default class ExportingStateStore extends ReduceStore {
    constructor({documentRepository}) {
        super();
        this.state = new ExportingState();
        documentRepository.onChange(this._onChange.bind(this));
    }

    getState() {
        return {
            exporting: this.state
        };
    }

    _onChange(document) {
        this.setState(this.state.update({document}));
    }
}