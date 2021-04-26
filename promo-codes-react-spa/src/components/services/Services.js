import { useEffect, useState } from "react";
import searchServices from "../../common/logic/functions/searchServices";
import activateBonus from '../../common/logic/functions/activateBonus'
import ServiceModel from "../../common/models/ServiceModel";
import useTokenContext from "../../common/hooks/contexts/useTokenContext";
import getInputValue from "../../common/logic/functions/getInputValue";
import getServices from "../../common/logic/functions/getServices";
import useConfigurationContext from "../../common/hooks/contexts/useConfigurationContext";

function Services(props) {

    const [forcedRenderToggle, setForcedRenderToggle] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, limit: useConfigurationContext().state.getDefaultPageItemsLimit() });
    const [serviceNameSnippet, setServiceNameSnippet] = useState("");

    /**
     * @type {[services: ServiceModel[], setServices: (_: ServiceModel) => undefined]}
     */
    const [services, setServices] = useState([]);

    let tokenDetail = useTokenContext()?.state;

    //

    useEffect(() => {
        if (serviceNameSnippet) {
            searchServices(
                tokenDetail,
                serviceNameSnippet,
                pagination.page,
                pagination.limit,
                setServices,
                (error) => {
                    console.log(error);
                    alert(error.message);
                })
        } else {
            getServices(
                tokenDetail,
                pagination.page,
                pagination.limit,
                setServices,
                (error) => {

                })
        }
        return () => {

        }
    }, [tokenDetail, serviceNameSnippet, pagination]);

    //

    return (
        <div className="container">
            <div className="row">
                <div className="col-12"><h1>Services</h1></div>
                <div>Token: {tokenDetail.token}</div>
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
                                    tokenDetail,
                                    getInputValue(e.target, "promoCode"),
                                    getInputValue(e.target, "serviceId"),
                                    (serviceId) => {
                                        services.find((service) => service.id === serviceId).setAsActivated();
                                        setServices(services);
                                        setForcedRenderToggle(!forcedRenderToggle);
                                    },
                                    undefined);
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

