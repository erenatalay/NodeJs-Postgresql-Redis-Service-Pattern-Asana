
const express = require("express");
const router = express.Router();
const SectionController = require("../controllers/Sections");
const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");
const schema = require("../validations/Sections")
router.get("/:projectId",authenticate,SectionController.index)
router.post("/",authenticate,validate(schema.createValidation),SectionController.create)
router.delete("/:id",authenticate,SectionController.deletedSection)
router.patch("/:id",authenticate,validate(schema.updateValidation),SectionController.update)


module.exports = router