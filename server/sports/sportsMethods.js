const { getCachedData } = require("../data/fetchUrlData");

const getAllSports = async (lang) => {
  const functionName = "getAllSports";

  try {
    return await getCachedData(lang);
  } catch (error) {
    console.error(`[${functionName}] Error while trying to fetch sports. ${error}`);
  }
}

module.exports = {
  getAllSports
}