/**
 * This constructs a projection from a ClimatePlan. It is used to calculate the
 * estimated yearly reduction in CO2 emissions in tons.
 * @param {ClimatePlan} climatePlan
 * @constructor
 */
let ClimatePlanProjection = function (climatePlan) {
    this.startYear = climatePlan.startYear;
    this.endYear = climatePlan.endYear;
    this.netCO2Emissions = climatePlan.annualCO2Emissions;
    this.totalCO2Emissions = climatePlan.annualCO2Emissions * (this.endYear - this.startYear + 1);

    this.projectionByYears = [];

    for (let i = this.startYear; i <= this.endYear; i++) {
        this.projectionByYears[i] = {
            grossCO2Emissions: climatePlan.annualCO2Emissions,
            netCO2Emissions: climatePlan.annualCO2Emissions,
            estYearlyReductionCO2Emissions: 0,
            cumulativeReductionCO2Emissions: 0,
        };
        climatePlan.climatePlanActions.forEach((climatePlanAction) => {
            // subtract the action's estimated yearly reduction in CO2 emissions in tons
            if (climatePlanAction.startYear <= i) {
                this.projectionByYears[i].netCO2Emissions -= climatePlanAction.estYearlyReductionCO2Emissions;
            }
        });

        // calculate percentageReductionCO2Emissions
        let percentageReductionCO2Emissions = Math.round((this.projectionByYears[i].grossCO2Emissions - this.projectionByYears[i].netCO2Emissions) / this.projectionByYears[i].grossCO2Emissions * 100);
        // make sure the max is 100% and min is 0%
        percentageReductionCO2Emissions = Math.min(percentageReductionCO2Emissions, 100);
        percentageReductionCO2Emissions = Math.max(percentageReductionCO2Emissions, 0);
        this.projectionByYears[i].percentageReductionCO2Emissions =percentageReductionCO2Emissions;
    }
}

ClimatePlanProjection.prototype.byYears = function () {
    let projectionByYears = {};
    for (let i = this.startYear; i <= this.endYear; i++) {
        projectionByYears[i] = this.projectionByYears[i];
    }
    return projectionByYears;
}

ClimatePlanProjection.prototype.forYear = function (year) {
    return this.projectionByYears[year];
}

ClimatePlanProjection.prototype.serializeAsCSV = function () {
    let csv = "Year,Gross CO2 Emissions,Net CO2 Emissions,Estimated Yearly Reduction CO2 Emissions,Cumulative Reduction CO2 Emissions,Percentage Reduction CO2 Emissions\n";
    for (let i = this.startYear; i <= this.endYear; i++) {
        csv += `${i},${this.projectionByYears[i].grossCO2Emissions},${this.projectionByYears[i].netCO2Emissions},${this.projectionByYears[i].estYearlyReductionCO2Emissions},${this.projectionByYears[i].cumulativeReductionCO2Emissions},${this.projectionByYears[i].percentageReductionCO2Emissions}\n`;
    }
    return csv;
}

export {ClimatePlanProjection};
