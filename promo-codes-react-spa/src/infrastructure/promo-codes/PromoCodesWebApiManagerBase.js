import { ERROR_CODES } from "../../common/constants/ErrorCodesConstants";
import ConfigurationContextModel from "../../common/models/contexts/ConfigurationContextModel";
import ErrorModel from "../../common/models/ErrorModel";
import { ApiException, ObjectErrorResponseModel, PromoCodesAspNetCoreWebApiClient, ValidationErrorResponseModel } from "./dependencies/PromoCodesAspNetCoreWebApiClient";

export default class PromoCodesWebApiManagerBase {
    /**
     * Constructs with an identity token.
     * @param {String} token The identity token, to be passed by derived classes that have it.
     */
    constructor(token) {
        this.client = new PromoCodesAspNetCoreWebApiClient(new ConfigurationContextModel().getPromoCodesWebApiBaseUrl());
        if (token) {
            this.client.setToken(token);
        }

        this.clientDefaultVersion = new ConfigurationContextModel().getPromoCodesWebApiDefaultVersion();
    }

    /**
     * Transforms errors by derived classes.
     * @param {*} error Any exception or error to be transformed to ErrorModel.
     * @returns ErrorModel transformed from error.
     */
    static TransformError(error) {
        let errorModel = new ErrorModel();

        if (error instanceof ApiException) {
            let apiException = new ApiException();
            Object.assign(apiException, error);

            if (apiException.status && apiException.response) {
                /**
                 * @type {{message: string, data: {}}}
                 */
                let allError = JSON.parse(error.response);

                let allErrorProps = Object.getOwnPropertyNames(allError);

                if (!allErrorProps.some(a => Object.getOwnPropertyNames(new ValidationErrorResponseModel()).find(b => b !== a))) {
                    let valdErrResModel = new ValidationErrorResponseModel();
                    Object.assign(valdErrResModel, allError);

                    errorModel.message = valdErrResModel.message;
                    errorModel.data = valdErrResModel.data;
                } else if (!allErrorProps.some(a => Object.getOwnPropertyNames(new ObjectErrorResponseModel()).find(b => b !== a))) {
                    let objErrResModel = new ObjectErrorResponseModel();
                    Object.assign(objErrResModel, allError);

                    errorModel.message = objErrResModel.message;
                    errorModel.data = objErrResModel.data;
                } else {
                    errorModel.message = "Undocumented specific error occurred.";
                    errorModel.data = allError;
                }
            } else {
                errorModel.message = apiException.message;
                errorModel.data = error;
            }

            errorModel.code = this.TransformApiExceptionStatusToErrorCode(apiException);
        } else {
            errorModel = new ErrorModel("Undocumented error occurred.", error, ERROR_CODES.undocumentedOrUnknownError);
        }

        return errorModel;
    }

    /**
     * The ApiException class object in this infrastructure dependency.
     * @param {ApiException} apiException 
     */
    static TransformApiExceptionStatusToErrorCode(apiException) {

        /**
         * @type {String}
         */
        let errorCode;

        switch (apiException.status) {
            case 400: errorCode = ERROR_CODES.validationError; break;
            case 401: errorCode = ERROR_CODES.identityError; break;
            case 404: errorCode = ERROR_CODES.notFoundError; break;
            default: errorCode = null;
        }

        return errorCode;
    }
};
