const fixtureDataDirectory = '../../resources/fixtures/data';

// provide every fixture data file present in ../../resources/fixtures/data
const fixtureData = [
  require(`${fixtureDataDirectory}/no-results-majority-images.json`),
  require(`${fixtureDataDirectory}/no-results-no-majority-images.json`),
  require(`${fixtureDataDirectory}/no-results-percentage-images.json`),
  require(`${fixtureDataDirectory}/results-majority-no-images-status.json`),
  require(`${fixtureDataDirectory}/results-majority-partly-images.json`),
  require(`${fixtureDataDirectory}/results-no-majority-no-images.json`),
  require(`${fixtureDataDirectory}/results-percentage-partly-images-colors.json`),
  require(`${fixtureDataDirectory}/results-percentage-with-others.json`),
  require(`${fixtureDataDirectory}/results-majority-with-others.json`),
  require(`${fixtureDataDirectory}/results-majority-partly-images-with-others.json`),
];

module.exports = {
  path: '/fixtures/data',
  method: 'GET',
  options: {
    tags: ['api'],
    cors: true
  },
  handler: (request, h) => {
    return fixtureData;
  }
}
