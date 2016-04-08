// LICENSE : MIT
"use strict";
export default class MarkClickedPageUseCase {
    constructor({documentRepository}) {
        this.documentRepository = documentRepository;
    }

    execute(pageNumber) {
        return dispatch => {
            const document = this.documentRepository.findFirst();
            // mark page => (domain emit change)
            document.markAtPage(pageNumber);
            // dispatch
            dispatch(MarkClickedPageUseCase.name, pageNumber);
        }
    }
}