const router = require("express").Router();
const student = require("../../controllers/student.controller");

router.post("/create", student.registerStudent);

router.patch("/:id/deactivate", student.deleteStudent);

router.put("/:id/edit", student.editStudent);

module.exports = router;
