
const express = require("express");
const router = express.Router();
const {index,create} = require("../controllers/Sections");
const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validate");
const schema = require("../validations/Sections")
router.get("/",authenticate,index)
router.post("/",authenticate,validate(schema.createValidation),create)
// router.delete("/:id",authenticate,deletedProject)
// router.patch("/:id",authenticate,validate(schema.updateValidation),update)


module.exports = router