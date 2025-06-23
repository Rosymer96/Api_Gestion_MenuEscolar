const router = require("express").Router();
const menuNoteController = require("../../controllers/note.controllers");

const { checkToken, authorizeRoles } = require("../../middleware/auth");

// Aplica el middleware a todas las rutas de nota de menú
router.use(checkToken, authorizeRoles("tutor")); // solo tutores pueden acceder

router.get("/:menuId", menuNoteController.getNote);
router.post("/", menuNoteController.createNote);
router.put("/", menuNoteController.updateNote);
router.delete("/:menuId", menuNoteController.deleteNote);

module.exports = router;
