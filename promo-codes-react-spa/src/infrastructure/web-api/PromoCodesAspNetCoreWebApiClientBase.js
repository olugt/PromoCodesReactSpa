export default class PromoCodesAspNetCoreWebApiClientBase {
    constructor() {
        this.token = undefined;
    }

    setToken(token) {
        this.token = token;
    }
    
    transformOptions(options) {
        if (this.token) {
            options.headers = options.headers["Authorization"] = `Bearer ${this.token}`;
        }
        return Promise.resolve(options);
    }
}