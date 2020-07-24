const fetch = require("node-fetch");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });
require("dotenv").config();

/**
 * This function returns the url 
 * in the language code requested
 * If no language is given, it will return the url for the
 * default languages en-gb and de-de
 * 
 * @param {string} lang - Language code
 * 
 */
const getUrlByLang = (lang) => {
  return `https://partners.betvictor.mobi/${lang}/in-play/1/events`;
}

/**
 * This function fetches the data from the url
 * based on a language code (ISO 639)
 * 
 * @param {string} url - Is the url based on a language code
 * 
 */
const fetchData = async (url) => {
  try {
    const data = await fetch(url);
    return await data.json();
  } catch (error) {
    throw new Error(error);
  }
}
/**
 * This function returns the data fetched from the url
 * based on a language code (ISO 639)
 * If no language is given, it will fetch the data for the
 * default languages en-gb and de-de
 * 
 * @param {string} lang - Language code
 * 
 */
const getUrlData = async (lang) => {
  const allLanguages = process.env.ALL_LANGUAGES.split(",");
  
    if(lang) {
      const url = getUrlByLang(lang);
      let response;

      try {
        response = await fetchData(url);
      } catch (error) {
        throw new Error(error);
      }
      
      if(response.result) {
        return response.result.sports;
      }
    }

    const res = allLanguages.map(async (lang) => {
      const url = getUrlByLang(lang);
      let response;

      try {
        response = await fetchData(url);
      } catch (error) {
        throw new Error(error);
      }

      if(response.result) {
        return response.result.sports;
      }
    });

    return await Promise.all(res)
          .then( results => {
            return results.flatMap( sport => { return sport } )
          });
}

/**
 * This function caches the data retrieved from the provided
 * URL based on a language code (ISO 639)
 * If no language is given, it will cache the data for the
 * default languages en-gb and de-de
 * 
 * @param {string} lang - Language code
 * 
 */
const getCachedData = async (lang) => {
  let urlData;

  let key = "sports";

  if(lang) {
    key += `_${lang}`;
  }

  if(!myCache.has(key)) {
    try {
      urlData = await getUrlData(lang);
    } catch (error) {
      throw new Error(error);
    }

    myCache.set(key, urlData);
  }

  return myCache.get(key);
}

module.exports = {
  getCachedData
}