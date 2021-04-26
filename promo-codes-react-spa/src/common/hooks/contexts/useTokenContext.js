import { useContext } from "react";
import { TokenContext } from "../../../App";
import ContextProviderValueModel from "../../models/ContextProviderValueModel";
import TokenDetailModel from "../../models/TokenDetailModel";

/**
 * Hook used to manage the TokenContext.
 * @returns Object containing token model and a callback function to set it.
 */
export default function useTokenContext() {
    let valueModel = new ContextProviderValueModel();
    valueModel = useContext(TokenContext);
    let model = new TokenDetailModel();
    model = valueModel.state;
    /**
     * Callback function used to set the token detail model in the context.
     * @param {TokenDetailModel} _ The token detail model to be used to set in the context.
     * @returns undefined.
     */
    let setState = (_) => undefined;
    setState = valueModel.setState;
    return { state: model, setState }
}