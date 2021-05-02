import ErrorModel from "../ErrorModel";
import ContextModelBase from "./ContextModelBase";

export default class NotificationContextModel extends ContextModelBase {
    /**
     * Instantiate with just notification message.
     * @param {Boolean} show If should show notification.
     * @param {String} message Notification message.
     */
    constructor(show, message) {
        super(show, message);

        this.show = show;
        this.message = message;
    }

    /**
     * Instantiate NotificationContextModel with error details.
     * @param {ErrorModel} error Error model.
     * @returns NotificationContextModel with error details.
     */
    setError(error) {
        console.log(error);

        this.isError = true;
        this.error = error;
        return this;
    }
};
