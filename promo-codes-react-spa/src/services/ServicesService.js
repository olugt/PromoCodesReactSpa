import ServiceModel from "../common/models/ServiceModel";
import { ActivateBonusRequestModel, ServiceResponseModel } from "../infrastructure/web-api/PromoCodesAspNetCoreWebApiClient";
import BaseService from "./BaseService";

export default class ServicesService extends BaseService {
    constructor(token) {
        super(token);
    }

    async getServices(page, limit) {
        return Array.from(await this.client.services(page, limit, this.clientDefaultVersion),
            a => {
                let responseModel = new ServiceResponseModel(a);
                return new ServiceModel(responseModel.id, responseModel.name);
            });
    }

    async searchServices(nameSnippet, page, limit) {
        return Array.from(await this.client.search(nameSnippet, page, limit, this.clientDefaultVersion),
            a => {
                let responseModel = new ServiceResponseModel(a);
                return new ServiceModel(responseModel.id, responseModel.name);
            });
    }

    async activateBonus(promoCode, serviceId) {
        let requestModel = new ActivateBonusRequestModel();
        requestModel.promoCode = promoCode;
        requestModel.serviceId = serviceId;

        let responseModel = new ServiceResponseModel(await this.client.activateBonus(this.clientDefaultVersion, requestModel));
        
        return new ServiceModel(responseModel.id, responseModel.name);
    }
};
