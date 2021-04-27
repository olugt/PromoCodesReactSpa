export default class ErrorModel {
    /**
     * App-wide error model. All errors should be transformed to this before throwing.
     * @param {String} message Error message, intended for display in view.
     * @param {Object} data Error data of any type. It is intended to be logged as is.
     * @param {String} code Optional error code, as enlisted in ERROR_CODES constant.
     */
    constructor(message, data, code) {    
        this.message = message;
        this.data = data;
        this.code = code;
    }
};
