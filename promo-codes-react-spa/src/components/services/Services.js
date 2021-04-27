import { useContext, useEffect, useState } from "react";
import searchServices from "../../services/searchServices";
import activateBonus from '../../services/activateBonus'
import ServiceModel from "../../common/models/ServiceModel";
import getServices from "../../services/getServices";
import { getInputValue } from "../../common/logic/formLogic";
import useConfigurationContext from "../../hooks/contexts/useConfigurationContext";
import useTokenContext from "../../hooks/contexts/useTokenContext";

function Services(props) {

    const [forcedRenderToggle, setForcedRenderToggle] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, limit: useConfigurationContext().state.getDefaultPageItemsLimit() });
    const [serviceNameSnippet, setServiceNameSnippet] = useState("");

    /**
     * @type {[services: ServiceModel[], setServices: (_: ServiceModel) => undefined]}
     */
    const [services, setServices] = useState([]);
    const { state: tokenDetailState, setState: _setTokenDetailState } = useTokenContext();

    //

    useEffect(() => {
        if (serviceNameSnippet) {
            if (serviceNameSnippet.length >= 2) {
                searchServices(
                    tokenDetailState,
                    serviceNameSnippet,
                    pagination.page,
                    pagination.limit,
                    setServices,
                    (error) => {
                        console.log("Error at search services aaaaaa.")
                        alert(error.message);
                    });
            }
        } else {
            getServices(
                tokenDetailState,
                pagination.page,
                pagination.limit,
                setServices,
                (error) => {
                    console.log("Error at get services oooo.")
                    console.log(error);
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
                <div>Token: {tokenDetailState?.token}</div>
            </div>
            <div className="row">
                <div className="col-12">
                    <form className="row">
                        <div className="col-3">
                            <label>FILTER</label>
                            <input onChange={(e) => {
                                setServiceNameSnippet(e.target.value);
                            }} value={serviceNameSnippet} className="form-control" type="text" />
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
                                    tokenDetailState,
                                    getInputValue(e.target, "promoCode"),
                                    getInputValue(e.target, "serviceId"),
                                    (serviceId) => {
                                        services.find((service) => service.id === serviceId).setAsActivated();
                                        setServices(services);
                                        setForcedRenderToggle(!forcedRenderToggle);
                                    },
                                    (error) => {
                                        console.log("Error at activate bonus eeeeeee.")
                                        console.log(error);
                                    });
                            }} className="container" key={item.id}>
                                <div className="jumbotron row">
                                    <input type="hidden" name="serviceId" value={item.id} />
                                    <h2 className="col-4">
                                        {item.name}
                                    </h2>
                                    <div className="col-4">
                                        <input type="text" className="form-control" name="promoCode" />
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

