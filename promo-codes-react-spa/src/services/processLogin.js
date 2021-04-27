import UserService from "../infrastructure/promo-code/UserService";
import ErrorModel from "../common/models/ErrorModel";
import TokenDetailModel from "../common/models/contexts/TokenDetailModel";
import { handleError } from "../common/logic/errorLogic";

/**
 * 
 * @param {string} emailAddress User's email address from login form.
 * @param {string} password User's password from login form.
 * @param {(_: TokenDetailModel) => { }} setTokenContextState The setState callback function for managing the identity token context.
 * @param {(_) => { }} doRestOnSuccessfulLogin The callback function that runs what else to do on successful login. The caller of processLogin can use it for navigating to redirect URL, etc.
 * @param {(_: ErrorModel) => undefined} handErrorCallback Callback that needs error.
 */
export default function processLogin(
    emailAddress,
    password,
    setTokenContextState,
    doRestOnSuccessfulLogin,
    handErrorCallback) {

    new UserService().processLogin(emailAddress, password)
        .then(value => {
            setTokenContextState(value);
            doRestOnSuccessfulLogin();
        })
        .catch(error => handleError(error, handErrorCallback));

}