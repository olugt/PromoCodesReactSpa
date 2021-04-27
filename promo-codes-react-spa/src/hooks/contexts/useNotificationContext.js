import { useContext } from "react";
import { NotificationContext } from "../../App";
import ContextProviderValueModel from "../../common/models/ContextProviderValueModel";
import NotificationModel from "../../common/models/NotificationModel";


/**
 * Hook used to manage the NotificationContext.
 * @returns Object containing notification model and a callback function to set it.
 */
export default function useNotificationContext() {
    let valueModel = new ContextProviderValueModel();
    valueModel = useContext(NotificationContext);
    let model = new NotificationModel();
    model = valueModel.state;

    /**
     * Callback function used to set the notification detail model in the context.
     * @param {NotificationModel} _ The notification detail model to be used to set in the context.
     * @returns undefined.
     */
    let setState = (_) => undefined;
    setState = valueModel.setState;

    return { state: model, setState }
}