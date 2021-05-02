export default class ContextModelBase {
    /**
     * Identity token model base.
     * @param {Array} childParams All child parameters are expected to be passed here in the constructor of child class, for things to work correctly.
     */
    constructor(...childParams) {
        /**
         * @type {Boolean} States whether child was constructed without parameters (i.e. true) or not (i.e. false);
         */
        this.wasConstructedWithoutParameters = childParams.every(a => a === undefined)
    }
};
