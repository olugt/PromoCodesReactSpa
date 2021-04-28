import ErrorModel from "../ErrorModel";

export default class NotificationContextModel {
    /**
     * Instantiate with just notification message.
     * @param {String} message Notification message.
     */
    constructor(message) {
        this.message = message;
    }

    /**
     * Instantiate NotificationContextModel with error details.
     * @param {ErrorModel} error Error model.
     * @returns NotificationContextModel with error details.
     */
    setError(error) {
        this.error = error;
        this.isError = true;
        this.message = this.error.message;
        return this;
    }
};
