const router = require("express").Router();
const student = require("../../controllers/student.controller");

const { checkToken, authorizeRoles } = require("../../middleware/auth");

// Aplica el middleware a todas las rutas de nota de menú

router.post("/create",checkToken, authorizeRoles("administrador"), student.registerStudent);

router.patch("/softdelete/:id",checkToken, authorizeRoles("administrador"), student.deleteStudent);

router.put("/:id",checkToken, authorizeRoles("administrador"), student.editStudent);
router.get("/class/:classId",checkToken, authorizeRoles("administrador"), student.getStudentsByClass);
router.get("/list",checkToken, authorizeRoles("administrador"), student.getAllStudents);
router.get("/listByTutor",checkToken, student.getStudentsByTutorId);
module.exports = router;
