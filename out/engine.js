"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Search {
    constructor({ nGramSize }) {
        this.store = {};
        this.ngramSize = 2;
        this.ngramSize = nGramSize !== null && nGramSize !== void 0 ? nGramSize : this.ngramSize;
    }
    index(records) { }
    add() { }
    update() { }
    delete() { }
}
exports.default = Search;
