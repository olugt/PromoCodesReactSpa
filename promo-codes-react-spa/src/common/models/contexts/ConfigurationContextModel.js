import { ERROR_CODES } from "../../constants/ErrorCodesConstants";
import { MAGIC_STRINGS } from "../../constants/MagicStringsConstants";
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
     * @returns {Number}
     */
    getDefaultPageItemsLimitFactor() {
        return process.env.REACT_APP_DEFAULT_PAGE_ITEMS_LIMIT_FACTOR;
    }

    /**
     * Get minimum number of characters to type into the services search field before data is loaded.
     * @returns {Number}
     */
    getMinimumCharactersLimitForServicesSearchField() {
        return Number.parseInt(process.env.REACT_APP_MINIMUM_CHARACTERS_LIMIT_SERVICES_SEARCH);
    }

    /**
     * Check if mocking of promo codes infrastructure is enabled.
     * @returns 
     */
    shouldMockPromoCodesInfrastructure() {
        if (process.env.NODE_ENV === MAGIC_STRINGS.developmentEnvironment) {
            const configValue = process.env.REACT_APP_SHOULD_MOCK_PROMO_CODES_INFRASTRUCTURE;
            return convertFromBooleanString(configValue);
        } else {
            return false;
        }
    }

    /**
     * 
     * @returns {String} Base URL of the promo codes web API.
     */
    getPromoCodesWebApiBaseUrl() {
        return process.env.REACT_APP_PROMO_CODES_WEB_API_BASE_URL;
    }

    /**
     * 
     * @returns {String} Default version to use for promo codes web API.
     */
    getPromoCodesWebApiDefaultVersion() {
        return process.env.REACT_APP_PROMO_CODES_WEB_API_DEFAULT_VERSION;
    }

    /**
     * 
     * @returns {Number} Fake JWT expiration duration in minutes.
     */
    getFakeJwtExpirationDurationMinutes() {
        if (process.env.NODE_ENV === MAGIC_STRINGS.developmentEnvironment) {
            return Number.parseInt(process.env.REACT_APP_FAKE_JWT_EXPIRATION_DURATION_MINUTES);
        } else {
            throw new ErrorModel("Fake JWT only applicable to development.", null, ERROR_CODES.invalidConfigurationError);
        }
    }
};
