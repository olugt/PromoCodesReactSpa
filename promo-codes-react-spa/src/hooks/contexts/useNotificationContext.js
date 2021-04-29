import { NotificationContext } from "../../App";
import NotificationContextModel from "../../common/models/contexts/NotificationContextModel";
import { useProcessSimpleCustomContext } from "./customContextHooks";

/**
 * Hook used to manage the NotificationContext.
 * @returns Object containing notification model and a callback function to set it, as state and setState.
 */
export default function useNotificationContext() {

    /**
     * @type {{state: NotificationContextModel, setState: (_: NotificationContextModel) => undefined}}
     */
     let returnValue = useProcessSimpleCustomContext(
        NotificationContext,
        new NotificationContextModel()
    );
    return returnValue;
}