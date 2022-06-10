
const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/Comment");
const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");
const schema = require("../validations/Comment")
router.get("/:task_id",authenticate,CommentController.index)
router.post("/",authenticate,validate(schema.createValidation),CommentController.create)
router.delete("/:id",authenticate,CommentController.deletedProject)
router.patch("/:id",authenticate,validate(schema.updateValidation),CommentController.update)


module.exports = router