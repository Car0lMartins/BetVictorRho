const { getCachedData } = require("../data/fetchUrlData");

const getAllEvents = async (lang, sportId) => {
  const functionName = "getAllEvents";
  let sports;

  try {
    sports = await getCachedData(lang);
  } catch (error) {
    console.error(`[${functionName}] Error while trying to fetch sports. ${error}`);
  }

  const allEvents = sports.flatMap(sport => sport.comp).flatMap(events => events.events);

  if(sportId) {
    return allEvents.filter(event => {
      return event.sport_id === parseInt(sportId);
    });
  }
  
  return allEvents;
}

const getEventById = async (lang, eventId) => {
  const functionName = "getEventById";
  let sports;

  try {
    sports = await getCachedData(lang);
  } catch (error) {
    console.error(`[${functionName}] Error while trying to fetch sports. ${error}`)
  }

  const allEvents = sports.flatMap(sport => sport.comp).flatMap(events => events.events);

  return allEvents.filter(event => {
    return event.id === parseInt(eventId);
  });

}

module.exports = {
  getAllEvents,
  getEventById
}