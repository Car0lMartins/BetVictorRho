const { getAllSports } = require("../sports/sportsMethods");

/**
 * This function lists all events for all languages 
 * or for a given language.
 * If the languague is invalid it returns an error.
 * 
 * @param {string} lang - Language code
 * 
 */
const getAllEvents = async (lang) => {
  let sports;

  try {
    sports = await getAllSports(lang);
  } catch (error) {
    throw new Error(error);
  }

  const allEvents = sports.flatMap(sport => sport.comp)
                          .flatMap(comp => comp.events);

  return allEvents;
};

/**
 * This function lists all events for all sports 
 * (if no sport id is provided)
 * or all events for a given sport id for a given language 
 * If the sport id does not exist or the languague is invalid
 * it returns an error.
 * 
 * @param {string} lang - Language code
 * @param {string} [sportId] - Is the id of the sport
 * 
 */
const getAllEventsBySport = async (lang, sportId) => {
  let allEvents;

  try {
    allEvents = await getAllEvents(lang);
  } catch (error) {
    throw new Error(error);
  }

  if(sportId) {
    const eventsBySportId = allEvents.filter(event => {
      return event.sport_id === parseInt(sportId);
    });

    if(eventsBySportId.length === 0) {
      throw new Error("Sport id does not exist.");
    }

    return eventsBySportId;
  }
  
  return allEvents;
}

/**
 * This function lists an event (given by the parameter eventId) 
 * for a given language or an error, if the event id does not exist 
 * or the languague is invalid.
 * 
 * @param {string} lang - Language code
 * @param {string} eventId - Is the id of the event that will be listed
 * 
 */
const getEventById = async (lang, eventId) => {
  let allEvents;

  try {
    allEvents = await getAllEvents(lang);
  } catch (error) {
    throw new Error(error);
  }
  const eventExist = allEvents.filter(event => {
    return event.id === parseInt(eventId);
  });

  if(eventExist.length === 0) {
    throw new Error("Event id does not exist.");
  }

  return eventExist;
}

/**
 * This function lists all events names for all sports 
 * (if no sport id is provided)
 * or all events names for a given sport id for a given language.
 * If the sport id does not exist or the languague is invalid
 * it returns an error.
 * 
 * @param {string} lang - Language code
 * @param {string} [sportId] - Is the id of the sport
 * 
 */
const getEventsNames = async (lang, sportId) => {
  let allEvents;

  try {
    allEvents = await getAllEvents(lang);
  } catch (error) {
    throw new Error(error);
  }
  
  if(sportId) {

    const eventsBysportId = allEvents.filter(event => {
      return event.sport_id === parseInt(sportId);
    });
  
    if(eventsBysportId.length === 0) {
      throw new Error("Sport id does not exist.");
    }

    const eventsNames = eventsBysportId.map(event => event.desc);

    return eventsNames;
  }

  const allEventsNames = allEvents.map(event => event.desc);

  return allEventsNames;
}

module.exports = {
  getAllEventsBySport,
  getEventById,
  getEventsNames
}