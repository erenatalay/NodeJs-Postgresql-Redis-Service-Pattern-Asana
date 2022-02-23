
const express = require("express");
const router = express.Router();
const {index,create,update} = require("../controllers/Projects");
const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");
const schema = require("../validations/Projects")
router.get("/",authenticate,index)
router.post("/",authenticate,validate(schema.createValidation),create)
router.patch("/:id",authenticate,validate(schema.updateValidation),update)


module.exports = router