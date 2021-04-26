import UserService from "../../../services/promo-code/UserService";
import { LOCATION_PATHS } from "../../constants/LocationPathsConstants";
import ErrorModel from "../../models/ErrorModel";
import NotificationModel from "../../models/NotificationModel";
import TokenDetailModel from "../../models/TokenDetailModel";
import handleError from "./handleError";

/**
 * 
 * @param {string} emailAddress User's email address from login form.
 * @param {string} password User's password from login form.
 * @param {(_: TokenDetailModel) => { }} setTokenContextState The setState callback function for managing the identity token context.
 * @param {(_: string) => { }} navigateTo The callback function for navigating to the location string in parameter.
 * @param {(_: ErrorModel) => undefined} handErrorCallback Callback that needs error.
 */
export default function processLogin(
    emailAddress,
    password,
    setTokenContextState,
    navigateTo,
    handErrorCallback) {

    new UserService().processLogin(emailAddress, password)
        .then(value => {
            setTokenContextState(value);
            navigateTo(LOCATION_PATHS.services);
        })
        .catch(error => handleError(error, handErrorCallback));

}