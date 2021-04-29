import { ERROR_CODES } from "../constants/ErrorCodesConstants";
import ErrorModel from "../models/ErrorModel";

/**
 * Convert boolean string to actual boolean data type.
 * @param {String} booleanString A string representation of a boolean value (i.e. "true" or "false"), e.g. in .env file.
 * @returns Boolean representation of the boolean string.
 */
function convertFromBooleanString(booleanString) {
    if (booleanString === "true") {
        return true;
    } else if (booleanString === "false") {
        return false;
    } else {
        throw new ErrorModel(`Invalid configuration value! Boolean string ("true" or "false") expected. Value: ${booleanString}`, null, ERROR_CODES.invalidConfigurationError);
    };
}

export { convertFromBooleanString }