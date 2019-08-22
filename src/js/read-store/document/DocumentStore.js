// LICENSE : MIT
"use strict";
import { ReduceStore } from "almin-reduce-store";
import DocumentState from "./DocumentState";
export default class DocumentStore extends ReduceStore {
    constructor({ documentRepository }) {
        super();
        this.state = new DocumentState();
        this.documentRepository = documentRepository;
        this.documentRepository.onChange(this._onChange.bind(this));
    }

    getState() {
        return this.state;
    }

    _onChange(document) {
        this.setState(this.state.update({ document }));
    }
}
