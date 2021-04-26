export default class TokenDetailModel {
    /**
     * Identity token model.
     * @param {String} token Identity token string.
     * @param {Date} expiryDatetimeUtc Date-time of expiry of token (also already embeded in the token).
     */
    constructor(token, expiryDatetimeUtc) {
        this.token = token;
        this.expiryDatetimeUtc = expiryDatetimeUtc;
    }
};
