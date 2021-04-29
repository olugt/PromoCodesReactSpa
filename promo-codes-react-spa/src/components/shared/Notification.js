import React from 'react'
import PropTypes from 'prop-types'
import NotificationContextModel from '../../common/models/contexts/NotificationContextModel';
import useNotificationContext from '../../hooks/contexts/useNotificationContext';

/**
 * 
 * @param {{model: NotificationContextModel, children: Object}} param0 Bla
 * @returns 
 */
function Notification({ model, children }) {

    const setNotificationContextState = useNotificationContext().setState;

    return (
        <div className={`container ${model?.show ? "visible" : "hidden"}`}>
            <div className="row">
                <div className={`col-11 alert alert-sm alert-dismissable ${model?.isError ? "alert-warning" : "alert-info"}`}>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setNotificationContextState(new NotificationContextModel(false, null))
                    }} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h6>Notification!</h6>
                    <p>{model?.message}</p>
                    {
                        children
                    }
                </div>
            </div>
        </div>
    )
}

Notification.propTypes = {
    model: PropTypes.instanceOf(NotificationContextModel)
}

export default Notification

