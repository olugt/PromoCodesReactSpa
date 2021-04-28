import { ConfigurationContext } from "../../App";
import ConfigurationContextModel from "../../common/models/contexts/ConfigurationContextModel";
import { useProcessSimpleCustomContext } from "./customContextHooks";

/**
 * Hook used to manage the ConfigurationContext.
 * @returns Object containing configuration model and a callback function to set it, as state and setState.
 */
export default function useConfigurationContext() {

    return useProcessSimpleCustomContext(
        ConfigurationContext,
        new ConfigurationContextModel()
    )

}