class PromoCodesAspNetCoreWebApiClientBase {
    constructor() {
        this.jwt = "";
    }
    setToken(token) {
        this.jwt = token;
    }
    ;
    transformOptions(options) {
        if (this.jwt) {
            options.headers = options.headers["Authorization"] = `Bearer ${this.jwt}`;
        }
        return Promise.resolve(options);
    }
    ;
}
export default PromoCodesAspNetCoreWebApiClientBase;