const helper = require("../ulti/helper");

module.exports = {
  validateBody: (schema) => {
    return async (req, res, next) => {
      const result = await schema.validate(req.body);
      if (result.error) {
        next(new Error(result.error.details[0].message));
      } else next();
    };
  },
  validateUnique: (DB, ...arr) => {
    return async (req, res, next) => {
      const num = [];
      for (const x of arr) {
        const obj = {};
        obj[x] = req.body[x];
        const finder = await DB.findOne(obj);
        num.push(x);
        if (finder) {
          next(new Error(`this ${x} was existing in our server`));
        } else if (num.length === arr.length) {
          next();
        }
      }
    };
  },
  validateParams: (schema, name) => {
    return async (req, res, next) => {
      const obj = {};
      obj[name] = req.params[name];
      const result = await schema.validate(obj);
      if (result.error) {
        next(new Error(result.error.details[0].message));
      } else next();
    };
  },
  validateToken: () => {
    return async (req, res, next) => {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const data = await helper.decode(token);
        const raw = await helper.get(data._id);
        const user = JSON.parse(raw);
        req.body.user = user._id;
        next();
      } else next(new Error("tokenization error"));
    };
  },
};
