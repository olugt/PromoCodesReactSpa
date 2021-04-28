import PromoCodesWebApiServicesManager from "../infrastructure/promo-codes/PromoCodesWebApiServicesManager";
import ErrorModel from "../common/models/ErrorModel";
import ServiceModel from "../common/models/ServiceModel";
import TokenDetailContextModel from "../common/models/contexts/TokenDetailContextModel";
import { handleError } from "../common/logic/errorLogic";

/**
 * Get all services, but paged.
 * @param {TokenDetailContextModel} tokenDetail Identity toke details.
 * @param {(_: ServiceModel[])} setServicesState Callback to set list of services.
 * @param {(_: ErrorModel)} handleErrorCallback Call back to use error.
 */
export default function getServices(
    tokenDetail,
    page,
    limit,
    setServicesState,
    handleErrorCallback
) {

    new PromoCodesWebApiServicesManager(tokenDetail?.token).getServices(page, limit)
        .then(value => {
            setServicesState([...value]);
        })
        .catch(error => handleError(error, handleErrorCallback));

}