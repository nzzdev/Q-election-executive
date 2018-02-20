"use strict";

const expect = require("chai").expect;
const server = require("../server.js");
const plugins = require("../server-plugins.js");
const routes = require("../routes/routes.js");
const Joi = require("joi");
const Enjoi = require("enjoi");
const fs = require("fs");
process.env.IMAGE_SERVICE_URL =
  "https://q-images-stage.nzz.ch/{key}?width=108&format=png&auto=webp";

const resourcesDir = __dirname + "/../resources/";

const schemaString = JSON.parse(
  fs.readFileSync(resourcesDir + "schema.json", {
    encoding: "utf-8"
  })
);
const schema = Enjoi(schemaString);

async function start() {
  await server.register(plugins);
  server.route(routes);
  await server.start();

  describe("basic routes", () => {
    it("starts the server", () => {
      expect(server.info.port).to.be.equal(3000);
    });

    it("is healthy", async () => {
      const response = await server.inject("/health");
      expect(response.payload).to.be.equal("ok");
    });
  });

  describe("schema endpoint", () => {
    it("returns 200 for /schema.json", async () => {
      const response = await server.inject("/schema.json");
      expect(response.statusCode).to.be.equal(200);
    });
  });

  describe("stylesheet endpoint", () => {
    it("returns 200 for /stylesheet/default.123.css", async () => {
      const response = await server.inject("/stylesheet/default.123.css");
      expect(response.statusCode).to.be.equal(200);
    });

    it("returns 404 for inexistent stylesheet", async () => {
      const response = await server.inject("/stylesheet/inexisting.123.css");
      expect(response.statusCode).to.be.equal(404);
    });
  });

  const fixtureDataV1 = require("../resources/fixtures/data/before-v2.0.0/empty-candidate-name.json");
  const fixtureDataV2 = require("../resources/fixtures/data/results-majority-partly-images.json");

  describe("rendering-info endpoint", () => {
    it("returns 200 for /rendering-info/html-static", async () => {
      const request = {
        method: "POST",
        url: "/rendering-info/html-static",
        payload: {
          item: fixtureDataV2,
          toolRuntimeConfig: {
            displayOptions: {}
          }
        }
      };
      const response = await server.inject(request);
      expect(response.statusCode).to.be.equal(200);
    });
  });

  describe("migration endpoint", () => {
    it("returns status code 200 and pass validation against new schema after migration", async () => {
      expect(Joi.validate(fixtureDataV1, schema).error).not.to.be.null;
      const request = {
        method: "POST",
        url: "/migration",
        payload: {
          item: fixtureDataV1
        }
      };
      const response = await server.inject(request);
      expect(response.statusCode).to.be.equal(200);
      expect(Joi.validate(response.result.item, schema).error).to.be.null;
    });

    it("returns 304 for /migration", async () => {
      const request = {
        method: "POST",
        url: "/migration",
        payload: {
          item: fixtureDataV2
        }
      };
      const response = await server.inject(request);
      expect(response.statusCode).to.be.equal(304);
    });
  });

  describe("fixture data endpoint", () => {
    it("returns 9 fixture data items for /fixtures/data", async () => {
      const response = await server.inject("/fixtures/data");
      expect(response.statusCode).to.be.equal(200);
      expect(response.result.length).to.be.equal(10);
    });
  });
}

start();
