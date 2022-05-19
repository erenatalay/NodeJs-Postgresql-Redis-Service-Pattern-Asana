
const express = require("express");
const router = express.Router();
const {index,create,update,deletedProject,findById} = require("../controllers/Projects");
const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");
const schema = require("../validations/Projects")
router.get("/",authenticate,index)
router.get("/:id",authenticate,findById)
router.post("/",authenticate,validate(schema.createValidation),create)
router.delete("/:id",authenticate,deletedProject)
router.patch("/:id",authenticate,validate(schema.updateValidation),update)


module.exports = router