const router = require("express").Router();
const controller = require("../controllers/contact");
const {
  validateBody,
  validateUnique,
  validateParams,
  validateToken,
} = require("../ulti/validator");
const { images } = require("../ulti/ImageTransfer");
const { schemaBody, schemaParams } = require("../ulti/joiSchema");
const DB = require("../models/contact");

router
  .route("/")
  .get(controller.all)
  .post(
    validateToken(),
    validateUnique(DB, "phone"),
    validateBody(schemaBody.contact.body),
    images,
    controller.create
  );

router.route("/byUser").get(validateToken(), controller.byUser);
router
  .route("/byUser/:id")
  .patch(
    validateToken(),
    validateParams(schemaParams.id, "id"),
    controller.byUserSoftDrop
  );

router
  .route("/:id")
  .get(validateParams(schemaParams.id, "id"), controller.get)
  .put(
    validateToken(),
    images,
    validateParams(schemaParams.id, "id"),
    validateBody(schemaBody.contact.patch),
    // validateUnique(DB, "phone"),
    controller.byUserSoftDrop
  )
  .patch(
    validateToken(),
    images,
    validateParams(schemaParams.id, "id"),
    // validateBody(schemaBody.contact.patch),
    controller.patch
  )
  .delete(
    validateToken(),
    validateParams(schemaParams.id, "id"),
    controller.drop
  );

router.post("/search", controller.search);

module.exports = router;
