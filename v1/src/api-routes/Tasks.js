
const express = require("express");
const router = express.Router();
const { index, create, update, deletedTask, subTaskCreate,subTaskGet } = require("../controllers/Tasks");
const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");
const schema = require("../validations/Tasks")
router.get("/subtask/:id", authenticate, subTaskGet)
router.get("/:section_id", authenticate, index)
router.post("/", authenticate, validate(schema.createValidation), create)
router.delete("/:id", authenticate, deletedTask)
router.patch("/:id", authenticate, validate(schema.updateValidation), update)
router.post("/:task_id",authenticate,subTaskCreate)



module.exports = router