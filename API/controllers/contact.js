const DB = require("../models/contact");
const helper = require("../ulti/helper");
const fs = require("fs");

module.exports = {
  all: async (req, res, next) => {
    const contact = await DB.find().populate("user", "-__v");
    helper.fMsg(res, "all contact from server", contact);
  },
  create: async (req, res, next) => {
    await new DB(req.body).save();
    const obj = {};
    obj["user"] = req.body.user;
    const finder = await DB.find(obj).populate("user");
    helper.fMsg(res, "patch complete", finder);
  },
  get: async (req, res, next) => {
    const finder = await DB.findById(req.params.id);
    finder
      ? helper.fMsg(res, "single get by id", finder)
      : next(new Error("no contact with that id"));
  },
  patch: async (req, res, next) => {
    const finder = await DB.findById(req.params.id);
    if (finder) {
      if (req.body.image) {
        await fs.unlinkSync(`./upload/${finder.image}`);
      }
      await DB.findByIdAndUpdate(finder._id, req.body);
      const contact = await DB.find();
      helper.fMsg(res, "update contact complete", contact);
    } else next(new Error("no contact with that id"));
  },
  drop: async (req, res, next) => {
    const result = await DB.findById(req.params.id);
    if (result) {
      if (result.image) {
        fs.unlinkSync(`./upload/${result.image}`);
      }
      await DB.findByIdAndDelete(result._id);
      const obj = {};
      obj["user"] = req.body.user;
      const finder = await DB.find(obj);
      helper.fMsg(res, "delete complete", finder);
    } else next(new Error("no contact with that id"));
  },
  search: async (req, res, next) => {
    const search = req.query.search;
    const obj = {};
    obj["FirstName"] = search;
    const finder = await DB.find(obj);
    helper.fMsg(res, "searching...", finder);
  },
  byUser: async (req, res, next) => {
    const obj = {};
    obj["user"] = req.body.user;
    const finder = await DB.find(obj);
    helper.fMsg(res, "by user", finder);
  },
  byUserSoftDrop: async (req, res, next) => {
    if (req.body.owner) {
      req.body.user = req.body.owner;
    }
    const result = await DB.findById(req.params.id);

    if (result) {
      await DB.findByIdAndUpdate(result._id, req.body);
      const obj = {};
      obj["user"] = req.body.user;
      const finder = await DB.find(obj);
      helper.fMsg(res, "patch complete", finder);
    } else next(new Error("no contact with that id"));
  },
};
