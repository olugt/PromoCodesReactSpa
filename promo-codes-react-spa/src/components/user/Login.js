import { useState } from "react";
import { useHistory } from "react-router-dom"
import useNotificationContext from "../../common/hooks/contexts/useNotificationContext";
import useTokenContext from "../../common/hooks/contexts/useTokenContext";
import processLogin from '../../common/logic/functions/processLogin'
import NotificationModel from "../../common/models/NotificationModel";

function Login(props) {
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const navigateTo = useHistory().push;

    let setTokenContextState = useTokenContext().setState;
    let setNotificationContextState = useNotificationContext().setState;

    //

    return (
        <div className="">
            <form onSubmit={(e) => {
                e.preventDefault();
                processLogin(
                    emailAddress,
                    password,
                    setTokenContextState,
                    navigateTo,
                    (error) => setNotificationContextState(new NotificationModel().setError(error)));
            }} className="container">
                <div className="row">
                    <div className="col-12 offset-md-5 col-md-7">
                        <div className="jumbotron">
                            <h2>Login</h2>
                            <hr />
                            <div className="row">
                                <div className="form-group col-12">
                                    <label htmlFor="email-address" className="col-12"></label>
                                    <input id="email-address" type="text" value={emailAddress} onChange={e => setEmailAddress(e.target.value)} placeholder="Enter email address." className="form-control col-12 col-md-8" />
                                    <span id="email-address-validation-message" className="text-danger small"></span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-12">
                                    <label htmlFor="Password" className="col-12"></label>
                                    <input id="password" type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password." className="form-control col-12 col-md-8" />
                                    <span id="password-validation-message" className="text-danger small"></span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-group col-md-12 text-left">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

Login.propTypes = {

}

export default Login

