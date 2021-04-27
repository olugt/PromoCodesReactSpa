import ServicesService from "../infrastructure/promo-code/ServicesService";
import ErrorModel from "../common/models/ErrorModel";
import ServiceModel from "../common/models/ServiceModel";
import TokenDetailModel from "../common/models/contexts/TokenDetailModel";
import { handleError } from "../common/logic/errorLogic";

/**
 * Get all services, but paged.
 * @param {TokenDetailModel} tokenDetail Identity toke details.
 * @param {(_: ServiceModel[])} setServicesState Callback to set list of services.
 * @param {(_: ErrorModel)} handErrorCallback Call back to use error.
 */
export default function getServices(
    tokenDetail,
    page,
    limit,
    setServicesState,
    handErrorCallback
) {

    new ServicesService(tokenDetail?.token).getServices(page, limit)
        .then(value => {
            setServicesState([...value]);
        })
        .catch(error => handleError(error, handErrorCallback));

}