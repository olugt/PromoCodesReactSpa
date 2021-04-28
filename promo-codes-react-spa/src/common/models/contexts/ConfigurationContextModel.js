/**
 * Model for managing custom configurations, available to components.
 */
export default class ConfigurationContextModel {
    constructor() {
        
    }

    /**
     * Get the default page items limit.
     * @returns {String}
     */
    getDefaultPageItemsLimit() {
        return process.env.REACT_APP_DEFAULT_PAGE_ITEMS_LIMIT;
    }
};
