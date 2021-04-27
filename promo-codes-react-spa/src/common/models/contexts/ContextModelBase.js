export default class ContextModelBase {
    /**
     * Identity token model.
     * @param {Array} childParams All child parameters are expected to be passed here in the constructor of child class, for things to work correctly.
     */
    constructor(...childParams) {
        this.atBaseSaysChildConstructedWithoutParameters = childParams.every(a => a === undefined)
    }
};
