import ErrorModel from "../../common/models/ErrorModel";
import { ApiException, ObjectErrorResponseModel, PromoCodesAspNetCoreWebApiClient, ValidationErrorResponseModel } from "../../infrastructure/web-api/PromoCodesAspNetCoreWebApiClient";

export default class BaseService {
    /**
     * Constructs with an identity token.
     * @param {String} token The identity token, to be passed by derived classes that have it.
     */
    constructor(token) {
        this.client = new PromoCodesAspNetCoreWebApiClient(process.env.REACT_APP_PROMO_CODES_WEB_API_BASE_URL);
        if (token) {
            this.client.setToken(token);
        }

        this.clientDefaultVersion = process.env.REACT_APP_PROMO_CODES_WEB_API_DEFAULT_VERSION;
    }

    /**
     * Transforms errors by derived classes.
     * @param {*} error Any exception or error to be transformed to ErrorModel.
     * @returns ErrorModel transformed from error.
     */
    static TransformError(error) {
        // console.log(JSON.stringify(error));
        let errorModel = new ErrorModel();

        if (error instanceof ApiException) {
            let apiException = new ApiException();
            Object.assign(apiException, error);

            if (apiException.status && apiException.response) {
                /**
                 * @type {{message: string, data: {}}}
                 */
                let allError = JSON.parse(error.response);
                console.log("AAAAAA");
                console.log(allError);

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
        } else {
            errorModel = new ErrorModel("Undocumented error occurred.", error);
        }

        // console.log(errorModel);
        return errorModel;
    }
};
