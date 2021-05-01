import PromoCodesWebApiUserManager from "../infrastructure/promo-codes/PromoCodesWebApiUserManager";
import ErrorModel from "../common/models/ErrorModel";
import TokenDetailContextModel from "../common/models/contexts/TokenDetailContextModel";
import { handleError } from "../common/logic/errorLogic";

/**
 * 
 * @param {string} emailAddress User's email address from login form.
 * @param {string} password User's password from login form.
 * @param {(_: TokenDetailContextModel) => { }} setTokenContextState The setState callback function for managing the identity token context.
 * @param {(_) => { }} doRestOnSuccessfulLogin The callback function that runs what else to do on successful login. The caller of processLogin can use it for navigating to redirect URL, etc.
 * @param {(_: ErrorModel) => undefined} handleErrorCallback Callback that needs error.
 */
export default function processLogin(
    emailAddress,
    password,
    setTokenContextState,
    doRestOnSuccessfulLogin,
    handleErrorCallback) {

    new PromoCodesWebApiUserManager().processLogin(emailAddress, password)
        .then(value => {
            setTokenContextState(value);
            doRestOnSuccessfulLogin();
        })
        .catch(error => {
            console.log(error);
            handleErrorCallback(error);
        });

}