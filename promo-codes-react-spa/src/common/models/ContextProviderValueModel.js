export default class ContextProviderValueModel {
    /**
     * Used to generally manage context provider's useState array.
     * @param {Object} state The state array item from the useState managing the concerned context provider.
     * @param {(_) => undefined} setState The setState array item from the useState managing the concerned context provider.
     */
    constructor(state, setState) {
        this.state = state;
        this.setState = setState;

    }
};
