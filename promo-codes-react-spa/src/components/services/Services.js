import { useCallback, useEffect, useRef, useState } from "react";
import searchServices from "../../services/searchServices";
import activateBonus from '../../services/activateBonus'
import ServiceModel from "../../common/models/ServiceModel";
import getServices from "../../services/getServices";
import { getInputValue } from "../../common/logic/formLogic";
import useConfigurationContext from "../../hooks/contexts/useConfigurationContext";
import useTokenContext from "../../hooks/contexts/useTokenContext";
import { ERROR_CODES } from "../../common/constants/ErrorCodesConstants";
import { MAGIC_STRINGS } from "../../common/constants/MagicStringsConstants";
import ServiceIdToggleModel from "../../common/models/toggles/ServiceIdToggleModel";

function Services(props) {

    const [forcedRenderToggle, setForcedRenderToggle] = useState(false);

    const [pagination, setPagination] = useState({ page: 1, limit: useConfigurationContext().state.getDefaultPageItemsLimit() });
    const [serviceNameSnippet, setServiceNameSnippet] = useState("");

    /**
     * @type {[services: ServiceModel[], setServices: (_: ServiceModel) => undefined]}
     */
    const [services, setServices] = useState([]);
    const { state: tokenContextState, setState: _setTokenContextState } = useTokenContext();

    const [serviceIdToActivate, setServiceIdToActivate] = useState(new ServiceIdToggleModel(false, null));

    //

    const serviceIdToActivateCallback = useCallback(
        /**
         * 
         * @param {HTMLInputElement} element 
         */
        (element) => {
            if (element != null) {
                if ((MAGIC_STRINGS.promoInputIdPrefix + serviceIdToActivate.value) === element.id) {
                    const textToCopy = element.value;
                    if (textToCopy) {
                        element.select();
                        if (document.execCommand) {
                            document.execCommand("copy");
                        } else if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
                            navigator.clipboard.writeText(textToCopy);
                        }
                    }
                }
            }
        },
        [serviceIdToActivate],
    )

    //

    useEffect(() => {
        if (serviceNameSnippet && serviceNameSnippet.length >= 2) {
            searchServices(
                tokenContextState,
                serviceNameSnippet,
                pagination.page,
                pagination.limit,
                setServices,
                (error) => {
                    if (error.code === ERROR_CODES.notFoundError) {
                        setServices([]);
                    } else {
                        alert(error.message);
                    }
                });
        } else {
            getServices(
                tokenContextState,
                pagination.page,
                pagination.limit,
                setServices,
                (error) => {
                    if (error.code === ERROR_CODES.notFoundError) {
                        setServices([]);
                    } else {
                        alert(error.message);
                    }
                })
        }
        return () => {

        }
    }, [serviceNameSnippet, pagination]);

    //

    return (
        <div className="container">
            <div className="row">
                <div className="col-12"><h1>Services</h1></div>
            </div>
            <div className="row">
                <div className="col-12">
                    <form className="row">
                        <div className="col-3">
                            <label>FILTER</label>
                            <input onChange={(e) => {
                                setServiceNameSnippet(e.target.value);
                            }} value={serviceNameSnippet} className="form-control" type="text" title="Type in service name or snippet, at least 2 characters." />
                        </div>
                        <div className="col-2">
                            <label className="">*</label>
                            <button onClick={(e) => {
                                e.preventDefault();
                                setServiceNameSnippet("");
                            }} className="form-control btn btn-secondary">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {
                        services.map((item, index) => (
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                activateBonus(
                                    tokenContextState,
                                    getInputValue(e.target, "promoCode"),
                                    getInputValue(e.target, "serviceId"),
                                    (serviceId) => {
                                        services.find((service) => service.id === serviceId).setAsActivated();
                                        setServices(services);
                                        setForcedRenderToggle(!forcedRenderToggle);
                                    },
                                    (error) => {
                                        let errorMessage = error.message;
                                        if (error.code === ERROR_CODES.validationError) {
                                            /**
                                             * @type {{property: String[]}}
                                             */
                                            let errorData = error.data;
                                            Object.keys(errorData).forEach((property) => {
                                                /**
                                                 * @type {String[]}
                                                 */
                                                let propertyValue = errorData[property];
                                                propertyValue.forEach((value, index, array) => {
                                                    errorMessage += `\n${value}`;
                                                });
                                            });
                                        }
                                        alert(errorMessage);
                                    });
                            }} className="container" key={item.id}>
                                <div className="jumbotron row">
                                    <input type="hidden" name="serviceId" value={item.id} />
                                    <h2 className="col-4">
                                        {item.name}
                                    </h2>
                                    <div className="col-4">
                                        <input required id={MAGIC_STRINGS.promoInputIdPrefix + item.id} ref={serviceIdToActivateCallback} type="text" className="form-control" name="promoCode" placeholder="Enter valid promo code." />
                                    </div>
                                    <div className="col-2">
                                        <button onClick={(e) => {
                                            e.preventDefault();

                                            setServiceIdToActivate(new ServiceIdToggleModel(!serviceIdToActivate.isOn, e.target.value));

                                        }} value={item.id} className="form-control btn btn-secondary">Copy</button>
                                    </div>
                                    <div className="col-4">
                                        {item.isActivated ?
                                            (<button disabled className="btn btn-info">Activated</button>) :
                                            (<button type="submit" className="btn btn-primary">Activate bonus</button>)
                                        }
                                    </div>
                                </div>
                            </form>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

Services.propTypes = {

}

export default Services

