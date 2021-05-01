import PromoCodesWebApiServicesManager from "../infrastructure/promo-codes/PromoCodesWebApiServicesManager";
import ErrorModel from "../common/models/ErrorModel";
import ServiceModel from "../common/models/ServiceModel";
import TokenDetailContextModel from "../common/models/contexts/TokenDetailContextModel";
import { handleError } from "../common/logic/errorLogic";

/**
 * Get all services, but paged.
 * @param {TokenDetailContextModel} tokenDetail Identity toke details.
 * @param {Number} page Page number.
 * @param {Number} limit Page items limit.
 * @param {(_: ServiceModel[]) => {}} handleValue Callback to process services received.
 * @param {(_: ErrorModel) => {}} handleErrorCallback Call back to use error.
 */
export default function getServices(
    tokenDetail,
    page,
    limit,
    handleValue,
    handleErrorCallback
) {

    new PromoCodesWebApiServicesManager(tokenDetail?.token).getServices(page, limit)
        .then(value => {
            handleValue(value);
        })
        .catch(error => handleError(error, handleErrorCallback));

}