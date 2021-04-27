import { useContext } from "react";
import { TokenContext } from "../../App";
import { isTokenValid } from "../../common/logic/identityLogic";
import { checkCookieExists, setCookie, unSetCookie, getCookie } from "../../common/logic/browserLogic";
import ContextProviderValueModel from "../../common/models/ContextProviderValueModel";
import TokenDetailModel from "../../common/models/contexts/TokenDetailModel";
import { shouldAssignStateFromBackingStore } from "../../common/logic/contextProviderLogic";
import { MAGIC_STRINGS } from "../../common/constants/MagicStringsConstants";

/**
 * Hook used to manage the TokenContext.
 * @returns Object containing token model and a callback function to set it.
 */
export default function useTokenContext() {
    const identityCookieName = MAGIC_STRINGS.identityTokenCookieName;

    let valueModel = new ContextProviderValueModel();
    valueModel = useContext(TokenContext);
    let model = new TokenDetailModel();
    model = valueModel.state;

    /**
     * 
     * @type {(value: TokenDetailModel) => undefined} 
     */
    let setState = (tokenDetail) => {
        if (isTokenValid(tokenDetail)) {
            setCookie(identityCookieName, JSON.stringify(tokenDetail), tokenDetail.expiryDatetimeUtc);
        } else {
            unSetCookie(identityCookieName);
        }
        valueModel.setState(tokenDetail);
        valueModel.isSetLaterAfterContructed = true;
    };

    if (shouldAssignStateFromBackingStore(valueModel, model)) {
        try {
            const tokenCookie = getCookie(identityCookieName);
            model = JSON.parse(tokenCookie); // This may throw error if the cookie had been saved as undefined, etc. that are not valid JSON.
        } catch {
            model = null;
        }
    }

    return { state: (checkCookieExists(identityCookieName) ? model : null), setState }
}