/**
 * This function generates a UUIDv4 random ID. This is fine for our purposes, to generate a unique ID
 * for each ClimatePlan and ClimatePlanAction.
 * @returns {string} UUIDv4 string
 */
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export { uuidv4 };
