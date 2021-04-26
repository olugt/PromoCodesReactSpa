import TokenDetailModel from "../../models/TokenDetailModel";
import ServiceModel from '../../models/ServiceModel'
import ServicesService from '../../../services/promo-code/ServicesService'
import handleError from "./handleError";
import ErrorModel from "../../models/ErrorModel";

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

    new ServicesService(tokenDetail.token).searchServices(serviceNameSnippet, page, limit)
        .then(value => {
            setServicesState([...value]);
        })
        .catch(error => handleError(error, handErrorCallback));

}