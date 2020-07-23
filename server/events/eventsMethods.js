const { getCachedData } = require("../data/fetchUrlData");

const getAllEvents = async (lang, sportId) => {
  let sports;

  try {
    sports = await getCachedData(lang);
  } catch (error) {
    throw new Error(error);
  }

  const allEvents = sports.flatMap(sport => sport.comp).flatMap(events => events.events);

  if(sportId) {
    const sportIdExist = allEvents.filter(event => {
      return event.sport_id === parseInt(sportId);
    });

    if(sportIdExist.length === 0) {
      throw new Error("Sport id does not exist.")
    }

    return sportIdExist;
  }
  
  return allEvents;
}

const getEventById = async (lang, eventId) => {
  let sports;

  try {
    sports = await getCachedData(lang);
  } catch (error) {
    throw new Error(error);
  }

  const allEvents = sports.flatMap(sport => sport.comp).flatMap(events => events.events);

  const eventExist = allEvents.filter(event => {
    return event.id === parseInt(eventId);
  });

  if(eventExist.length === 0) {
    throw new Error("Event id does not exist.");
  }

  return eventExist;
}

module.exports = {
  getAllEvents,
  getEventById
}