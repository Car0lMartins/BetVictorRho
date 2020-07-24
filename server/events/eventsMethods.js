const { getCachedData } = require("../data/fetchUrlData");
const { getAllSports } = require("../sports/sportsMethods");

/**
 * This function lists all events for all sports 
 * (if no sport id is provided)
 * or all events for a given sport id for a given language 
 * or an error, if the sport id does not exist 
 * or the languague is invalid.
 * 
 * @param {string} lang - Language code
 * @param {string} [sportId] - Is the id of the sport
 * 
 */
const getAllEvents = async (lang, sportId) => {
  let sports;

  try {
    sports = await getAllSports(lang);
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

/**
 * This function lists an event (given by the parameter eventId) 
 * for a given language or an error, if the event id does not exist 
 * or the languague is invalid.
 * 
 * @param {string} lang - Language code
 * @param {string} eventId - Is the id of the event to be listed
 * 
 */
const getEventById = async (lang, eventId) => {
  let sports;

  try {
    sports = await getAllSports(lang);
  } catch (error) {
    throw new Error(error);
  }

  const allEvents = sports
                    .flatMap(sport => sport.comp)
                    .flatMap(events => events.events);

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