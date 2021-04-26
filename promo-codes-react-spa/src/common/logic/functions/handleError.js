import ErrorModel from "../../models/ErrorModel";

/**
 * Handle application error. Error is expected to be already transformed to ErrorModel.
 * @param {ErrorModel} error Error expected to be already transformed to ErrorModel.
 * @param {(_: ErrorModel) => undefined} callback Callback that needs error data.
 */
export default function handleError(error, callback) {
    console.log(error);
    if (callback) {
        callback(error);
    }
}