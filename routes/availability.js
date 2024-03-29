const Boom = require("@hapi/boom");
const Joi = require("@hapi/joi");

module.exports = {
  method: "POST",
  path: "/availability/{propertyName}",
  options: {
    validate: {
      payload: Joi.object()
    },
  },
  handler: function(request, h) {
    const item = request.payload.item;

    if (request.params.propertyName === "votes") {
      let isAvailable = false;
      if (!item.withErrorMargin) {
        isAvailable = true;
      }
      return {
        available: isAvailable
      };
    }

    if (request.params.propertyName === "errorMargin") {
      let isAvailable = false;
      if (item.withErrorMargin === true) {
        isAvailable = true;
      }
      return {
        available: isAvailable
      };
    }

    return Boom.badRequest();
  }
};
