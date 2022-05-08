const router = require("express").Router();
const controller = require("../controllers/user");
const { images } = require("../ulti/ImageTransfer");
const {
  validateUnique,
  validateParams,
  validateBody,
} = require("../ulti/validator");
const DB = require("../models/user");
const { schemaBody, schemaParams } = require("../ulti/joiSchema");

router
  .route("/")
  .get(controller.all)
  .post(validateBody(schemaBody.user.login), controller.login);

router
  .route("/:id")
  .get()
  .patch()
  .delete(validateParams(schemaParams.id, "id"), controller.drop);

router.post("/register", [
  validateBody(schemaBody.user.body),
  validateUnique(DB, "email"),
  images,
  controller.register,
]);

router.post("/byEmail", controller.searchByEmail);

module.exports = router;
