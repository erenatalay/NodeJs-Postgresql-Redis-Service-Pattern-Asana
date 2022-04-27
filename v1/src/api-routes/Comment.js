
const express = require("express");
const router = express.Router();
const {index,create,update,deletedProject} = require("../controllers/Comment");
const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");
const schema = require("../validations/Comment")
router.get("/:task_id",authenticate,index)
router.post("/",authenticate,validate(schema.createValidation),create)
router.delete("/:id",authenticate,deletedProject)
router.patch("/:id",authenticate,validate(schema.updateValidation),update)


module.exports = router