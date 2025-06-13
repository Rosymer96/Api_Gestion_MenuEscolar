const router = require("express").Router();
const student = require("../../controllers/student.controller");

router.post("/create", student.registerStudent);

module.exports = router;
