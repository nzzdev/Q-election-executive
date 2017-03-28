// contains all scripts which shall be executed to migrate to tool version 2.0.0
// each module has to return a result object holding the modified item and a
// flag property indicating if item was changed or not
module.exports.migrate = function(item) {
  let result = {
    isChanged: false
  }
  if (item.candidates) {
    let truthyCandidates = item.candidates.filter(candidate => {
      return candidate.name !== undefined && candidate.name !== '';
    });
    if (truthyCandidates.length < item.candidates.length) {
      item.candidates = truthyCandidates;
      result.isChanged = true;
    } 
  }
  result.item = item;
  return result;
}
