function formatNumber(number) {
  // insert a viertelgeviert after 3 digits and also replace floating point with comma
  return number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .replace(/\./g, ","); // what looks like a space is a viertelgeviert character, take care of this
}

module.exports = {
  formatNumber,
};
