
const express = require("express");
const router = express.Router();
const {create, index, login,projectList, resetPassword,update} = require("../controllers/Users");
const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");
const schema = require("../validations/Users")
router.get("/",index)
router.post("/",validate(schema.createValidation),create)
router.patch("/",authenticate,validate(schema.updateValidation),update)
router.post("/login",validate(schema.loginValidation),login)
router.get("/projects",authenticate,projectList)
router.post("/reset-password",validate(schema.resetPasswordValidation),resetPassword)


module.exports = router