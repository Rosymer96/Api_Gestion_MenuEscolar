const router = require("express").Router();
const classController = require("../../controllers/class.controllers");



//endpoints para:
// /api/class/
router.get("/", classController.getAllClasses);
// /api/class/id
router.get("/:id", classController.findClassById);

// /api/class/
router.post("/", classController.newClass);
//Editar nombre de la clase

//update class
router.patch("/:id", classController.updateClass);

// router.delete("/:id", classController.deleteClass);

module.exports = router;
