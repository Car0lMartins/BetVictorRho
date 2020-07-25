const express = require("express");
const { getAllSports, getAllSportsNames } = require("./sports/sportsMethods");
const { getAllEventsBySport, getEventById, getEventsNames } = require("./events/eventsMethods");

const router = express.Router();

router.get("/sports/names", async (req, res) => {
  const { lang } = req.query;

  try {
    const sports = await getAllSportsNames(lang);
    res.status(200).send({ sports });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/sports/languages/all", async (req, res) => {

  try {
    const sports = await getAllSports();
    res.status(200).send({ sports });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/sports/languages/:lang", async (req, res) => {
  const { lang } = req.params;

  try {
    const sports = await getAllSports(lang);
    res.status(200).send({ sports });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/events/names/:lang", async (req, res) => {
  const { lang } = req.params;
  const { sportId } = req.query;

  try {
    const events = await getEventsNames(lang, sportId);
    res.status(200).send({ events })
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/events/:lang", async (req, res) => {
  const { sportId } = req.query;
  const { lang } = req.params;

  try {
    const events = await getAllEventsBySport(lang, sportId);
    res.status(200).send({ events });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/events/:lang/:eventId", async (req, res) => {
  const { lang, eventId } = req.params;

  try {
    const event = await getEventById(lang, eventId);
    res.status(200).send({ event });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;