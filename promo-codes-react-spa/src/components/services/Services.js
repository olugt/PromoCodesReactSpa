import { useCallback, useEffect, useReducer, useRef, useState } from "react";
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
import copyImage from '../../image/copy.svg'
import useNotificationContext from "../../hooks/contexts/useNotificationContext";
import NotificationContextModel from "../../common/models/contexts/NotificationContextModel";

function Services(props) {

    let setNotificationContextState = useNotificationContext().setState;

    const [forcedRenderToggle, setForcedRenderToggle] = useState(false);

    const servicesScrollContainer = useRef(null);
    /**
     * @type {Number} This is a roughly calculated height of the ratio between the services scroll container and a service to scroll. It is used to determine if displayed services to scroll are fewer than the height of the services scroll container, in order to correctly determine whether or not to notify about the loading status of services.
     */
    const roughHeightRatioServicesScrollContainerVsScrolledService = 5;
    const servicesLoadingIndicator = useRef(null);

    /**
     * @type {[pagination: {page: Number, limit: Number, isOn: Boolean, isRestarted: Boolean, round: Number}, setPagination: ({isOn: Boolean, isRestarted: Boolean}) => undefined]}
     */
    const [pagination, setPagination] = useReducer(({ page: currentPage, limit: currentLimit, isOn: currentIsOn, round: currentRound }, { isOn: desiredIsOn, isRestarted: desiredIsRestarted }) => {

        let newPage = desiredIsRestarted ? 1 : (desiredIsOn ? currentPage + 1 : currentPage);
        return { page: newPage, limit: currentLimit, isOn: desiredIsOn, isRestarted: desiredIsRestarted, round: currentRound + 1 };

    }, { page: 0, limit: useConfigurationContext().state.getDefaultPageItemsLimitFactor(), isOn: false, isRestarted: false, round: 0 });

    const [serviceNameSnippet, setServiceNameSnippet] = useState("");
    const [minimumCharactersLimitServicesSearch, _setMinimumCharactersLimitServicesSearch] = useState(useConfigurationContext().state.getMinimumCharactersLimitForServicesSearchField());

    /**
     * @type {[services: ServiceModel[], setServices: (_: ServiceModel) => undefined]}
     */
    const [services, setServices] = useReducer(
        /**
         * 
         * @param {ServiceModel[]} currentServices 
         * @param {ServiceModel[]} desiredServices 
         * @returns 
         */
        (currentServices, desiredServices) => {

            let pageToUse = pagination.isRestarted ? 1 : pagination.page;

            if (pageToUse === 1) {
                return ([...desiredServices]);
            } else {
                return [...currentServices, ...desiredServices];
            }

        }, []);

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

        if (pagination.page > 0) {
            setPagination({ isOn: true, isRestarted: true });
        }

        return () => {

        }
    }, [serviceNameSnippet]);

    useEffect(() => {

        if (services.length < roughHeightRatioServicesScrollContainerVsScrolledService) {
            if (pagination.round === 1) {
                setPagination({ isOn: true, isRestarted: false });
            } else if (pagination.round > 1) {
                if (serviceNameSnippet && serviceNameSnippet.length >= minimumCharactersLimitServicesSearch) {
                    setPagination({ isOn: false, isRestarted: pagination.isRestarted });
                }
                else {
                    setPagination({ isOn: true, isRestarted: false });
                }
            }
        }
        return () => {

        }
    }, [services])

    useEffect(() => {

        if (pagination.page > 0) {

            if (pagination.isOn && serviceNameSnippet && serviceNameSnippet.length >= minimumCharactersLimitServicesSearch) {
                searchServices(
                    tokenContextState,
                    serviceNameSnippet,
                    pagination.page,
                    pagination.limit,
                    (value) => {
                        setServices(value);
                    },
                    (error) => {
                        if (error.code === ERROR_CODES.notFoundError) {
                            if (pagination.isRestarted) {
                                setServices([]);
                            }
                            setPagination({ isOn: false, isRestarted: pagination.isRestarted });
                        } else {
                            console.log(error);
                        }
                    });
            } else if (pagination.isOn && pagination.page > 0) {
                getServices(
                    tokenContextState,
                    pagination.page,
                    pagination.limit,
                    (value) => {
                        setServices(value);
                    },
                    (error) => {
                        if (error.code === ERROR_CODES.notFoundError) {
                            setPagination({ isOn: false, isRestarted: false });
                        } else {
                            console.log(error);
                        }
                    })
            }

        }

        return () => {

        }
    }, [pagination]);

    useEffect(() => {

        var options = {
            root: servicesScrollContainer.current,
            rootMargin: "0px",
            threshold: [0, 0.5, 1.0]
        };
        let observer = new IntersectionObserver((entries, observer) => {

            setPagination({ isOn: true, isRestarted: false });

        }, options);

        observer.observe(servicesLoadingIndicator.current);

        return () => {

        }
    }, []);

    //

    return (
        <div className="container">
            <div className="row">
                <div className="col-12"><h1>Services</h1></div>
            </div>
            <div className="row">
                <form className="col-12 row">
                    <div className="col-12 text-muted">
                        <label>FILTER (At least {useConfigurationContext().state.getMinimumCharactersLimitForServicesSearchField()} characters.)</label>
                    </div>
                    <div className="col-12 row">
                        <input onChange={(e) => {
                            setServiceNameSnippet(e.target.value);
                        }} value={serviceNameSnippet} className="form-control col-5 col-md-3 ml-3" type="text" title="Type in service name or snippet, at least 2 characters." />

                        <button onClick={(e) => {
                            e.preventDefault();
                            setServiceNameSnippet("");
                        }} className="form-control ml-2 col-3 col-md-2 btn btn-outline-secondary">Reset</button>
                    </div>
                </form>
            </div>
            <div ref={servicesScrollContainer} id="services-scroll-container" className="row pt-4 mt-3">
                {
                    services.length < 1 ? <></> :
                        services.map((item, index) =>
                            item?.id && <div className="col-11 ml-3 row scrolled-service" key={item.id.toString()}>
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
                                            setNotificationContextState(new NotificationContextModel(true, errorMessage));
                                        });
                                }} className="col-12 row">
                                    <div className="col-12 jumbotron pr-0 row">
                                        <input type="hidden" name="serviceId" value={item.id} />
                                        <div className="col-6 col-md-4">
                                            <div className="row"><h2>{item.name}</h2></div>
                                            <div className="row"><p className="text-muted"><small>Description</small></p></div>
                                        </div>
                                        <div className="col-12 col-md-8 pr-0 row">
                                            <div className="col-12 row text-muted"><small className="ml-md-3">PROMO CODE</small></div>
                                            <div className="col-12 pr-0 row">
                                                <div className="col-12 row mb-sm-2 mb-md-0 mr-1 col-md-6 mt-2 mt-sm-0 promo-code-container">
                                                    <input required id={MAGIC_STRINGS.promoInputIdPrefix + item.id} ref={serviceIdToActivateCallback} type="text" className="form-control promo-code-input" name="promoCode" placeholder="Enter valid promo code." />
                                                    <input type="image" onClick={(e) => {
                                                        e.preventDefault();

                                                        setServiceIdToActivate(new ServiceIdToggleModel(!serviceIdToActivate.isOn, e.target.value));

                                                    }} value={item.id} className="form-control btn btn-secondary promo-code-copy-button" src={copyImage} alt="Click to copy." title="Click to copy." />
                                                </div>
                                                <div className="col-11 mt-2 mt-sm-0 col-md-6 pr-0 row">
                                                    {item.isActivated ?
                                                        (<button disabled className="form-control btn btn-info col-12">Activated</button>) :
                                                        (<button type="submit" className="form-control btn btn-primary col-12">Activate bonus</button>)
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )
                }
                <div className="col-11 ml-1 row">
                    <div id="services-loading-idicator" ref={servicesLoadingIndicator} className="col-11 row d-flex justify-content-center">

                        <p className="badge badge-primary">{pagination.isOn ? <span>Scroll up and down to load more...</span> : <span>Loading is complete. {services.length < 1 && <span>No services found.</span>}</span>}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

Services.propTypes = {

}

export default Services

