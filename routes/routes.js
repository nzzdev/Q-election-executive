module.exports = [
  require("./rendering-info/html-static.js"),
  require("./stylesheet.js"),
  require("./locales.js"),
  require("./migration.js"),
  require("./health.js"),
  require("./fixtures/data.js"),
  require("./availability.js")
].concat(require("./schema.js"));
