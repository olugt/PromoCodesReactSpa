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
import PaginationModel from "../../common/models/PaginationModel";
import PaginationCommandModel from "../../common/models/PaginationCommandModel";

function Services(props) {

    let setNotificationContextState = useNotificationContext().setState;

    const [forcedRenderToggle, setForcedRenderToggle] = useState(false);

    const servicesScrollContainerParent = useRef(null);

    const servicesLoadingIndicator = useRef(null);

    /**
     * @type {[pagination: PaginationModel, setPagination: (_: PaginationCommandModel) => undefined]}
     */
    const [pagination, setPagination] = useReducer(
        /**
         * 
         * @param {PaginationModel} currentPagination 
         * @param {PaginationCommandModel} paginationCommand 
         * @returns 
         */
        (currentPagination, paginationCommand) => {

            /**
             * @type {Number} New page number.
             */
            let newPage = paginationCommand.isRestarted ? 1 : (paginationCommand.isOn ? currentPagination.page + 1 : currentPagination.page);
            return new PaginationModel(newPage, currentPagination.limit, paginationCommand.isOn, paginationCommand.isRestarted, currentPagination.round + 1);

        }, new PaginationModel(0, useConfigurationContext().state.getDefaultPageItemsLimitFactor(), false, false, 0));

    const [serviceNameSnippet, setServiceNameSnippet] = useState("");
    const [minimumCharactersLimitServicesSearch, _setMinimumCharactersLimitServicesSearch] = useState(useConfigurationContext().state.getMinimumCharactersLimitForServicesSearchField());

    //

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

            // let pageToUse = pagination.isRestarted ? 1 : pagination.page;

            // if (pageToUse === 1) {
            if (pagination.page === 1) {
                return desiredServices;
            } else {
                return [...currentServices, ...desiredServices.filter((value, index, array) => !currentServices.some((value1, index1, array1) => value.id === value1.id))];
            }

        }, []);

    const { state: tokenContextState, setState: _setTokenContextState } = useTokenContext();

    const [serviceIdToActivate, setServiceIdToActivate] = useState(new ServiceIdToggleModel(false, null));

    //

    useEffect(() => {

        var options = {
            root: servicesScrollContainerParent.current,
            rootMargin: "0px",
            threshold: 0.8
        };
        let observer = new IntersectionObserver((entries, observer) => {

            setPagination(new PaginationCommandModel(true, false));

        }, options);

        observer.observe(servicesLoadingIndicator.current);

        return () => {

        }
    }, []);

    useEffect(() => {

        if (pagination.page > 0) {
            setPagination(new PaginationCommandModel(true, true));
        }

        return () => {

        }
    }, [serviceNameSnippet]);

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
                            setPagination(new PaginationCommandModel(false, pagination.isRestarted));
                        } else {
                            setNotificationContextState(new NotificationContextModel(true, error.message).setError(error));
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
                            setPagination(new PaginationCommandModel(false, false));
                        } else {
                            setNotificationContextState(new NotificationContextModel(true, error.message).setError(error));
                        }
                    });
            }

        }

        return () => {

        }
    }, [pagination]);

    const serviceIdToActivateCallback = useCallback(
        /**
         * 
         * @param {HTMLInputElement} element 
         */
        (element) => {
            if (element != null) {
                if ((MAGIC_STRINGS.promoCodeInputIdPrefix + serviceIdToActivate.value) === element.id) {
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
    );

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
            <div ref={servicesScrollContainerParent} id="services-scroll-container-parent" className="row pr-0 pt-4 mt-3">
                <div id="services-scroll-container" className="col-12 pr-1 flex-column align-items-start">
                    {
                        services.length < 1 ? <div className="col-12 row d-flex justify-content-center">
                            <p className="badge badge-primary">{pagination.round < 2 ? <span>Please, wait...</span> : <span>No services found.</span>}</p>
                        </div> :
                            services.map((item, index) =>
                                item?.id && <div className="col-12 pr-0 pl-3 ml-1 row scrolled-service" key={item.id.toString()}>
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
                                    }} className="col-12 pr-0 row">
                                        <div className="col-12 jumbotron pr-0 row">
                                            <input type="hidden" name="serviceId" value={item?.id} />
                                            <div className="col-6 col-md-4">
                                                <div className="row"><h2>{item?.name}</h2></div>
                                                <div className="row"><p className="text-muted"><small>Description</small></p></div>
                                            </div>
                                            <div className="col-12 col-md-8 pr-0 row">
                                                <div className="col-12 row text-muted"><small className="ml-md-3">PROMO CODE</small></div>
                                                <div className="col-12 pr-0 row">
                                                    <div className="col-12 row mb-sm-2 mb-md-0 mr-1 col-md-6 mt-2 mt-sm-0 promo-code-container">
                                                        <input required id={MAGIC_STRINGS.promoCodeInputIdPrefix + item?.id} ref={serviceIdToActivateCallback} type="text" className="form-control promo-code-input" name="promoCode" placeholder="Enter valid promo code." />
                                                        <input type="image" onClick={(e) => {
                                                            e.preventDefault();

                                                            setServiceIdToActivate(new ServiceIdToggleModel(!serviceIdToActivate.isOn, e.target.value));

                                                        }} value={item?.id} className="form-control btn btn-secondary promo-code-copy-button" src={copyImage} alt="Click to copy." title="Click to copy." />
                                                    </div>
                                                    <div className="col-11 mt-2 mt-sm-0 col-md-6 pr-0 row">
                                                        {item?.isActivated ?
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
                    {
                        services.length > 0 && <div className="col-12 row d-flex justify-content-center">
                            <p className="badge badge-secondary"><span>Scroll to the bottom to load more...</span></p>
                        </div>
                    }
                </div>
                <div className="col-12 row">
                    <div id="services-loading-idicator" ref={servicesLoadingIndicator} className="col-12 row d-flex justify-content-center">

                        <p className="badge badge-primary">{pagination.isOn ? <span>Loading...</span> : <span>Loading is complete. {services.length < 1 && <span>No services found.</span>}</span>}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

Services.propTypes = {

}

export default Services

