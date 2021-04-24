import TokenDetailModel from "../../common/models/TokenDetailModel";
import { JwtDetailResponseModel, LoginRequestModel } from "../../infrastructure/web-api/PromoCodesAspNetCoreWebApiClient";
import BaseService from "./BaseService";

export default class UserService extends BaseService {
    constructor() {
        super();
    }

    async processLogin(emailAddress, password) {
        try {
            let requestModel = new LoginRequestModel();
            requestModel.emailAddress = emailAddress;
            requestModel.password = password;

            let responseModel = new JwtDetailResponseModel(await this.client.login(this.clientDefaultVersion, requestModel));

            return new TokenDetailModel(responseModel.jwtDetail.jwt, responseModel.jwtDetail.expiryDatetimeUtc);
        }
        catch (error) {
            throw BaseService.TransformError(error);
        }
    }
};

