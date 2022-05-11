const DB = require("../models/user");

module.exports = {
  multiPhoneWare: async (req, res, next) => {
    const item = Object.keys(req.body).filter((i) => i.startsWith("phone"));
    const finder = [];
    item.map((i) => {
      finder.push(req.body[i]);
      delete req.body[i];
    });

    req.body.phone = finder;
    console.log(req.body);
    next();
  },
  pendingWare: async (req, res, next) => {
    const owner = await DB.findById(req.body.owner);
    next();
  },
};
