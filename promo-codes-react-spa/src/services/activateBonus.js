import PromoCodesWebApiServicesManager from '../infrastructure/promo-codes/PromoCodesWebApiServicesManager';
import ErrorModel from '../common/models/ErrorModel';
import TokenDetailContextModel from '../common/models/contexts/TokenDetailContextModel';
import { handleError } from '../common/logic/errorLogic';

/**
 * Activate bonus for user.
 * @param {TokenDetailContextModel} tokenDetail Identity token model.
 * @param {String} promoCode Promo code.
 * @param {Number} serviceId ID of service.
 * @param {(_: Number) => undefined} onSuccessfulBonusActivationCallback Call back with the service ID returned from the web API, on successful bonus activation.
 * @param {(_: ErrorModel) => undefined} handleErrorCallback Callback that needs error.
 */
export default function activateBonus(
    tokenDetail,
    promoCode,
    serviceId,
    onSuccessfulBonusActivationCallback,
    handleErrorCallback) {

    new PromoCodesWebApiServicesManager(tokenDetail.token).activateBonus(promoCode, serviceId)
        .then(value => {
            onSuccessfulBonusActivationCallback(value.id);
        })
        .catch(error => handleError(error, handleErrorCallback));

}