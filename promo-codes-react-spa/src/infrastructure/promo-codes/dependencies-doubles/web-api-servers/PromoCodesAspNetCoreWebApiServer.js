import { createServer, Response } from 'miragejs'
import { skip, take } from '../../../../common/logic/dataLogic';
import { addDaysToDate, addMinutesToDate } from '../../../../common/logic/dateLogic';
import ConfigurationContextModel from '../../../../common/models/contexts/ConfigurationContextModel';
import { ActivateBonusRequestModel, ApiException, JwtDetail, JwtDetailResponseModel, LoginRequestModel, ServiceResponseModel } from '../../dependencies/PromoCodesAspNetCoreWebApiClient';
import * as promoCodesData from '../database-servers/promoCodesData.json'
import * as servicesData from '../database-servers/servicesData.json'
import * as usersData from '../database-servers/usersData.json'

function effectCreateServer({ environment = "development" } = {}) {
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
                let predicate = (value, index, array) => String(value.name).includes(nameSnippet);

                if (!servicesData.services.some(predicate)) {
                    throw new ApiException("Service not found.", 404, null, null, null);
                }

                return new Response(200, {}, take(skip(servicesData.services.filter(predicate), page, limit), limit));
            });

            this.get("/api/Services", (schema, request) => {
                let page = request.queryParams["page"];
                let limit = request.queryParams["limit"];

                let collection = take(skip(servicesData.services, page, limit), limit);

                if (collection.length === 0) {
                    throw new ApiException("No services available", 404, null, null, null);
                }

                return new Response(200, {}, collection);
            });

            this.post("/api/Services/activate-bonus", (schema, request) => {

                /**
                 * @type {{promoCode: string, serviceId: string}}
                 */
                let requestModel = new ActivateBonusRequestModel(JSON.parse(request.requestBody));

                if (!promoCodesData.promoCodes.some((value, index, array) => value.name === requestModel.promoCode)) {
                    throw new ApiException("Promo code invalid.", 404, null, null, null);
                }

                /**
                 * 
                 * @param {ServiceResponseModel} value 
                 * @param {Number} index 
                 * @param {ServiceResponseModel[]} array 
                 * @returns 
                 */
                let predicate = (value, index, array) => value.id === requestModel.serviceId;

                if (!servicesData.services.some(predicate)) {
                    throw new ApiException("Service not found.", 404, null, null, null);
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
                    throw new ApiException("Invalid credentials.", 401, null, null, null);
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