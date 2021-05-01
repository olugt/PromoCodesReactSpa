/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.10.9.0 (NJsonSchema v10.4.1.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

import PromoCodesAspNetCoreWebApiClientBase from "./PromoCodesAspNetCoreWebApiClientBase";

// ReSharper disable InconsistentNaming
export class PromoCodesAspNetCoreWebApiClient extends PromoCodesAspNetCoreWebApiClientBase {
    constructor(baseUrl, http) {
        super();
        this.jsonParseReviver = undefined;
        this.http = http ? http : window;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }
    /**
     * Search for a service with a service name snippet.
     * @param nameSnippet (optional) Snippet or whole of service name.
     * @param page (optional) Page number.
     * @param limit (optional) Page items limit.
     * @param api_version (optional)
     * @return Success
     */
    search(nameSnippet, page, limit, api_version) {
        let url_ = this.baseUrl + "/api/Services/search?";
        if (nameSnippet !== undefined && nameSnippet !== null)
            url_ += "nameSnippet=" + encodeURIComponent("" + nameSnippet) + "&";
        if (page === null)
            throw new Error("The parameter 'page' cannot be null.");
        else if (page !== undefined)
            url_ += "page=" + encodeURIComponent("" + page) + "&";
        if (limit === null)
            throw new Error("The parameter 'limit' cannot be null.");
        else if (limit !== undefined)
            url_ += "limit=" + encodeURIComponent("" + limit) + "&";
        if (api_version === null)
            throw new Error("The parameter 'api_version' cannot be null.");
        else if (api_version !== undefined)
            url_ += "api-version=" + encodeURIComponent("" + api_version) + "&";
        url_ = url_.replace(/[?&]$/, "");
        let options_ = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };
        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response) => {
            return this.processSearch(_response);
        });
    }
    processSearch(response) {
        const status = response.status;
        let _headers = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v, k) => _headers[k] = v);
        }
        ;
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200 = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                if (Array.isArray(resultData200)) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(ServiceResponseModel.fromJS(item));
                }
                return result200;
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve(null);
    }
    /**
     * Get list of services, and can be paged.
     * @param page (optional) Page number.
     * @param limit (optional) Page items limit.
     * @param api_version (optional)
     * @return Success
     */
    services(page, limit, api_version) {
        let url_ = this.baseUrl + "/api/Services?";
        if (page === null)
            throw new Error("The parameter 'page' cannot be null.");
        else if (page !== undefined)
            url_ += "page=" + encodeURIComponent("" + page) + "&";
        if (limit === null)
            throw new Error("The parameter 'limit' cannot be null.");
        else if (limit !== undefined)
            url_ += "limit=" + encodeURIComponent("" + limit) + "&";
        if (api_version === null)
            throw new Error("The parameter 'api_version' cannot be null.");
        else if (api_version !== undefined)
            url_ += "api-version=" + encodeURIComponent("" + api_version) + "&";
        url_ = url_.replace(/[?&]$/, "");
        let options_ = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };
        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response) => {
            return this.processServices(_response);
        });
    }
    processServices(response) {
        const status = response.status;
        let _headers = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v, k) => _headers[k] = v);
        }
        ;
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200 = null;
                let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                if (Array.isArray(resultData200)) {
                    result200 = [];
                    for (let item of resultData200)
                        result200.push(ServiceResponseModel.fromJS(item));
                }
                return result200;
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve(null);
    }
    /**
     * Activate bonus for the identified service, for the current user.
     * @param api_version (optional)
     * @param body (optional) Information about the service.
     * @return Success
     */
    activateBonus(api_version, body) {
        let url_ = this.baseUrl + "/api/Services/activate-bonus?";
        if (api_version === null)
            throw new Error("The parameter 'api_version' cannot be null.");
        else if (api_version !== undefined)
            url_ += "api-version=" + encodeURIComponent("" + api_version) + "&";
        url_ = url_.replace(/[?&]$/, "");
        const content_ = JSON.stringify(body);
        let options_ = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            }
        };
        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response) => {
            return this.processActivateBonus(_response);
        });
    }
    processActivateBonus(response) {
        const status = response.status;
        let _headers = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v, k) => _headers[k] = v);
        }
        ;
        if (status === 201) {
            return response.text().then((_responseText) => {
                let result201 = null;
                let resultData201 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result201 = ServiceResponseModel.fromJS(resultData201);
                return result201;
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve(null);
    }
    /**
     * Logs in a user with the email address and password provided.
     * @param api_version (optional)
     * @param body (optional) User credentials.
     * @return Success
     */
    login(api_version, body) {
        let url_ = this.baseUrl + "/api/User/login?";
        if (api_version === null)
            throw new Error("The parameter 'api_version' cannot be null.");
        else if (api_version !== undefined)
            url_ += "api-version=" + encodeURIComponent("" + api_version) + "&";
        url_ = url_.replace(/[?&]$/, "");
        const content_ = JSON.stringify(body);
        let options_ = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            }
        };
        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response) => {
            return this.processLogin(_response);
        });
    }
    processLogin(response) {
        const status = response.status;
        let _headers = {};
        if (response.headers && response.headers.forEach) {
            response.headers.forEach((v, k) => _headers[k] = v);
        }
        ;
        if (status === 201) {
            return response.text().then((_responseText) => {
                let result201 = null;
                let resultData201 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result201 = JwtDetailResponseModel.fromJS(resultData201);
                return result201;
            });
        }
        else if (status === 500) {
            return response.text().then((_responseText) => {
                let result500 = null;
                let resultData500 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result500 = ObjectErrorResponseModel.fromJS(resultData500);
                return throwException("Server Error", status, _responseText, _headers, result500);
            });
        }
        else if (status === 400) {
            return response.text().then((_responseText) => {
                let result400 = null;
                let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result400 = ValidationErrorResponseModel.fromJS(resultData400);
                return throwException("Bad Request", status, _responseText, _headers, result400);
            });
        }
        else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve(null);
    }
}
export class ServiceResponseModel {
    constructor(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    init(_data) {
        if (_data) {
            this.id = _data["id"];
            this.name = _data["name"];
        }
    }
    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        let result = new ServiceResponseModel();
        result.init(data);
        return result;
    }
    toJSON(data) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        return data;
    }
}
export class ActivateBonusRequestModel {
    constructor(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    init(_data) {
        if (_data) {
            this.serviceId = _data["serviceId"];
            this.promoCode = _data["promoCode"];
        }
    }
    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        let result = new ActivateBonusRequestModel();
        result.init(data);
        return result;
    }
    toJSON(data) {
        data = typeof data === 'object' ? data : {};
        data["serviceId"] = this.serviceId;
        data["promoCode"] = this.promoCode;
        return data;
    }
}
export class LoginRequestModel {
    constructor(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    init(_data) {
        if (_data) {
            this.emailAddress = _data["emailAddress"];
            this.password = _data["password"];
        }
    }
    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        let result = new LoginRequestModel();
        result.init(data);
        return result;
    }
    toJSON(data) {
        data = typeof data === 'object' ? data : {};
        data["emailAddress"] = this.emailAddress;
        data["password"] = this.password;
        return data;
    }
}
export class JwtDetail {
    constructor(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    init(_data) {
        if (_data) {
            this.jwt = _data["jwt"];
            this.expiryDatetimeUtc = _data["expiryDatetimeUtc"] ? new Date(_data["expiryDatetimeUtc"].toString()) : undefined;
        }
    }
    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        let result = new JwtDetail();
        result.init(data);
        return result;
    }
    toJSON(data) {
        data = typeof data === 'object' ? data : {};
        data["jwt"] = this.jwt;
        data["expiryDatetimeUtc"] = this.expiryDatetimeUtc ? this.expiryDatetimeUtc.toISOString() : undefined;
        return data;
    }
}
export class JwtDetailResponseModel {
    constructor(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    init(_data) {
        if (_data) {
            this.jwtDetail = _data["jwtDetail"] ? JwtDetail.fromJS(_data["jwtDetail"]) : undefined;
        }
    }
    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        let result = new JwtDetailResponseModel();
        result.init(data);
        return result;
    }
    toJSON(data) {
        data = typeof data === 'object' ? data : {};
        data["jwtDetail"] = this.jwtDetail ? this.jwtDetail.toJSON() : undefined;
        return data;
    }
}
export class ObjectErrorResponseModel {
    constructor(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    init(_data) {
        if (_data) {
            this.message = _data["message"];
            if (_data["data"]) {
                this.data = {};
                for (let key in _data["data"]) {
                    if (_data["data"].hasOwnProperty(key))
                        this.data[key] = _data["data"][key];
                }
            }
        }
    }
    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        let result = new ObjectErrorResponseModel();
        result.init(data);
        return result;
    }
    toJSON(data) {
        data = typeof data === 'object' ? data : {};
        data["message"] = this.message;
        if (this.data) {
            data["data"] = {};
            for (let key in this.data) {
                if (this.data.hasOwnProperty(key))
                    data["data"][key] = this.data[key];
            }
        }
        return data;
    }
}
export class ValidationErrorResponseModel {
    constructor(data) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    this[property] = data[property];
            }
        }
    }
    init(_data) {
        if (_data) {
            this.message = _data["message"];
            if (_data["data"]) {
                this.data = {};
                for (let key in _data["data"]) {
                    if (_data["data"].hasOwnProperty(key))
                        this.data[key] = _data["data"][key] !== undefined ? _data["data"][key] : [];
                }
            }
        }
    }
    static fromJS(data) {
        data = typeof data === 'object' ? data : {};
        let result = new ValidationErrorResponseModel();
        result.init(data);
        return result;
    }
    toJSON(data) {
        data = typeof data === 'object' ? data : {};
        data["message"] = this.message;
        if (this.data) {
            data["data"] = {};
            for (let key in this.data) {
                if (this.data.hasOwnProperty(key))
                    data["data"][key] = this.data[key];
            }
        }
        return data;
    }
}
export class ApiException extends Error {
    constructor(message, status, response, headers, result) {
        super();
        this.isApiException = true;
        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }
    static isApiException(obj) {
        return obj.isApiException === true;
    }
}
function throwException(message, status, response, headers, result) {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}
