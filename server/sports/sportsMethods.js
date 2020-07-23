const { getCachedData } = require("../data/fetchUrlData");

const getAllSports = async (lang) => {

  try {
    return await getCachedData(lang);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  getAllSports
}