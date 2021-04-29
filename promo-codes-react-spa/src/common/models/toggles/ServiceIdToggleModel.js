import ServiceModel from "../ServiceModel";
import ToggleModelBase from "./ToggleModelBase";

export default class ServiceIdToggleModel extends ToggleModelBase {
    /**
     * 
     * @param {Boolean} isOn Says whether or not toggle is on.
     * @param {String} value Service model ID.
     */
    constructor(isOn, value) {
        super(isOn);
        this.value = value;
    }
};
