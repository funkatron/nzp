import {uuidv4} from "../util.js";

/**
 * ClimatePlanAction model
 *
 * @param {string} id UUID
 * @param {string} climatePlanId UUID of parent ClimatePlan
 * @param {string} title Title
 * @param {Number} estYearlyReductionCO2Emissions Estimated yearly reduction in CO2 emissions in tons
 * @param {Number} startYear Start year
 * @constructor
 * @returns {ClimatePlanAction}
 */
let ClimatePlanAction = function (id, climatePlanId, estYearlyReductionCO2Emissions, title, startYear) {

    // if id is not set, generate a UUIDv4 string
    if (!id) {
        id = uuidv4();
    }

    if (!climatePlanId) {
        throw new Error("ClimatePlanAction must have a parent ClimatePlan");
    }

    this.id = id;
    this.climatePlanId = climatePlanId;
    this.title = title;
    this.estYearlyReductionCO2Emissions = estYearlyReductionCO2Emissions;
    this.startYear = startYear;
}

ClimatePlanAction.prototype.serialize = function () {
    return {
        id: this.id,
        climatePlanId: this.climatePlanId,
        title: this.title,
        estYearlyReductionCO2Emissions: this.estYearlyReductionCO2Emissions,
        startYear: this.startYear,
    };
}

export { ClimatePlanAction };
