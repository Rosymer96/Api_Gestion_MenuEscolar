const router = require("express").Router();
const classController = require("../../controllers/class.controllers");



//endpoints para:
// /api/class/
router.get("/", classController.getAllClasses);
// /api/class/id
router.get("/:id", classController.getClassById);

// /api/class/
router.post("/", classController.createClass);
//Editar nombre de la clase

//update class
router.patch("/:id", classController.updateClass);

router.delete("/:id", classController.deleteClass);

module.exports = router;
