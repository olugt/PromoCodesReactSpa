import React from 'react'
import PropTypes from 'prop-types'

function Services(props) {

    function submit(e) {
        e.preventDefault();
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-2">
                    <div><h5>Balance</h5></div>
                    <div><p>213 920 $</p></div>
                </div>
                <div className="col-2">
                    <div><h5>Payout</h5></div>
                    <div><p>159 465 $</p></div>
                </div>
            </div>
            <div className="row">
                <div className="col-12"><h1>Services</h1></div>
            </div>
            <div className="row">
                <div className="col-12">
                    <form onSubmit={submit}>

                    </form>
                </div>
            </div>
        </div>
    )
}

Services.propTypes = {

}

export default Services

