/**
 * Add days to date.
 * @param {Date} date Date to add days to.
 * @param {Number} daysToAdd Number of days to add to the date parameter.
 * @returns Modified date, same instance as the date parameter.
 */
function addDaysToDate(date, daysToAdd) {
    date.setDate(date.getDate() + daysToAdd);
    return date;
}

/**
 * Add minutes to date.
 * @param {Date} date Date to add minutes to.
 * @param {Number} minutesToAdd Number of minutes to add to the date parameter.
 * @returns Modified date, same instance as the date parameter.
 */
 function addMinutesToDate(date, minutesToAdd) {
    date.setMinutes(date.getMinutes() + minutesToAdd);
    return date;
}

export { addDaysToDate, addMinutesToDate }