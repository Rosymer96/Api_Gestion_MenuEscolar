const router = require("express").Router();
const classController = require("../../controllers/class.controllers");



//endpoints para:
// /api/class/
router.get("/list", classController.getAllClasses);
// /api/class/id
router.get("/:id", classController.findClassById);

// /api/class/
router.post("/create", classController.newClass);
//Editar nombre de la clase

//update class
router.patch("/update/:id", classController.updateClass);

router.delete("/delete/:id", classController.deleteClass);

module.exports = router;
