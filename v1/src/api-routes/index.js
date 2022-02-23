const express = require("express");
const Projects = require("./Projects");
const Users = require("./Users");

const router = express.Router();

router.use("/projects",Projects);
router.use("/users",Users);

module.exports = router