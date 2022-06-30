
const express = require("express");
const router = express.Router();
const TasksController = require("../controllers/Tasks");
const authenticate = require("../middlewares/authenticate");
const idChecker = require("../middlewares/idChecker");
const validate = require("../middlewares/validate");
const schema = require("../validations/Tasks")
router.get("/:section_id", authenticate, TasksController.index)
router.get("/subtask/:id", idChecker,authenticate, TasksController.subTaskGet)
router.post("/", authenticate, validate(schema.createValidation), TasksController.create)
router.delete("/:id", idChecker,authenticate, TasksController.deletedTask)
router.patch("/:id", idChecker,authenticate, validate(schema.updateValidation), TasksController.update)
router.post("/:task_id",authenticate,TasksController.subTaskCreate)

module.exports = router;