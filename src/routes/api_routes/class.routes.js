const router = require("express").Router();
const classController = require("../../controllers/class.controllers");
const { checkToken, authorizeRoles } = require("../../middleware/auth");

// Aplica el middleware a todas las rutas de nota de menú
router.use(checkToken, authorizeRoles("tutor")); // solo tutores pueden acceder

//endpoints para:
// /api/class/
router.get("/list", classController.getAllClasses);
// /api/class/id
router.get("/:id", classController.findClassById);

// /api/class/
router.post("/create", classController.newClass);
//Editar nombre de la clase

//update class
router.put("/:id", classController.updateClass);

router.delete("/:id", classController.deleteClass);

module.exports = router;
