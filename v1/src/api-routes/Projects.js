
const express = require("express");
const router = express.Router();
const ProjectsController = require("../controllers/Projects");
const authenticate = require("../middlewares/authenticate");
const idChecker = require("../middlewares/idChecker");
const validate = require("../middlewares/validate");
const schema = require("../validations/Projects")
router.get("/",authenticate,ProjectsController.index)
router.get("/:id",idChecker(),authenticate,ProjectsController.findById)
router.post("/",authenticate,validate(schema.createValidation),ProjectsController.create)
router.delete("/:id",idChecker(),authenticate,ProjectsController.deletedProject)
router.patch("/:id",idChecker(),authenticate,validate(schema.updateValidation),ProjectsController.update)


module.exports = router