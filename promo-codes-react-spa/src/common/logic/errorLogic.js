import { ERROR_CODES } from "../constants/ErrorCodesConstants";
import ErrorModel from "../models/ErrorModel";
import { makeLoginUrlOnIdentityError } from "./identityLogic";

/**
 * Handle application error. Error is expected to be already transformed to ErrorModel.
 * @param {ErrorModel} error Error expected to be already transformed to ErrorModel.
 * @param {(_: ErrorModel) => undefined} callback Callback that needs error data.
 */
function handleError(error, callback) {
    console.log(error);
    
    if (error.code === ERROR_CODES.identityError) {
        const origin = window.location.origin;
        window.location.href = origin + makeLoginUrlOnIdentityError(window.location.href.replace(origin, ""));
    }

    if (callback) {
        callback(error);
    }
}

export { handleError }