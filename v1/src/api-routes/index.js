const express = require("express");
const Projects = require("./Projects");
const Users = require("./Users");
const Sections = require("./Sections");
const Tasks = require("./Tasks");

const router = express.Router();

router.use("/projects",Projects);
router.use("/users",Users);
router.use("/section",Sections);
router.use("/tasks",Tasks);

module.exports = router