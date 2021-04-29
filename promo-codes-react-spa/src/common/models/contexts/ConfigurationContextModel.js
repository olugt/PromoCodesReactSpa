import { ERROR_CODES } from "../../constants/ErrorCodesConstants";
import { convertFromBooleanString } from "../../logic/configurationLogic";
import ErrorModel from "../ErrorModel";
import ContextModelBase from "./ContextModelBase";

/**
 * Model for managing custom configurations, available to components.
 */
export default class ConfigurationContextModel extends ContextModelBase {
    constructor() {
        super();
    }

    /**
     * Get the default page items limit.
     * @returns {String}
     */
    getDefaultPageItemsLimit() {
        return process.env.REACT_APP_DEFAULT_PAGE_ITEMS_LIMIT;
    }

    /**
     * Check if mocking of promo codes infrastructure is enabled.
     * @returns {Boolean}
     */
    shouldMockPromoCodesInfrastructure() {
        const configValue = process.env.REACT_APP_SHOULD_MOCK_PROMO_CODES_INFRASTRUCTURE;
        return convertFromBooleanString(configValue);
    }
};
