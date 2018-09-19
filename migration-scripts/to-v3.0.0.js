// contains all scripts which shall be executed to migrate to tool version 3.0.0
// each module has to return a result object holding the modified item and a
// flag property indicating if item was changed or not
module.exports.migrate = function(item) {
  let result = {
    isChanged: false
  };

  if (item.candidates) {
    item.candidates.forEach(candidate => {
      if (candidate.color.full) {
        // safe classAttribute and colorCode of full
        let color = {};
        if (candidate.color.full.classAttribute) {
          color["classAttribute"] = candidate.color.full.classAttribute;
        }
        if (candidate.color.full.colorCode) {
          color["colorCode"] = candidate.color.full.colorCode;
        }
        // remove old properties
        delete candidate.color.full;
        delete candidate.color.light;
        // override color object with new one
        candidate.color = color;
        result.isChanged = true;
      }
    });
  }

  result.item = item;
  return result;
};
