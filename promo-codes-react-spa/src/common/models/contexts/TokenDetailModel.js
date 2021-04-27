import ContextModelBase from "./ContextModelBase";

export default class TokenDetailModel extends ContextModelBase {
    /**
     * Identity token model.
     * @param {String} token Identity token string.
     * @param {Date} expiryDatetimeUtc Date-time of expiry of token (also already embeded in the token).
     */
    constructor(token, expiryDatetimeUtc) {

        super(token, expiryDatetimeUtc);

        this.token = token;
        this.expiryDatetimeUtc = expiryDatetimeUtc;
    }
};
