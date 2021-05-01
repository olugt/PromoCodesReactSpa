import TokenDetailContextModel from "../common/models/contexts/TokenDetailContextModel";
import ServiceModel from '../common/models/ServiceModel'
import PromoCodesWebApiServicesManager from '../infrastructure/promo-codes/PromoCodesWebApiServicesManager'
import { handleError } from "../common/logic/errorLogic";
import ErrorModel from "../common/models/ErrorModel";

/**
 * Search for services using name snippet.
 * @param {TokenDetailContextModel} tokenDetail Identity token model.
 * @param {String} serviceNameSnippet Snippet of service name.
 * @param {Number} page Page number.
 * @param {Number} limit Page items limit.
 * @param {(_: ServiceModel[]) => {}} handleValue Callback to process services received.
 * @param {(_: ErrorModel) => {}} handleErrorCallback Call back to use error.
 */
export default function searchServices(
    tokenDetail,
    serviceNameSnippet,
    page,
    limit,
    handleValue,
    handleErrorCallback) {

    new PromoCodesWebApiServicesManager(tokenDetail?.token).searchServices(serviceNameSnippet, page, limit)
        .then(value => {
            handleValue(value);
        })
        .catch(error => handleError(error, handleErrorCallback));

}