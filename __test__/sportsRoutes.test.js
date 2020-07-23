const request = require("supertest");
const app = require("../app");

it("Should return successfully all sports given a language (EX: en-gb , de-de)", async () => {
  const lang = "en-gb";

  const response = await request(app)
    .get(`/sports/languages/${lang}`)
    .send()
    .expect(200);

  expect(response.body).toHaveProperty("sports");
  expect(response.body.sports).toEqual(expect.any(Object));
  expect(response.body.sports.length).toBeGreaterThan(0);
});

it("Should return an internal server error", async () => {
  const lang = "english";

  const response = await request(app)
    .get(`/sports/languages/${lang}`)
    .send()
    .expect(500);

  expect(response.body).not.toHaveProperty("sports");
});

it("Should return all sports in all languages (en-gb and de-de)", async () => {

  const response = await request(app)
    .get("/sports/languages/all")
    .send()
    .expect(200);

    expect(response.body).toHaveProperty("sports");
    expect(response.body.sports).toEqual(expect.any(Object));
    expect(response.body.sports.length).toBeGreaterThan(0);
});
