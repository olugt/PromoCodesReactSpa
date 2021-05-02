import { useContext } from "react";
import ContextProviderValueModel from "../../common/models/ContextProviderValueModel";
import ContextModelBase from "../../common/models/contexts/ContextModelBase";

/**
 * Initializes the context model from useContext() (and the provder value model), for further action in the custom hook managing the context model.
 * @param {React.Context<any>} Context React context to use, passed directly as exported from creation by React's createContext().
 * @param {ContextModelBase} newedContextModel A parameterless initialization of the context backing model, for example, new TokenDetailContextModel(). A context backing model should inherit/extend ContextModelBase.
 * @returns Initialized context model (initialized from context via useContext() and the provider value model, and it should be casted into the desired context model that derives/extends ContextModelBase) and the provider value model.
 */
function usePreliminaryInitializeContextModel(Context, newedContextModel) {
    let contextProviderValueModel = new ContextProviderValueModel();
    contextProviderValueModel = useContext(Context);
    let contextModel = newedContextModel;
    contextModel = contextProviderValueModel.state;
    return { contextModel, contextProviderValueModel };
}

/**
 * This is intended to be called in the hook used to manage the context of a state. It should be called as the last option to recover state value for the state (i.e. after state has already been attempted to be assigned by useContext(), etc.) and the recovering of the state must be by direct assignment of a value to the state (i.e. not by calling setState with a value).
 * @param {ContextProviderValueModel} contextProviderValueModel The instance of ContextProviderValueModel associated with the state.
 * @param {ContextModelBase} state Value should be an instance of a class that inherits/implements from ContextModelBase, i.e a model that can be used as context state.
 */
function shouldAssignStateFromBackingStore(contextProviderValueModel, state) {
    return (contextProviderValueModel?.wasConstructedWithParameters === true
        && state?.wasConstructedWithoutParameters === true);
}

/**
 * 
 * @param {React.Context<any>} Context React context to use, passed directly as exported from creation by React's createContext().
 * @param {ContextModelBase} newedContextModel A new instance of the model of the context. It should be preferrably be passed like in "new Model()", because it is still overriden by the process, hence, no need to initialize its properties with any values.
 * @param {(_: ContextModelBase) => ContextModelBase} runWhenSystemNeedsToRetrieveStateFromBackingStore To run when system needs to retrieve state from backing store. The system decides when it needs the state to be retrieved from backing store (e.g. when the state is lost). So, use this to retrieve the state from your backing store, or to modify the incoming state, or to return something entirely new and different, but must be of same type as what the state expects. Something not null and not undefined must be returned, unless it is intentional to return those, but note that the system runs this when it really needs to retrieve state from the backing store.
 * @param {() => Boolean} checkToRunBeforeStateIsFinallyReturned Check to run just before system finally returns state, and the check is to determine if system should finally return state or return null. If true, the state the system has processed is returned, otherwise, null is returned as state. For example, the check can be about checking if authentication token (i.e. state) is still valid when token is being retrieved from token context.
 * @param {(_: ContextModelBase) => ContextModelBase} runWhenSetStateIsCalled When you attempt to set state, with this, retrieve state being set, then save it to your backing store or modify it and/or return it or what should actually be set into state. What to be returned must be same type as what the state expects.
 * @returns 
 */
function useProcessCustomContext(
    Context,
    newedContextModel,
    runWhenSystemNeedsToRetrieveStateFromBackingStore,
    checkToRunBeforeStateIsFinallyReturned,
    runWhenSetStateIsCalled
) {

    let { contextModel, contextProviderValueModel } = usePreliminaryInitializeContextModel(Context, newedContextModel);

    if (shouldAssignStateFromBackingStore(contextProviderValueModel, contextModel)) {
        contextModel = runWhenSystemNeedsToRetrieveStateFromBackingStore(contextModel);
    }

    const shouldFinallyAssignStateToTheContextModelOtherwiseAssignStateToNull = checkToRunBeforeStateIsFinallyReturned();

    /**
     * 
     * @type {(value: ContextModelBase) => undefined} 
     */
    let setState = (model) => {
        contextProviderValueModel.setState(runWhenSetStateIsCalled(model));
        contextProviderValueModel.isSetLaterAfterContructed = true;
    }

    return {
        state: (shouldFinallyAssignStateToTheContextModelOtherwiseAssignStateToNull ? contextModel : null),
        setState
    }
}

/**
 * 
 * @param {React.Context<any>} Context React context to use, passed directly as exported from creation by React's createContext().
 * @param {ContextModelBase} newedContextModel A new instance of the model of the context. It should be preferrably be passed like in "new Model()", because it is still overriden by the process, hence, no need to initialize its properties with any values.
 * @returns 
 */
function useProcessSimpleCustomContext(
    Context,
    newedContextModel
) {

    return useProcessCustomContext(
        Context,
        newedContextModel,
        contextModel => contextModel,
        () => true,
        contextModel => contextModel
    );

}

export { useProcessCustomContext, useProcessSimpleCustomContext }