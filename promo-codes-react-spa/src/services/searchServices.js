import TokenDetailModel from "../common/models/contexts/TokenDetailModel";
import ServiceModel from '../common/models/ServiceModel'
import ServicesService from '../infrastructure/promo-code/ServicesService'
import { handleError } from "../common/logic/errorLogic";
import ErrorModel from "../common/models/ErrorModel";

/**
 * Search for services using name snippet.
 * @param {String} serviceNameSnippet Snippet of service name.
 * @param {Number} page Page number.
 * @param {Number} limit Page items limit.
 * @param {TokenDetailModel} tokenDetail Identity token model.
 * @param {(_: ServiceModel[]) => undefined} setServicesState The setState callback function for refreshing the array of services expected. 
 * @param {(_: ErrorModel) => undefined} handErrorCallback Callback that needs error.
 */
export default function searchServices(
    tokenDetail,
    serviceNameSnippet,
    page,
    limit,
    setServicesState,
    handErrorCallback) {

    new ServicesService(tokenDetail?.token).searchServices(serviceNameSnippet, page, limit)
        .then(value => {
            setServicesState([...value]);
        })
        .catch(error => handleError(error, handErrorCallback));

}