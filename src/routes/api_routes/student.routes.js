const router = require("express").Router();
const student = require("../../controllers/student.controller");

const { checkToken, authorizeRoles } = require("../../middleware/auth");

// Aplica el middleware a todas las rutas de nota de menú

router.post(
  "/create",
  checkToken,
  authorizeRoles("administrador"),
  student.registerStudent
);
router.get(
  "/:idStudent",
  checkToken,
  authorizeRoles("administrador"),
  student.getStudendById
);
router.delete(
  "/:idStudent",
  checkToken,
  authorizeRoles("administrador"),
  student.deleteStudent
);

router.put(
  "/:idStudent",
  checkToken,
  authorizeRoles("administrador"),
  student.editStudent
);
router.get(
  "/class/:classId",
  checkToken,
  authorizeRoles("administrador"),
  student.getStudentsByClass
);
router.get(
  "/list",
  checkToken,
  authorizeRoles("administrador"),
  student.getAllStudents
);
router.patch(
  "/active",
  checkToken,
  authorizeRoles("administrador"),
  student.reactivateStudentController
);
router.patch(
  "/desactive",
  checkToken,
  authorizeRoles("administrador"),
  student.desactiveStudentController
);
router.get("/listByTutor", checkToken, student.getStudentsByTutorId);
module.exports = router;
