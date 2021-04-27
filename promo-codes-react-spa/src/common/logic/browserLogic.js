import { MAGIC_STRINGS } from "../constants/MagicStringsConstants";

/**
 * Set item into browser/document cookie.
 * @param {String} name Name of cookie. Must be unique.
 * @param {String} value Value of cookie. Can only be in string form.
 * @param {Date} expiryDatetimeUtc Date-time of expiry of the cookie.
 */
function setCookie(name, value, expiryDatetimeUtc) {
    document.cookie = `${name}=${value};expires=${expiryDatetimeUtc.toUTCString()};path=/`;
}

/**
 * Unset a cookie in the browser/document cookie. It expects operation to run in same local or UTC time.
 * @param {String} name Name of cookie. Must be unique.
 */
function unSetCookie(name) {
    let toBePastDate = new Date();
    toBePastDate.setDate(toBePastDate.getDate() - 10);
    document.cookie = `${name}=;expires=${toBePastDate.toUTCString()};path=/`;
}

/**
 * Check if cookie exists in browser/document.
 * @param {String} name Name of cookie to check for.
 * @returns Whether or not said cookie exists in browser/document.
 */
function checkCookieExists(name) {
    return document.cookie.split(";").some((a) => a.trim().startsWith(`${name}=`))
}

/**
 * Get cookie by using the name as it was set in browser/document.
 * @param {String} name Name of cookie to get.
 * @returns Value of cookie or undefined (or null?) if the cooking is not found.
 */
function getCookie(name) {
    return document.cookie.split("; ")?.find(a => a?.startsWith(`${name}=`))?.split("=")[1]
}

/**
 * Get redirect URL from url parameter.
 * @param {String} url Absolute URL to use.
 * @returns Relative-to-origin (wrt url parameter) and decoded redirect URL extracted from url parameter. So, this should be noted when initially making the url parameter URL.
 */
function getRedirectUrlFromUrl(url) {
    const redirectUrl = getRedirectUrlQueryParameterValue(url);
    return decodeURIComponent(redirectUrl);
}

/**
 * Get the redirect URL from query string parameter of a URL.
 * @param {String} url Absolute URL to use.
 * @returns Relative-to-origin (wrt url parameter) redirect URL query string parameter value as seen in the URL likely encoded. So, this should be noted when initially making the url parameter URL.
 */
function getRedirectUrlQueryParameterValue(url) {
    return (new URL(url)).searchParams.get(MAGIC_STRINGS.redirectUrlQueryParameter);
}

/**
 * Determines whether or not redirect URL is in a URL.
 * @param {String} url Absolute URL to use.
 * @returns Whether or not url parameter contains redirect URL. The query string parameter name is as in MAGIC_STRINGS constant.
 */
function doesUrlHaveRedirectUrl(url) {
    return (getRedirectUrlQueryParameterValue(url) ? true : false)
}

export { setCookie, unSetCookie, checkCookieExists, getCookie, getRedirectUrlFromUrl, doesUrlHaveRedirectUrl }