const request = require("supertest");
const app = require("../app");

let sportId, eventId;
let wrongEventId = "0123456789";
let wrongSportId = "0";

const lang = "en-gb";
const language = "english";

it("Should list successfully all events given a language", async () => {

  const response = await request(app)
    .get(`/events/${lang}`)
    .send()
    .expect(200);

  sportId = response.body.events[0].sport_id;
  eventId = response.body.events[0].id;

  expect(response.body).toHaveProperty("events");
  expect(response.body.events).toEqual(expect.any(Object));
  expect(response.body.events.length).toBeGreaterThan(0);
});

it("Should list successfully all events for a given sportId and language", async () => {

  const response = await request(app)
    .get(`/events/${lang}`)
    .query({ sportId })
    .send()
    .expect(200);

  expect(response.body).toHaveProperty("events");
  expect(response.body.events).toEqual(expect.any(Object));
  expect(response.body.events.length).toBeGreaterThan(0);
});

it("Should return an internal server error if the language is invalid", async () => {

  const response = await request(app)
    .get(`/events/${language}`)
    .query({ sportId })
    .send()
    .expect(500);

    expect(response.body).not.toHaveProperty("events");
    expect(response.body).toHaveProperty("message");
});

it("Should return an internal server error if the sport id is invalid", async () => {

  const response = await request(app)
    .get(`/events/${lang}`)
    .query({ sportId: wrongSportId })
    .send()
    .expect(500);

    expect(response.body).not.toHaveProperty("events");
    expect(response.body).toHaveProperty("message");
});

it("Should list successfully all data for a given event and language", async () => {

  const response = await request(app)
    .get(`/events/${lang}/${eventId}`)
    .send()
    .expect(200);

  expect(response.body).toHaveProperty("event");
  expect(response.body.event).toEqual(expect.any(Object));
  expect(response.body.event.length).toEqual(1);
});

it("Should return an internal server error if the given event id is invalid", async () => {

  const response = await request(app)
    .get(`/events/${lang}/${wrongEventId}`)
    .send()
    .expect(500);

    expect(response.body).not.toHaveProperty("events");
    expect(response.body).toHaveProperty("message");
});

it("Should return an internal server error if the language is invalid", async () => {

  const response = await request(app)
    .get(`/events/${language}/${eventId}`)
    .send()
    .expect(500);

    expect(response.body).not.toHaveProperty("events");
    expect(response.body).toHaveProperty("message");
});

it("Should list successfully all events names for a given sportId and language", async () => {

  const response = await request(app)
    .get(`/events/names/${lang}`)
    .query({ sportId })
    .send()
    .expect(200);

  expect(response.body).toHaveProperty("events");
  expect(response.body.events).toEqual(expect.any(Object));
  expect(response.body.events.length).toBeGreaterThan(0);
});

it("Should list successfully all events names for a given language", async () => {

  const response = await request(app)
    .get(`/events/names/${lang}`)
    .query({})
    .send()
    .expect(200);

  expect(response.body).toHaveProperty("events");
  expect(response.body.events).toEqual(expect.any(Object));
  expect(response.body.events.length).toBeGreaterThan(0);
});

it("Should return an internal server error if the language is invalid", async () => {

  const response = await request(app)
    .get(`/events/names/${language}`)
    .query({ sportId })
    .send()
    .expect(500);

    expect(response.body).not.toHaveProperty("events");
    expect(response.body).toHaveProperty("message");
});

it("Should return an internal server error if the sportId is invalid", async () => {

  const response = await request(app)
    .get(`/events/names/${lang}`)
    .query({ sportId: wrongSportId })
    .send()
    .expect(500);

    expect(response.body).not.toHaveProperty("events");
    expect(response.body).toHaveProperty("message");
});
