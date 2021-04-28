import TokenDetailContextModel from "../../common/models/contexts/TokenDetailContextModel";
import { JwtDetailResponseModel, LoginRequestModel } from "./dependencies/PromoCodesAspNetCoreWebApiClient";
import PromoCodesWebApiManagerBase from "./PromoCodesWebApiManagerBase";

export default class PromoCodesWebApiUserManager extends PromoCodesWebApiManagerBase {
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
            let tokenDetail = new TokenDetailContextModel(responseModel.jwtDetail.jwt, responseModel.jwtDetail.expiryDatetimeUtc);
            return tokenDetail;
        }
        catch (error) {
            throw PromoCodesWebApiManagerBase.TransformError(error);
        }
    }
};

