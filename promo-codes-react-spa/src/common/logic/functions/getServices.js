import ServicesService from "../../../services/promo-code/ServicesService";
import ErrorModel from "../../models/ErrorModel";
import ServiceModel from "../../models/ServiceModel";
import TokenDetailModel from "../../models/TokenDetailModel";
import handleError from "./handleError";

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

    new ServicesService(tokenDetail.token).getServices(page, limit)
        .then(value => {
            setServicesState([...value]);
        })
        .catch(error => handleError(error, handErrorCallback));

}