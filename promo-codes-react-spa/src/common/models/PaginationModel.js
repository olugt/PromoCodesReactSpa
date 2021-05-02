export default class PaginationModel {
    /**
     * 
     * @param {Number} page Page number.
     * @param {Number} limit Page items limit.
     * @param {Boolean} isOn States if paging is being continued (i.e. true) or is stopped (i.e. false).
     * @param {Boolean} isRestarted States if paging is restarted from page 1 (i.e. true, otherwise false).
     * @param {Number} round States the round of paging relative to the beginning, which is usually 0 or 1, depending on use case.
     */
    constructor(page, limit, isOn, isRestarted, round) {
        this.page = page;
        this.limit = limit;
        this.isOn = isOn;
        this.isRestarted = isRestarted;
        this.round = round;
    }
};
