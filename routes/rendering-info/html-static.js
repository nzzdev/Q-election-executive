const fs = require("fs");
const Enjoi = require("enjoi");
const _ = require("lodash");
const resourcesDir = __dirname + "/../../resources/";
const viewsDir = __dirname + "/../../views/";

const styleHashMap = require(__dirname + `/../../styles/hashMap.json`);

const schemaString = JSON.parse(
  fs.readFileSync(resourcesDir + "schema.json", {
    encoding: "utf-8"
  })
);
const schema = Enjoi.schema(schemaString);

const displayOptionsSchema = Enjoi.schema(
  JSON.parse(
    fs.readFileSync(resourcesDir + "display-options-schema.json", {
      encoding: "utf-8"
    })
  )
);

// setup svelte
require("svelte/register");
const staticTemplate = require(viewsDir + "HtmlStatic.svelte").default;

module.exports = {
  method: "POST",
  path: "/rendering-info/html-static",
  options: {
    validate: {
      options: {
        allowUnknown: true
      },
      payload: {
        item: schema,
        toolRuntimeConfig: {
          displayOptions: displayOptionsSchema
        }
      }
    },
    cache: false, // do not send cache control header to let it be added by Q Server
    cors: true
  },
  handler: function(request, h) {
    // rendering data will be used by template to create the markup
    // it contains the item itself and additional options impacting the markup
    let renderingData = {
      item: request.payload.item,
      displayOptions: request.payload.toolRuntimeConfig.displayOptions || {},
      imageServiceUrl: process.env.IMAGE_SERVICE_URL
    };

    renderingData.item.candidates.map(candidate => {
      if (candidate.picture && candidate.picture.key) {
        candidate.picture.url = process.env.IMAGE_SERVICE_URL.replace(
          "{key}",
          candidate.picture.key
        );
      }
    });

    if (request.query.updatedDate) {
      renderingData.item.updatedDate = request.query.updatedDate;
    }

    if (request.payload.toolRuntimeConfig) {
      renderingData.toolRuntimeConfig = request.payload.toolRuntimeConfig;
    }

    let responseData = {
      stylesheets: [
        {
          name: styleHashMap.default
        }
      ],
      sophieModules: [],
      markup: staticTemplate.render(renderingData).html
    };

    // add sophie viz color module to stylesheets in response iff necessary
    let isSophieVizColorDefined = false;
    let candidates = renderingData.item.candidates;
    if (candidates !== undefined) {
      candidates.forEach(candidate => {
        let vizPattern = /^s-viz-color-party.*/;
        if (
          _.has(candidate, "color.classAttribute") &&
          vizPattern.test(candidate.color.classAttribute)
        ) {
          isSophieVizColorDefined = true;
        }
      });
    }

    if (isSophieVizColorDefined) {
      responseData.sophieModules.push({
        name: "sophie-viz-color@1",
        submodules: ["parties"]
      });
    }

    return responseData;
  }
};
