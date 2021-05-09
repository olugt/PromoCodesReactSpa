import { createServer, Response } from 'miragejs'
import { ERROR_CODES } from '../../../../common/constants/ErrorCodesConstants';
import { MAGIC_STRINGS } from '../../../../common/constants/MagicStringsConstants';
import { skip, take } from '../../../../common/logic/dataLogic';
import { addMinutesToDate } from '../../../../common/logic/dateTimeLogic';
import ConfigurationContextModel from '../../../../common/models/contexts/ConfigurationContextModel';
import ErrorModel from '../../../../common/models/ErrorModel';
import { ActivateBonusRequestModel, ApiException, JwtDetail, JwtDetailResponseModel, LoginRequestModel, ObjectErrorResponseModel, ServiceResponseModel } from '../../dependencies/PromoCodesAspNetCoreWebApiClient';
import * as promoCodesData from '../database-servers/promoCodesData.json'
import * as servicesData from '../database-servers/servicesData.json'
import * as usersData from '../database-servers/usersData.json'

function effectCreateServer({ environment = MAGIC_STRINGS.developmentEnvironment } = {}) {
    return createServer({
        environment,
        urlPrefix: new ConfigurationContextModel().getPromoCodesWebApiBaseUrl(),
        routes() {
            this.get("/api/Services/search", (schema, request) => {
                let nameSnippet = request.queryParams["nameSnippet"];
                let page = request.queryParams["page"];
                let limit = request.queryParams["limit"];

                /**
                 * 
                 * @param {ServiceResponseModel} value 
                 * @param {Number} index 
                 * @param {ServiceResponseModel[]} array 
                 * @returns 
                 */
                let predicate = (value, index, array) => String(value.name).toLowerCase().includes(nameSnippet.toLowerCase());

                if (take(skip(servicesData.services.filter(predicate), page, limit), limit).length === 0) {
                    return new Response(404, {}, new ObjectErrorResponseModel({ message: "Service not found." }));
                }

                return new Response(200, {}, take(skip(servicesData.services.filter(predicate), page, limit), limit));
            });

            this.get("/api/Services", (schema, request) => {
                let page = request.queryParams["page"];
                let limit = request.queryParams["limit"];

                let collection = take(skip(servicesData.services, page, limit), limit);

                if (collection.length === 0) {
                    return new Response(404, {}, new ObjectErrorResponseModel({ message: "No services available." }));
                }

                return new Response(200, {}, collection);
            });

            this.post("/api/Services/activate-bonus", (schema, request) => {

                /**
                 * @type {{promoCode: string, serviceId: string}}
                 */
                let requestModel = new ActivateBonusRequestModel(JSON.parse(request.requestBody));

                if (!promoCodesData.promoCodes.some((value, index, array) => value.name === requestModel.promoCode)) {
                    return new Response(404, {}, new ObjectErrorResponseModel({ message: "Promo code invalid." }));
                }

                /**
                 * 
                 * @param {ServiceResponseModel} value 
                 * @param {Number} index 
                 * @param {ServiceResponseModel[]} array 
                 * @returns 
                 */
                let predicate = (value, index, array) => value.id === Number.parseInt(requestModel.serviceId);
                if (!servicesData.services.some(predicate)) {
                    return new Response(404, {}, new ObjectErrorResponseModel({ message: "Service not found." }));
                }

                // Assume bonus activated.

                return new Response(201, {}, servicesData.services.find(predicate));
            });

            this.post("/api/User/login", (schema, request) => {

                /**
                 * @type {{emailAddress: string, password: string}}
                 */
                let requestModel = new LoginRequestModel(JSON.parse(request.requestBody));

                if (!usersData.users.some((value, index, array) =>
                    value.emailAddress === requestModel.emailAddress
                    && value.password === requestModel.password)) {
                    return new Response(401, {}, new ObjectErrorResponseModel({ message: "Invalid credentials." }));
                }

                /**
                 * @type {{jwt: String, expiryDatetimeUtc: Date}}
                 */
                let jwtDetail = new JwtDetail();
                jwtDetail.jwt = "Some fake JWT";
                jwtDetail.expiryDatetimeUtc = addMinutesToDate(new Date(), new ConfigurationContextModel().getFakeJwtExpirationDurationMinutes());
                let responseModel = new JwtDetailResponseModel();
                responseModel.jwtDetail = jwtDetail;

                return new Response(201, {}, responseModel);
            });
        }
    });
}

export { effectCreateServer }