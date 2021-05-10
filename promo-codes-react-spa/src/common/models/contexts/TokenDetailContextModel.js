import ContextModelBase from "./ContextModelBase";

export default class TokenDetailContextModel extends ContextModelBase {
    /**
     * Identity token model. Whenever a change is made to the parameters or properties of this class, update the fromParsedJson function.
     * @param {String} token Identity token string.
     * @param {Date} expiryDatetimeUtc Date-time of expiry of token (also already embeded in the token).
     */
    constructor(token, expiryDatetimeUtc) {
        super(token, expiryDatetimeUtc);

        this.token = token;
        this.expiryDatetimeUtc = expiryDatetimeUtc;
    }

    /**
     * 
     * @param {Object} parsedJson An object that is the result of parsing a JSON representation of this class using JSON.parse function.
     */
    fromParsedJson(parsedJson) {
        if (parsedJson) {
            this.token = parsedJson["token"];
            this.expiryDatetimeUtc = parsedJson["expiryDatetimeUtc"] ? new Date(parsedJson["expiryDatetimeUtc"].toString()) : undefined;
        }
    }
};
