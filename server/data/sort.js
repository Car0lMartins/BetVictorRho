/**
 * Sorts the elements in the array by property 
 * given by parameter "prop"
 * 
 * @param {Array} array - Is the array that will be sorted
 * 
 */
const sortByProperty = (array, prop) => {
  return array.sort((next, previous) => {
    return next[prop] - previous[prop];
  });
}

module.exports = {
  sortByProperty
}