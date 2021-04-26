import ErrorModel from "./ErrorModel";

export default class NotificationModel {
    /**
     * Instantiate with just notification message.
     * @param {String} message Notification message.
     */
    constructor(message) {
        this.message = message;
    }

    /**
     * Instantiate NotificationModel with error details.
     * @param {ErrorModel} error Error model.
     * @returns NotificationModel with error details.
     */
    setError(error) {
        this.error = error;
        this.isError = true;
        this.message = this.error.message;
        return this;
    }
};
