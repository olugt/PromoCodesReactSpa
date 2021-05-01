
/**
 * Get number of items to skip in a collection of data, based on page number and page items limit.
 * @param {Number} page The page number.
 * @param {Number} limit The page items limit.
 * @returns The skip number.
 */
function getSkip(page, limit) {
    return limit * (page - 1)
}

/**
 * Extract a sub-collection from a collection by skipping a number of items.
 * @param {Object[]} collection The collection to extract sub-collection from, by skipping earlier items.
 * @param {Number} page Page number.
 * @param {Number} limit Page items limit.
 * @returns A sub-collection after earlier items have been skipped.
 */
function skip(collection, page, limit) {
    return collection.filter((value, index, array) => index >= getSkip(page, limit));
}

/**
 * Extract an earlier number of items from a collection.
 * @param {Object[]} collection The collection to extract sub-collection from.
 * @param {Number} limit The number of earlier items to be taken from the collection.
 * @returns A sub-collection after a number of earlier items, as stated by limit, have been taken.
 */
function take(collection, limit) {
    return collection.slice(0, limit)
}

export { getSkip, skip, take }