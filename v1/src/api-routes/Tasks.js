
const express = require("express");
const router = express.Router();
const { index, create, update, deletedTask } = require("../controllers/Tasks");
const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");
const schema = require("../validations/Sections")
router.post("/", authenticate, validate(schema.createValidation), create)
router.delete("/:id", authenticate, deletedTask)
router.patch("/:id", authenticate, validate(schema.updateValidation), update)


module.exports = router