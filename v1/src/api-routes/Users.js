
const express = require("express");
const router = express.Router();
const {create, index, login,projectList, resetPassword,update,deleteUser, changePassword,updateProfileImage} = require("../controllers/Users");
const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");
const schema = require("../validations/Users")
router.get("/",index)
router.post("/",validate(schema.createValidation),create)
router.patch("/",authenticate,validate(schema.updateValidation),update)
router.delete("/:id",authenticate,deleteUser)
router.post("/login",validate(schema.loginValidation),login)
router.get("/projects",authenticate,projectList)
router.post("/reset-password",validate(schema.resetPasswordValidation),resetPassword)
router.post("/change-password",authenticate,validate(schema.changePasswordValidation),changePassword)
router.post("/update-profile-image",authenticate,updateProfileImage)


module.exports = router