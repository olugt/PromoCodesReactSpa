import ServiceModel from "../../common/models/ServiceModel";
import PromoCodesWebApiManagerBase from "./PromoCodesWebApiManagerBase";
import { ActivateBonusRequestModel, ServiceResponseModel } from "./dependencies/PromoCodesAspNetCoreWebApiClient";

export default class PromoCodesWebApiServicesManager extends PromoCodesWebApiManagerBase {
    constructor(token) {
        super(token);
    }

    /**
     * Get services from promo codes web API.
     * @param {Number} page Page number.
     * @param {Number} limit Limit of number of items per page.
     * @returns Services array.
     */
    async getServices(page = 0, limit = 0) {
        try {
            return Array.from(await this.client.services(page, limit, this.clientDefaultVersion),
                a => {
                    let responseModel = new ServiceResponseModel(a);
                    return new ServiceModel(responseModel.id, responseModel.name);
                });
        }
        catch (error) {
            throw PromoCodesWebApiManagerBase.TransformError(error);
        }
    }

    /**
     * Get services from promo codes web API.
     * @param {String} nameSnippet Snippet of service name.
     * @param {Number} page Page number.
     * @param {Number} limit Limit of number of items per page.
     * @returns Services array.
     */
    async searchServices(nameSnippet, page, limit) {
        try {
            return Array.from(await this.client.search(nameSnippet, page, limit, this.clientDefaultVersion),
                a => {
                    let responseModel = new ServiceResponseModel(a);
                    return new ServiceModel(responseModel.id, responseModel.name);
                });
        }
        catch (error) {
            throw PromoCodesWebApiManagerBase.TransformError(error);
        }
    }

    /**
     * Activate bonus for user, with respect to service and promo code.
     * @param {String} promoCode Promo code to be used to create and activate a bonus for the service for the user.
     * @param {Number} serviceId ID of the service.
     * @returns The service activated for the bonus for the user.
     */
    async activateBonus(promoCode, serviceId) {
        try {
            let requestModel = new ActivateBonusRequestModel();
            requestModel.promoCode = promoCode;
            requestModel.serviceId = serviceId;

            let responseModel = new ServiceResponseModel(await this.client.activateBonus(this.clientDefaultVersion, requestModel));

            return new ServiceModel(responseModel.id, responseModel.name);
        }
        catch (error) {
            throw PromoCodesWebApiManagerBase.TransformError(error);
        }
    }
};
