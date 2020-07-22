const fetch = require("node-fetch");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache({ stdTTL: 60, checkperiod: 120 });
require("dotenv").config();

const getUrlByLang = (lang) => {
  return `https://partners.betvictor.mobi/${lang}/in-play/1/events`;
}

const getUrlData = async (lang) => {
  const allLanguages = process.env.ALL_LANGUAGES.split(",");
  
    if(lang) {
      const url = getUrlByLang(lang);
      let response;

      try {
        const data = await fetch(url);
        response = await data.json();
      } catch (error) {
        console.error(`Error while trying to fetch data from ${url}. ${error}`);
        return;
      }

      if(response.result) {
        return response.result.sports;
      }
    }

    const res = allLanguages.map(async (lang) => {
      const url = getUrlByLang(lang);
      let response;

      try {
        const data = await fetch(url);
        response = await data.json();
      } catch (error) {
        throw new Error(error);
      }

      if(response.result) {
        return response.result.sports;
      }
    });

    return Promise.all(res)
          .then( results => {
            return results.flatMap( sport => { return sport } )
          });
}

const getCachedData = async (lang) => {
  let urlData;

  let key = "sports";

  if(lang) {
    key += `_${lang}`;
  }

  if(!myCache.has(key)) {
    console.log("not cached")
    try {
      urlData = await getUrlData(lang);
    } catch (error) {
      console.error(`Error while trying to fetch data from the given url. ${error}`);
    }

    myCache.set(key, urlData);

    return myCache.get(key);
  }

  return myCache.get(key);
}

module.exports = {
  getCachedData
}