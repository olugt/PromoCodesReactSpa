import ServicesService from '../infrastructure/promo-code/ServicesService';
import ErrorModel from '../common/models/ErrorModel';
import TokenDetailModel from '../common/models/contexts/TokenDetailModel';
import { handleError } from '../common/logic/errorLogic';

/**
 * Activate bonus for user.
 * @param {TokenDetailModel} tokenDetail Identity token model.
 * @param {String} promoCode Promo code.
 * @param {Number} serviceId ID of service.
 * @param {(_: Number) => undefined} callBackWithServiceId Call back with the service ID returned from the web API.
 * @param {(_: ErrorModel) => undefined} handErrorCallback Callback that needs error.
 */
export default function activateBonus(
    tokenDetail,
    promoCode,
    serviceId,
    callBackWithServiceId,
    handErrorCallback) {

    new ServicesService(tokenDetail.token).activateBonus(promoCode, serviceId)
        .then(value => {
            callBackWithServiceId(value.id);
        })
        .catch(error => handleError(error, handErrorCallback));

}