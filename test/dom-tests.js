const Lab = require("lab");
const Code = require("code");
const Hapi = require("hapi");
const lab = (exports.lab = Lab.script());
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const expect = Code.expect;
const before = lab.before;
const after = lab.after;
const it = lab.it;

const routes = require("../routes/routes.js");
require("svelte/ssr/register");
const staticTpl = require("../views/HtmlStatic.html");

let server;

before(async () => {
  try {
    server = Hapi.server({
      port: process.env.PORT || 3000,
      routes: {
        cors: true
      }
    });
    server.route(routes);
  } catch (err) {
    expect(err).to.not.exist();
  }
});

after(async () => {
  await server.stop({ timeout: 2000 });
  server = null;
});

function element(markup, selector) {
  return new Promise((resolve, reject) => {
    const dom = new JSDOM(markup);
    resolve(dom.window.document.querySelector(selector));
  });
}

function elementCount(markup, selector) {
  return new Promise((resolve, reject) => {
    const dom = new JSDOM(markup);
    resolve(dom.window.document.querySelectorAll(selector).length);
  });
}

lab.experiment("Q election executive dom tests", () => {
  it("should pass if one majority arrow is found", async () => {
    const renderingData = {
      item: require("../resources/fixtures/data/results-majority-partly-images.json"),
      toolRuntimeConfig: {
        displayOptions: {}
      }
    };
    var markup = staticTpl.render(JSON.parse(JSON.stringify(renderingData)));

    return elementCount(markup, "svg.q-election-executive-majority-arrow").then(
      value => {
        expect(value).to.be.equal(1);
      }
    );
  });

  it("should pass if for each data entry a DOM element is created", async () => {
    const renderingData = {
      item: require("../resources/fixtures/data/results-majority-partly-images.json"),
      toolRuntimeConfig: {
        displayOptions: {}
      }
    };
    var markup = staticTpl.render(JSON.parse(JSON.stringify(renderingData)));

    return elementCount(markup, "div.q-election-executive-item").then(value => {
      expect(value).to.be.equal(renderingData.item.candidates.length);
    });
  });
});