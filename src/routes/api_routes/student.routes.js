const router = require("express").Router();
const student = require("../../controllers/student.controller");

const { checkToken, authorizeRoles } = require("../../middleware/auth");

// Aplica el middleware a todas las rutas de nota de menú
router.use(checkToken, authorizeRoles("administrador")); // solo tutores pueden acceder

router.post("/create", student.registerStudent);

router.patch("/softdelete/:id", student.deleteStudent);

router.put("/:id", student.editStudent);
router.get("/class/:classId", student.getStudentsByClass);
router.get ("/list", student.getAllStudents)
module.exports = router;
