
const express = require("express");
const router = express.Router();
const UsersConstoller = require("../controllers/Users");
const authenticate = require("../middlewares/authenticate");
const idChecker = require("../middlewares/idChecker");
const validate = require("../middlewares/validate");
const schema = require("../validations/Users")
router.get("/",UsersConstoller.index)
router.post("/",validate(schema.createValidation),UsersConstoller.create)
router.patch("/",authenticate,validate(schema.updateValidation),UsersConstoller.update)
router.delete("/:id",idChecker,authenticate,UsersConstoller.deleteUser)
router.post("/login",validate(schema.loginValidation),UsersConstoller.login)
router.get("/projects",authenticate,UsersConstoller.projectList)
router.post("/reset-password",validate(schema.resetPasswordValidation),UsersConstoller.resetPassword)
router.post("/change-password",authenticate,validate(schema.changePasswordValidation),UsersConstoller.changePassword)
router.post("/update-profile-image",authenticate,UsersConstoller.updateProfileImage)


module.exports = router