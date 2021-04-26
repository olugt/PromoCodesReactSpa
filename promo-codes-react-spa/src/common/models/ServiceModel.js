export default class ServiceModel {
    /**
     * Service information.
     * @param {Number} id ID of the service.
     * @param {String} name Name of the service.
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    setAsActivated() {
        this.isActivated = true;
    }

    resetActivation() {
        this.isActivated = false;
    }
};
