import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useTokenContext from '../../hooks/contexts/useTokenContext';
import NotificationContextModel from '../../common/models/contexts/NotificationContextModel';

/**
 * 
 * @param {{model: NotificationContextModel, children: Object}} param0 Bla
 * @returns 
 */
function Notification({ model, children }) {
    const [visible, setVisible] = useState(true);

    let token = useTokenContext()?.state?.token;

    return (
        <div></div>
        // <div className={`container ${visible ? "visible" : "hidden"}`}>
        //     <div className="row">
        //         <div className={`offset-md-7 col-4 alert alert-dismissable ${model.isError ? "alert-warning" : "alert-info"}`}>
        //             <button onClick={() => setVisible(false)} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
        //             <h6>Feedback!</h6> <p>{model.message}</p><br />
        //             {
        //                 children
        //             }
        //             <div>Token: {token}</div>
        //         </div>
        //     </div>
        // </div>
    )
}

Notification.propTypes = {
    model: PropTypes.instanceOf(NotificationContextModel)
}

export default Notification

