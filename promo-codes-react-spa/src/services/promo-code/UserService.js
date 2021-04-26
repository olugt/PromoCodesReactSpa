import TokenDetailModel from "../../common/models/TokenDetailModel";
import { JwtDetailResponseModel, LoginRequestModel } from "../../infrastructure/web-api/PromoCodesAspNetCoreWebApiClient";
import BaseService from "./BaseService";

export default class UserService extends BaseService {
    constructor() {
        super();
    }

    /**
     * Process login for the user with the supplied credentials.
     * @param {String} emailAddress User's email address.
     * @param {String} password User's password.
     * @returns Identity token detail.
     */
    async processLogin(emailAddress, password) {
        try {
            let requestModel = new LoginRequestModel();
            requestModel.emailAddress = emailAddress;
            requestModel.password = password;

            let responseModel = new JwtDetailResponseModel(await this.client.login(this.clientDefaultVersion, requestModel));
            let tokenDetail = new TokenDetailModel(responseModel.jwtDetail.jwt, responseModel.jwtDetail.expiryDatetimeUtc);
            return tokenDetail;
        }
        catch (error) {
            throw BaseService.TransformError(error);
        }
    }
};

