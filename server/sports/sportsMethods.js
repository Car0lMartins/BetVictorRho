const { getCachedData } = require("../data/fetchUrlData");
const { sortByProperty } = require("../data/sort");

/**
 * This function returns all sports for a given language 
 * or all languages (if no language is provided), 
 * sorted by property "pos".
 * If the languague is invalid, it returns an error.
 * 
 * @param {string} lang - Language code
 * 
 */
const getAllSports = async (lang) => {

  try {
    const sports = await getCachedData(lang);
    return sortByProperty(sports, 'pos');
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getAllSports
}