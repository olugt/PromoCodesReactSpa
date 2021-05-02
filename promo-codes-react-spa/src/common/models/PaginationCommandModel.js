export default class PaginationCommandModel {
    /**
     * 
     * @param {Boolean} isOn States whether paging should continue (i.e. true) or should stop (i.e. false).
     * @param {Boolean} isRestarted States whether paging is restarted from the beginning (i.e. true) from page 0 or 1, or not (i.e. false);
     */
    constructor(isOn, isRestarted) {
        this.isOn = isOn;
        this.isRestarted = isRestarted;
    }
};
