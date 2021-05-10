import ContextModelBase from "./ContextModelBase";

export default class TokenDetailContextModel extends ContextModelBase {
    /**
     * Identity token model. Whenever a change is made to the parameters or properties of this class, update the fromParsedJson function.
     * @param {String} token Identity token string.
     * @param {Date} expiryDatetime Date-time of expiry of token (also already embeded in the token).
     */
    constructor(token, expiryDatetime) {
        super(token, expiryDatetime);

        this.token = token;
        this.expiryDatetime = expiryDatetime;
    }

    /**
     * 
     * @param {Object} parsedJson An object that is the result of parsing a JSON representation of this class using JSON.parse function.
     */
    fromParsedJson(parsedJson) {
        if (parsedJson) {
            this.token = parsedJson["token"];
            this.expiryDatetime = parsedJson["expiryDatetime"] ? new Date(parsedJson["expiryDatetime"].toString()) : undefined;
        }
    }
};
