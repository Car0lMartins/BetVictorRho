const request = require("supertest");
const app = require("../app");

const lang = "en-gb";
const invalidLang = "english";

it("Should list successfully all sports given a language", async () => {
  
  const response = await request(app)
    .get(`/sports/languages/${lang}`)
    .send()
    .expect(200);

  expect(response.body).toHaveProperty("sports");
  expect(response.body.sports).toEqual(expect.any(Object));
  expect(response.body.sports.length).toBeGreaterThan(0);
});

it("Should return an internal server error if the language is invalid", async () => {

  const response = await request(app)
    .get(`/sports/languages/${invalidLang}`)
    .send()
    .expect(500);

  expect(response.body).not.toHaveProperty("sports");
});

it("Should list all sports in all languages (en-gb and de-de)", async () => {

  const response = await request(app)
    .get("/sports/languages/all")
    .send()
    .expect(200);

    expect(response.body).toHaveProperty("sports");
    expect(response.body.sports).toEqual(expect.any(Object));
    expect(response.body.sports.length).toBeGreaterThan(0);
});

it("Should list all sports names in all languages (en-gb and de-de)", async () => {

  const response = await request(app)
    .get("/sports/names")
    .send()
    .expect(200);

    expect(response.body).toHaveProperty("sports");
    expect(response.body.sports).toEqual(expect.any(Object));
    expect(response.body.sports.length).toBeGreaterThan(0);
});

it("Should list all sports names given a language", async () => {

  const response = await request(app)
    .get("/sports/names")
    .query({ lang })
    .send()
    .expect(200);

    expect(response.body).toHaveProperty("sports");
    expect(response.body.sports).toEqual(expect.any(Object));
    expect(response.body.sports.length).toBeGreaterThan(0);
});

it("Should return an internal server error if the language is invalid", async () => {

  const response = await request(app)
    .get("/sports/names")
    .query({ lang: invalidLang })
    .send()
    .expect(500);

  expect(response.body).not.toHaveProperty("sports");
});
