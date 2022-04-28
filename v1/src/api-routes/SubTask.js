
const express = require("express");
const router = express.Router();
const {index,create,update,deletedTask} = require("../controllers/SubTask");
const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");
const schema = require("../validations/SubTask")
router.get("/:task_id",authenticate,index)
router.post("/:task_id",authenticate,validate(schema.createValidation),create)
router.delete("/:id",authenticate,deletedTask)
router.patch("/:id",authenticate,validate(schema.updateValidation),update)


module.exports = router