import {uuidv4} from "../util.js";

/**
 * ClimatePlan model
 * @param {string} id UUID
 * @param {string} title Title for the Plan
 * @param {number} annualCO2Emissions Annual CO2 emissions in tons
 * @param {number} startYear Start year
 * @param {number} endYear End year
 * @param {Array} climatePlanActions Array of ClimatePlanAction objects
 * @constructor
 * @returns {ClimatePlan}
 */
let ClimatePlan = function (id, title, annualCO2Emissions, startYear, endYear, climatePlanActions) {

    // if id is not set, generate a UUIDv4 string
    if (!id) {
        id = uuidv4();
    }

    this.id = id;
    this.title = title;
    this.annualCO2Emissions = annualCO2Emissions;
    this.startYear = startYear;
    this.endYear = endYear;
    this.climatePlanActions = climatePlanActions;
}

ClimatePlan.prototype.serialize = function () {
    return {
        id: this.id,
        annualCO2Emissions: this.annualCO2Emissions,
        startYear: this.startYear,
        endYear: this.endYear,
        climatePlanActions: this.climatePlanActions.map(action => action.serialize())
    };
}

/**
 * Add a ClimatePlanAction to the ClimatePlan
 *
 * If the ClimatePlanAction is already in the ClimatePlan, it will be _replaced_ with the new one.
 * Otherwise, it will be added to the climatePlanActions array.
 *
 * @param {ClimatePlanAction} climatePlanAction
 * @returns {void}
 */
ClimatePlan.prototype.addOrUpdateClimatePlanAction = function (climatePlanAction) {
    let index = this.climatePlanActions.findIndex(action => action.id === climatePlanAction.id);
    if (index > -1) {
        this.climatePlanActions[index] = climatePlanAction;
    } else {
        this.climatePlanActions.push(climatePlanAction);
    }
}

ClimatePlan.prototype.removeClimatePlanAction = function (climatePlanAction) {
    let index = this.climatePlanActions.findIndex(action => action.id === climatePlanAction.id);
    if (index > -1) {
        this.climatePlanActions.splice(index, 1);
    }
}

/**
 * Serialize the ClimatePlan as a CSV string
 */
ClimatePlan.prototype.serializeAsCSV = function () {
    let csv = "id,title,estYearlyReductionCO2Emissions,startYear,endYear\n";
    this.climatePlanActions.forEach(action => {
        csv += `${action.id},${action.title},${action.estYearlyReductionCO2Emissions},${action.startYear},${this.endYear}\n`;
    });
    return csv;
}

export {ClimatePlan};
