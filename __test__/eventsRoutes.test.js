const request = require("supertest");
const app = require("../app");

let sportIdEnGb, eventIdEnGb;
let wrongEventId = "0123456789";
let wrongSportId = "0";

const lang = "en-gb";
const language = "english";

it("Should return successfully all events given a language (EX: en-gb , de-de)", async () => {

  const response = await request(app)
    .get(`/events/${lang}`)
    .send()
    .expect(200);

  sportIdEnGb = response.body.events[0].sport_id;
  eventIdEnGb = response.body.events[0].id;

  expect(response.body).toHaveProperty("events");
  expect(response.body.events).toEqual(expect.any(Object));
  expect(response.body.events.length).toBeGreaterThan(0);
});

it("Should return successfully all events for a given sportId and language", async () => {

  const response = await request(app)
    .get(`/events/${lang}`)
    .query({ sportId: sportIdEnGb })
    .send()
    .expect(200);

  expect(response.body).toHaveProperty("events");
  expect(response.body.events).toEqual(expect.any(Object));
  expect(response.body.events.length).toBeGreaterThan(0);
});

it("Should return an internal server error if the language is invalid", async () => {

  const response = await request(app)
    .get(`/events/${language}`)
    .query({ sportId: sportIdEnGb })
    .send()
    .expect(500);

    expect(response.body).not.toHaveProperty("events");
});

it("Should return an internal server error if the sport id is invalid", async () => {

  const response = await request(app)
    .get(`/events/${lang}`)
    .query({ sportId: wrongSportId })
    .send()
    .expect(500);

    expect(response.body).not.toHaveProperty("events");
});

it("Should return successfully all data for a given event and language", async () => {

  const response = await request(app)
    .get(`/events/${lang}/${eventIdEnGb}`)
    .send()
    .expect(200);

  expect(response.body).toHaveProperty("event");
  expect(response.body.event).toEqual(expect.any(Object));
  expect(response.body.event.length).toBeGreaterThan(0);
});

it("Should return an internal server error", async () => {

  const response = await request(app)
    .get(`/events/${lang}/${wrongEventId}`)
    .send()
    .expect(500);

    expect(response.body).not.toHaveProperty("events");
});

it("Should return an internal server error if the language is invalid", async () => {

  const response = await request(app)
    .get(`/events/${language}/${eventIdEnGb}`)
    .send()
    .expect(500);

    expect(response.body).not.toHaveProperty("events");
});