const express = require("express");
const { getAllSports } = require("./sports/sportsMethods");
const { getAllEvents, getEventById } = require("./events/eventsMethods");

const router = express.Router();

router.get("/sports/:lang", async (req, res) => {
  const { lang } = req.params;

  try {
    const sports = await getAllSports(lang);

    res.status(200).send({ sports });
  } catch (error) {
    console.error(error);
  }
});

router.get("/events/:lang", async (req, res) => {
  const { sportId } = req.query;
  const { lang } = req.params;

  try {
    const events = await getAllEvents(lang, sportId);
    res.status(200).send({ events });
  } catch (error) {
    console.error(error);
  }
});

router.get("/events/:lang/:eventId", async (req, res) => {
  const { lang, eventId } = req.params;

  try {
    const event = await getEventById(lang, eventId);
    res.status(200).send({ event });
  } catch (error) {
    console.error(error);
  }
});

router.get("/sports/languages/all", async (req, res) => {

  try {
    const sports = await getAllSports();
    
    res.status(200).send({ sports });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;