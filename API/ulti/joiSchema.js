const joi = require("joi");

module.exports = {
  schemaBody: {
    contact: {
      body: joi.object({
        user: joi.optional(),
        trash: joi.optional(),
        image: joi.optional(),
        FirstName: joi.string().min(3).required(),
        LastName: joi.string().min(3).required(),
        email: joi.optional(),
        phone: joi.string().required(),
        Note: joi.optional(),
      }),
      patch: joi.object({
        user: joi.optional(),
        trash: joi.optional(),
        image: joi.optional(),
        FirstName: joi.string().min(3),
        LastName: joi.string().min(3),
        email: joi.optional(),
        phone: joi.string(),
        Note: joi.optional(),
      }),
    },
    user: {
      body: joi.object({
        name: joi.string().required().min(3),
        email: joi.string().required().email(),
        password: joi.string().required().min(3),
        image: joi.optional(),
      }),
      patch: joi.object({
        name: joi.string().min(3),
        email: joi.string().email(),
        password: joi.string().min(3),
        image: joi.optional(),
      }),
      login: joi.object({
        email: joi.string().required().email(),
        password: joi.string().required().min(3),
      }),
    },
  },
  schemaParams: {
    id: joi.object({
      id: joi.string().regex(/^[0-9a-fA-F]{24}$/),
    }),
  },
};
