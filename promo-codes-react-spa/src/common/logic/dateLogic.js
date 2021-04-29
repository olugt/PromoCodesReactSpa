/**
 * Add days to date.
 * @param {Date} date Date to add days to.
 * @param {Number} daysToAdd Number of days to add to the date parameter.
 * @returns Modified date, same instance as the date parameter.
 */
function addToDate(date, daysToAdd) {
    date.setDate(date.getDate() + daysToAdd);
    return date;
}

export { addToDate }