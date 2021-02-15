const fixtureDataDirectory = "../resources/fixtures/data";
var fs = require("fs");

// provide every fixture data file present in ../../resources/fixtures/data
const fixtureData = [
  [
    `${fixtureDataDirectory}/no-results-majority-images.json`,
    require(`${fixtureDataDirectory}/no-results-majority-images.json`),
  ],
  [
    `${fixtureDataDirectory}/no-results-no-majority-images.json`,
    require(`${fixtureDataDirectory}/no-results-no-majority-images.json`),
  ],
  [
    `${fixtureDataDirectory}/no-results-percentage-images.json`,
    require(`${fixtureDataDirectory}/no-results-percentage-images.json`),
  ],
  [
    `${fixtureDataDirectory}/results-majority-no-images-status.json`,
    require(`${fixtureDataDirectory}/results-majority-no-images-status.json`),
  ],
  [
    `${fixtureDataDirectory}/results-majority-partly-images.json`,
    require(`${fixtureDataDirectory}/results-majority-partly-images.json`),
  ],
  [
    `${fixtureDataDirectory}/results-no-majority-no-images.json`,
    require(`${fixtureDataDirectory}/results-no-majority-no-images.json`),
  ],
  [
    `${fixtureDataDirectory}/results-percentage-partly-images-colors.json`,
    require(`${fixtureDataDirectory}/results-percentage-partly-images-colors.json`),
  ],
  [
    `${fixtureDataDirectory}/results-percentage-with-others.json`,
    require(`${fixtureDataDirectory}/results-percentage-with-others.json`),
  ],
  [
    `${fixtureDataDirectory}/results-majority-with-others.json`,
    require(`${fixtureDataDirectory}/results-majority-with-others.json`),
  ],
  [
    `${fixtureDataDirectory}/results-majority-partly-images-with-others.json`,
    require(`${fixtureDataDirectory}/results-majority-partly-images-with-others.json`),
  ],
  [
    `${fixtureDataDirectory}/results-with-available-seats.json`,
    require(`${fixtureDataDirectory}/results-with-available-seats.json`),
  ],
  [
    `${fixtureDataDirectory}/hide-updated-date.json`,
    require(`${fixtureDataDirectory}/hide-updated-date.json`),
  ],
  [
    `${fixtureDataDirectory}/results-float-numbers-no-images-status.json`,
    require(`${fixtureDataDirectory}/results-float-numbers-no-images-status.json`),
  ],
  [
    `${fixtureDataDirectory}/results-float-percentage-partly-images-colors.json`,
    require(`${fixtureDataDirectory}/results-float-percentage-partly-images-colors.json`),
  ],
];

// register migration scripts here in order of version,
// i.e. list the smallest version first
const migrationScripts = [
  require("../migration-scripts/to-v2.0.0.js"),
  require("../migration-scripts/to-v3.0.0.js"),
];

fixtureData.forEach((item) => {
  migrationScripts.forEach((script) => {
    script.migrate(item[1]);
    fs.writeFile(
      item[0].split("../")[1],
      JSON.stringify(item[1], null, 2),
      function (err) {
        if (err) {
          return console.log(err);
        }
      }
    );
  });
});
