import { PromoCodesAspNetCoreWebApiClient } from "../infrastructure/web-api/PromoCodesAspNetCoreWebApiClient";

export default class BaseService {
    constructor(token) {
        this.client = new PromoCodesAspNetCoreWebApiClient(process.env.REACT_APP_PROMO_CODES_WEB_API_BASE_URL);
        if (token) {
            this.client.setToken(token);
        }

        this.clientDefaultVersion = process.env.REACT_APP_PROMO_CODES_WEB_API_DEFAULT_VERSION;
    }
};
