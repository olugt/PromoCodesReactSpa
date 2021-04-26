import { useContext } from "react";
import { ConfigurationContext } from "../../../App";
import ConfigurationModel from "../../models/ConfigurationModel";
import ContextProviderValueModel from "../../models/ContextProviderValueModel";

export default function useConfigurationContext() {
    let valueModel = new ContextProviderValueModel();
    valueModel = useContext(ConfigurationContext);
    let model = new ConfigurationModel();
    model = valueModel.state;
    /**
     * Callback function used to set the configuration detail model in the context.
     * @param {ConfigurationModel} _ The configuration detail model to be used to set in the context.
     * @returns undefined.
     */
    let setState = (_) => undefined;
    setState = valueModel.setState;
    return { state: model, setState }
}