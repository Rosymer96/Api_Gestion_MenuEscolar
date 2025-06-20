const router = require("express").Router();
const student = require("../../controllers/student.controller");

router.post("/create", student.registerStudent);

router.patch("/:id/deactivate", student.deleteStudent);

router.put("/:id", student.editStudent);
router.get("/class/:classId", student.getStudentsByClass);
module.exports = router;
