import { TokenContext } from "../../App";
import { isTokenValid } from "../../common/logic/identityLogic";
import { checkCookieExists, setCookie, unSetCookie, getCookie } from "../../common/logic/browserLogic";
import TokenDetailContextModel from "../../common/models/contexts/TokenDetailContextModel";
import { MAGIC_STRINGS } from "../../common/constants/MagicStringsConstants";
import { useProcessCustomContext } from "./customContextHooks";

/**
 * Hook used to manage the TokenContext.
 * @returns Object containing token model and a callback function to set it, as state and setState.
 */
export default function useTokenContext() {
    const identityCookieName = MAGIC_STRINGS.identityTokenCookieName;

    /**
     * @type {{state: TokenDetailContextModel, setState: (_: TokenDetailContextModel) => undefined}}
     */
    let returnValue = useProcessCustomContext(
        TokenContext,
        new TokenDetailContextModel(),
        /**
         * 
         * @param {TokenDetailContextModel} tokenDetailContextModel 
         * @returns {TokenDetailContextModel}
         */
        (tokenDetailContextModel) => {

            try {
                const tokenCookie = getCookie(identityCookieName);
                tokenDetailContextModel.fromParsedJson(JSON.parse(tokenCookie)); // JSON.parse function may throw error if the cookie had been saved as undefined, etc. that are not valid JSON.
            } catch {
                tokenDetailContextModel = null;
            }

            return tokenDetailContextModel;

        },
        () => {

            return checkCookieExists(identityCookieName);

        },
        /**
         * 
         * @param {TokenDetailContextModel} tokenDetailContextModel 
         * @returns {TokenDetailContextModel}
         */
        (tokenDetailContextModel) => {

            if (isTokenValid(tokenDetailContextModel)) {
                setCookie(identityCookieName, JSON.stringify(tokenDetailContextModel), tokenDetailContextModel.expiryDatetime);
            } else {
                unSetCookie(identityCookieName);
            }
            return tokenDetailContextModel;

        });
    return returnValue;
}