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
    const response = await server.inject({
      url: "/rendering-info/html-static?_id=someid",
      method: "POST",
      payload: {
        item: require("../resources/fixtures/data/results-majority-partly-images.json"),
        toolRuntimeConfig: {
          displayOptions: {}
        }
      }
    });

    return elementCount(
      response.result.markup,
      "svg.q-election-executive-majority-arrow"
    ).then(value => {
      expect(value).to.be.equal(1);
    });
  });

  it("should pass if for each data entry a DOM element is created", async () => {
    const response = await server.inject({
      url: "/rendering-info/html-static?_id=someid",
      method: "POST",
      payload: {
        item: require("../resources/fixtures/data/results-majority-partly-images.json"),
        toolRuntimeConfig: {
          displayOptions: {}
        }
      }
    });

    return elementCount(
      response.result.markup,
      "div.q-election-executive-item"
    ).then(value => {
      expect(value).to.be.equal(4);
    });
  });
});

lab.experiment("hide updated date", () => {
  it("should display the updated date", async () => {
    const response = await server.inject({
      url: "/rendering-info/html-static?_id=someid",
      method: "POST",
      payload: {
        item: require("../resources/fixtures/data/show-updated-date.json"),
        toolRuntimeConfig: {
          displayOptions: {}
        }
      }
    });

    return element(response.result.markup, "div.s-q-item__footer").then(
      element => {
        expect(element.innerHTML.includes("Update")).to.be.equals(true);
      }
    );
  });
  it("shouldn't display the updated date", async () => {
    const response = await server.inject({
      url: "/rendering-info/html-static?_id=someid",
      method: "POST",
      payload: {
        item: require("../resources/fixtures/data/hide-updated-date.json"),
        toolRuntimeConfig: {
          displayOptions: {}
        }
      }
    });

    return element(response.result.markup, "div.s-q-item__footer").then(
      element => {
        expect(element.innerHTML.includes("Update")).to.be.equals(false);
      }
    );
  });
});

lab.experiment("error margin data", function() {
  it("should show error margin layout if hasErrorMargin is set to true", async () => {
    const response = await server.inject({
      url: "/rendering-info/html-static?_id=someid",
      method: "POST",
      payload: {
        item: require("../resources/fixtures/data/results-error-margin-partly-images-colors.json"),
        toolRuntimeConfig: {
          displayOptions: {}
        }
      }
    });
    return elementCount(
      response.result.markup,
      "div.q-election-executive-item-error-margin-bar"
    ).then(value => {
      expect(value).to.be.equal(4);
    });
  });
});
