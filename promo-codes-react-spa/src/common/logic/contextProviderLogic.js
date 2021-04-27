import ContextProviderValueModel from "../models/ContextProviderValueModel";
import ContextModelBase from "../models/contexts/ContextModelBase";

/**
 * This is intended to be called in the hook used to manage the context of a state. It should be called as the last option to recover state value for the state (i.e. after state has already been attempted to be assigned by useContext(), etc.) and the recovering of the state must be by direct assignment of a value to the state (i.e. not by calling setState with a value).
 * @param {ContextProviderValueModel} contextProviderValueModel The instance of ContextProviderValueModel associated with the state.
 * @param {ContextModelBase} state Value should be an instance of a class that inherits/implements from ContextModelBase, i.e a model that can be used as context state.
 */
function shouldAssignStateFromBackingStore(contextProviderValueModel, state) {
    return (contextProviderValueModel?.isConstructedExplicitly === true
        && state?.atBaseSaysChildConstructedWithoutParameters === true);
}

export { shouldAssignStateFromBackingStore }