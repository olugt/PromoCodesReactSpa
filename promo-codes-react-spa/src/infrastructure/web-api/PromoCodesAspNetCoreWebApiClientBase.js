/**
 * Base web API client for the generated webb API client for promo codes web API.
 */
export default class PromoCodesAspNetCoreWebApiClientBase {
    /**
     * Set the identity token, to be used by the generated derived class.
     * @param {String} token The identity token.
     */
    setToken(token) {
        this.token = token;
    }
    
    /**
     * To be used by the generated derived class.
     * @param {{headers: {}} options Options for HTTP headers, etc.
     * @returns 
     */
    transformOptions(options) {
        if (this.token) {
            options.headers["Authorization"] = `Bearer ${this.token}`;
        }
        return Promise.resolve(options);
    }
}