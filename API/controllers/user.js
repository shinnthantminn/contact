const DB = require("../models/user");
const helper = require("../ulti/helper");
const { token } = require("../ulti/helper");

module.exports = {
  all: async (req, res, next) => {
    const user = await DB.find();
    helper.fMsg(res, "all user from server", user);
  },
  register: async (req, res, next) => {
    console.log(req.body);
    req.body.password = await helper.encode(req.body.password);
    await new DB(req.body).save();
    const user = await DB.find();
    helper.fMsg(res, "register complete", user);
  },
  login: async (req, res, next) => {
    const email = await DB.findOne({ email: req.body.email });
    if (email) {
      const compare = await helper.compare(req.body.password, email.password);
      if (compare) {
        const obj = email.toObject();
        delete obj.password;
        obj.token = token(obj);
        helper.set(obj._id, obj);
        helper.fMsg(res, "login success", obj);
      } else next(new Error("password wrong"));
    } else next(new Error("this email was not existing in our server"));
  },
  drop: async (req, res, next) => {
    const finder = await DB.findById(req.params.id);
    if (finder) {
      await DB.findByIdAndDelete(finder._id);
      const user = await DB.find().populate("contact");
      helper.fMsg(res, "delete complete", user);
    } else next(new Error("no user with that id"));
  },
  searchByEmail: async (req, res, next) => {
    const finder = await DB.find({ email: req.body.email });
    helper.fMsg(res, "search by user", finder);
  },
};
